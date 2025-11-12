class AgendamentoService {
    constructor() {
        this.baseUrl = 'http://localhost:8081/agendamento';
    }

    async buscarTodos() {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/todos`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar agendamentos');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorId(id) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/id?id=${id}`, {
                headers: headers
            });

            if (response.ok) {
                return await response.json();
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Agendamento não encontrado');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async salvar(agendamentoData, userId) {
        try {
            const dadosComUsuario = {
                ...agendamentoData,
                idUsuario: userId
            };

            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {
                'Content-Type': 'application/json',
            };

            // Adiciona token de autenticação se existir
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            console.log('Enviando agendamento:', dadosComUsuario);
            console.log('Headers:', headers);

            const response = await fetch(`${this.baseUrl}/salvar`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dadosComUsuario)
            });

            console.log('Resposta do servidor - Status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Agendamento salvo com sucesso:', data);
                return data;
            } else if (response.status === 401) {
                const errorText = await response.text();
                console.error('Erro 401 - Não autenticado:', errorText);
                throw new Error('Usuário não autenticado');
            } else {
                const errorText = await response.text();
                console.error('Erro ao salvar agendamento:', errorText);
                throw new Error(`Erro ao salvar agendamento: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    async atualizar(agendamentoData, userId) {
        try {
            const dadosComUsuario = {
                ...agendamentoData,
                idUsuario: userId
            };

            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            console.log('Atualizando agendamento:', dadosComUsuario);

            const response = await fetch(`${this.baseUrl}/atualizar`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(dadosComUsuario)
            });

            console.log('Resposta da atualização - Status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Agendamento atualizado com sucesso:', data);
                return data;
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                const errorText = await response.text();
                console.error('Erro ao atualizar agendamento:', errorText);
                throw new Error(`Erro ao atualizar agendamento: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async deletar(id) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/deletar/id?id=${id}`, {
                method: 'DELETE',
                headers: headers
            });

            if (response.ok) {
                return true;
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                const errorText = await response.text();
                throw new Error(`Erro ao deletar agendamento: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorPacienteId(pacienteId) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/paciente/id?id=${pacienteId}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar agendamentos do paciente');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorPacienteNome(nome) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/paciente/nome?nome=${encodeURIComponent(nome)}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar agendamentos por nome do paciente');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorTpVisita(tpVisita) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/tpVisita?tpVisita=${encodeURIComponent(tpVisita)}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar agendamentos por tipo de visita');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPacientesParaAgendamento() {
        try {
            const pacienteService = new PacienteService();
            return await pacienteService.buscarTodos();
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            return [];
        }
    }
}