/* ==========================================================================
   GDS DESIGN - BANCO DE DADOS E CONEXÃO CLOUD (FIREBASE / LOCALSTORAGE)
   ========================================================================== */

// --- Configuração e Inicialização ---
let dbInstance = null;
let storageInstance = null;
let isFirebaseActive = false;

// Tenta carregar credenciais do Firebase do LocalStorage
function getFirebaseConfig() {
    try {
        const configStr = localStorage.getItem('gds_firebase_config');
        if (configStr) {
            return JSON.parse(configStr);
        }
    } catch (e) {
        console.error("Erro ao ler configurações do Firebase:", e);
    }
    return null;
}

// Inicializa a conexão com o Firebase ou fallback local
function initDatabase() {
    const config = getFirebaseConfig();
    
    // Se o Firebase estiver incluído na página e houver configuração válida
    if (typeof firebase !== 'undefined' && config && config.apiKey && config.projectId) {
        try {
            // Verifica se o Firebase já não foi inicializado
            if (firebase.apps.length === 0) {
                firebase.initializeApp(config);
            }
            dbInstance = firebase.firestore();
            storageInstance = firebase.storage();
            isFirebaseActive = true;
            console.log("✦ Conexão Cloud Firebase (Firestore & Storage) Ativada!");
        } catch (e) {
            console.error("Erro ao inicializar Firebase. Alternando para LocalStorage fallback:", e);
            setupLocalFallback();
        }
    } else {
        setupLocalFallback();
    }
}

function setupLocalFallback() {
    dbInstance = null;
    storageInstance = null;
    isFirebaseActive = false;
    console.log("✦ Utilizando fallback de Banco de Dados Local (LocalStorage & IndexedDB)");
}

// --- IndexedDB para Armazenamento Local de Arquivos ---
// Abre ou cria o banco de dados IndexedDB para arquivos grandes (> 5MB)
function openIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("gds_files_db", 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("files")) {
                db.createObjectStore("files", { keyPath: "id" });
            }
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

// Salva um arquivo no IndexedDB localmente
async function saveFileLocally(id, file) {
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["files"], "readwrite");
        const store = transaction.objectStore("files");
        
        const fileRecord = {
            id: id,
            name: file.name,
            type: file.type,
            data: file // Armazena o Blob/File diretamente
        };
        
        const request = store.put(fileRecord);
        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e.target.error);
    });
}

// Obtém um arquivo do IndexedDB
async function getFileLocally(id) {
    const db = await openIndexedDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["files"], "readonly");
        const store = transaction.objectStore("files");
        const request = store.get(id);
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
}

// --- Módulos de Operações de Briefings ---

// Obter todos os Briefings
async function getBriefings() {
    if (isFirebaseActive && dbInstance) {
        try {
            const snapshot = await dbInstance.collection('briefings')
                .orderBy('created_at', 'desc')
                .get();
            const list = [];
            snapshot.forEach(doc => {
                list.push({ id: doc.id, ...doc.data() });
            });
            return list;
        } catch (e) {
            console.error("Erro ao obter briefings do Firebase:", e);
        }
    }
    // Fallback Local
    return JSON.parse(localStorage.getItem('gds_briefings') || '[]');
}

