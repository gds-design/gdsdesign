/* ==========================================================================
   GDS DESIGN - MOTOR LÓGICO DO PAINEL CRM E DASHBOARD
   ========================================================================== */

// --- Controle de Sessão e Segurança ---
function checkSession() {
    const session = localStorage.getItem('gds_admin_session');
    if (!session) {
        window.location.href = 'index.html';
        return;
    }
    try {
        const sessionData = JSON.parse(session);
        if (Date.now() > sessionData.expireAt) {
            localStorage.removeItem('gds_admin_session');
            window.location.href = 'index.html';
        }
    } catch (e) {
        localStorage.removeItem('gds_admin_session');
        window.location.href = 'index.html';
    }
}

// Executa logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('gds_admin_session');
    window.location.href = 'index.html';
});

// --- Navegação entre Abas ---
function switchTab(tabId, element) {
    // Remove active das abas
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    // Remove active dos botões da sidebar
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Ativa aba e botão correspondentes
    document.getElementById(`tab-${tabId}`).classList.add('active');
    element.classList.add('active');
    
    // Recarrega dados relevantes da aba
    loadAllData();
}

// --- Funções de Modal ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// --- Gerenciamento do Banco de Dados Local (LocalStorage) ---

// Obter Projetos/Viagens
function getProjects() {
    return JSON.parse(localStorage.getItem('gds_viagens') || '[]');
}

// Salvar Projeto
function saveProject(project) {
    const projects = getProjects();
    if (!project.id) {
        project.id = 'proj_' + Math.random().toString(36).substr(2, 9);
        project.createdAt = new Date().toISOString();
    }
    const index = projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
        projects[index] = project;
    } else {
        projects.push(project);
    }
    localStorage.setItem('gds_viagens', JSON.stringify(projects));
    
    // Adiciona automaticamente o cliente ao CRM se for novo
    registerNewClient(project.cliente, project.telefone, project.email);
}

// Excluir Projeto
function deleteProject(id) {
    let projects = getProjects();
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('gds_viagens', JSON.stringify(projects));
}

// Obter Clientes
function getClients() {
    return JSON.parse(localStorage.getItem('gds_clientes') || '[]');
}

// Salvar Cliente manual
function saveClient(client) {
    const clients = getClients();
    if (!client.id) {
        client.id = 'cli_' + Math.random().toString(36).substr(2, 9);
        client.createdAt = new Date().toISOString();
    }
    const index = clients.findIndex(c => c.id === client.id);
    if (index !== -1) {
        clients[index] = client;
    } else {
        clients.push(client);
    }
    localStorage.setItem('gds_clientes', JSON.stringify(clients));
}

// Excluir Cliente
function deleteClient(id) {
    let clients = getClients();
    clients = clients.filter(c => c.id !== id);
    localStorage.setItem('gds_clientes', JSON.stringify(clients));
}

// Registrar Novo Cliente vindo do Briefing
function registerNewClient(nome, telefone, email) {
    const clients = getClients();
    const cleanPhone = telefone.replace(/\D/g, '');
    const exists = clients.some(c => c.telefone.replace(/\D/g, '') === cleanPhone);
    
    if (!exists && nome && telefone) {
        const newClient = {
            id: 'cli_' + Math.random().toString(36).substr(2, 9),
            nome: nome,
            telefone: telefone,
            email: email || '',
            createdAt: new Date().toISOString()
        };
        clients.push(newClient);
        localStorage.setItem('gds_clientes', JSON.stringify(clients));
    }
}

// Obter Finanças
function getFinances() {
    return JSON.parse(localStorage.getItem('gds_financeiro') || '[]');
}

// Salvar Finança
function saveFinance(transaction) {
    const finances = getFinances();
    transaction.id = 'fin_' + Math.random().toString(36).substr(2, 9);
    transaction.date = new Date().toISOString();
    finances.push(transaction);
    localStorage.setItem('gds_financeiro', JSON.stringify(finances));
}

// Excluir Finança
function deleteFinance(id) {
    let finances = getFinances();
    finances = finances.filter(f => f.id !== id);
    localStorage.setItem('gds_financeiro', JSON.stringify(finances));
}

// Obter Agenda/Compromissos
function getCalendarEvents() {
    return JSON.parse(localStorage.getItem('gds_calendario') || '[]');
}

// Salvar Compromisso
function saveCalendarEvent(event) {
    const events = getCalendarEvents();
    event.id = 'ev_' + Math.random().toString(36).substr(2, 9);
    events.push(event);
    localStorage.setItem('gds_calendario', JSON.stringify(events));
}

// Excluir Compromisso
function deleteCalendarEvent(id) {
    let events = getCalendarEvents();
    events = events.filter(e => e.id !== id);
    localStorage.setItem('gds_calendario', JSON.stringify(events));
}

// Obter Ideias
function getIdeas() {
    return JSON.parse(localStorage.getItem('gds_ideias') || '[]');
}

// Salvar Ideia
function saveIdea(idea) {
    const ideas = getIdeas();
    idea.id = 'idea_' + Math.random().toString(36).substr(2, 9);
    idea.createdAt = new Date().toISOString();
    ideas.push(idea);
    localStorage.setItem('gds_ideias', JSON.stringify(ideas));
}

// Excluir Ideia
function deleteIdea(id) {
    let ideas = getIdeas();
    ideas = ideas.filter(i => i.id !== id);
    localStorage.setItem('gds_ideias', JSON.stringify(ideas));
}

// --- Carregadores de Visualização de Telas ---

function loadAllData() {
    loadDashboardStats();
    loadKanban();
    loadClients();
    loadFinances();
    loadCalendar();
    loadIdeas();
    loadSettings();
    loadBriefings();
    loadFirebaseSettings();
}

// Aba 1: Dashboard Stats e Briefings
function loadDashboardStats() {
    const projects = getProjects();
    const finances = getFinances();
    
    const mesAtual = new Date().toISOString().substring(0, 7); // YYYY-MM
    
    let faturamento = 0;
    let despesas = 0;
    let ativos = 0;
    
    // Calcula Financeiro do mês corrente
    finances.forEach(f => {
        if (f.date.startsWith(mesAtual)) {
            const val = parseFloat(f.value) || 0;
            if (f.type === 'income') faturamento += val;
            if (f.type === 'expense') despesas += val;
        }
    });
    
    // Projetos ativos
    projects.forEach(p => {
        if (p.status !== 'Concluído') {
            ativos++;
        }
    });
    
    // Atualiza Stats DOM
    document.getElementById('stat-revenue').textContent = `R$ ${faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('stat-expenses').textContent = `R$ ${despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('stat-profit').textContent = `R$ ${(faturamento - despesas).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('stat-projects').textContent = ativos;
    
    // Tabela de últimos leads
    const recentLeadsTable = document.getElementById('recentLeadsTable');
    recentLeadsTable.innerHTML = '';
    
    const briefings = projects.filter(p => p.status === 'Briefing').slice(-5).reverse();
    
    if (briefings.length === 0) {
        recentLeadsTable.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum lead de briefing novo recebido.</td></tr>';
        return;
    }
    
    briefings.forEach(b => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${b.cliente}</strong></td>
            <td><span class="badge" style="margin: 0; padding: 4px 10px; font-size: 11px;">${b.servico}</span></td>
            <td>${b.valor}</td>
            <td>${new Date(b.createdAt).toLocaleDateString('pt-BR')}</td>
            <td><button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="openProjectDetail('${b.id}')"><i class="fa-solid fa-eye"></i> Detalhes</button></td>
        `;
        recentLeadsTable.appendChild(row);
    });
}

