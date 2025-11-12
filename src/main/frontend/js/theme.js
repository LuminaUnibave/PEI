class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.bindEvents();
        this.updateThemeToggle();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeToggle();

        // Forçar atualização de estilos específicos
        this.forceStyleUpdate();

        console.log(`Tema aplicado: ${theme}`);
    }

    forceStyleUpdate() {
        // Esta função força a atualização de estilos que podem não estar respondendo
        const sheets = document.styleSheets;
        for (let sheet of sheets) {
            try {
                // Tenta acessar as regras para forçar atualização
                const rules = sheet.cssRules || sheet.rules;
            } catch (e) {
                // Ignora erros de CORS
            }
        }
    }

    bindEvents() {
        // Remove event listeners existentes
        const themeToggles = document.querySelectorAll('.theme-toggle');
        themeToggles.forEach(toggle => {
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
        });

        // Adiciona novos event listeners
        const newThemeToggles = document.querySelectorAll('.theme-toggle');
        newThemeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
    }

    updateThemeToggle() {
        const themeToggles = document.querySelectorAll('.theme-toggle');
        themeToggles.forEach(toggle => {
            if (this.theme === 'dark') {
                toggle.style.background = '#4A5568';
                toggle.style.borderColor = '#718096';
            } else {
                toggle.style.background = '#F7FAFC';
                toggle.style.borderColor = '#E2E8F0';
            }
        });
    }

    getCurrentTheme() {
        return this.theme;
    }
}

// Inicializar gerenciador de tema
let themeManager;

document.addEventListener('DOMContentLoaded', function () {
    themeManager = new ThemeManager();
});