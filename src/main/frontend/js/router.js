class Router {
    constructor() {
        this.currentSection = 'pacientes';
        this.init();
    }

    init() {
        this.bindNavigation();
        this.showSection('pacientes');
    }

    bindNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-section');
                this.showSection(section);
            });
        });
    }

    showSection(sectionName) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.getElementById(sectionName).classList.add('active');
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        this.currentSection = sectionName;
        this.loadSectionData(sectionName);
    }

    async loadSectionData(sectionName) {
        try {
            switch(sectionName) {
                case 'pacientes':
                    await this.loadPacientesData();
                    break;
                case 'agendamentos':
                    await this.loadAgendamentosData();
                    break;
                case 'eventos':
                    await this.loadEventosData();
                    break;
            }
        } catch (error) {
            console.error(`Erro ao carregar dados da seção ${sectionName}:`, error);
            Utils.showNotification('Erro ao carregar dados', 'error');
        }
    }

    async loadPacientesData() {
        const pacienteService = new PacienteService();
        try {
            const pacientes = await pacienteService.buscarTodos();
            this.renderPacientesTable(pacientes);
        } catch (error) {
            console.error('Erro ao carregar pacientes:', error);
            this.renderEmptyTable('pacientesTableBody', 'Erro ao carregar pacientes');
        }
    }

    async loadAgendamentosData() {
        const agendamentoService = new AgendamentoService();
        const arquivoService = new ArquivoService();
        try {
            const agendamentos = await agendamentoService.buscarTodos();

            // Para cada agendamento, carrega os arquivos
            for (let agendamento of agendamentos) {
                agendamento.arquivos = await arquivoService.listarPorEntidade(agendamento.id, 'AGENDAMENTO');
            }

            this.renderAgendamentosTable(agendamentos);
        } catch (error) {
            console.error('Erro ao carregar agendamentos:', error);
            this.renderEmptyTable('agendamentosTableBody', 'Erro ao carregar agendamentos');
        }
    }

    async loadEventosData() {
        const eventoService = new EventoService();
        const arquivoService = new ArquivoService();
        try {
            const eventos = await eventoService.buscarTodos();

            // Para cada evento, carrega os arquivos
            for (let evento of eventos) {
                evento.arquivos = await arquivoService.listarPorEntidade(evento.id, 'EVENTO');
            }

            this.renderEventosTable(eventos);
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
            this.renderEmptyTable('eventosTableBody', 'Erro ao carregar eventos');
        }
    }

    renderPacientesTable(pacientes) {
        const tbody = document.getElementById('pacientesTableBody');
        tbody.innerHTML = '';

        if (pacientes && pacientes.length > 0) {
            pacientes.forEach(paciente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${paciente.nome || ''}</td>
                    <td>${paciente.cpf || ''}</td>
                    <td>${paciente.email || ''}</td>
                    <td>${Utils.formatDate(paciente.dtNascimento)}</td>
                    <td>${paciente.crtSus || ''}</td>
                    <td>
                        <button class="btn-action btn-edit" onclick="app.editarPaciente(${paciente.id})">Editar</button>
                        <button class="btn-action btn-delete" onclick="app.deletarPaciente(${paciente.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            this.renderEmptyTable('pacientesTableBody', 'Nenhum paciente encontrado');
        }
    }

    renderAgendamentosTable(agendamentos) {
        const tbody = document.getElementById('agendamentosTableBody');
        tbody.innerHTML = '';

        if (agendamentos && agendamentos.length > 0) {
            agendamentos.forEach(agendamento => {
                const arquivosCount = agendamento.arquivos ? agendamento.arquivos.length : 0;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${agendamento.paciente?.nome || ''}</td>
                    <td>${agendamento.tpVisita || ''}</td>
                    <td>${Utils.formatDateTime(agendamento.data)}</td>
                    <td>${agendamento.observacoes || ''}</td>
                    <td>
                        <span>${arquivosCount} arquivo(s)</span>
                        ${arquivosCount > 0 ? `<button class="btn-action btn-view" onclick="app.verArquivosAgendamento(${agendamento.id})">Ver</button>` : ''}
                        <button class="btn-action btn-file" onclick="app.adicionarArquivoAgendamento(${agendamento.id})">+ Arquivo</button>
                    </td>
                    <td>
                        <button class="btn-action btn-edit" onclick="app.editarAgendamento(${agendamento.id})">Editar</button>
                        <button class="btn-action btn-delete" onclick="app.deletarAgendamento(${agendamento.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } else {
            this.renderEmptyTable('agendamentosTableBody', 'Nenhum agendamento encontrado');
        }
    }

    renderEventosTable(eventos) {
        const tbody = document.getElementById('eventosTableBody');
        tbody.innerHTML = '';

        if (eventos && eventos.length > 0) {
            eventos.forEach(evento => {
                const arquivosCount = evento.arquivos ? evento.arquivos.length : 0;
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${evento.nmEvento || ''}</td>
                <td>${Utils.formatDateTime(evento.dtEvento)}</td>
                <td>${evento.descricao || ''}</td> <!-- CORREÇÃO: descricao em vez de dsEvento -->
                <td><span class="status-badge status-ativo">${evento.situacao || 'ATIVO'}</span></td>
                <td>
                    <span>${arquivosCount} arquivo(s)</span>
                    ${arquivosCount > 0 ? `<button class="btn-action btn-view" onclick="app.verArquivosEvento(${evento.id})">Ver</button>` : ''}
                    <button class="btn-action btn-file" onclick="app.adicionarArquivoEvento(${evento.id})">+ Arquivo</button>
                </td>
                <td>
                    <button class="btn-action btn-edit" onclick="app.editarEvento(${evento.id})">Editar</button>
                    <button class="btn-action btn-delete" onclick="app.deletarEvento(${evento.id})">Excluir</button>
                </td>
            `;
                tbody.appendChild(row);
            });
        } else {
            this.renderEmptyTable('eventosTableBody', 'Nenhum evento encontrado');
        }
    }

    renderEmptyTable(tbodyId, message) {
        const tbody = document.getElementById(tbodyId);
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <div>${message}</div>
                </td>
            </tr>
        `;
    }
}