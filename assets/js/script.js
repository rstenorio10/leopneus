document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const mobileToggle = document.getElementById('mobileToggle');
    const navBar = document.getElementById('navBar');

    if (mobileToggle && navBar) {
        mobileToggle.addEventListener('click', () => {
            navBar.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navBar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ==========================================
    // LÓGICA DO BANNER ROTATIVO (SLIDER AUTOMÁTICO)
    // ==========================================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlideIndex = 0;
    let slideInterval;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlideIndex = 0;
        } else if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else {
            currentSlideIndex = index;
        }

        slides.forEach((slide, i) => {
            if (i === currentSlideIndex) {
                slide.classList.add('active');
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        dots.forEach((dot, i) => {
            if (i === currentSlideIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function startSliderTimer() {
        slideInterval = setInterval(nextSlide, 5000); // Rotação automática a cada 5 segundos
    }

    function resetSliderTimer() {
        clearInterval(slideInterval);
        startSliderTimer();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSliderTimer();
        });
    });

    if (slides.length > 0) {
        showSlide(0);
        startSliderTimer();
    }

    // ==========================================
    // LÓGICA DO CARRINHO E WHATSAPP
    // ==========================================
    let cart = [];

    const cartCountElem = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const cartTrigger = document.getElementById('cartTrigger');
    const closeModal = document.getElementById('closeModal');
    const continueShopping = document.getElementById('continueShopping');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cartTrigger) {
        cartTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            cartModal.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => cartModal.classList.remove('active'));
    }

    if (continueShopping) {
        continueShopping.addEventListener('click', () => cartModal.classList.remove('active'));
    }

    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
            }
        });
    }

    // CLIQUE NO SELETOR DA SEÇÃO HORIZONTAL
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const tipoVeiculo = document.getElementById('tipoVeiculo').value;
            const medidaSelect = document.getElementById('medidaPneu');
            const quantidade = parseInt(document.getElementById('qtdPneu').value, 10);
            
            const [medidaText, precoUnitarioStr] = medidaSelect.value.split('|');
            const precoUnitario = parseFloat(precoUnitarioStr);
            const valorTotalItem = precoUnitario * quantidade;

            cart = [{
                id: Date.now(),
                categoria: tipoVeiculo,
                medida: medidaText,
                quantidade: quantidade,
                precoUnitario: precoUnitario,
                total: valorTotalItem
            }];

            updateCartUI();
            cartModal.classList.add('active');
        });
    }

    // CLIQUE EM "COMPRAR AGORA" NOS CARDS DA SEÇÃO
    window.adicionarEFinalizar = function(categoria, medida, precoUnitario) {
        const quantidade = 2; // Padrão de 2 pneus (Par)
        const valorTotalItem = precoUnitario * quantidade;

        cart = [{
            id: Date.now(),
            categoria: categoria,
            medida: medida,
            quantidade: quantidade,
            precoUnitario: precoUnitario,
            total: valorTotalItem
        }];

        updateCartUI();

        if (cartModal) {
            cartModal.classList.add('active');
        }
    };

    function updateCartUI() {
        const totalItens = cart.reduce((acc, item) => acc + item.quantidade, 0);
        if (cartCountElem) cartCountElem.textContent = totalItens;

        if (!cartItemsList) return;

        if (cart.length === 0) {
            cartItemsList.innerHTML = `<p class="empty-cart-msg">Nenhum produto selecionado.</p>`;
            if (cartTotalPrice) cartTotalPrice.textContent = 'R$ 0,00';
            return;
        }

        let totalGeral = 0;
        cartItemsList.innerHTML = '';

        cart.forEach((item) => {
            totalGeral += item.total;
            cartItemsList.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>Pneu ${item.medida} (${item.categoria})</h4>
                        <span>${item.quantidade}x R$ ${item.precoUnitario.toFixed(2).replace('.', ',')} = <strong>R$ ${item.total.toFixed(2).replace('.', ',')}</strong></span>
                    </div>
                    <button class="remove-item" onclick="window.removeItemFromCart(${item.id})" title="Remover item">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        });

        if (cartTotalPrice) cartTotalPrice.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
    }

    window.removeItemFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
    };

    // Finalizar no WhatsApp
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio! Selecione um pneu antes de finalizar.');
                return;
            }

            const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
            const formaPagamento = selectedPayment ? selectedPayment.value : "Não informada";

            let mensagem = "Olá! Gostaria de finalizar a minha compra:\n\n";
            let totalGeral = 0;

            cart.forEach((item) => {
                mensagem += `*Produto:* Pneu ${item.medida} (${item.categoria})\n`;
                mensagem += `*Quantidade:* ${item.quantidade}x\n`;
                mensagem += `*Subtotal:* R$ ${item.total.toFixed(2).replace('.', ',')}\n\n`;
                totalGeral += item.total;
            });

            mensagem += `*Forma de Pagamento:* ${formaPagamento}\n`;
            mensagem += `*VALOR TOTAL:* R$ ${totalGeral.toFixed(2).replace('.', ',')}\n\n`;
            mensagem += "Podemos agendar a entrega / instalação?";

            const urlWhatsApp = `https://wa.me/5511987488840?text=${encodeURIComponent(mensagem)}`;
            window.open(urlWhatsApp, '_blank');
        });
    }
});