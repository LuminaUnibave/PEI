class UsuarioService {
    constructor() {
        this.baseUrl = 'http://localhost:8081/usuario';
    }

    async cadastrarVisitante(usuarioData) {
        try {
            const dadosComTipo = {
                ...usuarioData,
                tpUsuario: "VISITANTE"
            };

            console.log('Enviando dados:', dadosComTipo);

            const response = await fetch(`${this.baseUrl}/salvar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosComTipo)
            });

            if (response.status === 201) {
                // Retorna os dados do usuário criado para fazer login automático
                const usuarioCriado = await response.json();
                return {
                    success: true,
                    message: 'Conta criada com sucesso!',
                    usuario: usuarioCriado
                };
            } else if (response.status === 409) {
                return { success: false, error: 'Este e-mail já está cadastrado' };
            } else {
                const errorText = await response.text();
                return { success: false, error: `Erro ao criar conta: ${response.status}` };
            }
        } catch (error) {
            console.error('Erro na requisição de cadastro:', error);
            return { success: false, error: 'Erro de conexão com o servidor' };
        }
    }

    async buscarPorEmail(email) {
        try {
            const response = await fetch(`${this.baseUrl}/buscar/email?email=${encodeURIComponent(email)}`);

            if (response.ok) {
                const data = await response.json();
                return { success: true, exists: data !== null };
            } else {
                return { success: false, error: 'Erro ao verificar e-mail' };
            }
        } catch (error) {
            console.error('Erro ao verificar e-mail:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }
}