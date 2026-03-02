class LanguageToggle {
    constructor() {
        this.currentLanguage = 'pt';
        this.toggleInput = document.getElementById('language-toggle');
        this.init();
    }

    init() {
        this.toggleInput.addEventListener('change', (e) => {
            this.handleToggle(e.target.checked);
        });

        // Detectar idioma do navegador
        this.detectBrowserLanguage();
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('en')) {
            this.toggleInput.checked = true;
            this.currentLanguage = 'en';
        }
    }

    handleToggle(isEnglish) {
        if (isEnglish) {
            this.currentLanguage = 'en';
            this.switchToEnglish();
        } else {
            this.currentLanguage = 'pt';
            this.switchToPortuguese();
        }

        // Salvar preferência no localStorage
        localStorage.setItem('preferredLanguage', this.currentLanguage);

        // Comunicar com a página pai (se estiver em iframe)
        this.notifyParent();
    }

    switchToEnglish() {
        console.log('🇺🇸 Switching to English...');
        // Aqui você pode implementar a lógica específica
        this.dispatchLanguageChange('en');
    }

    switchToPortuguese() {
        console.log('🇧🇷 Trocando para Português...');
        // Aqui você pode implementar a lógica específica
        this.dispatchLanguageChange('pt');
    }

    dispatchLanguageChange(language) {
        // Criar evento customizado
        const event = new CustomEvent('languageChanged', {
            detail: { language: language }
        });
        document.dispatchEvent(event);
    }

    notifyParent() {
        // Se estiver em iframe, comunicar com a página pai
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'languageChange',
                language: this.currentLanguage
            }, '*');
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new LanguageToggle();
});

// Escutar mudanças de idioma
document.addEventListener('languageChanged', (e) => {
    console.log(`Language changed to: ${e.detail.language}`);
});