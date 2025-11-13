class Router {
    constructor() {
        this.currentSection = 'pacientes';
        this.init();
    }

    init() {
        this.bindNavigation();
        this.bindSearchEvents();
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
            // Atualizar o dashboard sempre que mudar de seção
            if (app.dashboardService) {
                await app.dashboardService.atualizarDashboard();
            }

            switch (sectionName) {
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
                // Determinar classe CSS baseada na situação
                const situacao = paciente.situacao || 'ATIVO';
                const statusClass = situacao === 'ATIVO' ? 'status-ativo' : 'status-pendente';
                const statusText = situacao === 'ATIVO' ? 'ATIVO' : 'PENDENTE';

                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${paciente.nome || ''} ${paciente.sobrenome || ''}</td>
                <td>${Utils.formatDate(paciente.dtNascimento)}</td>
                <td>${paciente.email || ''}</td>
                <td>${paciente.contato || ''}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="acoes-container">
                        <button class="btn-action btn-edit" onclick="app.editarPaciente(${paciente.id})" title="Editar paciente">
                                Editar
                        </button>
                        <button class="btn-action btn-delete" onclick="app.deletarPaciente(${paciente.id})" title="Excluir paciente">
                                Excluir
                        </button>
                    </div>
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

                // Determinar status baseado na data do agendamento
                let status = 'AGENDADO';
                let statusClass = 'status-agendado';

                const dataAgendamento = app.parseBackendDate(agendamento.dtAgendamento);
                const agora = new Date();

                if (dataAgendamento && dataAgendamento < agora) {
                    status = 'CONCLUIDO';
                    statusClass = 'status-concluido';
                }

                // Se o agendamento já tiver um status definido, usar esse
                if (agendamento.status) {
                    status = agendamento.status;
                    statusClass = `status-${agendamento.status.toLowerCase()}`;
                }

                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${agendamento.paciente?.nome || 'N/A'} ${agendamento.paciente?.sobrenome || ''}</td>
                <td>${agendamento.tpVisita || ''}</td>
                <td>${Utils.formatDateTime(agendamento.dtAgendamento)}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td>${agendamento.observacoes || ''}</td>
                <td>
                    <div class="arquivos-container">
                        <div class="arquivos-count">${arquivosCount} arquivo(s)</div>
                        <div class="arquivos-actions">
                            ${arquivosCount > 0 ?
                        `       <button class="btn-action btn-view btn-small" onclick="app.verArquivosAgendamento(${agendamento.id})" title="Baixar arquivos">
                                    Download
                                </button>
                                <button class="btn-action btn-delete btn-small" onclick="app.deletarTodosArquivosAgendamento(${agendamento.id})" title="Excluir todos os arquivos">
                                     Excluir
                                </button>`
                        : ''}
                            <button class="btn-action btn-file btn-small" onclick="app.adicionarArquivoAgendamento(${agendamento.id})" title="Adicionar arquivo">
                                + Arquivo
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="acoes-container">
                        <button class="btn-action btn-edit" onclick="app.editarAgendamento(${agendamento.id})" title="Editar agendamento">
                            Editar
                        </button>
                        <button class="btn-action btn-delete" onclick="app.deletarAgendamento(${agendamento.id})" title="Excluir agendamento">
                            Excluir
                        </button>
                    </div>
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
                <td>${evento.descricao || ''}</td>
                <td><span class="status-badge status-ativo">${evento.situacao || 'ATIVO'}</span></td>
                <td>
                    <div class="arquivos-container">
                        <div class="arquivos-count">${arquivosCount} arquivo(s)</div>
                        <div class="arquivos-actions">
                            ${arquivosCount > 0 ?
                        `<button class="btn-action btn-view btn-small" onclick="app.verArquivosEvento(${evento.id})" title="Baixar arquivos">
                                    Download
                                </button>
                                <button class="btn-action btn-delete btn-small" onclick="app.deletarTodosArquivosEvento(${evento.id})" title="Excluir todos os arquivos">
                                    Excluir
                                </button>`
                        : ''}
                            <button class="btn-action btn-file btn-small" onclick="app.adicionarArquivoEvento(${evento.id})" title="Adicionar arquivo">
                                + Arquivo
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="acoes-container">
                        <button class="btn-action btn-edit" onclick="app.editarEvento(${evento.id})" title="Editar evento">
                             Editar
                        </button>
                        <button class="btn-action btn-delete" onclick="app.deletarEvento(${evento.id})" title="Excluir evento">
                             Excluir
                        </button>
                    </div>
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

    bindSearchEvents() {

        const clearFilterDate = document.getElementById('clearFilterDate');
        if (clearFilterDate) {
            clearFilterDate.addEventListener('click', () => {
                document.getElementById('filterDate').value = '';
                this.filterAgendamentosPorData('');
            });
        }

        // Busca para pacientes
        const searchPacientes = document.getElementById('searchPacientes');
        if (searchPacientes) {
            searchPacientes.addEventListener('input', (e) => {
                this.filterPacientes(e.target.value);
            });
        }

        // Filtro para agendamentos por data
        const filterDate = document.getElementById('filterDate');
        if (filterDate) {
            filterDate.addEventListener('change', (e) => {
                this.filterAgendamentosPorData(e.target.value);
            });
        }

        // Filtro para eventos
        const filterEventos = document.getElementById('filterEventos');
        if (filterEventos) {
            filterEventos.addEventListener('change', (e) => {
                this.filterEventos(e.target.value);
            });
        }
    }

    async filterPacientes(termo) {
        try {
            const pacienteService = new PacienteService();
            let pacientes;

            if (termo.trim() === '') {
                pacientes = await pacienteService.buscarTodos();
            } else {
                // Aqui você pode implementar busca por nome no backend
                // Por enquanto, vamos filtrar localmente
                const todosPacientes = await pacienteService.buscarTodos();
                pacientes = todosPacientes.filter(paciente =>
                    paciente.nome.toLowerCase().includes(termo.toLowerCase()) ||
                    (paciente.sobrenome && paciente.sobrenome.toLowerCase().includes(termo.toLowerCase())) ||
                    (paciente.email && paciente.email.toLowerCase().includes(termo.toLowerCase()))
                );
            }

            this.renderPacientesTable(pacientes);
        } catch (error) {
            console.error('Erro ao filtrar pacientes:', error);
        }
    }

    async filterAgendamentosPorData(data) {
        try {
            const agendamentoService = new AgendamentoService();
            const arquivoService = new ArquivoService();
            let agendamentos;

            if (!data) {
                agendamentos = await agendamentoService.buscarTodos();
            } else {
                const todosAgendamentos = await agendamentoService.buscarTodos();
                agendamentos = todosAgendamentos.filter(agendamento => {
                    const dataAgendamento = app.parseBackendDate(agendamento.data);
                    if (!dataAgendamento) return false;

                    return dataAgendamento.toISOString().split('T')[0] === data;
                });
            }

            // Carrega arquivos para os agendamentos filtrados
            for (let agendamento of agendamentos) {
                agendamento.arquivos = await arquivoService.listarPorEntidade(agendamento.id, 'AGENDAMENTO');
            }

            this.renderAgendamentosTable(agendamentos);
        } catch (error) {
            console.error('Erro ao filtrar agendamentos:', error);
        }
    }

    async filterEventos(tipo) {
        try {
            const eventoService = new EventoService();
            const arquivoService = new ArquivoService();
            let eventos;

            if (!tipo) {
                eventos = await eventoService.buscarTodos();
            } else {
                const todosEventos = await eventoService.buscarTodos();
                const agora = new Date();

                eventos = todosEventos.filter(evento => {
                    const dataEvento = app.parseBackendDate(evento.dtEvento);

                    switch (tipo) {
                        case 'ativo':
                            return evento.situacao === 'ATIVO';
                        case 'concluido':
                            return evento.situacao === 'CONCLUIDO';
                        case 'futuro':
                            return dataEvento && dataEvento > agora;
                        default:
                            return true;
                    }
                });
            }

            // Carrega arquivos para os eventos filtrados
            for (let evento of eventos) {
                evento.arquivos = await arquivoService.listarPorEntidade(evento.id, 'EVENTO');
            }

            this.renderEventosTable(eventos);
        } catch (error) {
            console.error('Erro ao filtrar eventos:', error);
        }
    }
}