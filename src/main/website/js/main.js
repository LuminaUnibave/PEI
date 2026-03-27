// SPA Navigation and Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navButtons = document.querySelectorAll('.nav-button, .btn, .btn-back');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                navigateToPage(targetPage);
            }
        });
    });

    // Initialize with home page
    navigateToPage('home');

    // Carousel functionality
    let slideIndex = 0;
    const carousel = document.getElementById('carousel');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    let autoSlideInterval;
    const autoSlideDuration = 5000;

    function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        carousel.style.animation = 'none';
        carousel.style.transition = 'transform 1s ease-in-out';
        carousel.style.transform = `translateX(-${index * 100}%)`;

        indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
        slideIndex = index;

        resetAutoSlide();
    }

    window.currentSlide = function(index) {
        showSlide(index);
    };

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            showSlide(slideIndex + 1);
        }, autoSlideDuration);
    }

    showSlide(slideIndex);

    carousel.addEventListener('mouseover', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseout', () => {
        resetAutoSlide();
    });

    // Login form handling
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');
    const showVisitanteBtn = document.getElementById('show-visitante');
    const loginOptions = document.querySelector('.login-options');
    const backToLogin = document.querySelector('.back-to-login');

    // Toggle entre formulários de login e registro
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            loginOptions.style.display = 'none';
            registerForm.style.display = 'block';
            backToLogin.style.display = 'block';
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.style.display = 'none';
            backToLogin.style.display = 'none';
            loginForm.style.display = 'block';
            loginOptions.style.display = 'block';
        });
    }

    // Login automático como visitante
    if (showVisitanteBtn) {
        showVisitanteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fazerLoginVisitante();
        });
    }

    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            await fazerLogin(email, senha);
        });
    }

    // Registro de novo usuário usando o endpoint existente /usuario/salvar
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const nome = document.getElementById('reg-nome').value;
            const email = document.getElementById('reg-email').value;
            const senha = document.getElementById('reg-senha').value;
            const confirmarSenha = document.getElementById('reg-confirmar-senha').value;

            // Validações básicas
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            if (senha.length < 6) {
                alert('A senha deve ter pelo menos 6 caracteres!');
                return;
            }

            await registrarUsuario(nome, email, senha);
        });
    }

    // Formulário de Contato - Agora usando o endpoint de email
    const contactForm = document.querySelector('#contact-page form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            await enviarMensagemContato();
        });
    }

    // Login automático como visitante ao carregar a página
    setTimeout(async () => {
        await fazerLoginVisitante();
    }, 1000);
});

// Função para fazer login automático como visitante
async function fazerLoginVisitante() {
    try {
        console.log('🔄 Tentando login automático como visitante...');
        await fazerLogin('visitante@lumina.com', '@@@@@');
    } catch (error) {
        console.log('⚠️ Login automático falhou:', error.message);
        // Preenche os campos mas não faz login automático
        if (document.getElementById('email')) {
            document.getElementById('email').value = 'visitante@lumina.com';
            document.getElementById('senha').value = '@@@@@';
        }
    }
}

// Função para fazer login
async function fazerLogin(email, senha) {
    try {
        const services = await window.servicesLoader.loadServices();
        const authService = services.auth;

        await authService.login(email, senha);
        console.log('✅ Login realizado com sucesso!');

        // Atualiza a UI
        updateUIForAuthenticatedUser();

        // Navega para a home
        navigateToPage('home');

    } catch (error) {
        console.error('❌ Erro no login:', error);
        alert('Erro no login: ' + error.message);
    }
}

// Função para registrar usuário
async function registrarUsuario(nome, email, senha) {
    try {
        const response = await fetch('http://localhost:8081/usuario/salvar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha,
                tpUsuario: "VISITANTE"
            })
        });

        if (response.status === 201) {
            alert('Conta criada com sucesso! Faça login para continuar.');

            // Volta para o formulário de login
            document.getElementById('register-form').style.display = 'none';
            document.querySelector('.back-to-login').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.querySelector('.login-options').style.display = 'block';

            // Preenche o email no formulário de login
            document.getElementById('email').value = email;

        } else if (response.status === 409) {
            alert('Este email já está cadastrado!');
        } else {
            throw new Error('Erro ao criar conta');
        }

    } catch (error) {
        console.error('❌ Erro no registro:', error);
        alert('Erro ao criar conta: ' + error.message);
    }
}

