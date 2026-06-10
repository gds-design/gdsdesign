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
            <td><strong>${c.nome}</strong></td>
            <td><a href="https://wa.me/${c.telefone.replace(/\D/g, '')}" target="_blank" style="color: var(--accent-orange); font-weight: 500;"><i class="fa-brands fa-whatsapp"></i> ${c.telefone}</a></td>
            <td>${c.email || 'Não informado'}</td>
            <td><span class="col-count">${count} projeto(s)</span></td>
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
