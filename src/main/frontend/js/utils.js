class Utils {
    static showMessage(message, type = 'error') {
        const messageEl = document.getElementById('message');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `message ${type}`;
            messageEl.style.display = 'block';

            console.log(`Mensagem [${type}]:`, message);

            if (type === 'success') {
                setTimeout(() => {
                    messageEl.style.display = 'none';
                }, 5000);
            }
        }
    }

    static hideMessage() {
        const messageEl = document.getElementById('message');
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    }

    static setLoading(loading, buttonId) {
        const button = document.getElementById(buttonId);
        if (!button) return;

        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');

        if (loading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            button.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            button.disabled = false;
        }
    }

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.textContent = '';
        });
    }

    static showError(fieldId, message) {
        const errorEl = document.getElementById(fieldId);
        if (errorEl) {
            errorEl.textContent = message;
        }
    }

    static showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    static parseBackendDate(dateData) {
        if (!dateData) return null;

        try {
            // Se for um array [ano, mês, dia, hora, minuto]
            if (Array.isArray(dateData)) {
                console.log('Convertendo array de data:', dateData);
                const [year, month, day, hour = 0, minute = 0] = dateData;

                // O mês no JavaScript é 0-indexed (0 = Janeiro, 11 = Dezembro)
                // Mas no array do backend parece ser 1-indexed, então subtraímos 1
                const jsMonth = month - 1;

                const date = new Date(year, jsMonth, day, hour, minute);
                console.log('Data convertida:', date);
                return date;
            }

            // Se for uma string no formato "2025-11-29 00:06:00.000"
            if (typeof dateData === 'string') {
                // Substitui o espaço por 'T' para criar formato ISO
                const isoString = dateData.replace(' ', 'T');
                const date = new Date(isoString);
                if (!isNaN(date.getTime())) {
                    return date;
                }
            }

            // Se for um timestamp ou outro formato
            const date = new Date(dateData);
            if (!isNaN(date.getTime())) {
                return date;
            }

            console.warn('Formato de data não reconhecido:', dateData);
            return null;
        } catch (error) {
            console.error('Erro ao converter data:', error, dateData);
            return null;
        }
    }

    static formatDate(dateData) {
        if (!dateData) return '';
        try {
            const date = Utils.parseBackendDate(dateData);
            if (!date || isNaN(date.getTime())) return '';
            return date.toLocaleDateString('pt-BR');
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return '';
        }
    }

    static formatDateTime(dateData) {
        if (!dateData) return '';
        try {
            const date = Utils.parseBackendDate(dateData);
            if (!date || isNaN(date.getTime())) return '';
            return date.toLocaleString('pt-BR');
        } catch (error) {
            console.error('Erro ao formatar data/hora:', error);
            return '';
        }
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static debugLog(...args) {
        console.log('[DEBUG]', ...args);
    }
}