// Obter Briefing por ID
async function getBriefingById(id) {
    if (isFirebaseActive && dbInstance) {
        try {
            const doc = await dbInstance.collection('briefings').doc(id).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (e) {
            console.error("Erro ao obter briefing por ID no Firebase:", e);
        }
    }
    // Fallback Local
    const briefings = JSON.parse(localStorage.getItem('gds_briefings') || '[]');
    return briefings.find(b => b.id === id) || null;
}

// Salvar / Criar Briefing
async function saveBriefing(briefing) {
    if (!briefing.id) {
        briefing.id = 'briefing_' + Math.random().toString(36).substr(2, 9);
        briefing.created_at = new Date().toISOString();
    }
    briefing.updated_at = new Date().toISOString();

    if (isFirebaseActive && dbInstance) {
        try {
            await dbInstance.collection('briefings').doc(briefing.id).set(briefing);
            return briefing;
        } catch (e) {
            console.error("Erro ao salvar briefing no Firebase:", e);
        }
    }

    // Fallback Local
    const briefings = JSON.parse(localStorage.getItem('gds_briefings') || '[]');
    const idx = briefings.findIndex(b => b.id === briefing.id);
    if (idx !== -1) {
        briefings[idx] = briefing;
    } else {
        briefings.push(briefing);
    }
    localStorage.setItem('gds_briefings', JSON.stringify(briefings));
    
    // Dispara evento para atualizar em tempo real outras abas do navegador
    window.dispatchEvent(new Event('storage'));
    
    return briefing;
}

// Atualizar Status do Briefing
async function updateBriefingStatus(id, newStatus, responsibleName = '-') {
    const briefing = await getBriefingById(id);
    if (!briefing) return null;

    briefing.status = newStatus;
    
    // Adiciona log de histórico correspondente
    let logMsg = `Administrador alterou o status para ${newStatus}`;
    if (newStatus === 'Concluído') {
        logMsg = 'Administrador concluiu o projeto do briefing';
    }
    
    if (!briefing.historico) briefing.historico = [];
    briefing.historico.push({
        data: new Date().toISOString(),
        acao: logMsg
    });

    return await saveBriefing(briefing);
}

// Adicionar Comentário Interno
async function addBriefingComment(id, text, author) {
    const briefing = await getBriefingById(id);
    if (!briefing) return null;

    if (!briefing.comentarios) briefing.comentarios = [];
    briefing.comentarios.push({
        data: new Date().toISOString(),
        autor: author,
        texto: text
    });

    // Registra log no histórico
    if (!briefing.historico) briefing.historico = [];
    briefing.historico.push({
        data: new Date().toISOString(),
        acao: `Administrador adicionou um comentário`
    });

    return await saveBriefing(briefing);
}

// Adicionar Ação ao Histórico
async function addBriefingHistory(id, action) {
    const briefing = await getBriefingById(id);
    if (!briefing) return null;

    if (!briefing.historico) briefing.historico = [];
    briefing.historico.push({
        data: new Date().toISOString(),
        acao: action
    });

    return await saveBriefing(briefing);
}

// Excluir Briefing
async function deleteBriefing(id) {
    if (isFirebaseActive && dbInstance) {
        try {
            await dbInstance.collection('briefings').doc(id).delete();
            return true;
        } catch (e) {
            console.error("Erro ao excluir briefing no Firebase:", e);
        }
    }
    // Fallback Local
    let briefings = JSON.parse(localStorage.getItem('gds_briefings') || '[]');
    briefings = briefings.filter(b => b.id !== id);
    localStorage.setItem('gds_briefings', JSON.stringify(briefings));
    
    // Dispara evento de sincronização
    window.dispatchEvent(new Event('storage'));
    return true;
}

// --- Upload de Arquivos Real e Simulado ---
// Realiza upload de arquivo (Firebase Storage se ativo, ou IndexedDB local se inativo)
async function uploadFile(file, folder = "briefings") {
    const fileId = 'file_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    
    if (isFirebaseActive && storageInstance) {
        try {
            const ref = storageInstance.ref().child(`${folder}/${fileId}_${file.name}`);
            const uploadTask = await ref.put(file);
            const downloadUrl = await uploadTask.ref.getDownloadURL();
            return {
                id: fileId,
                name: file.name,
                url: downloadUrl,
                mode: 'firebase'
            };
        } catch (e) {
            console.error("Erro no upload do Firebase Storage. Usando fallback local:", e);
        }
    }

    // Fallback Local: salva no IndexedDB
    try {
        await saveFileLocally(fileId, file);
        // Retorna um link interno com prefixo #indexeddb
        return {
            id: fileId,
            name: file.name,
            url: `#indexeddb:${fileId}`,
            mode: 'local'
        };
    } catch (e) {
        console.error("Erro ao salvar arquivo no IndexedDB:", e);
        // Fallback básico caso dê erro crítico: cria um ObjectURL temporário
        const url = URL.createObjectURL(file);
        return {
            id: fileId,
            name: file.name,
            url: url,
            mode: 'temporary'
        };
    }
}

// Força o download de um arquivo a partir da URL (Firebase ou IndexedDB local)
async function downloadFileFromBriefing(fileUrl, fileName) {
    if (fileUrl.startsWith('#indexeddb:')) {
        const fileId = fileUrl.replace('#indexeddb:', '');
        try {
            const fileRecord = await getFileLocally(fileId);
            if (fileRecord && fileRecord.data) {
                const downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(fileRecord.data);
                downloadLink.download = fileRecord.name || fileName;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                return;
            }
        } catch (e) {
            console.error("Erro ao recuperar arquivo do IndexedDB:", e);
        }
        alert("O arquivo local não pôde ser encontrado neste dispositivo (IndexedDB).");
    } else {
        // Abre arquivo em nuvem
        window.open(fileUrl, '_blank');
    }
}

// Inicializa no carregamento do script
initDatabase();
