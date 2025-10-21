// Aguarda todo o conteúdo HTML ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA DE NAVEGAÇÃO DAS SEÇÕES ---
    // Este bloco controla qual seção do site é exibida quando o usuário clica nos links do menu.
    
    const navLinks = document.querySelectorAll('.nav-link'); // Seleciona todos os links de navegação
    const navLinksContainer = document.getElementById('nav-links-container'); // Pega o container do menu (para fechar no mobile)

    // Adiciona evento de clique a cada link do menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita o comportamento padrão do link (rolar a página)
            
            const targetId = link.getAttribute('data-target'); // Pega o ID da seção de destino
            const targetSection = document.getElementById(targetId); // Encontra o elemento da seção
            const currentActiveSection = document.querySelector('.secao-conteudo.active'); // Pega a seção atualmente ativa
            
            // Remove a classe "active" da seção anterior (oculta)
            if (currentActiveSection) {
                currentActiveSection.classList.remove('active');
            }
            
            // Adiciona a classe "active" na nova seção (exibe)
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Fecha o menu mobile automaticamente após o clique (boa prática em sites responsivos)
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });


    // --- 2. LÓGICA DE VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---
    // Este bloco garante que o formulário não seja enviado vazio ou com e-mail inválido.

    const contactForm = document.getElementById('contact-form'); // Formulário de contato
    const nomeInput = document.getElementById('nome');           // Campo de nome
    const emailInput = document.getElementById('email');         // Campo de e-mail
    const mensagemInput = document.getElementById('mensagem');   // Campo de mensagem
    const formMessage = document.getElementById('form-message'); // Elemento para exibir mensagens ao usuário

    // Escuta o evento de envio do formulário
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        // Remove espaços extras dos valores digitados
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const mensagem = mensagemInput.value.trim();
        
        // Limpa mensagens anteriores
        formMessage.textContent = '';
        formMessage.style.color = '';

        // Verifica se há campos vazios
        if (nome === '' || email === '' || mensagem === '') {
            formMessage.textContent = 'Por favor, preencha todos os campos.';
            formMessage.style.color = '#f0c42d'; // Amarelo de alerta
            return;
        }
        
        // Verifica se o formato do e-mail é válido
        if (!validarEmail(email)) {
            formMessage.textContent = 'Por favor, insira um formato de e-mail válido.';
            formMessage.style.color = '#f0c42d';
            return;
        }
        
        // Se tudo estiver certo, exibe mensagem de sucesso
        formMessage.textContent = 'Mensagem enviada com sucesso!';
        formMessage.style.color = '#4CAF50'; // Verde de sucesso
        
        // Limpa os campos do formulário
        contactForm.reset(); 

        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    });

    // Função auxiliar para validar o formato de e-mail com expressão regular (regex)
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Padrão simples para formato válido de e-mail
        return regex.test(email); // Retorna true se o formato for válido
    }
    
    
    // --- 3. LÓGICA DO MENU MOBILE (HAMBURGER) ---
    // Este bloco permite abrir/fechar o menu de navegação em dispositivos móveis.

    const mobileMenuIcon = document.getElementById('mobile-menu-icon'); // Ícone do menu mobile (três barras)

    // Quando o ícone é clicado, alterna a classe "active" no container dos links
    // Isso faz o menu aparecer ou desaparecer na versão mobile
    mobileMenuIcon.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });

});