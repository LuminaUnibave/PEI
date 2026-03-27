// service-loader.js
class ServicesLoader {
    constructor() {
        this.services = {};
        this.loaded = false;
    }

    async loadServices() {
        try {
            // Carrega AuthService primeiro
            if (typeof AuthService === 'undefined') {
                await this.loadScript('./js/services/AuthService.js');
            }

            // Carrega EventoService
            if (typeof EventoService === 'undefined') {
                await this.loadScript('./js/services/EventoService.js');
            }

            this.services.evento = new EventoService();
            this.services.auth = new AuthService();

            this.loaded = true;
            console.log('✅ Todos os serviços carregados');

            return this.services;
        } catch (error) {
            console.error('❌ Erro ao carregar serviços:', error);
            throw error;
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    getService(serviceName) {
        if (!this.loaded) {
            throw new Error('Serviços não carregados. Chame loadServices() primeiro.');
        }
        return this.services[serviceName];
    }
}

// Instância global
window.servicesLoader = new ServicesLoader();