// Aba 2: Kanban Board
function loadKanban() {
    const projects = getProjects();
    const columns = ['Briefing', 'Design', 'Desenvolvimento', 'Revisão', 'Concluído'];
    
    // Limpa contadores e colunas
    columns.forEach(col => {
        const idCol = col.replace('í', 'i').replace('ã', 'a');
        document.getElementById(`col-${idCol}`).innerHTML = '';
        document.getElementById(`count-${idCol}`).textContent = '0';
    });
    
    const colCounters = { 'Briefing': 0, 'Design': 0, 'Desenvolvimento': 0, 'Revisão': 0, 'Concluído': 0 };
    
    projects.forEach(p => {
        const status = p.status || 'Briefing';
        const idCol = status.replace('í', 'i').replace('ã', 'a');
        const colContainer = document.getElementById(`col-${idCol}`);
        
        if (colContainer) {
            colCounters[status]++;
            
            const card = document.createElement('div');
            card.className = 'kanban-card';
            card.draggable = true;
            card.id = p.id;
            card.onclick = () => openProjectDetail(p.id);
            card.ondragstart = (e) => e.dataTransfer.setData('text/plain', p.id);
            
            card.innerHTML = `
                <div class="card-tag">${p.servico}</div>
                <div class="card-name">${p.cliente}</div>
                <div class="card-info">${p.detalhes ? p.detalhes.substring(0, 50) : ''}</div>
                <div class="card-footer">
                    <span class="card-price">${p.valor}</span>
                    <span style="font-size: 10px; color: var(--text-muted);">${p.prazo}</span>
                </div>
            `;
            colContainer.appendChild(card);
        }
    });
    
    // Atualiza contadores
    columns.forEach(col => {
        const idCol = col.replace('í', 'i').replace('ã', 'a');
        document.getElementById(`count-${idCol}`).textContent = colCounters[col];
    });
}

// Funções de Arrastar e Soltar (Drag and Drop) para o Kanban
function allowDrop(e) {
    e.preventDefault();
}

function dropCard(e, targetStatus) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const projects = getProjects();
    const project = projects.find(p => p.id === id);
    
    if (project) {
        project.status = targetStatus;
        saveProject(project);
        loadKanban();
        loadDashboardStats();
    }
}

// Modal de Detalhes do Projeto
let currentEditingProjectId = null;

function openProjectDetail(id) {
    const projects = getProjects();
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    currentEditingProjectId = id;
    
    document.getElementById('det-client').textContent = project.cliente;
    document.getElementById('det-service').textContent = project.servico;
    document.getElementById('det-phone').textContent = project.telefone;
    document.getElementById('det-email').textContent = project.email || 'Não informado';
    document.getElementById('det-details').textContent = project.detalhes || 'Sem detalhes';
    document.getElementById('det-price').textContent = project.valor;
    document.getElementById('det-deadline').textContent = project.prazo;
    document.getElementById('det-date').textContent = new Date(project.createdAt).toLocaleString('pt-BR');
    
    document.getElementById('det-status-select').value = project.status;
    
    openModal('modalProjectDetail');
}

// Salvar alterações de status da visualização detalhada
document.getElementById('btnSaveProjectDetail').addEventListener('click', () => {
    if (!currentEditingProjectId) return;
    
    const projects = getProjects();
    const project = projects.find(p => p.id === currentEditingProjectId);
    
    if (project) {
        project.status = document.getElementById('det-status-select').value;
        saveProject(project);
        closeModal('modalProjectDetail');
        loadAllData();
    }
});

// Excluir projeto a partir do modal
document.getElementById('btnDeleteProject').addEventListener('click', () => {
    if (!currentEditingProjectId) return;
    if (confirm('Tem certeza que deseja excluir permanentemente este projeto/briefing?')) {
        deleteProject(currentEditingProjectId);
        closeModal('modalProjectDetail');
        loadAllData();
    }
});