// Função para enviar mensagem de contato usando o endpoint de email
async function enviarMensagemContato() {
    try {
        const nameInput = document.querySelector('#contact-page input[name="name"]');
        const emailInput = document.querySelector('#contact-page input[name="email"]');
        const messageInput = document.querySelector('#contact-page textarea[name="message"]');

        if (!nameInput || !emailInput || !messageInput) {
            console.error('❌ Campos do formulário não encontrados');
            alert('Erro: Campos do formulário não encontrados');
            return;
        }

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;

        console.log('📝 Dados do formulário:', { name, email, message });

        // Validações básicas
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }

        // Prepara os dados para o email
        const assunto = `Contato do Site Lumina - ${name}`;
        const conteudo = `
Nome: ${name}
Email: ${email}

Mensagem:
${message}

---
Enviado através do sistema Lumina
        `.trim();

        console.log('📧 Enviando mensagem de contato:', { assunto, conteudo });

        // Envia para o endpoint de email
        const formData = new FormData();
        formData.append('remetente', email);
        formData.append('assunto', assunto);
        formData.append('conteudo', conteudo);

        console.log('🔄 Enviando requisição para /email/receber...');

        const response = await fetch('http://localhost:8081/email/receber', {
            method: 'POST',
            body: formData
        });

        console.log('📨 Resposta do servidor:', response.status, response.statusText);

        if (response.ok) {
            const resultado = await response.text();
            console.log('✅ Email enviado com sucesso:', resultado);
            alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');

            // Limpa o formulário
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

        } else {
            const errorText = await response.text();
            console.error('❌ Erro na resposta:', errorText);
            throw new Error(errorText || 'Erro ao enviar mensagem');
        }

    } catch (error) {
        console.error('❌ Erro ao enviar mensagem:', error);
        alert('❌ Erro ao enviar mensagem: ' + error.message);
    }
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function navigateToPage(pageId) {
    console.log('🔄 Navegando para página:', pageId);

    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');

        // Scroll to top
        window.scrollTo(0, 0);

        // If navigating to calendar page, initialize it
        if (pageId === 'evento') {
            setTimeout(async () => {
                try {
                    await initializeCalendar();
                } catch (error) {
                    console.error('Erro ao inicializar calendário:', error);
                }
            }, 100);
        }
    } else {
        console.error('❌ Página não encontrada:', `${pageId}-page`);
    }
}

// Função para atualizar a UI quando o usuário está autenticado
function updateUIForAuthenticatedUser() {
    try {
        const authService = window.servicesLoader.getService('auth');
        if (authService && authService.isAuthenticated()) {
            const usuario = authService.getUsuario();
            console.log('👤 Usuário autenticado:', usuario);

            // Atualiza o header para mostrar que está logado
            const header = document.querySelector('.header');
            const existingUserInfo = header.querySelector('.user-info');

            if (existingUserInfo) {
                existingUserInfo.remove();
            }

            const userInfo = document.createElement('div');
            userInfo.className = 'user-info';
            userInfo.innerHTML = `
                <span style="color: white; margin-right: 15px;">👋 Olá, ${usuario.nome || 'Usuário'}</span>
            `;

            const nav = header.querySelector('.nav');
            if (nav) {
                header.insertBefore(userInfo, nav);
            }
        }
    } catch (error) {
        console.log('Erro ao atualizar UI:', error);
    }
}

// =============================================
// CALENDAR FUNCTIONALITY
// =============================================

