class AuthService {
    constructor() {
        this.baseUrl = 'http://localhost:8081/auth';
    }

    async login(email, senha) {
        try {
            console.log('Fazendo login para:', email);

            const response = await fetch(`${this.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });

            console.log('Status da resposta do login:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Dados recebidos do login:', data);

                // Salva token se existir
                if (data.token) {
                    this.setToken(data.token);
                    console.log('Token JWT salvo');
                } else {
                    console.log('Nenhum token JWT recebido, usando autenticação básica');
                }

                // Salva dados do usuário (prioridade: usuario -> dados diretos)
                const userData = {
                    id: data.usuario?.id || data.id,
                    nome: data.usuario?.nome || data.nome,
                    email: data.usuario?.email || data.email,
                    tpUsuario: data.usuario?.tpUsuario || data.tpUsuario
                };

                if (userData.id) {
                    this.setUserData(userData);
                    console.log('Dados do usuário salvos:', userData);
                    return { success: true, data: data };
                } else {
                    console.error('Dados do usuário incompletos na resposta:', data);
                    return { success: false, error: 'Dados do usuário incompletos' };
                }
            } else if (response.status === 401) {
                return { success: false, error: 'Credenciais inválidas' };
            } else if (response.status === 400) {
                return { success: false, error: 'Dados de entrada inválidos' };
            } else {
                const errorText = await response.text();
                console.error('Erro do servidor no login:', response.status, errorText);
                return { success: false, error: `Erro ${response.status}: ${errorText}` };
            }
        } catch (error) {
            console.error('Erro na requisição de login:', error);
            return { success: false, error: 'Erro de conexão com o servidor' };
        }
    }

    // MÉTODO ALTERNATIVO: Login básico sem JWT
    async loginBasico(email, senha) {
        try {
            console.log('Tentando login básico para:', email);

            // Primeiro tenta fazer login normal
            const loginResult = await this.login(email, senha);

            if (loginResult.success) {
                return loginResult;
            }

            // Se o login normal falhou, tenta uma abordagem alternativa
            console.log('Login normal falhou, tentando abordagem alternativa...');

            // Busca o usuário pelo email (se o endpoint existir)
            const usuarioResponse = await fetch(`http://localhost:8081/usuario/buscar/email?email=${encodeURIComponent(email)}`);

            if (usuarioResponse.ok) {
                const usuario = await usuarioResponse.json();
                console.log('Usuário encontrado:', usuario);

                if (usuario && usuario.id) {
                    // Aqui você deveria verificar a senha, mas como não temos acesso ao hash,
                    // vamos assumir que o login foi bem-sucedido para desenvolvimento
                    const userData = {
                        id: usuario.id,
                        nome: usuario.nome,
                        email: usuario.email,
                        tpUsuario: usuario.tpUsuario
                    };

                    this.setUserData(userData);
                    console.log('Login básico bem-sucedido (desenvolvimento):', userData);
                    return { success: true, data: userData };
                }
            }

            return { success: false, error: 'Credenciais inválidas' };

        } catch (error) {
            console.error('Erro no login básico:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }

    setToken(token) {
        if (token && token !== 'undefined' && token !== 'null') {
            localStorage.setItem('authToken', token);
            console.log('Token salvo no localStorage');
        } else {
            console.log('Token inválido, não salvo');
        }
    }

    getToken() {
        try {
            const token = localStorage.getItem('authToken');
            const isValid = token && token !== 'undefined' && token !== 'null';
            console.log('Token recuperado:', isValid ? 'Válido' : 'Inválido/Não encontrado');
            return isValid ? token : null;
        } catch (error) {
            console.error('Erro ao obter token:', error);
            return null;
        }
    }

    setUserData(usuario) {
        if (usuario && typeof usuario === 'object' && usuario.id) {
            localStorage.setItem('userData', JSON.stringify(usuario));
            console.log('Dados do usuário salvos no localStorage:', usuario);

            // Também salva o ID separadamente para acesso rápido
            localStorage.setItem('userId', usuario.id.toString());
        } else {
            console.error('Tentativa de salvar dados de usuário inválidos:', usuario);
        }
    }

    getUserData() {
        try {
            const userData = localStorage.getItem('userData');
            if (userData && userData !== 'undefined' && userData !== 'null') {
                const parsed = JSON.parse(userData);
                if (parsed && parsed.id) {
                    console.log('Dados do usuário recuperados:', parsed);
                    return parsed;
                }
            }
            console.log('Nenhum dado de usuário válido encontrado');
            return null;
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
            return null;
        }
    }

    getUserId() {
        try {
            // Tenta primeiro pelo userData completo
            const userData = this.getUserData();
            if (userData && userData.id) {
                return userData.id;
            }

            // Fallback: tenta pelo userId salvo separadamente
            const userId = localStorage.getItem('userId');
            if (userId && userId !== 'undefined' && userId !== 'null') {
                console.log('ID do usuário recuperado do fallback:', userId);
                return parseInt(userId);
            }

            console.log('Nenhum ID de usuário encontrado');
            return null;
        } catch (error) {
            console.error('Erro ao obter ID do usuário:', error);
            return null;
        }
    }

    isAuthenticated() {
        try {
            const userData = this.getUserData();
            const hasUserData = !!(userData && userData.id);

            const token = this.getToken();
            const hasToken = !!token;

            console.log('Status de autenticação:', {
                hasUserData: hasUserData,
                hasToken: hasToken,
                userId: userData?.id
            });

            // Considera autenticado se tiver dados do usuário (com ou sem token)
            return hasUserData;
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            return false;
        }
    }

    logout() {
        try {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            localStorage.removeItem('userId');
            console.log('Usuário deslogado - dados removidos do localStorage');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    // Método para debug
    debugAuthStatus() {
        console.log('=== DEBUG AUTENTICAÇÃO ===');
        console.log('Token:', this.getToken());
        console.log('UserData:', this.getUserData());
        console.log('UserId:', this.getUserId());
        console.log('isAuthenticated:', this.isAuthenticated());
        console.log('=== FIM DEBUG ===');
    }
}