// Aba 3: Clientes
function loadClients() {
    const clients = getClients();
    const tbody = document.getElementById('clientsTableBody');
    tbody.innerHTML = '';
    
    if (clients.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum cliente cadastrado.</td></tr>';
        return;
    }
    
    // Obter contagem de projetos para cada cliente
    const projects = getProjects();
    
    clients.forEach(c => {
        const count = projects.filter(p => p.telefone.replace(/\D/g, '') === c.telefone.replace(/\D/g, '')).length;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong style="cursor:pointer; color:var(--accent-orange);" onclick="openClientDetail('${c.id}')">${c.nome}</strong></td>
            <td><a href="https://wa.me/${c.telefone.replace(/\D/g, '')}" target="_blank" style="color: var(--accent-orange); font-weight: 500;"><i class="fa-brands fa-whatsapp"></i> ${c.telefone}</a></td>
            <td>${c.email || 'Não informado'}</td>
            <td><span class="col-count" style="cursor:pointer;" onclick="openClientDetail('${c.id}')">${count} projeto(s)</span></td>
            <td>
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px; background: rgba(255, 95, 86, 0.1); color: #ff5f56; border-color: transparent;" onclick="handleDeleteClient('${c.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleDeleteClient(id) {
    if (confirm('Tem certeza que deseja remover este cliente? Os projetos dele não serão apagados.')) {
        deleteClient(id);
        loadClients();
    }
}

// Aba 4: Financeiro
function loadFinances() {
    const finances = getFinances();
    const tbody = document.getElementById('financeTableBody');
    tbody.innerHTML = '';
    
    if (finances.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Nenhum lançamento financeiro registrado.</td></tr>';
        return;
    }
    
    // Ordena do mais recente para o mais antigo
    const sorted = [...finances].reverse();
    
    sorted.forEach(f => {
        const isIncome = f.type === 'income';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(f.date).toLocaleDateString('pt-BR')}</td>
            <td>${f.desc}</td>
            <td><span class="badge" style="margin: 0; padding: 4px 10px; font-size: 11px; background: ${isIncome ? 'rgba(39, 201, 63, 0.15)' : 'rgba(255, 95, 86, 0.15)'}; color: ${isIncome ? '#27c93f' : '#ff5f56'}; border-color: transparent;">${isIncome ? 'Entrada' : 'Saída'}</span></td>
            <td style="font-weight: 700; color: ${isIncome ? '#27c93f' : '#ff5f56'};">${isIncome ? '+' : '-'} R$ ${parseFloat(f.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            <td>
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px; background: rgba(255, 95, 86, 0.1); color: #ff5f56; border-color: transparent;" onclick="handleDeleteFinance('${f.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleDeleteFinance(id) {
    if (confirm('Excluir este lançamento financeiro?')) {
        deleteFinance(id);
        loadFinances();
        loadDashboardStats();
    }
}

// Aba 5: Calendário & iPhone Sync
function loadCalendar() {
    const events = getCalendarEvents();
    const tbody = document.getElementById('eventsTableBody');
    tbody.innerHTML = '';
    
    if (events.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Nenhum compromisso agendado.</td></tr>';
        return;
    }
    
    // Ordena por data mais próxima
    const sorted = [...events].sort((a,b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
    
    sorted.forEach(e => {
        const formattedDate = new Date(`${e.date}T${e.time}`).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${formattedDate}</strong></td>
            <td>${e.title}</td>
            <td><span style="color: var(--text-secondary); font-size: 13px;">${e.desc || '-'}</span></td>
            <td>
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px; background: rgba(255, 95, 86, 0.1); color: #ff5f56; border-color: transparent;" onclick="handleDeleteEvent('${e.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleDeleteEvent(id) {
    if (confirm('Excluir este compromisso de calendário?')) {
        deleteCalendarEvent(id);
        loadCalendar();
    }
}

// Exportador do Calendário .ics (compatível com iPhone/Apple Calendar)
function exportToIphone() {
    const events = getCalendarEvents();
    if (events.length === 0) {
        alert('Não há compromissos para exportar. Adicione alguns antes!');
        return;
    }
    
    let icsString = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//GDS Design//CRM Calendar//PT',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH'
    ];
    
    events.forEach(e => {
        // Formata data e horário para o padrão ICS: YYYYMMDDTHHMMSS
        const cleanDate = e.date.replace(/-/g, '');
        const cleanTime = e.time.replace(/:/g, '') + '00';
        const timestamp = new Date().toISOString().replace(/-|:|\.\d\d\d/g, ''); // Timestamp atual
        const eventId = e.id;
        
        icsString.push('BEGIN:VEVENT');
        icsString.push(`UID:${eventId}`);
        icsString.push(`DTSTAMP:${timestamp}`);
        icsString.push(`DTSTART:${cleanDate}T${cleanTime}`);
        icsString.push(`DTEND:${cleanDate}T${parseInt(cleanTime) + 10000}`); // +1 hora padrão
        icsString.push(`SUMMARY:${e.title}`);
        icsString.push(`DESCRIPTION:${e.desc ? e.desc.replace(/\n/g, '\\n') : ''}`);
        icsString.push('END:VEVENT');
    });
    
    icsString.push('END:VCALENDAR');
    
    const finalIcs = icsString.join('\r\n');
    
    // Cria o download client-side
    const blob = new Blob([finalIcs], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'agenda_gds_iphone.ics';
    link.click();
}

// Aba 6: Quadro de Ideias
function loadIdeas() {
    const ideas = getIdeas();
    const container = document.getElementById('ideasContainer');
    container.innerHTML = '';
    
    if (ideas.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Seu quadro está vazio. Adicione insights ou ideias de conteúdo!</div>';
        return;
    }
    
    ideas.forEach(i => {
        const div = document.createElement('div');
        div.className = 'idea-postit';
        div.innerHTML = `
            <div class="idea-text">${i.texto}</div>
            <div class="idea-footer">
                <span>${new Date(i.createdAt).toLocaleDateString('pt-BR')}</span>
                <i class="fa-solid fa-trash idea-delete" onclick="handleDeleteIdea('${i.id}')" title="Excluir Ideia"></i>
            </div>
        `;
        container.appendChild(div);
    });
}

function handleDeleteIdea(id) {
    if (confirm('Deseja excluir esta nota de ideia?')) {
        deleteIdea(id);
        loadIdeas();
    }
}

// Aba 7: Configurações
function loadSettings() {
    const currentPhone = localStorage.getItem('gds_admin_phone') || "595973977991";
    document.getElementById('new-phone').value = currentPhone;
}

// --- Listeners de Envio de Formulários (Submit Handlers) ---

// Novo Projeto Manual
document.getElementById('projectForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newProj = {
        cliente: document.getElementById('proj-client').value.trim(),
        servico: document.getElementById('proj-service').value,
        detalhes: document.getElementById('proj-details').value.trim(),
        valor: document.getElementById('proj-price').value.trim(),
        prazo: document.getElementById('proj-deadline').value.trim() || 'A combinar',
        status: 'Briefing',
        telefone: '', // Projetos manuais sem telefone obrigatório
        email: ''
    };
    saveProject(newProj);
    closeModal('modalProject');
    document.getElementById('projectForm').reset();
    loadAllData();
});

// Novo Cliente Manual
document.getElementById('clientForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newCli = {
        nome: document.getElementById('cli-name').value.trim(),
        telefone: document.getElementById('cli-phone').value.trim(),
        email: document.getElementById('cli-email').value.trim()
    };
    saveClient(newCli);
    closeModal('modalClient');
    document.getElementById('clientForm').reset();
    loadClients();
});

// Nova Transação Financeira
document.getElementById('financeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newTransaction = {
        desc: document.getElementById('fin-desc').value.trim(),
        type: document.getElementById('fin-type').value,
        value: parseFloat(document.getElementById('fin-val').value)
    };
    saveFinance(newTransaction);
    document.getElementById('financeForm').reset();
    loadFinances();
    loadDashboardStats();
});

// Novo Evento de Calendário
document.getElementById('calendarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newEvent = {
        title: document.getElementById('event-title').value.trim(),
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        desc: document.getElementById('event-desc').value.trim()
    };
    saveCalendarEvent(newEvent);
    document.getElementById('calendarForm').reset();
    loadCalendar();
});

// Nova Nota de Ideia
document.getElementById('ideaForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newIdea = {
        texto: document.getElementById('idea-desc').value.trim()
    };
    saveIdea(newIdea);
    closeModal('modalIdea');
    document.getElementById('ideaForm').reset();
    loadIdeas();
});

// Configurações: Salvar nova senha
document.getElementById('settingsPasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('new-pass').value.trim();
    if (pass.length < 6) {
        alert('A senha deve conter no mínimo 6 caracteres.');
        return;
    }
    localStorage.setItem('gds_admin_password', pass);
    alert('Senha atualizada com sucesso!');
    document.getElementById('settingsPasswordForm').reset();
});

