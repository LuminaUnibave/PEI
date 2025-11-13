class LuminaApp {
    constructor() {
        this.authService = new AuthService();
        this.usuarioService = new UsuarioService();
        this.pacienteService = new PacienteService();
        this.agendamentoService = new AgendamentoService();
        this.eventoService = new EventoService();
        this.arquivoService = new ArquivoService();
        this.dashboardService = new DashboardService();
        this.router = new Router();
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuth();
    }

    bindEvents() {
        // Login/Cadastro
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm').addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('showRegisterBtn').addEventListener('click', () => this.showRegister());
        document.getElementById('showLoginBtn').addEventListener('click', () => this.showLogin());

        // Dashboard
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        document.getElementById('novoPacienteBtn').addEventListener('click', () => this.showNovoPacienteModal());
        document.getElementById('novoAgendamentoBtn').addEventListener('click', () => this.showNovoAgendamentoModal());
        document.getElementById('novoEventoBtn').addEventListener('click', () => this.showNovoEventoModal());

        // Modal
        document.getElementById('modalClose').addEventListener('click', () => this.hideModal());
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modalOverlay')) {
                this.hideModal();
            }
        });
    }

    checkAuth() {
        try {
            const isAuthenticated = this.authService.isAuthenticated();
            console.log('CheckAuth - Autenticado:', isAuthenticated);

            if (isAuthenticated) {
                this.showDashboard();
            } else {
                this.showAuth();
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            this.showAuth();
        }
    }

    showObservacaoPopup(texto) {
        this.router.showObservacaoPopup(texto);
    }

    hideObservacaoPopup() {
        this.router.hideObservacaoPopup();
    }

    showDescricaoPopup(texto) {
        this.router.showDescricaoPopup(texto);
    }

    hideDescricaoPopup() {
        this.router.hideDescricaoPopup();
    }

    async handleLogin(event) {
        event.preventDefault();

        Utils.clearErrors();
        Utils.hideMessage();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        if (!email || !senha) {
            Utils.showMessage('Por favor, preencha todos os campos');
            return;
        }

        if (!Utils.validateEmail(email)) {
            Utils.showMessage('Por favor, insira um e-mail válido');
            return;
        }

        Utils.setLoading(true, 'loginBtn');

        try {
            console.log('=== INICIANDO LOGIN ===');
            console.log('Email:', email);

            // Primeiro tenta login normal
            let result = await this.authService.login(email, senha);

            // Se falhar, tenta login básico
            if (!result.success) {
                console.log('Login normal falhou, tentando login básico...');
                result = await this.authService.loginBasico(email, senha);
            }

            console.log('Resultado final do login:', result);

            if (result.success) {
                Utils.showMessage('Login realizado com sucesso!', 'success');

                // Debug do status de autenticação
                this.authService.debugAuthStatus();

                // Pequeno delay para mostrar a mensagem de sucesso
                setTimeout(() => {
                    this.showDashboard();
                }, 1000);
            } else {
                Utils.showMessage(result.error || 'Erro ao fazer login');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            Utils.showMessage('Erro inesperado ao fazer login: ' + error.message);
        } finally {
            Utils.setLoading(false, 'loginBtn');
        }
    }

    async handleRegister(event) {
        event.preventDefault();

        Utils.clearErrors();
        document.getElementById('registerMessage').style.display = 'none';

        const nome = document.getElementById('regNome').value;
        const email = document.getElementById('regEmail').value;
        const senha = document.getElementById('regSenha').value;
        const confirmarSenha = document.getElementById('regConfirmarSenha').value;

        if (!nome || !email || !senha || !confirmarSenha) {
            this.showRegisterMessage('Por favor, preencha todos os campos', 'error');
            return;
        }

        if (senha !== confirmarSenha) {
            this.showRegisterMessage('As senhas não coincidem', 'error');
            return;
        }

        if (senha.length < 6) {
            this.showRegisterMessage('A senha deve ter pelo menos 6 caracteres', 'error');
            return;
        }

        Utils.setLoading(true, 'registerBtn');

        try {
            const result = await this.usuarioService.cadastrarVisitante({
                nome: nome,
                email: email,
                senha: senha
            });

            if (result.success) {
                this.showRegisterMessage(result.message, 'success');

                // FAZ LOGIN AUTOMÁTICO APÓS O CADASTRO
                if (result.usuario) {
                    console.log('Fazendo login automático com usuário criado:', result.usuario);

                    // Simula o login salvando os dados do usuário
                    this.authService.setUserData({
                        id: result.usuario.id,
                        nome: result.usuario.nome,
                        email: result.usuario.email,
                        tpUsuario: result.usuario.tpUsuario
                    });

                    setTimeout(() => {
                        this.showDashboard();
                    }, 2000);
                } else {
                    // Se não veio o usuário na resposta, volta para login
                    setTimeout(() => {
                        this.showLogin();
                    }, 2000);
                }
            } else {
                this.showRegisterMessage(result.error, 'error');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
            this.showRegisterMessage('Erro inesperado ao criar conta', 'error');
        } finally {
            Utils.setLoading(false, 'registerBtn');
        }
    }

    showLogin() {
        document.getElementById('loginCard').style.display = 'block';
        document.getElementById('registerCard').style.display = 'none';
        Utils.hideMessage();
        document.getElementById('registerMessage').style.display = 'none';
    }

    showRegister() {
        document.getElementById('loginCard').style.display = 'none';
        document.getElementById('registerCard').style.display = 'block';
        Utils.hideMessage();
        document.getElementById('registerMessage').style.display = 'none';
        this.clearRegisterForm();
    }

    clearRegisterForm() {
        document.getElementById('registerForm').reset();
        Utils.clearErrors();
    }

    showRegisterMessage(message, type) {
        const messageEl = document.getElementById('registerMessage');
        messageEl.textContent = message;
        messageEl.className = `message ${type}`;
        messageEl.style.display = 'block';
    }

    showDashboard() {
        console.log('Mostrando dashboard...');

        // Esconde a tela de auth
        document.getElementById('authScreen').classList.remove('active');

        // Mostra a tela do dashboard
        document.getElementById('dashboardScreen').classList.add('active');

        // Atualiza o nome do usuário no header
        const userData = this.authService.getUserData();
        if (userData && userData.nome) {
            document.getElementById('userName').textContent = userData.nome;
        } else {
            document.getElementById('userName').textContent = 'Usuário';
        }

        console.log('Dashboard mostrado, usuário:', userData);

        // Carrega os dados iniciais
        this.router.showSection('pacientes');
    }

    showAuth() {
        console.log('Mostrando tela de autenticação...');

        // Esconde o dashboard
        document.getElementById('dashboardScreen').classList.remove('active');

        // Mostra a tela de auth
        document.getElementById('authScreen').classList.add('active');

        // Garante que mostra o login
        this.showLogin();

        console.log('Tela de autenticação mostrada');
    }

    handleLogout() {
        this.authService.logout();
        this.showAuth();
    }

    showModal(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        document.getElementById('modalOverlay').style.display = 'flex';
    }

    hideModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    }

    parseBackendDate(dateData) {
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

    formatDateTimeForInput(dateData) {
        if (!dateData) return '';

        try {
            const date = this.parseBackendDate(dateData);

            if (!date || isNaN(date.getTime())) {
                console.warn('Data inválida para formatação:', dateData);
                return '';
            }

            // Formata para o formato esperado pelo input datetime-local (YYYY-MM-DDTHH:MM)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${year}-${month}-${day}T${hours}:${minutes}`;
        } catch (error) {
            console.error('Erro ao formatar data:', error, dateData);
            return '';
        }
    }

    // ========== PACIENTES ==========
    showNovoPacienteModal() {
        const content = `
        <form id="pacienteForm">
            <div class="form-grid">
                <div class="form-group">
                    <label for="pacienteNome">Nome *</label>
                    <input type="text" id="pacienteNome" required>
                </div>
                <div class="form-group">
                    <label for="pacienteSobrenome">Sobrenome</label>
                    <input type="text" id="pacienteSobrenome">
                </div>
                <div class="form-group">
                    <label for="pacienteCpf">CPF *</label>
                    <input type="text" id="pacienteCpf" required>
                </div>
                <div class="form-group">
                    <label for="pacienteEmail">Email</label>
                    <input type="email" id="pacienteEmail">
                </div>
                <div class="form-group">
                    <label for="pacienteDtNascimento">Data Nascimento *</label>
                    <input type="date" id="pacienteDtNascimento" required>
                </div>
                <div class="form-group">
                    <label for="pacienteCrtSus">Cartão SUS</label>
                    <input type="text" id="pacienteCrtSus">
                </div>
                <div class="form-group">
                    <label for="pacienteContato">Contato</label>
                    <input type="text" id="pacienteContato">
                </div>
                <div class="form-group">
                    <label for="pacienteSituacao">Situação *</label>
                    <select id="pacienteSituacao" required>
                        <option value="ATIVO">Ativo</option>
                        <option value="PENDENTE">Pendente</option>
                    </select>
                </div>
            </div>
            <div class="modal-actions">
                <button type="submit" class="btn-primary">Salvar</button>
                <button type="button" class="btn-secondary" onclick="app.hideModal()">Cancelar</button>
            </div>
        </form>
    `;
        this.showModal('Novo Paciente', content);

        document.getElementById('pacienteForm').addEventListener('submit', (e) => this.salvarPaciente(e));
    }

    async salvarPaciente(event) {
        event.preventDefault();

        const userId = this.authService.getUserId();
        if (!userId) {
            Utils.showNotification('Usuário não autenticado', 'error');
            return;
        }

        const pacienteData = {
            nome: document.getElementById('pacienteNome').value,
            sobrenome: document.getElementById('pacienteSobrenome').value,
            cpf: document.getElementById('pacienteCpf').value,
            email: document.getElementById('pacienteEmail').value,
            dtNascimento: document.getElementById('pacienteDtNascimento').value,
            crtSus: document.getElementById('pacienteCrtSus').value,
            contato: document.getElementById('pacienteContato').value,
            situacao: document.getElementById('pacienteSituacao').value
        };

        try {
            await this.pacienteService.salvar(pacienteData, userId);
            Utils.showNotification('Paciente salvo com sucesso!');
            this.hideModal();

            // Atualizar os dados do dashboard
            await this.dashboardService.atualizarDashboard();
            this.router.loadPacientesData();

        } catch (error) {
            console.error('Erro ao salvar paciente:', error);
            Utils.showNotification('Erro ao salvar paciente', 'error');
        }
    }

    async editarPaciente(id) {
        try {
            const paciente = await this.pacienteService.buscarPorId(id);
            const userId = this.authService.getUserId();

            if (!userId) {
                Utils.showNotification('Usuário não autenticado', 'error');
                return;
            }

            const content = `
            <form id="pacienteForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="pacienteNome">Nome *</label>
                        <input type="text" id="pacienteNome" value="${paciente.nome || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="pacienteSobrenome">Sobrenome</label>
                        <input type="text" id="pacienteSobrenome" value="${paciente.sobrenome || ''}">
                    </div>
                    <div class="form-group">
                        <label for="pacienteCpf">CPF *</label>
                        <input type="text" id="pacienteCpf" value="${paciente.cpf || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="pacienteEmail">Email</label>
                        <input type="email" id="pacienteEmail" value="${paciente.email || ''}">
                    </div>
                    <div class="form-group">
                        <label for="pacienteDtNascimento">Data Nascimento *</label>
                        <input type="date" id="pacienteDtNascimento" value="${paciente.dtNascimento || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="pacienteCrtSus">Cartão SUS</label>
                        <input type="text" id="pacienteCrtSus" value="${paciente.crtSus || ''}">
                    </div>
                    <div class="form-group">
                        <label for="pacienteContato">Contato</label>
                        <input type="text" id="pacienteContato" value="${paciente.contato || ''}">
                    </div>
                    <div class="form-group">
                        <label for="pacienteSituacao">Situação *</label>
                        <select id="pacienteSituacao" required>
                            <option value="ATIVO" ${paciente.situacao === 'ATIVO' ? 'selected' : ''}>Ativo</option>
                            <option value="PENDENTE" ${paciente.situacao === 'PENDENTE' ? 'selected' : ''}>Pendente</option>
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn-primary">Atualizar</button>
                    <button type="button" class="btn-secondary" onclick="app.hideModal()">Cancelar</button>
                </div>
            </form>
        `;
            this.showModal('Editar Paciente', content);

            document.getElementById('pacienteForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const updatedData = {
                    id: id,
                    nome: document.getElementById('pacienteNome').value,
                    sobrenome: document.getElementById('pacienteSobrenome').value,
                    cpf: document.getElementById('pacienteCpf').value,
                    email: document.getElementById('pacienteEmail').value,
                    dtNascimento: document.getElementById('pacienteDtNascimento').value,
                    crtSus: document.getElementById('pacienteCrtSus').value,
                    contato: document.getElementById('pacienteContato').value,
                    situacao: document.getElementById('pacienteSituacao').value
                };

                try {
                    await this.pacienteService.atualizar(updatedData, userId);
                    Utils.showNotification('Paciente atualizado com sucesso!');
                    this.hideModal();
                    this.router.loadPacientesData();
                } catch (error) {
                    console.error('Erro ao atualizar paciente:', error);
                    Utils.showNotification('Erro ao atualizar paciente', 'error');
                }
            });
        } catch (error) {
            console.error('Erro ao carregar paciente:', error);
            Utils.showNotification('Erro ao carregar paciente', 'error');
        }
    }

    // ========== EXCLUIR PACIENTE ==========
    async deletarPaciente(id) {
        if (confirm('Tem certeza que deseja excluir este paciente?')) {
            try {
                await this.pacienteService.deletar(id);
                Utils.showNotification('Paciente excluído com sucesso!');

                // Atualizar os dados do dashboard
                await this.dashboardService.atualizarDashboard();
                this.router.loadPacientesData();

            } catch (error) {
                console.error('Erro ao excluir paciente:', error);

                if (error.message.includes('não autenticado')) {
                    Utils.showNotification('Usuário não autenticado. Faça login novamente.', 'error');
                    this.handleLogout();
                } else if (error.message.includes('possui agendamentos')) {
                    Utils.showNotification('Não é possível excluir paciente que possui agendamentos ativos.', 'error');
                } else {
                    Utils.showNotification('Erro ao excluir paciente: ' + error.message, 'error');
                }
            }
        }
    }

    // ========== AGENDAMENTOS ==========
    async showNovoAgendamentoModal() {
        try {
            // Busca pacientes para o dropdown
            const pacientes = await this.agendamentoService.buscarPacientesParaAgendamento();

            let pacientesOptions = '<option value="">Selecione um paciente</option>';
            pacientes.forEach(paciente => {
                pacientesOptions += `<option value="${paciente.id}">${paciente.nome} ${paciente.sobrenome || ''} - ${paciente.cpf || 'Sem CPF'}</option>`;
            });

            const content = `
                <form id="agendamentoForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="agendamentoPacienteId">Paciente *</label>
                            <select id="agendamentoPacienteId" required>
                                ${pacientesOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="agendamentoTpVisita">Tipo de Visita *</label>
                            <select id="agendamentoTpVisita" required>
                                <option value="VISITA">Visita</option>
                                <option value="CONSULTA">Consulta</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="agendamentoData">Data e Hora *</label>
                            <input type="datetime-local" id="agendamentoData" required>
                        </div>
                        <div class="form-group full-width">
                            <label for="agendamentoObservacao">Observações</label>
                            <textarea id="agendamentoObservacao" rows="3" placeholder="Observações sobre o agendamento..."></textarea>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn-primary">Salvar</button>
                        <button type="button" class="btn-secondary" onclick="app.hideModal()">Cancelar</button>
                    </div>
                </form>
            `;
            this.showModal('Novo Agendamento', content);

            document.getElementById('agendamentoForm').addEventListener('submit', (e) => this.salvarAgendamento(e));
        } catch (error) {
            console.error('Erro ao carregar pacientes:', error);
            Utils.showNotification('Erro ao carregar lista de pacientes', 'error');
        }
    }

    async salvarAgendamento(event) {
        event.preventDefault();

        const userId = this.authService.getUserId();
        if (!userId) {
            Utils.showNotification('Usuário não autenticado', 'error');
            return;
        }

        const pacienteSelect = document.getElementById('agendamentoPacienteId');
        const pacienteId = pacienteSelect.value;

        if (!pacienteId) {
            Utils.showNotification('Selecione um paciente', 'error');
            return;
        }

        // Formatar a data corretamente para o backend
        const dataInput = document.getElementById('agendamentoData').value;
        const observacoes = document.getElementById('agendamentoObservacao').value;

        const agendamentoData = {
            idPaciente: parseInt(pacienteId),
            tpVisita: document.getElementById('agendamentoTpVisita').value,
            dtAgendamento: dataInput, // Já está no formato correto para o input datetime-local
            observacao: observacoes || null // Garantir que seja null se vazio
        };

        console.log('Dados completos do agendamento a serem salvos:', agendamentoData);

        try {
            const agendamentoSalvo = await this.agendamentoService.salvar(agendamentoData, userId);
            console.log('Agendamento salvo:', agendamentoSalvo);

            Utils.showNotification('Agendamento salvo com sucesso!');

            await this.dashboardService.atualizarDashboard();

            // Pergunta se deseja adicionar arquivo
            if (confirm('Deseja adicionar um arquivo a este agendamento?')) {
                this.hideModal();
                this.adicionarArquivoAgendamento(agendamentoSalvo.id);
            } else {
                this.hideModal();
                this.router.loadAgendamentosData();
            }
        } catch (error) {
            console.error('Erro ao salvar agendamento:', error);
            Utils.showNotification('Erro ao salvar agendamento: ' + error.message, 'error');
        }
    }

    async editarAgendamento(id) {
        try {
            const agendamento = await this.agendamentoService.buscarPorId(id);
            const pacientes = await this.agendamentoService.buscarPacientesParaAgendamento();
            const userId = this.authService.getUserId();

            if (!userId) {
                Utils.showNotification('Usuário não autenticado', 'error');
                return;
            }

            console.log('Agendamento carregado para edição:', agendamento);

            let pacientesOptions = '<option value="">Selecione um paciente</option>';
            pacientes.forEach(paciente => {
                const selected = paciente.id === agendamento.idPaciente ? 'selected' : '';
                pacientesOptions += `<option value="${paciente.id}" ${selected}>${paciente.nome} ${paciente.sobrenome || ''} - ${paciente.cpf || 'Sem CPF'}</option>`;
            });

            const formattedDate = this.formatDateTimeForInput(agendamento.dtAgendamento);
            console.log('Data formatada para input:', formattedDate);

            const content = `
        <form id="agendamentoForm">
            <div class="form-grid">
                <div class="form-group">
                    <label for="agendamentoPacienteId">Paciente *</label>
                    <select id="agendamentoPacienteId" required>
                        ${pacientesOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="agendamentoTpVisita">Tipo de Visita *</label>
                    <select id="agendamentoTpVisita" required>
                        <option value="VISITA" ${agendamento.tpVisita === 'VISITA' ? 'selected' : ''}>Visita</option>
                        <option value="CONSULTA" ${agendamento.tpVisita === 'CONSULTA' ? 'selected' : ''}>Consulta</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="agendamentoData">Data e Hora *</label>
                    <input type="datetime-local" id="agendamentoData" value="${formattedDate}" required>
                </div>
                <div class="form-group full-width">
                    <label for="agendamentoObservacao">Observações</label>
                    <textarea id="agendamentoObservacao" rows="3" placeholder="Observações sobre o agendamento...">${agendamento.observacoes || ''}</textarea>
                </div>
            </div>
            <div class="modal-actions">
                <button type="submit" class="btn-primary">Atualizar</button>
                <button type="button" class="btn-secondary" onclick="app.hideModal()">Cancelar</button>
            </div>
        </form>
    `;
            this.showModal('Editar Agendamento', content);

            document.getElementById('agendamentoForm').addEventListener('submit', async (e) => {
                e.preventDefault();

                const pacienteId = document.getElementById('agendamentoPacienteId').value;
                const dataInput = document.getElementById('agendamentoData').value;
                const observacoes = document.getElementById('agendamentoObservacao').value;

                const updatedData = {
                    id: id,
                    idPaciente: parseInt(pacienteId),
                    tpVisita: document.getElementById('agendamentoTpVisita').value,
                    dtAgendamento: dataInput,
                    observacao: observacoes || null
                };

                console.log('Dados do agendamento a serem atualizados:', updatedData);

                try {
                    await this.agendamentoService.atualizar(updatedData, userId);
                    Utils.showNotification('Agendamento atualizado com sucesso!');
                    this.hideModal();
                    this.router.loadAgendamentosData();
                } catch (error) {
                    console.error('Erro ao atualizar agendamento:', error);
                    Utils.showNotification('Erro ao atualizar agendamento: ' + error.message, 'error');
                }
            });
        } catch (error) {
            console.error('Erro ao carregar agendamento:', error);
            Utils.showNotification('Erro ao carregar agendamento: ' + error.message, 'error');
        }
    }

    async deletarAgendamento(id) {
        if (confirm('Tem certeza que deseja excluir este agendamento?')) {
            try {
                await this.agendamentoService.deletar(id);
                Utils.showNotification('Agendamento excluído com sucesso!');
                this.router.loadAgendamentosData();
            } catch (error) {
                console.error('Erro ao excluir agendamento:', error);
                Utils.showNotification('Erro ao excluir agendamento', 'error');
            }
        }
    }

    // ========== ARQUIVOS - AGENDAMENTOS ==========
    async adicionarArquivoAgendamento(agendamentoId) {
        // Cria um input file oculto
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        fileInput.accept = '*/*';

        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                Utils.showNotification('Enviando arquivo...', 'success');
                await this.arquivoService.uploadArquivo(file, agendamentoId, 'AGENDAMENTO');
                Utils.showNotification('Arquivo adicionado com sucesso!');
                this.router.loadAgendamentosData();
            } catch (error) {
                console.error('Erro ao adicionar arquivo:', error);
                Utils.showNotification('Erro ao adicionar arquivo: ' + error.message, 'error');
            } finally {
                // Remove o input do DOM
                document.body.removeChild(fileInput);
            }
        });

        // Adiciona ao DOM e dispara o clique
        document.body.appendChild(fileInput);
        fileInput.click();
    }

    async verArquivosAgendamento(agendamentoId) {
        try {
            const arquivos = await this.arquivoService.listarPorEntidade(agendamentoId, 'AGENDAMENTO');

            if (arquivos.length === 0) {
                Utils.showNotification('Nenhum arquivo encontrado para este agendamento', 'warning');
                return;
            }

            if (arquivos.length === 1) {
                // Se tiver apenas um arquivo, faz download direto
                await this.downloadArquivo(arquivos[0].id);
            } else {
                // Se tiver múltiplos arquivos, baixa todos
                Utils.showNotification(`Iniciando download de ${arquivos.length} arquivos...`, 'success');
                for (let arquivo of arquivos) {
                    await this.downloadArquivo(arquivo.id);
                    // Pequeno delay entre downloads
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        } catch (error) {
            console.error('Erro ao carregar arquivos:', error);
            Utils.showNotification('Erro ao carregar arquivos: ' + error.message, 'error');
        }
    }

    // ========== EVENTOS ==========
    showNovoEventoModal() {
        const content = `
        <form id="eventoForm">
            <div class="form-grid">
                <div class="form-group">
                    <label for="eventoNome">Nome do Evento *</label>
                    <input type="text" id="eventoNome" required>
                </div>
                <div class="form-group">
                    <label for="eventoData">Data e Hora *</label>
                    <input type="datetime-local" id="eventoData" required>
                </div>
                <div class="form-group full-width">
                    <label for="eventoDescricao">Descrição *</label>
                    <textarea id="eventoDescricao" rows="3" placeholder="Descrição do evento..." required></textarea>
                </div>
            </div>
            <div class="modal-actions">
                <button type="submit" class="btn-primary">Salvar</button>
                <button type="button" class="btn-secondary" onclick="app.hideModal()">Cancelar</button>
            </div>
        </form>
    `;
        this.showModal('Novo Evento', content);

        document.getElementById('eventoForm').addEventListener('submit', (e) => this.salvarEvento(e));
    }

    async salvarEvento(event) {
        event.preventDefault();

        const userId = this.authService.getUserId();
        if (!userId) {
            Utils.showNotification('Usuário não autenticado', 'error');
            return;
        }

        const eventoData = {
            nmEvento: document.getElementById('eventoNome').value,
            dtEvento: document.getElementById('eventoData').value,
            descricao: document.getElementById('eventoDescricao').value
        };

        console.log('Dados do evento a serem salvos:', eventoData);

        try {
            const eventoSalvo = await this.eventoService.salvar(eventoData, userId);
            Utils.showNotification('Evento salvo com sucesso!');

            await this.dashboardService.atualizarDashboard();

            // Pergunta se deseja adicionar arquivo
            if (confirm('Deseja adicionar um arquivo a este evento?')) {
                this.hideModal();
                this.adicionarArquivoEvento(eventoSalvo.id);
            } else {
                this.hideModal();
                this.router.loadEventosData();
            }
        } catch (error) {
            console.error('Erro ao salvar evento:', error);
            Utils.showNotification('Erro ao salvar evento: ' + error.message, 'error');
        }
    }

    async editarEvento(id) {
        try {
            const evento = await this.eventoService.buscarPorId(id);
            const userId = this.authService.getUserId();

            if (!userId) {
                Utils.showNotification('Usuário não autenticado', 'error');
                return;
            }

            console.log('Evento carregado para edição:', evento);

            const formattedDate = this.formatDateTimeForInput(evento.dtEvento);
            console.log('Data do evento formatada:', formattedDate);

            const content = `
            <form id="eventoForm">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="eventoNome">Nome do Evento *</label>
                        <input type="text" id="eventoNome" value="${evento.nmEvento || ''}" required>
                    </div>
                    <div class="form-group">
                        <label for="eventoData">Data e Hora *</label>
                        <input type="datetime-local" id="eventoData" value="${formattedDate}" required>
                    </div>
                    <div class="form-group full-width">
                        <label for="eventoDescricao">Descrição *</label>
                        <textarea id="eventoDescricao" rows="3" required>${evento.descricao || ''}</textarea>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="btn-primary">Atualizar</button>
                    <button type="button" class="btn-secondary" onclick="app.hideModal()">Cancelar</button>
                </div>
            </form>
        `;
            this.showModal('Editar Evento', content);

            document.getElementById('eventoForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const updatedData = {
                    id: id,
                    nmEvento: document.getElementById('eventoNome').value,
                    dtEvento: document.getElementById('eventoData').value,
                    descricao: document.getElementById('eventoDescricao').value
                };

                console.log('Dados do evento a serem atualizados:', updatedData);

                try {
                    await this.eventoService.atualizar(updatedData, userId);
                    Utils.showNotification('Evento atualizado com sucesso!');
                    this.hideModal();
                    this.router.loadEventosData();
                } catch (error) {
                    console.error('Erro ao atualizar evento:', error);
                    Utils.showNotification('Erro ao atualizar evento: ' + error.message, 'error');
                }
            });
        } catch (error) {
            console.error('Erro ao carregar evento:', error);
            Utils.showNotification('Erro ao carregar evento: ' + error.message, 'error');
        }
    }

    async deletarEvento(id) {
        if (confirm('Tem certeza que deseja excluir este evento?')) {
            try {
                await this.eventoService.deletar(id);
                Utils.showNotification('Evento excluído com sucesso!');
                this.router.loadEventosData();
            } catch (error) {
                console.error('Erro ao excluir evento:', error);
                Utils.showNotification('Erro ao excluir evento: ' + error.message, 'error');
            }
        }
    }

    // ========== ARQUIVOS - EVENTOS ==========
    async adicionarArquivoEvento(eventoId) {
        // Cria um input file oculto
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        fileInput.accept = '*/*';

        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                Utils.showNotification('Enviando arquivo...', 'success');
                await this.arquivoService.uploadArquivo(file, eventoId, 'EVENTO');
                Utils.showNotification('Arquivo adicionado com sucesso!');
                this.router.loadEventosData();
            } catch (error) {
                console.error('Erro ao adicionar arquivo:', error);
                Utils.showNotification('Erro ao adicionar arquivo: ' + error.message, 'error');
            } finally {
                // Remove o input do DOM
                document.body.removeChild(fileInput);
            }
        });

        // Adiciona ao DOM e dispara o clique
        document.body.appendChild(fileInput);
        fileInput.click();
    }

    async verArquivosEvento(eventoId) {
        try {
            const arquivos = await this.arquivoService.listarPorEntidade(eventoId, 'EVENTO');

            if (arquivos.length === 0) {
                Utils.showNotification('Nenhum arquivo encontrado para este evento', 'warning');
                return;
            }

            if (arquivos.length === 1) {
                // Se tiver apenas um arquivo, faz download direto
                await this.downloadArquivo(arquivos[0].id);
            } else {
                // Se tiver múltiplos arquivos, baixa todos
                Utils.showNotification(`Iniciando download de ${arquivos.length} arquivos...`, 'success');
                for (let arquivo of arquivos) {
                    await this.downloadArquivo(arquivo.id);
                    // Pequeno delay entre downloads
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        } catch (error) {
            console.error('Erro ao carregar arquivos:', error);
            Utils.showNotification('Erro ao carregar arquivos: ' + error.message, 'error');
        }
    }

    // ========== ARQUIVOS - FUNÇÕES GERAIS ==========
    async downloadArquivo(id) {
        try {
            Utils.showNotification('Iniciando download...', 'success');
            const blob = await this.arquivoService.downloadArquivo(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            // Tenta obter o nome do arquivo do blob ou usa um padrão
            const fileName = `arquivo-${id}`;
            a.download = fileName;

            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            Utils.showNotification('Download iniciado!');
        } catch (error) {
            console.error('Erro ao baixar arquivo:', error);
            Utils.showNotification('Erro ao baixar arquivo: ' + error.message, 'error');
        }
    }

    async deletarArquivo(id) {
        if (confirm('Tem certeza que deseja excluir este arquivo?')) {
            try {
                await this.arquivoService.deletarArquivo(id);
                Utils.showNotification('Arquivo excluído com sucesso!');
                // Recarrega as seções para atualizar a contagem de arquivos
                this.router.loadAgendamentosData();
                this.router.loadEventosData();
            } catch (error) {
                console.error('Erro ao excluir arquivo:', error);
                Utils.showNotification('Erro ao excluir arquivo: ' + error.message, 'error');
            }
        }
    }

    // Funções para download direto e exclusão em lote
    async downloadArquivoDireto(idEntidade, tipoEntidade) {
        try {
            const arquivos = await this.arquivoService.listarPorEntidade(idEntidade, tipoEntidade);

            if (arquivos.length === 0) {
                Utils.showNotification('Nenhum arquivo encontrado', 'warning');
                return;
            }

            if (arquivos.length === 1) {
                await this.downloadArquivo(arquivos[0].id);
            } else {
                // Baixa todos os arquivos
                Utils.showNotification(`Iniciando download de ${arquivos.length} arquivos...`, 'success');
                for (let arquivo of arquivos) {
                    await this.downloadArquivo(arquivo.id);
                    // Pequeno delay entre downloads
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        } catch (error) {
            console.error('Erro ao fazer download direto:', error);
            Utils.showNotification('Erro ao fazer download: ' + error.message, 'error');
        }
    }

    async deletarTodosArquivosEvento(eventoId) {
        if (confirm('Tem certeza que deseja excluir TODOS os arquivos deste evento?')) {
            try {
                const arquivos = await this.arquivoService.listarPorEntidade(eventoId, 'EVENTO');
                for (let arquivo of arquivos) {
                    await this.arquivoService.deletarArquivo(arquivo.id);
                }
                Utils.showNotification('Todos os arquivos foram excluídos com sucesso!');
                this.router.loadEventosData();
            } catch (error) {
                console.error('Erro ao excluir arquivos:', error);
                Utils.showNotification('Erro ao excluir arquivos: ' + error.message, 'error');
            }
        }
    }

    async deletarTodosArquivosAgendamento(agendamentoId) {
        if (confirm('Tem certeza que deseja excluir TODOS os arquivos deste agendamento?')) {
            try {
                const arquivos = await this.arquivoService.listarPorEntidade(agendamentoId, 'AGENDAMENTO');
                for (let arquivo of arquivos) {
                    await this.arquivoService.deletarArquivo(arquivo.id);
                }
                Utils.showNotification('Todos os arquivos foram excluídos com sucesso!');
                this.router.loadAgendamentosData();
            } catch (error) {
                console.error('Erro ao excluir arquivos:', error);
                Utils.showNotification('Erro ao excluir arquivos: ' + error.message, 'error');
            }
        }
    }
}

// Inicializar aplicação
let app;

document.addEventListener('DOMContentLoaded', function () {
    // Aplicar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    try {
        const authService = new AuthService();
        const isAuthenticated = authService.isAuthenticated();
        console.log('Inicialização - Autenticado:', isAuthenticated);

        app = new LuminaApp();

        if (isAuthenticated) {
            console.log('Usuário autenticado, mostrando dashboard...');
            app.showDashboard();
        } else {
            console.log('Usuário não autenticado, mostrando login...');
            app.showAuth();
        }
    } catch (error) {
        console.error('Erro na inicialização:', error);
        // Força mostrar a tela de auth em caso de erro
        document.getElementById('authScreen').classList.add('active');
        document.getElementById('dashboardScreen').classList.remove('active');
    }
});