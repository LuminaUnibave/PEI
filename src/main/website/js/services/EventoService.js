// EventoService.js
class EventoService {
    constructor() {
        this.baseURL = 'http://localhost:8081/evento';
        this.arquivoURL = 'http://localhost:8081/api/arquivos';
    }

    async buscarPorDataEntre(dataInicial, dataFinal) {
        try {
            console.log('🔍 Buscando eventos entre:', dataInicial, 'e', dataFinal);

            const response = await fetch(`${this.baseURL}/buscar/dtEvento/entre?depois=${dataInicial}&antes=${dataFinal}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Não autenticado');
                }
                throw new Error(`Erro ao buscar eventos: ${response.status}`);
            }

            const eventos = await response.json();
            console.log('📅 Eventos encontrados:', eventos);
            return eventos;

        } catch (error) {
            console.error('❌ Erro no EventoService:', error);
            throw error;
        }
    }

    async buscarTodos() {
        try {
            const response = await fetch(`${this.baseURL}/buscar/todos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar eventos: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('❌ Erro ao buscar todos os eventos:', error);
            throw error;
        }
    }

    async buscarPorId(id) {
        try {
            const response = await fetch(`${this.baseURL}/buscar/id?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar evento: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('❌ Erro ao buscar evento por ID:', error);
            throw error;
        }
    }

    async buscarArquivosPorEvento(idEvento) {
        try {
            console.log('📎 Buscando arquivos para evento:', idEvento);

            const response = await fetch(`${this.arquivoURL}/entidade/${idEvento}/tipo/EVENTO`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return []; // Retorna array vazio se não encontrar arquivos
                }
                throw new Error(`Erro ao buscar arquivos: ${response.status}`);
            }

            const arquivos = await response.json();
            console.log('📎 Arquivos encontrados:', arquivos);
            return arquivos;

        } catch (error) {
            console.error('❌ Erro ao buscar arquivos:', error);
            return []; // Retorna array vazio em caso de erro
        }
    }

    // Método para obter URL da imagem completa
    getImagemUrl(idArquivo) {
        return `${this.arquivoURL}/download/${idArquivo}`;
    }

    // Verifica se o arquivo é uma imagem
    isImagem(arquivo) {
        const extensoesImagem = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
        const contentTypeImagem = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];

        const extensao = arquivo.extensao ? arquivo.extensao.toLowerCase() : '';
        const contentType = arquivo.contentType ? arquivo.contentType.toLowerCase() : '';

        return extensoesImagem.includes(extensao) || contentTypeImagem.some(tipo => contentType.includes(tipo));
    }
}