// Configurações: Salvar novo telefone WhatsApp de recepção do briefing
document.getElementById('settingsPhoneForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const rawPhone = document.getElementById('new-phone').value.trim();
    const cleanPhone = rawPhone.replace(/\D/g, ''); // Limpa traços, parênteses e espaços
    
    if (cleanPhone.length < 10) {
        alert('Telefone inválido. Insira o DDI (Ex: 55 para Brasil ou 595 para Paraguai) + DDD + Número.');
        return;
    }
    localStorage.setItem('gds_admin_phone', cleanPhone);
    alert('Número de WhatsApp atualizado com sucesso!');
});

// --- Inicialização Automática ao Carregar a Página ---
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    loadAllData();
});

/* ==========================================================================
   MOTOR LÓGICO DO MÓDULO DE BRIEFINGS (DASHBOARD ADMIN)
   ========================================================================== */

let currentBriefingList = [];
let selectedSubTabFilter = 'all';
let activeBriefingId = null;
let activeClientId = null;

// Carrega briefings da nuvem/local
async function loadBriefings() {
    currentBriefingList = await getBriefings();
    renderBriefingsTable();
    renderBriefingDashboardStats();
}

// Stats Card na Home
function renderBriefingDashboardStats() {
    const total = currentBriefingList.length;
    const pending = currentBriefingList.filter(b => b.status === 'Aguardando cliente').length;
    const progress = currentBriefingList.filter(b => b.status === 'Em andamento').length;
    const done = currentBriefingList.filter(b => b.status === 'Concluído').length;

    const totalElem = document.getElementById('stat-briefings-total');
    const breakdownElem = document.getElementById('stat-briefings-breakdown');

    if (totalElem) totalElem.textContent = total;
    if (breakdownElem) {
        breakdownElem.innerHTML = `
            <span style="color: #ffbd2e; font-weight: 600;">${pending} pendentes</span> • 
            <span style="color: #0ea5e9; font-weight: 600;">${progress} em andamento</span> • 
            <span style="color: #27c93f; font-weight: 600;">${done} concluídos</span>
        `;
    }
}

// Filtro sub-abas (Todos, Pendentes, Em andamento, Concluídos)
function filterBriefingsBySubTab(subTab, el) {
    selectedSubTabFilter = subTab;
    document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
    el.classList.add('active');
    
    // Alinha o seletor de status geral caso queira
    const statusSelect = document.getElementById('filter-briefing-status');
    if (subTab === 'all') statusSelect.value = 'all';
    else statusSelect.value = subTab;

    renderBriefingsTable();
}

// Filtros Inputs
function applyBriefingFilters() {
    renderBriefingsTable();
}

