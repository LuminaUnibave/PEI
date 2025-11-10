class PacienteService {
    constructor() {
        this.baseUrl = 'http://localhost:8081/paciente';
    }

    async buscarTodos() {
        try {
            const response = await fetch(`${this.baseUrl}/buscar/todos`);
            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            }
            throw new Error('Erro ao buscar pacientes');
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorId(id) {
        try {
            const response = await fetch(`${this.baseUrl}/buscar/id?id=${id}`);
            if (response.ok) {
                return await response.json();
            }
            throw new Error('Paciente não encontrado');
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async salvar(pacienteData, userId) {
        try {
            const dadosComUsuario = {
                ...pacienteData,
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

            const response = await fetch(`${this.baseUrl}/salvar`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dadosComUsuario)
            });

            if (response.ok) {
                return await response.json();
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao salvar paciente');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async atualizar(pacienteData, userId) {
        try {
            const dadosComUsuario = {
                ...pacienteData,
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

            const response = await fetch(`${this.baseUrl}/atualizar`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(dadosComUsuario)
            });

            if (response.ok) {
                return await response.json();
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao atualizar paciente');
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
                throw new Error('Erro ao deletar paciente');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }
}