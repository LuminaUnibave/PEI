// AuthService.js
class AuthService {
    constructor() {
        this.baseURL = 'http://localhost:8081/auth';
    }

    async login(email, senha) {
        try {
            console.log('🔐 Tentando login:', email);

            const response = await fetch(`${this.baseURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha })
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }

            const data = await response.json();
            console.log('✅ Login response:', data);

            // Armazena o token e dados do usuário
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                console.log('🔑 Token armazenado');
            }

            return data;
        } catch (error) {
            console.error('❌ Erro no login:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        console.log('🚪 Usuário deslogado');
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUsuario() {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
    }
}