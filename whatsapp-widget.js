/**
 * WhatsApp Chat Widget
 * Widget de chat do WhatsApp para sites
 */
class WhatsAppWidget {
    constructor(options = {}) {
        this.phoneNumber = options.phoneNumber || '5511992174900';
        this.name = options.name || 'Atendimento';
        this.status = options.status || 'Online agora';
        this.avatar = options.avatar || 'A';
        this.messages = options.messages || [
            'Olá, tudo bem?',
            'Como posso te ajudar hoje?'
        ];
        this.quickButtons = options.quickButtons || [
            {
                text: 'Quero saber mais',
                message: 'Quero saber mais sobre os serviços',
                icon: "whatsapp"
            },
            {
                text: 'Preciso de ajuda',
                message: 'Preciso de ajuda com minha conta',
                icon: "help"
            }
        ];
        
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'whatsapp-widget';
        widget.innerHTML = this.getWidgetHTML();
        
        document.body.appendChild(widget);
    }

    getWidgetHTML() {
        return `
            <!-- Janela de Chat -->
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="chat-avatar">${this.avatar}</div>
                        <div class="chat-details">
                            <h4>${this.name}</h4>
                            <div class="chat-status">${this.status}</div>
                        </div>
                    </div>
                    <button class="close-button" onclick="whatsappWidget.toggleChat()">×</button>
                </div>
                
                <div class="chat-body">
                    ${this.messages.map(message => `
                        <div class="message received">${message}</div>
                    `).join('')}
                </div>
                
                <div class="chat-footer">
                    <div class="quick-actions">
                        ${this.quickButtons.map(button => `
                            <button class="quick-button" onclick="whatsappWidget.sendToWhatsApp('${button.message}')">
                                ${this.getWhatsAppIcon()}
                                ${this.getWhatsAppIcon()}
                            </button>
                        `).join('')}
                    </div>
                    <div class="privacy-text">
                        Clicando acima você aceita as <a href="#" target="_blank">Políticas de privacidade</a> e da <a href="#" target="_blank">Leadster</a>
                    </div>
                </div>
            </div>
            
            <!-- Botão do WhatsApp -->
            <button class="whatsapp-button" onclick="whatsappWidget.toggleChat()">
                ${this.getWhatsAppIcon()}
            </button>
        `;
    }

    getWhatsAppIcon() {
        return `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
            </svg>
        `;
    }

    getHelpIcon() {
        return `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
        `;
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.toggle('active');
    }

    sendToWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }

    attachEventListeners() {
        // Fechar a janela de chat ao clicar fora dela
        document.addEventListener('click', (event) => {
            const chatWindow = document.getElementById('chatWindow');
            const whatsappWidget = document.querySelector('.whatsapp-widget');
            
            if (whatsappWidget && !whatsappWidget.contains(event.target)) {
                chatWindow.classList.remove('active');
            }
        });

        // Prevenir que cliques dentro da janela de chat a fechem
        document.addEventListener('DOMContentLoaded', () => {
            const chatWindow = document.getElementById('chatWindow');
            if (chatWindow) {
                chatWindow.addEventListener('click', (event) => {
                    event.stopPropagation();
                });
            }
        });
    }

    // Método para atualizar configurações
    updateConfig(newConfig) {
        Object.assign(this, newConfig);
        const existingWidget = document.querySelector('.whatsapp-widget');
        if (existingWidget) {
            existingWidget.remove();
        }
        this.createWidget();
    }
}

// Inicializar o widget quando o DOM estiver carregado
let whatsappWidget;

document.addEventListener('DOMContentLoaded', function() {
    // Configuração padrão - pode ser personalizada
    const config = {
        phoneNumber: '5511992174900', // Substitua pelo seu número
        name: 'Atendimento',
        status: 'Online agora',
        avatar: 'A',
        messages: [
            'Olá, tudo bem?',
            'Como posso te ajudar hoje?'
        ],
        quickButtons: [
            {
                text: 'Quero saber mais',
                message: 'Quero saber mais sobre os serviços'
            },
            {
                text: 'Preciso de ajuda',
                message: 'Preciso de ajuda com minha conta'
            }
        ]
    };

    whatsappWidget = new WhatsAppWidget(config);
});

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppWidget;
}