// Calendar functionality
async function initializeCalendar() {
    // --- Variáveis de Estado ---
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDateKey = '';

    // Mapeamento de meses
    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Armazenamento dos eventos buscados
    let monthlyEvents = {};

    // --- Elementos do DOM ---
    const monthYearDisplay = document.getElementById('current-month-year');
    const daysGrid = document.getElementById('calendar-days-grid');
    const prevBtn = document.getElementById('prev-month-btn');
    const nextBtn = document.getElementById('next-month-btn');
    const modal = document.getElementById('event-modal');
    const closeBtn = document.querySelector('.close-button');
    const modalDate = document.getElementById('modal-date');
    const modalDetails = document.getElementById('modal-event-details');

    // Serviços
    let eventoService;

    // Carrega serviços antes de inicializar
    try {
        console.log('🔄 Carregando serviços...');
        const services = await window.servicesLoader.loadServices();
        eventoService = services.evento;
        console.log('✅ Serviços carregados com sucesso');
    } catch (error) {
        console.error('❌ Erro ao carregar serviços:', error);
        alert('Erro ao carregar serviços. Verifique o console.');
        return;
    }

    // 1. Função principal: Busca eventos na API
    async function fetchAndRenderEvents(month, year) {
        monthlyEvents = {};

        // Calcula as datas de início e fim do mês
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        // Formata as datas para o padrão ISO
        const formatDateTime = (date, isEnd) => {
            const day = date.getDate().toString().padStart(2, '0');
            const monthIndex = (date.getMonth() + 1).toString().padStart(2, '0');
            const yearFull = date.getFullYear();
            const time = isEnd ? '23:59:59' : '00:00:00';
            return `${yearFull}-${monthIndex}-${day}T${time}`;
        };

        const dataInicial = formatDateTime(startDate, false);
        const dataFinal = formatDateTime(endDate, true);

        try {
            console.log('📅 Buscando eventos de:', dataInicial, 'até', dataFinal);

            // Usa o EventoService para buscar eventos
            const eventos = await eventoService.buscarPorDataEntre(dataInicial, dataFinal);

            console.log('✅ Eventos recebidos:', eventos);

            processAndStoreEvents(eventos);

            renderCalendarDOM(month, year);
            addHighlightsToDays();

        } catch (error) {
            console.error("❌ Erro ao carregar eventos:", error);

            // Mostra mensagem amigável
            if (error.message.includes('Não autenticado')) {
                alert("⚠️ Você precisa fazer login para ver os eventos");
            } else if (error.message.includes('Erro ao buscar eventos')) {
                alert("ℹ️ Nenhum evento encontrado para este período");
            } else {
                alert("❌ Erro ao carregar eventos. Verifique o console para detalhes.");
            }

            renderCalendarDOM(month, year); // Renderiza calendário mesmo sem eventos
        }
    }

    // 2. Processa os dados da API e armazena
    function processAndStoreEvents(data) {
        if (!Array.isArray(data)) {
            console.error('Dados recebidos não são um array:', data);
            return;
        }

        console.log('🔧 Processando', data.length, 'eventos...');

        data.forEach((item, index) => {
            console.log(`📝 Processando evento ${index + 1}:`, item);

            if (item && item.dtEvento) {
                try {
                    console.log(`📅 Data original:`, item.dtEvento, `(tipo: ${typeof item.dtEvento})`);

                    let dtEvento;

                    // Se for um array [ano, mês, dia, hora, minuto]
                    if (Array.isArray(item.dtEvento)) {
                        const [year, month, day, hours, minutes] = item.dtEvento;
                        // Nota: no JavaScript, meses são 0-based (0 = Janeiro, 11 = Dezembro)
                        // Se seu backend envia meses como 1-12, subtraia 1
                        dtEvento = new Date(year, month - 1, day, hours, minutes);
                        console.log(`📅 Convertido de array: ${dtEvento}`);
                    }
                    // Se já for um objeto Date
                    else if (item.dtEvento instanceof Date) {
                        dtEvento = item.dtEvento;
                    }
                    // Se for uma string ISO
                    else if (typeof item.dtEvento === 'string') {
                        dtEvento = new Date(item.dtEvento);
                    }
                    // Se for um timestamp numérico
                    else if (typeof item.dtEvento === 'number') {
                        dtEvento = new Date(item.dtEvento);
                    }
                    else {
                        console.warn('Formato de data não suportado:', item.dtEvento);
                        return;
                    }

                    // Verifica se a data é válida
                    if (isNaN(dtEvento.getTime())) {
                        console.warn('❌ Data inválida, pulando evento:', item.dtEvento);
                        return;
                    }

                    // Formata a chave da data (YYYY-MM-DD)
                    const year = dtEvento.getFullYear();
                    const month = (dtEvento.getMonth() + 1).toString().padStart(2, '0');
                    const day = dtEvento.getDate().toString().padStart(2, '0');
                    const dateKey = `${year}-${month}-${day}`;

                    console.log(`✅ Data processada: ${dateKey}`);

                    const title = item.nmEvento || 'Evento sem nome';
                    const details = item.descricao || 'Sem descrição.';
                    const situacao = item.situacao || 'AGENDADO';

                    if (!monthlyEvents[dateKey]) {
                        monthlyEvents[dateKey] = [];
                    }

                    // Formata o horário
                    const hours = dtEvento.getHours().toString().padStart(2, '0');
                    const minutes = dtEvento.getMinutes().toString().padStart(2, '0');
                    const time = `${hours}:${minutes}`;

                    monthlyEvents[dateKey].push({
                        time: time,
                        title,
                        details,
                        situacao,
                        rawData: item
                    });

                    console.log(`✅ Evento "${title}" adicionado para ${dateKey} às ${time}`);

                } catch (error) {
                    console.error('❌ Erro ao processar evento:', error, item);
                }
            } else {
                console.warn('⚠️ Item inválido ou sem dtEvento:', item);
            }
        });

        console.log('📊 Eventos processados:', monthlyEvents);
    }

    // 3. Adiciona a classe de destaque aos dias com eventos
    function addHighlightsToDays() {
        Object.keys(monthlyEvents).forEach(dateKey => {
            const day = new Date(dateKey + 'T12:00:00').getDate();
            const dayElements = daysGrid.querySelectorAll(`.day-current-month[data-day="${day}"]`);

            dayElements.forEach(dayElement => {
                if (dayElement) {
                    dayElement.classList.add('event-highlight');

                    // Adiciona ícone de evento
                    if (!dayElement.querySelector('.event-icon')) {
                        const eventIcon = document.createElement('div');
                        eventIcon.classList.add('event-icon');
                        dayElement.appendChild(eventIcon);
                    }

                    // Adiciona tooltip com informações básicas
                    const events = monthlyEvents[dateKey];
                    if (events && events.length > 0) {
                        const eventTitles = events.map(event => event.title).join(', ');
                        dayElement.title = eventTitles;
                    }
                }
            });
        });
    }

    // 4. Funções do Modal
    async function openModal(dateKey, dayNum, monthIndex, year) {
        selectedDateKey = dateKey;

        modalDate.textContent = `${dayNum} de ${monthNames[monthIndex]} de ${year}`;
        modalDetails.innerHTML = '<div class="loading">Carregando informações do evento...</div>';

        const events = monthlyEvents[dateKey];

        if (events && events.length > 0) {
            let htmlContent = '<div class="events-container">';

            // Ordena eventos por horário
            events.sort((a, b) => a.time.localeCompare(b.time));

            for (const event of events) {
                // Busca arquivos para este evento
                let arquivosHTML = '';
                if (event.rawData && event.rawData.id) {
                    try {
                        const arquivos = await eventoService.buscarArquivosPorEvento(event.rawData.id);
                        if (arquivos && arquivos.length > 0) {
                            // Separa imagens e outros arquivos
                            const imagens = arquivos.filter(arquivo => eventoService.isImagem(arquivo));
                            const outrosArquivos = arquivos.filter(arquivo => !eventoService.isImagem(arquivo));

                            arquivosHTML = `
                                <div class="arquivos-section">
                                    ${imagens.length > 0 ? `
                                        <div class="imagens-section">
                                            <div class="imagens-lista">
                                                ${imagens.map(imagem => `
                                                    <div class="imagem-item">
                                                        <img src="${eventoService.getImagemUrl(imagem.id)}" alt="${imagem.nmArquivo}" class="imagem-completa" loading="lazy">
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                    
                                    ${outrosArquivos.length > 0 ? `
                                        <div class="outros-arquivos-section">
                                            <strong>📎 Arquivos Anexados</strong>
                                            <div class="outros-arquivos-lista">
                                                ${outrosArquivos.map(arquivo => `
                                                    <div class="outro-arquivo-item">
                                                        <span class="arquivo-icon">📄</span>
                                                        <span class="arquivo-nome">${arquivo.nmArquivo}</span>
                                                        <span class="arquivo-tamanho">${formatarTamanho(arquivo.tamanho)}</span>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }
                    } catch (error) {
                        console.error('Erro ao buscar arquivos:', error);
                        arquivosHTML = '<div class="arquivos-erro">⚠️ Erro ao carregar arquivos anexados</div>';
                    }
                }

                // Define cor baseada na situação
                let situacaoClass = 'situacao-';
                let situacaoText = '';

                switch(event.situacao) {
                    case 'AGENDADO':
                        situacaoClass += 'agendado';
                        situacaoText = 'Agendado';
                        break;
                    case 'CONCLUIDO':
                        situacaoClass += 'concluido';
                        situacaoText = 'Concluído';
                        break;
                    case 'CANCELADO':
                        situacaoClass += 'cancelado';
                        situacaoText = 'Cancelado';
                        break;
                    default:
                        situacaoClass += 'agendado';
                        situacaoText = 'Agendado';
                }

                htmlContent += `
                    <div class="event-item ${situacaoClass}">
                        <div class="event-header">
                            <div class="event-time-title">
                                <span class="modal-event-time">${event.time}</span>
                                <span class="modal-event-title">${event.title}</span>
                            </div>
                            <span class="event-situation ${situacaoClass}">${situacaoText}</span>
                        </div>
                        <p class="modal-event-description">${event.details}</p>
                        ${arquivosHTML}
                    </div>
                `;
            }
            htmlContent += '</div>';
            modalDetails.innerHTML = htmlContent;
        } else {
            modalDetails.innerHTML = '<div class="no-events"><p>📅 Nenhum evento agendado para este dia.</p></div>';
        }

        modal.style.display = 'block';

        // Adiciona estilos dinâmicos para melhor visualização
        setTimeout(() => {
            const eventItems = modalDetails.querySelectorAll('.event-item');
            eventItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    function closeModal() {
        modal.style.display = 'none';
        modalDetails.innerHTML = '';
    }

    // 5. Renderiza a estrutura básica do calendário
    function renderCalendarDOM(month, year) {
        daysGrid.innerHTML = '';
        monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1);
        let startDayOfWeek = firstDayOfMonth.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const todayDay = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        const daysFromPrevMonth = startDayOfWeek;
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        // Dias do mês anterior
        for (let i = 0; i < daysFromPrevMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'day-other-month');
            dayElement.textContent = prevMonthLastDay - daysFromPrevMonth + i + 1;
            daysGrid.appendChild(dayElement);
        }

        // Dias do mês atual
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'day-current-month');
            dayElement.textContent = i;

            const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
            dayElement.setAttribute('data-day', i);
            dayElement.setAttribute('data-date', dateKey);

            // Destaca o dia de hoje
            if (i === todayDay && month === todayMonth && year === todayYear) {
                dayElement.classList.add('day-today');
            }

            // Adiciona o Listener de clique para abrir o Modal
            dayElement.addEventListener('click', () => {
                if (!dayElement.classList.contains('day-other-month')) {
                    openModal(dateKey, i, month, year);
                }
            });

            daysGrid.appendChild(dayElement);
        }

        // Dias do próximo mês
        const totalDaysRendered = daysFromPrevMonth + daysInMonth;
        const daysRemaining = 42 - totalDaysRendered;

        for (let i = 1; i <= daysRemaining; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'day-other-month');
            dayElement.textContent = i;
            daysGrid.appendChild(dayElement);
        }
    }

    // 6. Funções de Navegação
    function goToNextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        fetchAndRenderEvents(currentMonth, currentYear);
    }

    function goToPrevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        fetchAndRenderEvents(currentMonth, currentYear);
    }

    // --- Listeners de Eventos Globais ---
    prevBtn.addEventListener('click', goToPrevMonth);
    nextBtn.addEventListener('click', goToNextMonth);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Adiciona evento para fechar modal com ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Inicializa a agenda, buscando eventos do backend
    await fetchAndRenderEvents(currentMonth, currentYear);
}

// Função para formatar tamanho do arquivo
function formatarTamanho(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Adiciona estilos dinâmicos para melhor UX
const style = document.createElement('style');
style.textContent = `
    .events-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .event-time-title {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .no-events {
        text-align: center;
        padding: 40px;
        color: #666;
        font-size: 1.2em;
    }
    
    .no-events p {
        margin: 0;
    }
    
    .event-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .user-info {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
        .event-time-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
        }
        
        .user-info {
            font-size: 0.8rem;
            margin-right: 10px;
        }
    }
`;
document.head.appendChild(style);


function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}