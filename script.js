
const chatBubble = document.getElementById('chat-bubble');
const chatModal = document.getElementById('chat-modal');
const closeModalBtn = document.querySelector('.close-btn');


const chatOptions = document.getElementById('chat-options');
const chatUi = document.getElementById('chat-ui');
const chatWaiting = document.getElementById('chat-waiting'); 


const btnLia = document.getElementById('btn-lia');
const btnHuman = document.getElementById('btn-human');


const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');


const productModal = document.getElementById('product-modal');
const specCloseBtn = document.querySelector('.spec-close-btn');
const specButtons = document.querySelectorAll('.spec-button');


const modalProductTitle = document.getElementById('modal-product-title');
const modalProductDescription = document.getElementById('modal-product-description');
const modalProductImage = document.getElementById('modal-product-image');
const modalProductPrice = document.getElementById('modal-product-price');
const modalProductSpecs = document.getElementById('modal-product-specs');
const modalProductManualLink = document.getElementById('modal-product-manual-link');


const termsModal = document.getElementById('terms-modal');
const termsAcceptBtn = document.getElementById('terms-accept-btn');


const cartNavLink = document.getElementById('cart-nav-link');
const cartItemCount = document.getElementById('cart-item-count');
const shoppingCartModal = document.getElementById('shopping-cart-modal');
const closeCartBtn = document.querySelector('.cart-close-btn');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const cartEmptyMessage = document.getElementById('cart-empty-message');


const paymentModal = document.getElementById('payment-modal');
const paymentCloseBtn = document.querySelector('.payment-close-btn');
const paymentForm = document.getElementById('payment-form');
const payNowBtn = document.getElementById('pay-now-btn');
const successModal = document.getElementById('success-modal');
const successCloseBtn = document.querySelector('.success-close-btn');
const successOrderTotal = document.getElementById('success-order-total');


let userName = ''; 
let chatState = 'options';
let lastRecommendedProduct = null;
let countdownTimerInterval = null; 
let shoppingCart = []; 


