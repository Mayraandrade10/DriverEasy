document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a[data-target]');
    const pageSections = document.querySelectorAll('.page-section');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('login').classList.remove('active');
            sidebar.style.display = 'flex';
            if (window.innerWidth <= 900) {
                menuToggle.style.display = 'block';
            }
            mainContent.classList.remove('full-width');
            document.getElementById('dashboard').classList.add('active');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            pageSections.forEach(sec => sec.classList.remove('active'));
            document.getElementById('login').classList.add('active');
            sidebar.style.display = 'none';
            menuToggle.style.display = 'none';
            sidebar.classList.remove('open');
            mainContent.classList.add('full-width');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            pageSections.forEach(sec => sec.classList.remove('active'));
            
            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
            }
        });
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
});

// Função global para trocar de tela via botões internos
function switchPage(targetId) {
    const pageSections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    pageSections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        }
    });
}

// Função para calcular automaticamente o Total Estimado com base na diária e nas datas
function calcularTotal() {
    const inputDiaria = document.getElementById('valorDiaria');
    const inputInicio = document.getElementById('dataInicio');
    const inputDevolucao = document.getElementById('dataDevolucao');
    const totalEstimadoEl = document.getElementById('totalEstimado');

    const valorDiaria = parseFloat(inputDiaria.value) || 0;
    
    if (inputInicio.value && inputDevolucao.value) {
        const dataInicio = new Date(inputInicio.value);
        const dataDevolucao = new Date(inputDevolucao.value);
        
        // Diferença em dias
        const diferencaTempo = dataDevolucao.getTime() - dataInicio.getTime();
        let dias = Math.ceil(diferencaTempo / (1000 * 3600 * 24));

        if (dias < 1) dias = 1; // Mínimo de 1 diária

        const total = dias * valorDiaria;
        totalEstimadoEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    } else {
        totalEstimadoEl.innerText = `R$ ${valorDiaria.toFixed(2).replace('.', ',')}`;
    }
}

// Funções do Modal de Confirmação
function handleFormSubmit(event, mensagem) {
    event.preventDefault();
    document.getElementById('modalMessage').innerText = mensagem;
    document.getElementById('modalConfirmacao').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalConfirmacao').style.display = 'none';
    switchPage('dashboard');
}