class EmailService {
    constructor() {
        this.baseUrl = 'http://localhost:8081/email';
    }

    async enviarEmail(destinatario, assunto, conteudo, anexo = null) {
        try {
            const authService = new AuthService();
            const token = authService.getToken();

            const formData = new FormData();
            formData.append('destinatario', destinatario);
            formData.append('assunto', assunto);
            formData.append('conteudo', conteudo);

            if (anexo) {
                formData.append('anexo', anexo);
            }

            const headers = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            console.log('Enviando e-mail:', {
                destinatario: destinatario,
                assunto: assunto,
                temAnexo: !!anexo
            });

            const response = await fetch(`${this.baseUrl}/enviar`, {
                method: 'POST',
                headers: headers,
                body: formData
            });

            console.log('Resposta do e-mail - Status:', response.status);

            if (response.ok) {
                const result = await response.text();
                console.log('E-mail enviado com sucesso:', result);
                return { success: true, message: 'E-mail enviado com sucesso!' };
            } else if (response.status === 401) {
                const errorText = await response.text();
                console.error('Erro 401 - Não autenticado:', errorText);
                return { success: false, error: 'Usuário não autenticado' };
            } else {
                const errorText = await response.text();
                console.error('Erro ao enviar e-mail:', errorText);
                return { success: false, error: `Erro ao enviar e-mail: ${errorText}` };
            }
        } catch (error) {
            console.error('Erro:', error);
            return { success: false, error: 'Erro de conexão com o servidor' };
        }
    }
}