const productDatabase = [
    
    {
        id: 'zx5000',
        name: 'Notebook UltraBook ZX-5000', 
        description: 'Ideal para tarefas do dia a dia, como estudos, navegação na web e pacote Office. Leve e portátil.', 
        priceFormatted: 'R$ 6.500,00', 
        image: 'images/Notebook.jpg',
        keywords: ['notebook', 'laptop', 'estudo', 'básico', 'faculdade', 'office', 'navegar', 'barato', 'i5', 'zx-5000'], 
        specifications: {
            'Processador': 'Intel Core i5-10210U (10ª Geração)',
            'Memória RAM': '8GB DDR4 2666MHz',
            'Armazenamento': '256GB SSD NVMe', 
            'Placa de Vídeo': 'Intel UHD Graphics (Integrada)',
            'Tela': '15.6" Full HD (1920x1080) TN' 
        },
        manualLink: 'manuais/Notebook.pdf'
    },
    
    {
        id: 'topline',
        name: 'Samsung Galaxy S25 Ultra',
        description: 'O flagship definitivo com câmera de 200MP e IA avançada. O melhor para fotos e redes sociais.',
        priceFormatted: 'R$ 9.800,00',
        image: 'images/S25.jpg',
        keywords: ['smartphone', 'celular', 's25', 'ultra', 'samsung', 'top de linha', 'câmera', '200mp', 'caro', 'fotos', 'rede social', 'ia'],
        specifications: {
            'Câmera Principal': '200MP Wide (Esperado)',
            'Processador': 'Snapdragon 8 Gen 4 (Esperado)',
            'Tela': '6.8" AMOLED Dinâmico 2X 120Hz',
            'Bateria': '5000 mAh',
            'Recursos': 'Galaxy AI, S Pen Integrada'
        },
        manualLink: 'manuais/S25.pdf'
    },
   
    {
        id: 'wiremax',
        name: 'Headset Gamer Logitech G435',
        description: 'Ultraleve (165g) com conectividade LIGHTSPEED sem fio e Bluetooth. Bateria de 18h.',
        priceFormatted: 'R$ 450,00',
        image: 'images/Logitech.jpg',
        keywords: ['fone', 'headset', 'gamer', 'logitech', 'g435', 'wireless', 'sem fio', 'lightspeed', 'bluetooth', 'leve'],
        specifications: {
            'Tipo': 'Over-ear (Circumaural)',
            'Peso': '165 gramas',
            'Bateria': 'Até 18 horas',
            'Conectividade': 'LIGHTSPEED Wireless, Bluetooth',
            'Microfone': 'Duplo (beamforming) integrado'
        },
        manualLink: 'manuais/Logitech.pdf'
    },
    
    {
        id: 'swatchfit',
        name: 'Samsung Galaxy Watch 7',
        description: 'Monitoramento de saúde com IA, sensor de bioimpedância e GPS. Tela de cristal de safira.',
        priceFormatted: 'R$ 2.900,00',
        image: 'images/Watch.jpg',
        keywords: ['smartwatch', 'relógio', 'galaxy watch 7', 'watch 7', 'samsung', 'saúde', 'gps', 'monitoramento', 'ia'],
        specifications: {
            'Sensores': 'BioActive (Batimentos, ECG, Bioimpedância)',
            'Tela': 'Super AMOLED com Cristal de Safira',
            'Processador': 'Exynos W1000 (Esperado)',
            'Material': 'Armor Aluminum'
        },
        manualLink: 'manuais/Watch.pdf'
    },
    
    {
        id: 'protab',
        name: 'Samsung Galaxy Tab S10 Ultra',
        description: 'Tela gigante de 14.6" AMOLED Dinâmico 2X. Ideal para design e produtividade com S Pen.',
        priceFormatted: 'R$ 8.200,00',
        image: 'images/Tab.jpg',
        keywords: ['tablet', 'tab', 's10', 'ultra', 'samsung', 'estudo', 'design', 'caneta', 's pen', 'tela grande'],
        specifications: {
            'Tela': '14.6" AMOLED Dinâmico 2X 120Hz',
            'Processador': 'Snapdragon 8 Gen 4 (Esperado)',
            'Armazenamento': '256GB UFS 4.0',
            'Extras': 'S Pen (Inclusa), DeX Mode, 4 Alto-falantes'
        },
        manualLink: 'manuais/Tab.pdf'
    },
   
    {
        id: 'actioncam',
        name: 'Sony Alpha 7R V Full-Frame',
        description: 'Câmera mirrorless profissional com 61MP, foco automático por IA e vídeo 8K.',
        priceFormatted: 'R$ 24.500,00',
        image: 'images/Camera.jpg',
        keywords: ['câmera', 'camera', 'mirrorless', 'sony', 'alpha', 'a7r v', 'a7rv', 'full-frame', 'profissional', '61mp', '8k'],
        specifications: {
            'Sensor': '61MP Full-Frame Exmor R BSI',
            'Processador': 'BIONZ XR e Unidade de IA',
            'Vídeo': '8K/24p, 4K/60p',
            'Foco': 'Real-time Recognition AF (IA)',
            'Estabilização': 'IBIS de 5 eixos (8 stops)'
        },
        manualLink: 'manuais/Sony.pdf'
    }
];


function openModal() {
    chatModal.style.display = 'flex';
}

function closeModal() {
    chatModal.style.display = 'none';
    chatOptions.style.display = 'flex'; 
    chatUi.style.display = 'none'; 
    chatWaiting.style.display = 'none'; 
    chatMessages.innerHTML = ''; 
    chatState = 'options';
    userName = '';
    if (countdownTimerInterval) {
        clearInterval(countdownTimerInterval);
    }
    const timerElement = document.getElementById('countdown-text');
    if (timerElement) {
        timerElement.textContent = "Seu tempo de espera estimado é: 3 minutos";
    }
    const waitingNote = document.querySelector('#chat-waiting p.waiting-note');
    if (waitingNote) {
        waitingNote.innerText = "(Esta é uma demonstração. Você pode fechar esta janela.)";
    }
}


