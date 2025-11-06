document.addEventListener('DOMContentLoaded', () => {
    // --- Configuração da API ---
    const API_BASE_URL = 'http://localhost:8080';
    const form = document.getElementById('event-form');
    const tipoSelect = document.getElementById('tipo');
    const dtAgendamentoInput = document.getElementById('dtAgendamento');
    const idUsuarioInput = document.getElementById('idUsuario');
    const messageArea = document.getElementById('message-area');
    
    // Elementos condicinais
    const pacienteGroup = document.getElementById('paciente-group');
    const tpVisitaGroup = document.getElementById('tpVisita-group');
    const nmEventoGroup = document.getElementById('nmEvento-group');

    // --- FUNÇÕES DE UTILIDADE ---
    
    // Função para ler o parâmetro 'data' da URL e preencher o campo
    function preencherDataDaURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const dataSelecionada = urlParams.get('data'); // Formato: YYYY-MM-DD

        if (dataSelecionada) {
            // Preenche o campo datetime-local (YYYY-MM-DDT10:00)
            dtAgendamentoInput.value = `${dataSelecionada}T10:00`; 
        }
    }

    // Função para controlar a exibição dos campos de Agendamento vs. Evento
    function toggleFields() {
        const tipo = tipoSelect.value;
        
        // Esconder todos e limpar 'required'
        pacienteGroup.style.display = 'none';
        tpVisitaGroup.style.display = 'none';
        nmEventoGroup.style.display = 'none';
        document.getElementById('idPaciente').removeAttribute('required');
        document.getElementById('tpVisita').removeAttribute('required');
        document.getElementById('nmEvento').removeAttribute('required');

        if (tipo === 'AGENDAMENTO') {
            pacienteGroup.style.display = 'block';
            tpVisitaGroup.style.display = 'block';
            document.getElementById('idPaciente').setAttribute('required', 'required');
            document.getElementById('tpVisita').setAttribute('required', 'required');
        } else if (tipo === 'EVENTO') {
            nmEventoGroup.style.display = 'block';
            document.getElementById('nmEvento').setAttribute('required', 'required');
        }
    }

    // Exibe mensagem de erro ou sucesso
    function showMessage(message, isError = false) {
        messageArea.textContent = message;
        messageArea.className = isError ? 'error' : 'success';
        messageArea.style.display = 'block';
        setTimeout(() => {
            messageArea.style.display = 'none';
        }, 5000);
    }
    
    // --- FUNÇÃO DE SUBMISSÃO (POST) ---

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        messageArea.style.display = 'none';
        
        const tipo = tipoSelect.value;
        const idUsuario = idUsuarioInput.value;
        
        let payload = {
            // Adiciona segundos para o LocalDateTime: 2025-11-05T10:00:00
            dtAgendamento: dtAgendamentoInput.value + ':00', 
            observacao: document.getElementById('descricao').value,
            idUsuario: parseInt(idUsuario),
        };

        let endpoint = '';
        
        if (tipo === 'AGENDAMENTO') {
            // Rota: /agendamento/salvar
            endpoint = `${API_BASE_URL}/agendamento/salvar`;
            
            payload.idPaciente = parseInt(document.getElementById('idPaciente').value);
            payload.tpVisita = document.getElementById('tpVisita').value;
            
        } else if (tipo === 'EVENTO') {
            // Rota: /evento/salvar
            endpoint = `${API_BASE_URL}/evento/salvar`;
            
            payload.nmEvento = document.getElementById('nmEvento').value;
            payload.descricao = payload.observacao; // Usa observacao como descricao para o Evento
            delete payload.observacao; // Remove observacao se a API só espera descricao
        } else {
            showMessage("Selecione um tipo de registro válido.", true);
            return;
        }
        
        // 3. Chamada da API
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Incluir JWT aqui se o endpoint for seguro
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                showMessage(`✅ ${tipo} salvo com sucesso! Redirecionando...`, false);
                // Redireciona para a agenda após 2 segundos
                setTimeout(() => {
                    window.location.href = '../html/evento.html';
                }, 2000);
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Erro de formatação JSON.' }));
                showMessage(`❌ Erro ao salvar (${response.status}): ${errorData.message || 'Verifique o console.'}`, true);
                console.error("Erro da API:", errorData);
            }

        } catch (error) {
            showMessage("❌ Erro de conexão com o servidor. Tente novamente.", true);
            console.error("Erro de rede/conexão:", error);
        }
    });

    // --- LISTENERS INICIAIS ---
    
    // 1. Inicializa o preenchimento da data
    preencherDataDaURL();
    
    // 2. Inicializa o controle de campos
    tipoSelect.addEventListener('change', toggleFields);
    toggleFields(); 

    // 3. Botão Voltar
    document.getElementById('btn-voltar').addEventListener('click', () => {
        // Volta para a página da agenda (evento.html)
        window.location.href = '../html/evento.html'; 
    });
});