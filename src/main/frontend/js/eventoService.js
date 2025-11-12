class EventoService {
    constructor() {
        this.baseUrl = 'http://localhost:8081/evento';
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
                throw new Error('Erro ao buscar eventos');
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
                throw new Error('Evento não encontrado');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async salvar(eventoData, userId) {
        try {
            const dadosComUsuario = {
                ...eventoData,
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

            console.log('Enviando evento:', dadosComUsuario);
            console.log('Headers:', headers);

            const response = await fetch(`${this.baseUrl}/salvar`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dadosComUsuario)
            });

            console.log('Resposta do servidor - Status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Evento salvo com sucesso:', data);
                return data;
            } else if (response.status === 401) {
                const errorText = await response.text();
                console.error('Erro 401 - Não autenticado:', errorText);
                throw new Error('Usuário não autenticado');
            } else {
                const errorText = await response.text();
                console.error('Erro ao salvar evento:', errorText);
                throw new Error(`Erro ao salvar evento: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    async atualizar(eventoData, userId) {
        try {
            const dadosComUsuario = {
                ...eventoData,
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

            console.log('Atualizando evento:', dadosComUsuario);

            const response = await fetch(`${this.baseUrl}/atualizar`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(dadosComUsuario)
            });

            console.log('Resposta da atualização - Status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Evento atualizado com sucesso:', data);
                return data;
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                const errorText = await response.text();
                console.error('Erro ao atualizar evento:', errorText);
                throw new Error(`Erro ao atualizar evento: ${errorText}`);
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
                throw new Error(`Erro ao deletar evento: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorNome(nome) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/nmEvento?nmEvento=${encodeURIComponent(nome)}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar eventos por nome');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorSituacao(situacao) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/stEvento?stEvento=${encodeURIComponent(situacao)}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar eventos por situação');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorData(data) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/dtEvento?dtEvento=${encodeURIComponent(data)}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar eventos por data');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorDataAntes(data) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/dtEvento/antes?antes=${encodeURIComponent(data)}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar eventos por data anterior');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorDataDepois(data) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/dtEvento/depois?depois=${encodeURIComponent(data)}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar eventos por data posterior');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorDataEntre(dataInicio, dataFim) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/buscar/dtEvento/entre?depois=${encodeURIComponent(dataInicio)}&antes=${encodeURIComponent(dataFim)}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao buscar eventos por período');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }
}