const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

/**
 * Cloud Function Cron Job: Roda a cada 1 hora.
 * Busca viagens agendadas para o dia de hoje e dispara notificações push
 * para os dispositivos cadastrados se a viagem estiver prestes a acontecer (2h ou 30min antes).
 */
exports.verificarViagensProximas = functions.pubsub
    .schedule('every 1 hours')
    .timeZone('America/Sao_Paulo')
    .onRun(async (context) => {
        const agora = new Date();
        const hojeStr = agora.toISOString().split('T')[0];
        
        console.log(`Iniciando verificação de viagens para o dia ${hojeStr}...`);
        
        try {
            // 1. Busca viagens de hoje com status "Confirmado"
            const snapshot = await db.collection('viagens')
                .where('data', '==', hojeStr)
                .where('status', '==', 'Confirmado')
                .get();
                
            if (snapshot.empty) {
                console.log("Nenhuma viagem confirmada agendada para hoje.");
                return null;
            }
            
            // 2. Busca os tokens FCM dos dispositivos do administrador
            const tokensSnapshot = await db.collection('configuracoes').doc('fcm_tokens').get();
            if (!tokensSnapshot.exists) {
                console.log("Nenhum dispositivo registrado para notificações push.");
                return null;
            }
            
            const tokensData = tokensSnapshot.data();
            const tokens = tokensData.tokens || [];
            if (tokens.length === 0) {
                console.log("A lista de tokens de notificação push está vazia.");
                return null;
            }
            
            const viagensParaNotificar = [];
            
            snapshot.forEach(doc => {
                const v = doc.data();
                v.id = doc.id;
                
                const viagemHora = new Date(`${v.data}T${v.horario}`);
                const difMin = Math.round((viagemHora - agora) / 60000);
                
                // Notificação de 2 horas (viagens que ocorrerão entre 60 e 120 minutos a partir de agora)
                if (difMin > 60 && difMin <= 120) {
                    if (!v.notificado2h) {
                        viagensParaNotificar.push({
                            viagemId: v.id,
                            tipo: '2h',
                            title: `⏰ Viagem em 2h: ${v.nomeCliente}`,
                            body: `Horário: ${v.horario} - Rota: ${v.tipoServico}\nBuscar em: ${v.enderecoEmbarque}`
                        });
                    }
                }
                
                // Notificação de 30 minutos (viagens que ocorrerão em até 35 minutos a partir de agora)
                if (difMin > 0 && difMin <= 35) {
                    if (!v.notificado30m) {
                        viagensParaNotificar.push({
                            viagemId: v.id,
                            tipo: '30m',
                            title: `🚗 Sair em 30min: ${v.nomeCliente}`,
                            body: `Busca às ${v.horario} em ${v.enderecoEmbarque}. Destino: ${v.enderecoDestino}`
                        });
                    }
                }
            });
            
            if (viagensParaNotificar.length === 0) {
                console.log("Nenhuma viagem precisa de notificação push no momento.");
                return null;
            }
            
            console.log(`Enviando ${viagensParaNotificar.length} notificações push para ${tokens.length} dispositivos...`);
            
            // 3. Envia as mensagens FCM
            for (const item of viagensParaNotificar) {
                const message = {
                    notification: {
                        title: item.title,
                        body: item.body,
                    },
                    tokens: tokens
                };
                
                const response = await admin.messaging().sendEachForMulticast(message);
                console.log(`Notificações push enviadas para o item ${item.viagemId}. Sucessos: ${response.successCount}, Falhas: ${response.failureCount}`);
                
                // 4. Atualiza o status da viagem no Firestore indicando que já notificou para não duplicar
                const updateField = item.tipo === '2h' ? { notificado2h: true } : { notificado30m: true };
                await db.collection('viagens').doc(item.viagemId).update(updateField);
            }
            
            return null;
        } catch (error) {
            console.error("Erro ao executar Cloud Function de notificações push:", error);
            return null;
        }
    });
