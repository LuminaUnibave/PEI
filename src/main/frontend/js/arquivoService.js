class ArquivoService {
    constructor() {
        this.baseUrl = 'http://localhost:8081/api/arquivos';
    }

    async listarPorEntidade(idEntidade, tpEntidade) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/entidade/${idEntidade}/tipo/${tpEntidade}`, {
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [data];
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                return [];
            }
        } catch (error) {
            console.error('Erro:', error);
            return [];
        }
    }

    async uploadArquivo(file, idEntidade, tpEntidade) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const formData = new FormData();
            formData.append('file', file);
            formData.append('idEntidade', idEntidade);
            formData.append('tpEntidade', tpEntidade);

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            console.log('Enviando arquivo:', {
                idEntidade: idEntidade,
                tpEntidade: tpEntidade,
                fileName: file.name,
                fileSize: file.size
            });

            const response = await fetch(`${this.baseUrl}/upload`, {
                method: 'POST',
                headers: headers,
                body: formData
            });

            console.log('Resposta do upload - Status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Arquivo enviado com sucesso:', data);
                return data;
            } else if (response.status === 401) {
                const errorText = await response.text();
                console.error('Erro 401 - Não autenticado:', errorText);
                throw new Error('Usuário não autenticado');
            } else {
                const errorText = await response.text();
                console.error('Erro ao fazer upload do arquivo:', errorText);
                throw new Error(`Erro ao fazer upload do arquivo: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async downloadArquivo(idArquivo) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/download/${idArquivo}`, {
                headers: headers
            });

            if (response.ok) {
                return await response.blob();
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao fazer download do arquivo');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async deletarArquivo(idArquivo) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/${idArquivo}`, {
                method: 'DELETE',
                headers: headers
            });

            if (response.ok) {
                return true;
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Erro ao deletar arquivo');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async buscarPorId(idArquivo) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${this.baseUrl}/${idArquivo}`, {
                headers: headers
            });

            if (response.ok) {
                return await response.json();
            } else if (response.status === 401) {
                throw new Error('Usuário não autenticado');
            } else {
                throw new Error('Arquivo não encontrado');
            }
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }
}