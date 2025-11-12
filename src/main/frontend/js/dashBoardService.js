class DashboardService {
    constructor() {
        this.pacienteService = new PacienteService();
        this.agendamentoService = new AgendamentoService();
        this.eventoService = new EventoService();
    }

    async atualizarDashboard() {
        try {
            await this.atualizarPacientes();
            await this.atualizarAgendamentos();
            await this.atualizarEventos();
        } catch (error) {
            console.error('Erro ao atualizar dashboard:', error);
        }
    }

    async atualizarPacientes() {
        try {
            const pacientes = await this.pacienteService.buscarTodos();
            const totalPacientes = pacientes.length;
            
            // Calcular pacientes ativos (simulação - você pode ajustar conforme sua lógica)
            const pacientesAtivos = pacientes.filter(p => p.ativo !== false).length;
            
            // Calcular novos pacientes este mês
            const mesAtual = new Date().getMonth();
            const anoAtual = new Date().getFullYear();
            const novosEsteMes = pacientes.filter(p => {
                if (!p.dtCriacao) return false;
                const dataCriacao = new Date(p.dtCriacao);
                return dataCriacao.getMonth() === mesAtual && dataCriacao.getFullYear() === anoAtual;
            }).length;

            // Atualizar a interface
            document.getElementById('totalPacientes').textContent = totalPacientes;
            document.getElementById('pacientesAtivos').textContent = pacientesAtivos;
            document.getElementById('novosPacientesMes').textContent = novosEsteMes;

            // Atualizar tendência
            const trendElement = document.getElementById('trendPacientes');
            if (novosEsteMes > 0) {
                trendElement.textContent = `↑ ${novosEsteMes} este mês`;
                trendElement.className = 'summary-trend trend-up';
            } else {
                trendElement.textContent = '→ Sem alterações';
                trendElement.className = 'summary-trend';
            }

        } catch (error) {
            console.error('Erro ao atualizar dados de pacientes:', error);
        }
    }

    async atualizarAgendamentos() {
        try {
            const agendamentos = await this.agendamentoService.buscarTodos();
            const totalAgendamentos = agendamentos.length;
            
            // Agendamentos para hoje
            const hoje = new Date().toDateString();
            const agendamentosHoje = agendamentos.filter(a => {
                const dataAgendamento = app.parseBackendDate(a.data);
                return dataAgendamento && dataAgendamento.toDateString() === hoje;
            }).length;

            // Agendamentos concluídos (simulação)
            const agendamentosConcluidos = agendamentos.filter(a => a.status === 'CONCLUIDO').length;
            
            // Agendamentos pendentes
            const agendamentosPendentes = totalAgendamentos - agendamentosConcluidos;

            // Atualizar a interface
            document.getElementById('totalAgendamentos').textContent = totalAgendamentos;
            document.getElementById('agendamentosHoje').textContent = agendamentosHoje;
            document.getElementById('agendamentosConcluidos').textContent = agendamentosConcluidos;
            document.getElementById('agendamentosPendentes').textContent = agendamentosPendentes;

            // Atualizar tendência
            const trendElement = document.getElementById('trendAgendamentos');
            if (agendamentosHoje > 0) {
                trendElement.textContent = `↑ ${agendamentosHoje} hoje`;
                trendElement.className = 'summary-trend trend-up';
            } else {
                trendElement.textContent = '→ Sem agendamentos hoje';
                trendElement.className = 'summary-trend';
            }

        } catch (error) {
            console.error('Erro ao atualizar dados de agendamentos:', error);
        }
    }

    async atualizarEventos() {
        try {
            const eventos = await this.eventoService.buscarTodos();
            const totalEventos = eventos.length;
            
            // Eventos ativos (não concluídos)
            const eventosAtivos = eventos.filter(e => e.situacao !== 'CONCLUIDO').length;
            
            // Eventos concluídos
            const eventosConcluidos = eventos.filter(e => e.situacao === 'CONCLUIDO').length;
            
            // Eventos futuros
            const agora = new Date();
            const eventosFuturos = eventos.filter(e => {
                const dataEvento = app.parseBackendDate(e.dtEvento);
                return dataEvento && dataEvento > agora;
            }).length;

            // Atualizar a interface
            document.getElementById('totalEventos').textContent = totalEventos;
            document.getElementById('eventosAtivos').textContent = eventosAtivos;
            document.getElementById('eventosConcluidos').textContent = eventosConcluidos;
            document.getElementById('eventosFuturos').textContent = eventosFuturos;

            // Atualizar tendência
            const trendElement = document.getElementById('trendEventos');
            if (eventosFuturos > 0) {
                trendElement.textContent = `↑ ${eventosFuturos} próximos`;
                trendElement.className = 'summary-trend trend-up';
            } else {
                trendElement.textContent = '→ Sem eventos futuros';
                trendElement.className = 'summary-trend';
            }

        } catch (error) {
            console.error('Erro ao atualizar dados de eventos:', error);
        }
    }

    // Método para atualizar consultas do dia (usado no card de pacientes)
    async atualizarConsultasHoje() {
        try {
            const agendamentos = await this.agendamentoService.buscarTodos();
            const hoje = new Date().toDateString();
            const consultasHoje = agendamentos.filter(a => {
                const dataAgendamento = app.parseBackendDate(a.data);
                return dataAgendamento && dataAgendamento.toDateString() === hoje;
            }).length;

            document.getElementById('consultasHoje').textContent = consultasHoje;
        } catch (error) {
            console.error('Erro ao atualizar consultas do dia:', error);
        }
    }
}