function openProductModal(productId) {
    const product = productDatabase.find(p => p.id === productId);
    if (!product) return; 

    modalProductTitle.innerText = product.name;
    modalProductPrice.innerText = product.priceFormatted;
    modalProductDescription.innerText = product.description;
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    modalProductManualLink.href = product.manualLink;

   
    addToCartBtn.setAttribute('data-id', product.id);

    modalProductSpecs.innerHTML = ''; 
    for (const key in product.specifications) {
        const value = product.specifications[key];
        const li = document.createElement('li');
        li.innerHTML = `<strong>${key}:</strong> ${value}`;
        modalProductSpecs.appendChild(li);
    }
    productModal.style.display = 'flex';
}

function closeProductModal() {
    productModal.style.display = 'none';
}


function closeTermsModal() {
    termsModal.style.display = 'none';
    localStorage.setItem('termsAccepted', 'true'); 
}


function startCountdown() {
    if (countdownTimerInterval) {
        clearInterval(countdownTimerInterval);
    }

    const timerElement = document.getElementById('countdown-text'); 
    timerElement.textContent = "Seu tempo de espera estimado é: 3 minutos";
    document.querySelector('#chat-waiting p.waiting-note').innerText = "(Esta é uma demonstração. Você pode fechar esta janela.)";

    let durationInSeconds = 60 * 3; 

    countdownTimerInterval = setInterval(function () {
        durationInSeconds--; 

        if (durationInSeconds === 120) { 
            timerElement.textContent = "Seu tempo de espera estimado é: 2 minutos";
        } else if (durationInSeconds === 60) {
            timerElement.textContent = "Seu tempo de espera estimado é: 1 minuto";
        } else if (durationInSeconds <= 0) { 
            clearInterval(countdownTimerInterval);
            timerElement.textContent = "Tempo de espera esgotado.";
            document.querySelector('#chat-waiting p.waiting-note').innerText = 'Todos os nossos atendentes estão ocupados. Por favor, tente novamente mais tarde.';
        }
    }, 1000); 
}



const intents = {
   
    CONFIRMAR_COMPRA: [
        'vou levar', 'confio em você', 'fechado', 'ok, vou comprar', 
        'sim, vou querer esse', 'pode fechar', 'vou comprar esse mesmo', 'vou comprar'
    ],
    PEDIR_ESPECIFICACOES: [
        'especificações', 'especificação', 'specs', 'detalhes', 'ficha técnica', 'manual', "manual do usuário"
    ],
    VERIFICAR_SOFTWARE: ['premiere', 'after effects', 'travar', 'roda esses softwares'],
    TERMOS_DE_USO: ['termos', 'uso', 'política', 'privacidade', 'regras', 'condições'],
    AJUDA_HUMANA: ['humano', 'atendente', 'falar com alguém', 'pessoa', 'ajudante'],
    DESPEDIDA: ['obrigado', 'obrigada', 'tchau', 'até mais', 'até logo', 'valeu'],
    SAUDACAO: ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'e aí', 'opa'],
    BUSCAR_PRODUTO: [
        'notebook', 'laptop', 'celular', 'smartphone', 'procuro', 'recomenda', 
        'você tem', 'gostaria de', 'produto', 'edição', 'barato', 'câmâmera', 
        'comprar', 'quero um' 
    ]
};

const responses = {
    
    SAUDACAO: 'Olá, [NOME]! 👋 Como posso te ajudar hoje?',
    PEDIR_ESPECIFICACOES: 'Claro, [NOME]! Você pode consultar a ficha técnica completa e todos os detalhes do produto na página dele em nosso site. Posso ajudar com algo mais?',
    VERIFICAR_SOFTWARE: 'Então, [NOME], nós recomendamos que você veja as especificações do produto no nosso site, basta clicar em "Ver Detalhes" e você poderá consultar se o programa que você deseja roda no produto escolhido.',
    TERMOS_DE_USO: 'Perfeito, você pode consultar os nossos termos de uso no final da página inicial de nosso site.',
    AJUDA_HUMANA: 'Ok, vou te encaminhar pra um atendente humano e encerrar esse atendimento, só um momento por favor...',
    DESPEDIDA: 'Eu que agradeço, [NOME]! Tenha um ótimo dia! 😊',
    FALLBACK: 'Desculpe, [NOME], não entendi. Você pode tentar perguntar de outra forma?'
};


