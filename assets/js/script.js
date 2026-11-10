document.addEventListener('DOMContentLoaded', () => {
    // 1. Slider do Banner Principal (Hero)
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slide-dots .dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            slide.setAttribute('aria-hidden', 'true');
            if (dots[i]) {
                dots[i].classList.remove('active');
                dots[i].removeAttribute('aria-current');
            }
        });

        slides[index].classList.add('active');
        slides[index].setAttribute('aria-hidden', 'false');
        if (dots[index]) {
            dots[index].classList.add('active');
            dots[index].removeAttribute('aria-current', 'true');
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    if (slides.length > 0) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // 2. Base de Dados de Marcas para cada Medida
    const catalogoMarcas = {
        "165/70 R13": [
            { marca: "Goodyear", linha: "Direction Touring 2", preco: 279.90 },
            { marca: "Dunlop", linha: "SP Touring R1", preco: 299.90 },
            { marca: "Pirelli", linha: "Cinturato P4", preco: 319.90 }
        ],
        "175/70 R13": [
            { marca: "Dunlop", linha: "SP Touring R1", preco: 299.90 },
            { marca: "Goodyear", linha: "Assurance", preco: 329.90 },
            { marca: "Pirelli", linha: "P400 Evo", preco: 339.90 }
        ],
        "175/60 R13": [
            { marca: "Pirelli", linha: "Phantoms Sport", preco: 319.90 },
            { marca: "Firestone", linha: "F-700", preco: 299.90 },
            { marca: "Michelin", linha: "Energy XM2", preco: 359.90 }
        ],
        "175/65 R14": [
            { marca: "Firestone", linha: "F-700", preco: 329.90 },
            { marca: "Pirelli", linha: "Cinturato P1", preco: 359.90 },
            { marca: "Goodyear", linha: "Assurance", preco: 369.90 }
        ],
        "185/65 R14": [
            { marca: "Pirelli", linha: "Cinturato P1", preco: 359.90 },
            { marca: "Michelin", linha: "Energy XM2+", preco: 419.90 },
            { marca: "Dunlop", linha: "SP Touring", preco: 339.90 }
        ],
        "185 R14C": [
            { marca: "Pirelli", linha: "Chronos (Utilitário)", preco: 499.90 },
            { marca: "Goodyear", linha: "Cargo G26", preco: 529.90 },
            { marca: "Firestone", linha: "Vanhawk 2", preco: 479.90 }
        ],
        "195/55 R15": [
            { marca: "Michelin", linha: "Pilot Sport 4", preco: 439.90 },
            { marca: "Pirelli", linha: "P Zero Nero", preco: 419.90 },
            { marca: "Bridgestone", linha: "Potenza RE003", preco: 449.90 }
        ],
        "205/70 R15": [
            { marca: "Bridgestone", linha: "Dueler A/T (SUV)", preco: 549.90 },
            { marca: "Pirelli", linha: "Scorpion ATR", preco: 579.90 },
            { marca: "Goodyear", linha: "Wrangler Territory", preco: 529.90 }
        ],
        "205/55 R16": [
            { marca: "Goodyear", linha: "EfficientGrip", preco: 489.90 },
            { marca: "Michelin", linha: "Primacy 4", preco: 559.90 },
            { marca: "Pirelli", linha: "Cinturato P7", preco: 519.90 }
        ],
        "245/70 R16": [
            { marca: "Goodyear", linha: "Wrangler ArmorTrac", preco: 789.90 },
            { marca: "Pirelli", linha: "Scorpion ATR", preco: 819.90 },
            { marca: "Bridgestone", linha: "Dueler H/T", preco: 799.90 }
        ],
        "225/65 R17": [
            { marca: "Pirelli", linha: "Scorpion Verde", preco: 689.90 },
            { marca: "Michelin", linha: "Primacy SUV", preco: 769.90 },
            { marca: "Bridgestone", linha: "Alenza 001", preco: 739.90 }
        ],
        "215/50 R17": [
            { marca: "Continental", linha: "ContiMaxContact", preco: 599.90 },
            { marca: "Michelin", linha: "Pilot Sport 4", preco: 649.90 },
            { marca: "Pirelli", linha: "Cinturato P7", preco: 579.90 }
        ],
        "235/60 R18": [
            { marca: "SUV Premium", linha: "CrossContact LX2", preco: 849.90 },
            { marca: "Michelin", linha: "Latitude Sport 3", preco: 929.90 },
            { marca: "Pirelli", linha: "Scorpion Zero", preco: 889.90 }
        ],
        "235/55 R19": [
            { marca: "Sport High", linha: "Eagle F1 Asymmetric", preco: 989.90 },
            { marca: "Michelin", linha: "Latitude Sport 3", preco: 1050.00 },
            { marca: "Continental", linha: "ContiSportContact", preco: 969.90 }
        ],
        "275/60 R20": [
            { marca: "Utilitário Pesado", linha: "Wrangler Territory AT", preco: 1290.00 },
            { marca: "Bridgestone", linha: "Dueler A/T Revo 3", preco: 1350.00 },
            { marca: "BFGoodrich", linha: "All-Terrain T/A KO2", preco: 1490.00 }
        ]
    };

    // 3. Menu Cascata do Seletor Rápido de Pneus
    const selectorWrapper = document.querySelector('.selector-dropdown-wrapper');
    const selectTrigger = document.getElementById('selectAroTrigger');
    const medidaOptions = document.querySelectorAll('.medida-option');

    const brandsModalOverlay = document.getElementById('brandsModalOverlay');
    const closeBrandsModal = document.getElementById('closeBrandsModal');
    const closeBrandsFooter = document.getElementById('closeBrandsFooter');
    const modalMedidaTitle = document.getElementById('modalMedidaTitle');
    const brandsCardsContainer = document.getElementById('brandsCardsContainer');

    if (selectTrigger && selectorWrapper) {
        selectTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            selectorWrapper.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            selectorWrapper.classList.remove('active');
        });
    }

    medidaOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            selectorWrapper.classList.remove('active');

            const medidaEscolhida = option.getAttribute('data-medida');
            abrirModalMarcas(medidaEscolhida);
        });
    });

    function abrirModalMarcas(medida) {
        if (!modalMedidaTitle || !brandsCardsContainer) return;

        modalMedidaTitle.textContent = medida;
        brandsCardsContainer.innerHTML = '';

        const marcasDisponiveis = catalogoMarcas[medida] || [
            { marca: "Goodyear", linha: "Direction Touring", preco: 299.90 },
            { marca: "Pirelli", linha: "Cinturato", preco: 319.90 },
            { marca: "Firestone", linha: "F-700", preco: 289.90 }
        ];

        marcasDisponiveis.forEach(item => {
            brandsCardsContainer.innerHTML += `
                <div class="brand-card-item">
                    <div class="brand-card-top">
                        <span>Disponível em Estoque</span>
                        <h4>${item.marca}</h4>
                        <p>Linha: ${item.linha} • Aro ${medida}</p>
                    </div>
                    <div class="brand-price-box">
                        <small>Valor Unitário</small>
                        <div class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                    </div>
                    <div class="brand-card-actions">
                        <button class="btn-add-brand-cart" onclick="abrirDetalhesProduto('Pneu', '${medida} (${item.marca} - ${item.linha})', ${item.preco}, 'Aro ' + '${medida}'.split(' ')[1], '${medida}', 'Radial de Alta Performance Certificado INMETRO', 'Compatível com veículos de passeio e utilitários', '${item.marca}')">
                            <i class="fa-solid fa-circle-info"></i> Ver Detalhes & Comprar
                        </button>
                    </div>
                </div>
            `;
        });

        brandsModalOverlay.classList.add('active');
    }

    if (closeBrandsModal) closeBrandsModal.addEventListener('click', () => brandsModalOverlay.classList.remove('active'));
    if (closeBrandsFooter) closeBrandsFooter.addEventListener('click', () => brandsModalOverlay.classList.remove('active'));

    // 4. Controle do Card/Modal de Informações Detalhadas do Produto
    const productDetailsModal = document.getElementById('productDetailsModal');
    const closeDetailsModal = document.getElementById('closeDetailsModal');
    const detailsContinueShopping = document.getElementById('detailsContinueShopping');
    const detailsProceedCheckout = document.getElementById('detailsProceedCheckout');
    const addToCartBtn = document.getElementById('addToCartBtn');

    let produtoAtualTemp = null;

    window.abrirDetalhesProduto = function(categoria, nomeProd, preco, aro, tamanho, especificacoes, engate, marca) {
        produtoAtualTemp = {
            categoria: categoria,
            medida: nomeProd,
            precoUnitario: preco
        };

        document.getElementById('detProdNome').textContent = nomeProd;
        document.getElementById('detProdMarca').textContent = marca;
        document.getElementById('detProdAro').textContent = aro;
        document.getElementById('detProdTamanho').textContent = tamanho;
        document.getElementById('detProdEspecificacoes').textContent = especificacoes;
        document.getElementById('detProdEngate').textContent = engate;
        document.getElementById('detProdValor').textContent = `R$ ${preco.toFixed(2).replace('.', ',')}`;

        brandsModalOverlay.classList.remove('active');
        productDetailsModal.classList.add('active');
    };

    if (closeDetailsModal) closeDetailsModal.addEventListener('click', () => productDetailsModal.classList.remove('active'));
    if (detailsContinueShopping) detailsContinueShopping.addEventListener('click', () => productDetailsModal.classList.remove('active'));

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const tipoVeiculo = document.getElementById('tipoVeiculo').value;
            const medidaVal = document.getElementById('medidaPneu').value;
            const quantidade = parseInt(document.getElementById('qtdPneu').value, 10);
            
            const [medidaText, precoUnitarioStr] = medidaVal.split('|');
            const precoUnitario = parseFloat(precoUnitarioStr);

            // Seletor rápido mantém a quantidade escolhida pelo usuário nos selects
            const valorTotalItem = precoUnitario * quantidade;
            cart.push({
                id: Date.now() + Math.random(),
                categoria: tipoVeiculo,
                medida: medidaText,
                quantidade: quantidade,
                precoUnitario: precoUnitario,
                total: valorTotalItem
            });

            updateCartUI();
            cartModal.classList.add('active');
        });
    }

    // Quando clica em Finalizar Compra no card de detalhes do catálogo, adiciona EXATAMENTE 1 unidade (valor unitário)
    if (detailsProceedCheckout) {
        detailsProceedCheckout.addEventListener('click', () => {
            if (produtoAtualTemp) {
                const quantidade = 1; // Regra aplicada: apenas 1 unidade por padrão ao vir dos cards do catálogo
                const valorTotalItem = produtoAtualTemp.precoUnitario * quantidade;

                cart.push({
                    id: Date.now() + Math.random(),
                    categoria: produtoAtualTemp.categoria,
                    medida: produtoAtualTemp.medida,
                    quantidade: quantidade,
                    precoUnitario: produtoAtualTemp.precoUnitario,
                    total: valorTotalItem
                });

                updateCartUI();
                productDetailsModal.classList.remove('active');
                cartModal.classList.add('active');
            }
        });
    }

    // 5. Lógica do Carrinho e Envio Automático por E-mail via EmailJS
    let cart = [];
    const cartCountElem = document.getElementById('cartCount');
    const cartModal = document.getElementById('cartModal');
    const cartTrigger = document.getElementById('cartTrigger');
    const closeModal = document.getElementById('closeModal');
    const continueShopping = document.getElementById('continueShopping');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const tipoRetiradaLoja = document.getElementById('tipoRetiradaLoja');
    const tipoEntregaEndereco = document.getElementById('tipoEntregaEndereco');
    const addressSection = document.getElementById('addressSection');

    if (tipoRetiradaLoja && tipoEntregaEndereco && addressSection) {
        tipoRetiradaLoja.addEventListener('change', () => {
            if (tipoRetiradaLoja.checked) {
                addressSection.style.display = 'none';
            }
        });
        tipoEntregaEndereco.addEventListener('change', () => {
            if (tipoEntregaEndereco.checked) {
                addressSection.style.display = 'block';
            }
        });
    }

    if (cartTrigger) {
        cartTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            cartModal.classList.add('active');
        });
    }

    if (closeModal) closeModal.addEventListener('click', () => cartModal.classList.remove('active'));
    if (continueShopping) continueShopping.addEventListener('click', () => cartModal.classList.remove('active'));

    window.removerItemCarrinho = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
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
                        <h4>Item: ${item.medida} (${item.categoria})</h4>
                        <span>${item.quantidade}x R$ ${item.precoUnitario.toFixed(2).replace('.', ',')} = <strong>R$ ${item.total.toFixed(2).replace('.', ',')}</strong></span>
                    </div>
                    <button class="btn-remove-item" onclick="removerItemCarrinho(${item.id})" title="Remover item">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        });

        if (cartTotalPrice) cartTotalPrice.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
    }

    // Ação ao clicar em "Finalizar Vendas" (Dispara o e-mail automaticamente)
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }

            const formaRecebimento = document.querySelector('input[name="deliveryMethod"]:checked').value;
            const formaPagamento = document.querySelector('input[name="paymentMethod"]:checked').value;
            
            let rua = "", numero = "", bairro = "", cidade = "";

            if (formaRecebimento === "Receber em Endereço") {
                rua = document.getElementById('endRua').value.trim();
                numero = document.getElementById('endNumero').value.trim();
                bairro = document.getElementById('endBairro').value.trim();
                cidade = document.getElementById('endCidade').value.trim();

                if (!rua || !numero || !bairro || !cidade) {
                    alert('Por favor, preencha todos os campos do endereço de recebimento!');
                    document.getElementById('endRua').focus();
                    return;
                }
            }

            // Criando o corpo da mensagem com os parabéns e os dados da venda
            let corpoMensagem = "🎉 PARABÉNS! NOVA VENDA REALIZADA NO SITE!\n\n";
            corpoMensagem += "Detalhes do pedido:\n\n";
            
            let totalGeral = 0;
            cart.forEach((item, index) => {
                corpoMensagem += `${index + 1}. ${item.medida} (${item.categoria})\n`;
                corpoMensagem += `   Quantidade: ${item.quantidade}x\n`;
                corpoMensagem += `   Subtotal: R$ ${item.total.toFixed(2).replace('.', ',')}\n\n`;
                totalGeral += item.total;
            });

            corpoMensagem += `----------------------------------------\n`;
            corpoMensagem += `FORMA DE RECEBIMENTO: ${formaRecebimento}\n`;
            
            if (formaRecebimento === "Retirar na Loja") {
                corpoMensagem += `> O cliente irá retirar na loja (Instalação Grátis).\n`;
            } else {
                corpoMensagem += `ENDEREÇO DE ENTREGA:\n`;
                corpoMensagem += `Rua: ${rua}, Nº ${numero}\n`;
                corpoMensagem += `Bairro: ${bairro} - Cidade: ${cidade}\n`;
            }

            corpoMensagem += `\nFORMA DE PAGAMENTO: ${formaPagamento}\n`;
            corpoMensagem += `VALOR TOTAL: R$ ${totalGeral.toFixed(2).replace('.', ',')}\n`;
            corpoMensagem += `----------------------------------------\n`;

            checkoutBtn.disabled = true;
            checkoutBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Enviando venda...`;

            const templateParams = {
                to_email: 'rstenorio2015@gmail.com',
                message: corpoMensagem
            };

            emailjs.send('seu_service_id', 'seu_template_id', templateParams)
                .then(function(response) {
                    alert('Parabéns! Sua venda foi finalizada com sucesso e os dados foram enviados para o seu e-mail!');
                    cart = [];
                    updateCartUI();
                    cartModal.classList.remove('active');
                    checkoutBtn.disabled = false;
                    checkoutBtn.innerHTML = `<i class="fa-solid fa-envelope"></i> Finalizar Vendas`;
                }, function(error) {
                    alert('Erro ao enviar o e-mail. Verifique a configuração do EmailJS.');
                    console.error('FAILED...', error);
                    checkoutBtn.disabled = false;
                    checkoutBtn.innerHTML = `<i class="fa-solid fa-envelope"></i> Finalizar Vendas`;
                });
        });
    }
});