// Renderiza tabela principal de Briefings
function renderBriefingsTable() {
    const searchVal = document.getElementById('filter-briefing-search').value.toLowerCase();
    const statusVal = document.getElementById('filter-briefing-status').value;
    const respVal = document.getElementById('filter-briefing-responsible').value;
    const dateVal = document.getElementById('filter-briefing-date').value;

    const tbody = document.getElementById('briefingsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    let filtered = [...currentBriefingList];

    // Filtro por sub-aba
    if (selectedSubTabFilter !== 'all') {
        filtered = filtered.filter(b => b.status === selectedSubTabFilter);
    }

    // Filtros inputs
    if (searchVal) {
        filtered = filtered.filter(b => 
            (b.contato && b.contato.nome && b.contato.nome.toLowerCase().includes(searchVal)) || 
            (b.empresa && b.empresa.toLowerCase().includes(searchVal))
        );
    }
    if (statusVal !== 'all' && selectedSubTabFilter === 'all') {
        filtered = filtered.filter(b => b.status === statusVal);
    }
    if (respVal !== 'all') {
        filtered = filtered.filter(b => b.responsavel === respVal);
    }
    if (dateVal) {
        filtered = filtered.filter(b => {
            const bDate = b.created_at ? b.created_at.substring(0, 10) : '';
            return bDate === dateVal;
        });
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Nenhum briefing localizado.</td></tr>`;
        return;
    }

    filtered.forEach(b => {
        const row = document.createElement('tr');
        let statusBadge = '';
        if (b.status === 'Novo') statusBadge = '<span class="badge" style="background: rgba(255,189,46,0.15); color: #ffbd2e; border:none; margin:0; padding: 4px 10px; font-size:11px;">🟡 Novo</span>';
        else if (b.status === 'Em andamento') statusBadge = '<span class="badge" style="background: rgba(14,165,233,0.15); color: #0ea5e9; border:none; margin:0; padding: 4px 10px; font-size:11px;">🔵 Em andamento</span>';
        else if (b.status === 'Concluído') statusBadge = '<span class="badge" style="background: rgba(39,201,63,0.15); color: #27c93f; border:none; margin:0; padding: 4px 10px; font-size:11px;">🟢 Concluído</span>';
        else statusBadge = '<span class="badge" style="background: rgba(255,95,86,0.15); color: #ff5f56; border:none; margin:0; padding: 4px 10px; font-size:11px;">🔴 Aguardando cliente</span>';

        const dateFormatted = b.created_at ? new Date(b.created_at).toLocaleDateString('pt-BR') : '-';
        const clientName = b.contato ? b.contato.nome : 'Não informado';

        row.innerHTML = `
            <td><strong>${clientName}</strong></td>
            <td>${b.empresa || '-'}</td>
            <td>${dateFormatted}</td>
            <td>${statusBadge}</td>
            <td><span style="font-size:12px; color: var(--text-secondary);">${b.responsavel || '-'}</span></td>
            <td>
                <div style="display:flex; gap:8px;">
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="openBriefingDetail('${b.id}')"><i class="fa-solid fa-eye"></i> Visualizar</button>
                    <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px; background: rgba(124,58,237,0.1); color: #7c3aed; border-color:transparent;" onclick="copyBriefingLink('${b.id}')"><i class="fa-solid fa-link"></i> Link</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Copia Link único
function copyBriefingLink(id) {
    const origin = window.location.origin;
    let link = '';
    if (window.location.protocol === 'file:') {
        const currentPath = window.location.href;
        link = currentPath.substring(0, currentPath.lastIndexOf('/admin/')) + '/briefing.html?id=' + id;
    } else {
        link = origin + '/briefing.html?id=' + id;
    }
    
    navigator.clipboard.writeText(link).then(() => {
        alert("Link único do briefing copiado com sucesso:\n" + link);
    }).catch(() => {
        prompt("Copie o link abaixo:", link);
    });
}

// Preenche seletor de clientes no criador de briefings
function populateClientSelectForCreateBriefing() {
    const select = document.getElementById('cb-client-select');
    if (!select) return;
    select.innerHTML = '<option value="new">-- Cadastrar Novo Cliente --</option>';
    const clients = getClients();
    clients.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.nome} (${c.telefone})`;
        select.appendChild(opt);
    });
    handleCBClientSelect(select);
}

function handleCBClientSelect(select) {
    const newFields = document.getElementById('cb-new-client-fields');
    if (select.value === 'new') {
        newFields.style.display = 'block';
        document.getElementById('cb-client-name').required = true;
        document.getElementById('cb-client-phone').required = true;
    } else {
        newFields.style.display = 'none';
        document.getElementById('cb-client-name').required = false;
        document.getElementById('cb-client-phone').required = false;
    }
}

function openCreateBriefingModal() {
    populateClientSelectForCreateBriefing();
    document.getElementById('cb-company-name').value = '';
    document.getElementById('cb-responsible').value = 'Maria Gilmara';
    openModal('modalCreateBriefing');
}

// Envia link gerado
document.getElementById('createBriefingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const selectVal = document.getElementById('cb-client-select').value;
    let clientId = '';
    let clientName = '';
    let clientPhone = '';
    let clientEmail = '';

    if (selectVal === 'new') {
        clientId = 'cli_' + Math.random().toString(36).substr(2, 9);
        clientName = document.getElementById('cb-client-name').value.trim();
        clientPhone = document.getElementById('cb-client-phone').value.trim();
        clientEmail = document.getElementById('cb-client-email').value.trim();

        saveClient({
            id: clientId,
            nome: clientName,
            telefone: clientPhone,
            email: clientEmail,
            createdAt: new Date().toISOString()
        });
    } else {
        clientId = selectVal;
        const clients = getClients();
        const client = clients.find(c => c.id === clientId);
        clientName = client.nome;
        clientPhone = client.telefone;
        clientEmail = client.email || '';
    }

    const companyName = document.getElementById('cb-company-name').value.trim();
    const responsible = document.getElementById('cb-responsible').value;

    const newBriefing = {
        id: 'briefing_' + Math.random().toString(36).substr(2, 9),
        cliente_id: clientId,
        empresa: companyName,
        contato: {
            nome: clientName,
            whatsapp: clientPhone,
            email: clientEmail
        },
        instagram: '',
        facebook: '',
        cidade: '',
        logo: '',
        foto_carro: '',
        fotos: [],
        youtube: '',
        google_reviews: '',
        video_depoimento: '',
        faq: '',
        textos: '',
        tecnico: '',
        observacoes: '',
        tipo: '',
        nicho: '',
        objetivos: '',
        publico: '',
        referencias: '',
        dominio: '',
        dominioNome: '',
        tom: '',
        cores: '',
        obsVisual: '',
        descricao: '',
        prazo: '',
        status: 'Aguardando cliente',
        responsavel: responsible,
        comentarios: [],
        historico: [{
            data: new Date().toISOString(),
            acao: 'Link de briefing gerado pelo administrador'
        }],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    await saveBriefing(newBriefing);
    closeModal('modalCreateBriefing');
    await loadBriefings();
    
    // Copia link automaticamente
    copyBriefingLink(newBriefing.id);
});

// Abas internas do modal de briefing
function switchBriefingTab(tabName, el) {
    document.querySelectorAll('.briefing-tab-btn').forEach(btn => btn.classList.remove('active'));
    el.classList.add('active');

    document.querySelectorAll('.briefing-tab-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(`btab-${tabName}`).classList.add('active');
}

// Abre modal detalhado do briefing
async function openBriefingDetail(id) {
    const briefing = await getBriefingById(id);
    if (!briefing) return;
    activeBriefingId = id;

    document.getElementById('bd-company-title').textContent = briefing.empresa || 'Empresa Sem Nome';
    document.getElementById('bd-responsible-select').value = briefing.responsavel || '-';
    document.getElementById('bd-status-select').value = briefing.status;

    let progress = briefing.progresso !== undefined ? briefing.progresso : 0;
    if (briefing.progresso === undefined) {
        if (briefing.status === 'Novo') progress = 10;
        else if (briefing.status === 'Em andamento') progress = 50;
        else if (briefing.status === 'Concluído') progress = 100;
    }
    handleProgressSlider(progress);

    // Popula abas
    document.getElementById('bd-empresa').value = briefing.empresa || '';
    document.getElementById('bd-nicho').value = briefing.nicho || '';
    document.getElementById('bd-instagram').value = briefing.instagram || '';
    document.getElementById('bd-facebook').value = briefing.facebook || '';
    document.getElementById('bd-cidade').value = briefing.cidade || '';
    document.getElementById('bd-objetivos').value = briefing.objetivos || '';
    document.getElementById('bd-publico').value = briefing.publico || '';
    document.getElementById('bd-referencias').value = briefing.referencias || '';
    document.getElementById('bd-dominio').value = briefing.dominio || '';
    document.getElementById('bd-dominio-name').value = briefing.dominioNome || '';

    document.getElementById('bd-nome-contato').value = briefing.contato ? briefing.contato.nome : '';
    const whatsappNum = briefing.contato ? briefing.contato.whatsapp : '';
    document.getElementById('bd-whatsapp-contato').value = whatsappNum;
    document.getElementById('bd-whatsapp-link').href = `https://wa.me/${whatsappNum.replace(/\D/g, '')}`;
    document.getElementById('bd-email-contato').value = briefing.contato ? briefing.contato.email : '';

    document.getElementById('bd-youtube').value = briefing.youtube || '';
    document.getElementById('bd-google-reviews').value = briefing.google_reviews || '';
    document.getElementById('bd-faq').value = briefing.faq || '';
    document.getElementById('bd-textos').value = briefing.textos || '';
    document.getElementById('bd-tecnico').value = briefing.tecnico || '';

    document.getElementById('bd-tom').value = briefing.tom || '';
    document.getElementById('bd-cores').value = briefing.cores || '';
    document.getElementById('bd-obs-visual').value = briefing.obsVisual || '';
    document.getElementById('bd-obs').value = briefing.observacoes || '';
    document.getElementById('bd-descricao').value = briefing.descricao || '';

    // Logotipo
    const logoCont = document.getElementById('bd-logo-container');
    if (briefing.logo) {
        logoCont.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="color:#27c93f;"><i class="fa-solid fa-file-image"></i> Logotipo</span>
                <button class="btn btn-secondary" style="padding:6px 12px; font-size:12px;" onclick="downloadBriefingFile('${briefing.logo}', '${briefing.empresa}_logo')"><i class="fa-solid fa-download"></i> Baixar</button>
            </div>
        `;
    } else {
        logoCont.innerHTML = '<span style="color:var(--text-muted); font-size:13px;">Sem arquivos enviados.</span>';
    }

    // Foto do carro
    const carCont = document.getElementById('bd-foto-carro-container');
    if (briefing.foto_carro) {
        carCont.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="color:#27c93f;"><i class="fa-solid fa-car"></i> Foto do Veículo</span>
                <button class="btn btn-secondary" style="padding:6px 12px; font-size:12px;" onclick="downloadBriefingFile('${briefing.foto_carro}', '${briefing.empresa}_carro')"><i class="fa-solid fa-download"></i> Baixar</button>
            </div>
        `;
    } else {
        carCont.innerHTML = '<span style="color:var(--text-muted); font-size:13px;">Sem arquivos enviados.</span>';
    }

    // Vídeo depoimento
    const videoCont = document.getElementById('bd-video-depoimento-container');
    if (briefing.video_depoimento) {
        videoCont.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="color:#27c93f;"><i class="fa-solid fa-video"></i> Vídeo Depoimento</span>
                <button class="btn btn-secondary" style="padding:6px 12px; font-size:12px;" onclick="downloadBriefingFile('${briefing.video_depoimento}', '${briefing.empresa}_depoimento')"><i class="fa-solid fa-download"></i> Baixar</button>
            </div>
        `;
    } else {
        videoCont.innerHTML = '<span style="color:var(--text-muted); font-size:13px;">Sem arquivos enviados.</span>';
    }

    // Fotos do negócio
    const fotosCont = document.getElementById('bd-fotos-container');
    if (briefing.fotos && briefing.fotos.length > 0) {
        fotosCont.innerHTML = '';
        briefing.fotos.forEach((url, index) => {
            const div = document.createElement('div');
            div.style = 'display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; background:rgba(255,255,255,0.02); padding: 6px 12px; border-radius:4px;';
            div.innerHTML = `
                <span style="font-size:12px; color:var(--text-secondary);"><i class="fa-solid fa-image"></i> Foto ${index + 1}</span>
                <button class="btn btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="downloadBriefingFile('${url}', '${briefing.empresa}_foto_${index + 1}')"><i class="fa-solid fa-download"></i> Baixar</button>
            `;
            fotosCont.appendChild(div);
        });
    } else {
        fotosCont.innerHTML = '<span style="color:var(--text-muted); font-size:13px;">Sem arquivos enviados.</span>';
    }

    renderComments(briefing.comentarios || []);
    renderHistory(briefing.historico || []);

    switchBriefingTab('empresa', document.querySelector('.briefing-tab-btn'));
    openModal('modalBriefingDetail');
}

function handleProgressSlider(val) {
    document.getElementById('bd-progress-val').textContent = val + '%';
    document.getElementById('bd-progress-bar').style.width = val + '%';
    document.getElementById('bd-progress-slider').value = val;
}

function downloadBriefingFile(url, defaultName) {
    downloadFileFromBriefing(url, defaultName);
}

function renderComments(comments) {
    const list = document.getElementById('bd-comments-list');
    list.innerHTML = '';
    if (comments.length === 0) {
        list.innerHTML = '<span style="color:var(--text-muted); text-align:center; display:block; padding:10px;">Nenhuma observação interna registrada.</span>';
        return;
    }
    comments.forEach(c => {
        const item = document.createElement('div');
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-weight:600; color:var(--accent-pink);">
                <span>${c.autor}</span>
                <span style="font-size:10px; color:var(--text-muted);">${new Date(c.data).toLocaleString('pt-BR')}</span>
            </div>
            <div style="margin-top:2px; color:var(--text-primary);">${c.texto}</div>
        `;
        list.appendChild(item);
    });
}

function renderHistory(history) {
    const list = document.getElementById('bd-history-list');
    list.innerHTML = '';
    if (history.length === 0) {
        list.innerHTML = '<span style="color:var(--text-muted);">Sem histórico cadastrado.</span>';
        return;
    }
    // Ordena histórico mais recente primeiro
    const sorted = [...history].reverse();
    sorted.forEach(h => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-date">${new Date(h.data).toLocaleString('pt-BR')}</div>
            <div class="timeline-desc">${h.acao}</div>
        `;
        list.appendChild(item);
    });
}

// Salva comentários do modal
async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!activeBriefingId) return;
    const input = document.getElementById('bd-comment-input');
    const text = input.value.trim();
    if (!text) return;

    const updated = await addBriefingComment(activeBriefingId, text, "Maria Gilmara");
    if (updated) {
        input.value = '';
        renderComments(updated.comentarios || []);
        renderHistory(updated.historico || []);
        await loadBriefings();
    }
}

// Altera status no modal
async function handleBriefingStatusChange() {
    if (!activeBriefingId) return;
    const select = document.getElementById('bd-status-select');
    const status = select.value;
    const updated = await updateBriefingStatus(activeBriefingId, status, "Maria Gilmara");
    if (updated) {
        renderHistory(updated.historico || []);
        await loadBriefings();
    }
}

// Salva edições gerais do briefing
async function saveBriefingEdits() {
    if (!activeBriefingId) return;
    const briefing = await getBriefingById(activeBriefingId);
    if (!briefing) return;

    briefing.empresa = document.getElementById('bd-empresa').value.trim();
    briefing.nicho = document.getElementById('bd-nicho').value.trim();
    briefing.instagram = document.getElementById('bd-instagram').value.trim();
    briefing.facebook = document.getElementById('bd-facebook').value.trim();
    briefing.cidade = document.getElementById('bd-cidade').value.trim();
    briefing.objetivos = document.getElementById('bd-objetivos').value.trim();
    briefing.publico = document.getElementById('bd-publico').value.trim();
    briefing.referencias = document.getElementById('bd-referencias').value.trim();
    briefing.dominio = document.getElementById('bd-dominio').value.trim();
    briefing.dominioNome = document.getElementById('bd-dominio-name').value.trim();

    if (!briefing.contato) briefing.contato = {};
    briefing.contato.nome = document.getElementById('bd-nome-contato').value.trim();
    briefing.contato.whatsapp = document.getElementById('bd-whatsapp-contato').value.trim();
    briefing.contato.email = document.getElementById('bd-email-contato').value.trim();

    briefing.youtube = document.getElementById('bd-youtube').value.trim();
    briefing.google_reviews = document.getElementById('bd-google-reviews').value.trim();
    briefing.faq = document.getElementById('bd-faq').value.trim();
    briefing.textos = document.getElementById('bd-textos').value.trim();
    briefing.tecnico = document.getElementById('bd-tecnico').value.trim();

    briefing.tom = document.getElementById('bd-tom').value.trim();
    briefing.cores = document.getElementById('bd-cores').value.trim();
    briefing.obsVisual = document.getElementById('bd-obs-visual').value.trim();
    briefing.observacoes = document.getElementById('bd-obs').value.trim();
    briefing.descricao = document.getElementById('bd-descricao').value.trim();

    briefing.responsavel = document.getElementById('bd-responsible-select').value;
    briefing.status = document.getElementById('bd-status-select').value;
    briefing.progresso = parseInt(document.getElementById('bd-progress-slider').value);

    briefing.updated_at = new Date().toISOString();
    if (!briefing.historico) briefing.historico = [];
    briefing.historico.push({
        data: new Date().toISOString(),
        acao: "Administrador editou as informações do briefing"
    });

    await saveBriefing(briefing);
    closeModal('modalBriefingDetail');
    await loadBriefings();
    alert("Briefing atualizado com sucesso!");
}

async function handleDeleteBriefingClick() {
    if (!activeBriefingId) return;
    if (confirm("Tem certeza que deseja excluir permanentemente este briefing?")) {
        await deleteBriefing(activeBriefingId);
        closeModal('modalBriefingDetail');
        await loadBriefings();
    }
}

// Converter em projeto ativo Kanban
async function convertBriefingToProject() {
    if (!activeBriefingId) return;
    const briefing = await getBriefingById(activeBriefingId);
    if (!briefing) return;

    const projects = getProjects();
    const exists = projects.some(p => p.briefing_id === activeBriefingId);
    if (exists) {
        alert("Este briefing já foi convertido em projeto!");
        return;
    }

    const newProject = {
        id: 'proj_' + Math.random().toString(36).substr(2, 9),
        briefing_id: activeBriefingId,
        cliente: briefing.contato ? briefing.contato.nome : briefing.empresa,
        servico: briefing.tipo || 'Site Completo',
        detalhes: `Nicho: ${briefing.nicho} | Domínio: ${briefing.dominioNome || '-'}`,
        valor: briefing.cores || 'A combinar',
        prazo: briefing.prazo || 'A combinar',
        status: 'Briefing',
        telefone: briefing.contato ? briefing.contato.whatsapp : '',
        email: briefing.contato ? briefing.contato.email : '',
        createdAt: new Date().toISOString()
    };

    saveProject(newProject);

    briefing.status = 'Em andamento';
    if (!briefing.historico) briefing.historico = [];
    briefing.historico.push({
        data: new Date().toISOString(),
        acao: 'Briefing aprovado e convertido em projeto de desenvolvimento (Kanban)'
    });
    await saveBriefing(briefing);

    closeModal('modalBriefingDetail');
    await loadBriefings();
    loadKanban();
    loadDashboardStats();

    alert("✦ Briefing convertido com sucesso em projeto ativo!");
}

// Exportar resumo para PDF (admin)
async function exportBriefingPDF() {
    if (!activeBriefingId) return;
    const d = await getBriefingById(activeBriefingId);
    if (!d) return;

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFillColor(26, 26, 46);
        doc.rect(0, 0, 210, 40, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("GDS DESIGN - FICHA DE BRIEFING", 15, 26);
        
        doc.setTextColor(30, 27, 46);
        doc.setFontSize(11);
        
        let y = 55;
        const printField = (title, value) => {
            if (y > 275) {
                doc.addPage();
                y = 20;
            }
            doc.setFont("helvetica", "bold");
            doc.text(title + ":", 15, y);
            doc.setFont("helvetica", "normal");
            const lines = doc.splitTextToSize(String(value || 'Não informado'), 130);
            doc.text(lines, 65, y);
            y += (lines.length * 5) + 3;
        };

        printField("ID do Briefing", d.id);
        printField("Cliente", d.contato ? d.contato.nome : '');
        printField("Empresa", d.empresa);
        printField("WhatsApp", d.contato ? d.contato.whatsapp : '');
        printField("E-mail", d.contato ? d.contato.email : '');
        printField("Cidade/País", d.cidade);
        printField("Instagram", d.instagram);
        printField("Facebook", d.facebook);
        printField("Tipo de Site", d.tipo);
        printField("Nicho", d.nicho);
        printField("Objetivos", d.objetivos);
        printField("Público-alvo", d.publico);
        printField("Domínio", d.dominio + (d.dominioNome ? ` - ${d.dominioNome}` : ''));
        printField("Cores", d.cores);
        printField("Tom", d.tom);
        printField("Obs Visual", d.obsVisual);
        printField("Descrição", d.descricao);
        printField("Textos/Slogan", d.textos);
        printField("FAQ", d.faq);
        printField("Config. Técnicas", d.tecnico);
        printField("Prazo Desejado", d.prazo);
        printField("Observações Gerais", d.observacoes);
        printField("Responsável", d.responsavel);
        printField("Status", d.status);
        printField("Data Envio", new Date(d.created_at).toLocaleString('pt-BR'));
        
        doc.save(`briefing_gds_${d.empresa.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
    } catch(err) {
        console.error("Erro ao gerar PDF:", err);
        alert("Não foi possível exportar para PDF.");
    }
}

// Exportar resumo para Excel (admin)
async function exportBriefingExcel() {
    if (!activeBriefingId) return;
    const d = await getBriefingById(activeBriefingId);
    if (!d) return;

    try {
        const dataToExport = [
            { Campo: "ID", Valor: d.id },
            { Campo: "Cliente", Valor: d.contato ? d.contato.nome : '' },
            { Campo: "Empresa", Valor: d.empresa },
            { Campo: "WhatsApp", Valor: d.contato ? d.contato.whatsapp : '' },
            { Campo: "E-mail", Valor: d.contato ? d.contato.email : '' },
            { Campo: "Cidade", Valor: d.cidade },
            { Campo: "Instagram", Valor: d.instagram },
            { Campo: "Facebook", Valor: d.facebook },
            { Campo: "Tipo de Site", Valor: d.tipo },
            { Campo: "Nicho", Valor: d.nicho },
            { Campo: "Objetivos", Valor: d.objetivos },
            { Campo: "Público-alvo", Valor: d.publico },
            { Campo: "Domínio", Valor: d.dominio + (d.dominioNome ? ` - ${d.dominioNome}` : '') },
            { Campo: "Cores", Valor: d.cores },
            { Campo: "Tom", Valor: d.tom },
            { Campo: "Obs Visual", Valor: d.obsVisual },
            { Campo: "Descrição", Valor: d.descricao },
            { Campo: "Textos/Slogan", Valor: d.textos },
            { Campo: "FAQ", Valor: d.faq },
            { Campo: "Config. Técnicas", Valor: d.tecnico },
            { Campo: "Prazo Desejado", Valor: d.prazo },
            { Campo: "Observações Gerais", Valor: d.observacoes },
            { Campo: "Responsável", Valor: d.responsavel },
            { Campo: "Status", Valor: d.status },
            { Campo: "Data Envio", Valor: new Date(d.created_at).toLocaleString('pt-BR') }
        ];

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Briefing");
        XLSX.writeFile(workbook, `briefing_gds_${d.empresa.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`);
    } catch(err) {
        console.error("Erro ao gerar Excel:", err);
        alert("Não foi possível exportar para Excel.");
    }
}

// Ficha cadastral detalhada do Cliente
function openClientDetail(id) {
    const clients = getClients();
    const client = clients.find(c => c.id === id);
    if (!client) return;
    activeClientId = id;

    document.getElementById('mcd-name').textContent = client.nome;
    document.getElementById('mcd-phone').textContent = client.telefone;
    document.getElementById('mcd-email').textContent = client.email || 'Não informado';

    // Briefings deste cliente
    const bList = document.getElementById('mcd-briefings-list');
    bList.innerHTML = '';
    const clientBriefings = currentBriefingList.filter(b => b.cliente_id === id);

    if (clientBriefings.length === 0) {
        bList.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Nenhum briefing vinculado.</td></tr>';
    } else {
        clientBriefings.forEach(b => {
            const tr = document.createElement('tr');
            const lastUp = b.updated_at ? new Date(b.updated_at).toLocaleDateString('pt-BR') : '-';
            const created = b.created_at ? new Date(b.created_at).toLocaleDateString('pt-BR') : '-';
            
            let statusBadge = '';
            if (b.status === 'Novo') statusBadge = '<span class="badge" style="background: rgba(255,189,46,0.15); color: #ffbd2e; border:none; margin:0; padding: 4px 10px; font-size:11px;">🟡 Novo</span>';
            else if (b.status === 'Em andamento') statusBadge = '<span class="badge" style="background: rgba(14,165,233,0.15); color: #0ea5e9; border:none; margin:0; padding: 4px 10px; font-size:11px;">🔵 Em andamento</span>';
            else if (b.status === 'Concluído') statusBadge = '<span class="badge" style="background: rgba(39,201,63,0.15); color: #27c93f; border:none; margin:0; padding: 4px 10px; font-size:11px;">🟢 Concluído</span>';
            else statusBadge = '<span class="badge" style="background: rgba(255,95,86,0.15); color: #ff5f56; border:none; margin:0; padding: 4px 10px; font-size:11px;">🔴 Aguardando cliente</span>';

            tr.innerHTML = `
                <td><strong>${b.empresa}</strong></td>
                <td>${statusBadge}</td>
                <td>${created}</td>
                <td>${lastUp}</td>
                <td><button class="btn btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="closeModal('modalClientDetail'); openBriefingDetail('${b.id}')"><i class="fa-solid fa-eye"></i> Visualizar</button></td>
            `;
            bList.appendChild(tr);
        });
    }

    // Projetos vinculados no Kanban
    const pList = document.getElementById('mcd-projects-list');
    pList.innerHTML = '';
    const projects = getProjects();
    const clientProjects = projects.filter(p => p.telefone.replace(/\D/g, '') === client.telefone.replace(/\D/g, ''));

    if (clientProjects.length === 0) {
        pList.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted);">Nenhum projeto ativo no Kanban.</td></tr>';
    } else {
        clientProjects.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${p.servico}</strong></td>
                <td>${p.valor}</td>
                <td><span class="badge" style="margin:0; padding:4px 10px; font-size:11px;">${p.status}</span></td>
                <td>${p.prazo}</td>
            `;
            pList.appendChild(tr);
        });
    }

    switchClientDetailTab('briefings');
    openModal('modalClientDetail');
}

function switchClientDetailTab(tabName) {
    document.getElementById('mcd-tab-btn-briefings').classList.toggle('active', tabName === 'briefings');
    document.getElementById('mcd-tab-btn-projetos').classList.toggle('active', tabName === 'projetos');

    document.getElementById('mcd-pane-briefings').classList.toggle('active', tabName === 'briefings');
    document.getElementById('mcd-pane-projetos').classList.toggle('active', tabName === 'projetos');
}

// Configurações do Firebase Cloud no Settings
function loadFirebaseSettings() {
    const config = getFirebaseConfig();
    if (config) {
        document.getElementById('fb-api-key').value = config.apiKey || '';
        document.getElementById('fb-auth-domain').value = config.authDomain || '';
        document.getElementById('fb-project-id').value = config.projectId || '';
        document.getElementById('fb-storage-bucket').value = config.storageBucket || '';
        document.getElementById('fb-sender-id').value = config.messagingSenderId || '';
        document.getElementById('fb-app-id').value = config.appId || '';
    }
}

document.getElementById('settingsFirebaseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const config = {
        apiKey: document.getElementById('fb-api-key').value.trim(),
        authDomain: document.getElementById('fb-auth-domain').value.trim(),
        projectId: document.getElementById('fb-project-id').value.trim(),
        storageBucket: document.getElementById('fb-storage-bucket').value.trim(),
        messagingSenderId: document.getElementById('fb-sender-id').value.trim(),
        appId: document.getElementById('fb-app-id').value.trim()
    };

    localStorage.setItem('gds_firebase_config', JSON.stringify(config));
    alert("Configurações Cloud salvas com sucesso! O painel será reiniciado para efetivar a conexão.");
    window.location.reload();
});

document.getElementById('btnClearFirebase').addEventListener('click', () => {
    if (confirm("Deseja realmente desconectar do Firebase Cloud e usar o armazenamento local?")) {
        localStorage.removeItem('gds_firebase_config');
        alert("Modo Cloud desativado. Reiniciando painel...");
        window.location.reload();
    }
});

// Listener de Sincronização em tempo real (multi-abas LocalStorage)
window.addEventListener('storage', async () => {
    const prevCount = currentBriefingList.length;
    await loadBriefings();
    if (prevCount !== null && currentBriefingList.length > prevCount) {
        const newBriefing = currentBriefingList[currentBriefingList.length - 1];
        showNotificationToast(newBriefing);
    }
});

// Listener periódico (para o caso do Firebase Cloud)
setInterval(async () => {
    const prevCount = currentBriefingList.length;
    const newList = await getBriefings();
    if (prevCount !== null && newList.length > prevCount) {
        // Encontra novos briefings
        const newBriefings = newList.filter(nb => !currentBriefingList.some(ob => ob.id === nb.id));
        newBriefings.forEach(nb => {
            showNotificationToast(nb);
        });
        currentBriefingList = newList;
        renderBriefingsTable();
        renderBriefingDashboardStats();
    }
}, 4000);

function showNotificationToast(b) {
    const prevToast = document.querySelector('.notification-toast');
    if (prevToast) prevToast.remove();

    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = `
        <i class="fa-solid fa-bell" style="font-size:18px;"></i>
        <div>
            <strong style="display:block; font-size:14px;">Novo Briefing Recebido!</strong>
            <span style="font-size:12px;">${b.contato.nome} enviou os dados da empresa ${b.empresa}.</span>
        </div>
        <button class="btn" style="padding:4px 8px; font-size:11px; background:white; color:var(--accent-orange); border:none; margin-left:10px; cursor:pointer;" onclick="this.parentElement.remove(); openBriefingDetail('${b.id}')">Visualizar</button>
    `;
    document.body.appendChild(toast);
    
    // Auto-remove toast em 12 segundos
    setTimeout(() => {
        if (toast && toast.parentElement) toast.remove();
    }, 12000);
}