function addMessage(message, sender, time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), extraClass = null) {
    
    const messageRow = document.createElement('div');
    messageRow.classList.add('message-row');
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    const chatBubble = document.createElement('div');
    chatBubble.classList.add('chat-message');
    if (extraClass) {
        chatBubble.classList.add(extraClass);
    }
    chatBubble.innerHTML = message;
    const messageInfo = document.createElement('span');
    messageInfo.classList.add('message-info');
    messageInfo.innerText = time;
    if (sender === 'user') {
        messageRow.classList.add('user-row');
        messageContent.appendChild(chatBubble);
        messageContent.appendChild(messageInfo);
        messageRow.appendChild(messageContent); 
    } else { 
        messageRow.classList.add('bot-row');
        const avatarImg = document.createElement('img');
        avatarImg.classList.add('chat-avatar');
        avatarImg.src = 'images/lia-avatar.png'; 
        avatarImg.alt = 'LIA Avatar';
        messageContent.appendChild(chatBubble);
        messageContent.appendChild(messageInfo);
        messageRow.appendChild(avatarImg); 
        messageRow.appendChild(messageContent);
    }
    chatMessages.appendChild(messageRow);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function findAndRecommendProduct(userInput) {
    
    let bestMatch = null;
    let highestScore = 0;
    const userText = userInput.toLowerCase();
    for (const product of productDatabase) {
        let currentScore = 0;
        for (const keyword of product.keywords) {
            if (userText.includes(keyword)) {
                currentScore++;
            }
        }
        if (currentScore > highestScore) {
            highestScore = currentScore;
            bestMatch = product;
        }
    }
    if (bestMatch) {
        lastRecommendedProduct = bestMatch;
        const textResponse = `Certo, ${userName}! Com base no que você disse, eu recomendo o <strong>${bestMatch.name}</strong>.
                            <br><br>${bestMatch.description}
                            <br><strong>Preço:</strong> ${bestMatch.priceFormatted}`;
        const imageResponse = `<img src="${bestMatch.image}" alt="${bestMatch.name}" class="responsive-image">`;
        setTimeout(() => { addMessage(textResponse, 'bot'); }, 700);
        setTimeout(() => { addMessage(imageResponse, 'bot', new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 'image-bubble'); }, 1500);
    } else {
        lastRecommendedProduct = null;
        setTimeout(() => { addMessage(`Desculpe, ${userName}, não consegui encontrar um produto que se encaixe no que você pediu. Você pode tentar ser mais específico? (Ex: "celular com boa câmera", "notebook barato")`, 'bot'); }, 700);
    }
}

function findIntent(text, intentName) {
    const keywords = intents[intentName];
    if (!keywords) return false; 
    
    for (const keyword of keywords) {
        if (text.includes(keyword)) {
            return true;
        }
    }
    return false;
}


function handleSendMessage() {
    const userInput = chatInput.value.trim();

    
    if (userInput === '') return;

    
    addMessage(userInput, 'user');

    
    chatInput.value = '';

    
    if (chatState === 'asking_name') {
        
        userName = userInput.replace(/meu nome é|me chamo/gi, '').trim();
        
        
        userName = userName.charAt(0).toUpperCase() + userName.slice(1).replace('.', '');
        
        chatState = 'chatting'; 
        chatInput.placeholder = 'Digite sua mensagem...'; 

        
        let botResponse = responses.SAUDACAO.replace('[NOME]', userName);
        setTimeout(() => { addMessage(botResponse, 'bot'); }, 700);

    } else {
        
        getBotResponse(userInput);
    }
}

function getBotResponse(userInput) {
    const text = userInput.toLowerCase().trim();

 
    if (findIntent(text, 'PEDIR_ESPECIFICACOES')) {
        
        if (lastRecommendedProduct) {
           
            const product = lastRecommendedProduct;
            let specificResponse = '';

            
            if (text.includes('manual')) {
                specificResponse = `Claro, ${userName}! Aqui está o link direto para o manual do <strong>${product.name}</strong>:
                                 <br><br>
                                 <a href="${product.manualLink}" target="_blank" class="chat-manual-button">
                                     Baixar Manual (PDF)
                                 </a>`;
            } else {
                
                specificResponse = `Com certeza, ${userName}! Você pode ver todos os detalhes e a ficha técnica completa do <strong>${product.name}</strong> clicando no botão abaixo:
                                 <br><br>
                                 <button class="chat-spec-button" onclick="openProductModal('${product.id}')">
                                     Ver Detalhes do ${product.name}
                                 </button>`;
            }
            
            
            specificResponse += `<br><br>Posso ajudar com algo mais ou gostaria de confirmar a compra?`;
            
            setTimeout(() => { addMessage(specificResponse, 'bot'); }, 700);

        } else {
            
            let botResponse = `Claro, ${userName}. Sobre qual produto você gostaria de ver os detalhes ou o manual? Por favor, me diga o que procura primeiro.`;
            setTimeout(() => { addMessage(botResponse, 'bot'); }, 700);
        }
    
   
    } else if (findIntent(text, 'CONFIRMAR_COMPRA')) {
         if (lastRecommendedProduct) {
            const product = lastRecommendedProduct;
            const purchaseResponse = `Parabéns, ${userName}!<br>Sua compra foi aprovada!<br><br>
                                   🧾 <strong>Pedido:</strong> ${Math.floor(Math.random() * 1000) + 100}<br>
                                   💻 <strong>Produto:</strong> ${product.name}<br>
                                   💰 <strong>Valor total:</strong> ${product.priceFormatted}<br>
                                   💳 <strong>Forma de pagamento:</strong> Cartão de crédito`;
            setTimeout(() => { addMessage(purchaseResponse, 'bot'); }, 700);
            lastRecommendedProduct = null;
        } else {
            setTimeout(() => { addMessage(`Claro, ${userName}. O que você gostaria de comprar? Por favor, me diga o que procura primeiro.`, 'bot'); }, 700);
        }

   
    } else if (findIntent(text, 'BUSCAR_PRODUTO')) {
         findAndRecommendProduct(userInput);
    
   
    } else if (findIntent(text, 'VERIFICAR_SOFTWARE')) {
        let botResponse = responses.VERIFICAR_SOFTWARE.replace(/\[NOME\]/g, userName);
        setTimeout(() => { addMessage(botResponse, 'bot'); }, 700);
    } else if (findIntent(text, 'TERMOS_DE_USO')) {
        let botResponse = responses.TERMOS_DE_USO.replace(/\[NOME\]/g, userName);
        setTimeout(() => { addMessage(botResponse, 'bot'); }, 700);
    } else if (findIntent(text, 'AJUDA_HUMANA')) {
        let botResponse = responses.AJUDA_HUMANA.replace(/\[NOME\]/g, userName);
        setTimeout(() => { addMessage(botResponse, 'bot'); }, 700);
    } else if (findIntent(text, 'DESPEDIDA')) {
        let botResponse = responses.DESPEDIDA.replace(/\[NOME\]/g, userName);
        setTimeout(() => { addMessage(botResponse, 'bot'); }, 700);
    } else if (findIntent(text, 'SAUDACAO')) {
        let botResponse = responses.SAUDACAO.replace(/\[NOME\]/g, userName);
        setTimeout(() => { addMessage(botResponse, 'bot'); }, 700);
    
  
    } else {
        let botResponse = responses.FALLBACK.replace(/\[NOME\]/g, userName);
        setTimeout(() => { addMessage(botResponse, 'bot'); }, 700);
    }
}


function parsePrice(priceString) {
    return Number(priceString.replace('R$ ', '').replace('.', '').replace(',', '.'));
}


function formatPrice(priceNumber) {
    return priceNumber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


function addToCart(productId) {
    const product = productDatabase.find(p => p.id === productId);
    if (!product) return;


    const existingItem = shoppingCart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++; 
    } else {
        
        shoppingCart.push({
            id: product.id,
            name: product.name,
            price: parsePrice(product.priceFormatted),
            image: product.image,
            quantity: 1
        });
    }

    updateCartUI();
}


function removeFromCart(productId) {
    shoppingCart = shoppingCart.filter(item => item.id !== productId);
    updateCartUI();
}


function updateCartUI() {
    
    cartItemsList.innerHTML = ''; 

    
    let total = 0; 

    if (shoppingCart.length === 0) {
        cartItemsList.appendChild(cartEmptyMessage);
        cartEmptyMessage.style.display = 'block';
       
    } else { 
        cartEmptyMessage.style.display = 'none';
        
        
        shoppingCart.forEach(item => {
            total += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Qtd: ${item.quantity}</p>
                </div>
                <div class="cart-item-price">
                    <p>${formatPrice(item.price * item.quantity)}</p>
                    <button class="remove-from-cart-btn" data-id="${item.id}">Remover</button>
                </div>
            `;
            cartItemsList.appendChild(itemElement);
        });
    }

    
    cartTotalPrice.innerText = formatPrice(total);

    
    const totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemCount.innerText = totalItems;
}



chatBubble.addEventListener('click', openModal);


closeModalBtn.addEventListener('click', closeModal);


window.addEventListener('click', function(event) {
    if (event.target == chatModal) {
        closeModal();
    }
    
    if (event.target == productModal) {
        closeProductModal();
    }
    if (event.target == shoppingCartModal) {
        shoppingCartModal.style.display = 'none';
    }
    if (event.target == paymentModal) {
        paymentModal.style.display = 'none';
    }
    if (event.target == successModal) {
        successModal.style.display = 'none';
    }
});


btnLia.addEventListener('click', function() {
    chatOptions.style.display = 'none';
    chatUi.style.display = 'flex'; 
    chatUi.style.flexDirection = 'column';
    chatState = 'asking_name';
    addMessage('Olá! Eu sou a LIA, sua assistente virtual. Para começar, qual é o seu nome?', 'bot');
    chatInput.placeholder = 'Digite seu nome...';
});


btnHuman.addEventListener('click', function() {
    chatOptions.style.display = 'none';
    chatWaiting.style.display = 'flex';
    startCountdown();
});


chatSendBtn.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
});



specButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        openProductModal(productId);
    });
});

specCloseBtn.addEventListener('click', closeProductModal);



termsAcceptBtn.addEventListener('click', closeTermsModal);


window.addEventListener('load', () => {
    if (localStorage.getItem('termsAccepted') !== 'true') {
        termsModal.style.display = 'flex';
    }
    
    cartEmptyMessage.style.display = 'block';
});





cartNavLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    shoppingCartModal.style.display = 'flex';
});


closeCartBtn.addEventListener('click', () => {
    shoppingCartModal.style.display = 'none';
});


addToCartBtn.addEventListener('click', () => {
    const productId = addToCartBtn.getAttribute('data-id');
    addToCart(productId);
    closeProductModal(); 
    shoppingCartModal.style.display = 'flex'; 
});


cartItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart-btn')) {
        const productId = e.target.getAttribute('data-id');
        removeFromCart(productId);
    }
});


checkoutBtn.addEventListener('click', () => {
    if (shoppingCart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    
    
    shoppingCartModal.style.display = 'none';
    paymentModal.style.display = 'flex';
});



paymentCloseBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});


paymentForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    
    const totalValue = cartTotalPrice.innerText;
    
    
    successOrderTotal.innerText = totalValue;

    
    paymentForm.reset();
    
    
    paymentModal.style.display = 'none';
    
    
    successModal.style.display = 'flex';
    
    
    shoppingCart = [];
    updateCartUI(); 
});


successCloseBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
});