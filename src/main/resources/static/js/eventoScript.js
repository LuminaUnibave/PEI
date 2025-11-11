document.addEventListener('DOMContentLoaded', () => {
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

    // --- VARIÁVEL DE CONFIGURAÇÃO DA API ---
    const API_BASE_URL = 'http://localhost:8081'; // Porta 8081 mantida conforme seu último snippet
    
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
    // REMOVIDO: const addEventBtn = document.getElementById('add-event-btn'); 
    
    // 1. Função principal: Busca eventos na API
    async function fetchAndRenderEvents(month, year) {
        monthlyEvents = {}; 

        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0); 
        
        const formatDateTime = (date, isEnd) => {
             const day = date.getDate().toString().padStart(2, '0');
             const monthIndex = (date.getMonth() + 1).toString().padStart(2, '0');
             const yearFull = date.getFullYear();
             const time = isEnd ? '23:59:59' : '00:00:00'; 
             return `${yearFull}-${monthIndex}-${day}T${time}`; 
        };

        const dataInicial = formatDateTime(startDate, false);
        const dataFinal = formatDateTime(endDate, true);

        const eventosUrl = `${API_BASE_URL}/evento/buscar/dtEvento/entre?depois=${dataInicial}&antes=${dataFinal}`;
        const agendamentosUrl = `${API_BASE_URL}/agendamento/buscar/entre?depois=${dataInicial}&antes=${dataFinal}`;
        
        try {
            const [eventosResponse, agendamentosResponse] = await Promise.all([
                fetch(eventosUrl),
                fetch(agendamentosUrl)
            ]);

            const eventosData = eventosResponse.ok ? await eventosResponse.json() : [];
            const agendamentosData = agendamentosResponse.ok ? await agendamentosResponse.json() : [];
            
            const normalize = (data) => Array.isArray(data) ? (Array.isArray(data[0]) ? data[0] : data) : [];

            const combinedData = [...normalize(eventosData), ...normalize(agendamentosData)];
            
            processAndStoreEvents(combinedData);
            
            renderCalendarDOM(month, year);
            addHighlightsToDays();

        } catch (error) {
            console.error("Erro ao carregar dados do backend. Verifique o servidor e o CORS.", error); 
            renderCalendarDOM(month, year); 
        }
    }

    // 2. Processa os dados brutos da API e armazena
    function processAndStoreEvents(data) {
        data.forEach(item => {
            let dateKey = '';
            let title = '';
            let details = '';
            let dateTime = '';

            if (item.dtEvento) {
                [dateKey, dateTime] = item.dtEvento.split('T');
                title = item.nmEvento || 'Evento';
                details = item.descricao || 'Sem descrição.';
            } else if (item.dtAgendamento) {
                [dateKey, dateTime] = item.dtAgendamento.split('T');
                
                const pacienteNome = item.paciente && item.paciente.nome ? item.paciente.nome : `ID ${item.paciente ? item.paciente.id : '?'}`;
                
                title = `Agendamento c/ ${pacienteNome}`;
                details = `Tipo: ${item.tpVisita || 'Não especificado'}.`;
            }

            if (dateKey) {
                if (!monthlyEvents[dateKey]) {
                    monthlyEvents[dateKey] = [];
                }
                monthlyEvents[dateKey].push({ 
                    time: dateTime.substring(0, 5), 
                    title, 
                    details, 
                    rawData: item 
                });
            }
        });
    }

    // 3. Adiciona a classe de destaque aos dias com eventos
    function addHighlightsToDays() {
        Object.keys(monthlyEvents).forEach(dateKey => {
            const day = new Date(dateKey + 'T12:00:00').getDate(); 
            const dayElement = daysGrid.querySelector(`.day-current-month[data-day="${day}"]`);

            if (dayElement) {
                dayElement.classList.add('event-highlight');
                const eventIcon = document.createElement('div');
                eventIcon.classList.add('event-icon');
                dayElement.appendChild(eventIcon);
            }
        });
    }

    // 4. Funções do Modal
    function openModal(dateKey, dayNum, monthIndex, year) {
        selectedDateKey = dateKey; 
        
        modalDate.textContent = `${dayNum} de ${monthNames[monthIndex]} de ${year}`;
        modalDetails.innerHTML = '';
        
        const events = monthlyEvents[dateKey]; 

        if (events && events.length > 0) {
            let htmlContent = '<ul>';
            events.sort((a, b) => a.time.localeCompare(b.time)); 
            events.forEach(event => {
                htmlContent += `
                    <li>
                        <span class="modal-event-time">${event.time}</span> - 
                        <span class="modal-event-title">${event.title}</span>
                        <p class="modal-event-description">${event.details}</p>
                    </li>
                `;
            });
            htmlContent += '</ul>';
            modalDetails.innerHTML = htmlContent;
        } else {
            modalDetails.innerHTML = '<p>Nenhum evento agendado para este dia.</p>';
        }
        
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
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

    // Inicializa a agenda, buscando eventos do backend
    fetchAndRenderEvents(currentMonth, currentYear);
});