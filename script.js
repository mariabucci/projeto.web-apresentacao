// ==========================================
// CARRINHO DE COMPRAS
// ==========================================

// Array que armazena os produtos do carrinho
let carrinho = [];


// Selecionando elementos do HTML
const botoesAdicionar = document.querySelectorAll('.adicionar');

const listaCarrinho = document.getElementById('listaCarrinho');

const quantidade = document.getElementById('quantidade');

const total = document.getElementById('total');

const contador = document.getElementById('contador');

const produtosUnicos = document.getElementById('produtosUnicos');

const quantidadeHero = document.getElementById('quantidadeHero');

const totalHero = document.getElementById('totalHero');

const botaoLimpar = document.getElementById('limpar');

const botaoFinalizar = document.getElementById('finalizar');


// ==========================================
// ADICIONAR PRODUTO
// ==========================================

botoesAdicionar.forEach(function(botao) {

    botao.addEventListener('click', function() {

        const nome = botao.dataset.nome;

        const preco = Number(botao.dataset.preco);


        // push() adiciona um novo produto ao array
        carrinho.push({
            nome: nome,
            preco: preco
        });


        atualizarCarrinho();

    });

});


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    listaCarrinho.innerHTML = '';


    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {

        listaCarrinho.innerHTML = `
            <div class="vazio">
                <div>🛒</div>
                <p>Seu carrinho está vazio.</p>
                <span>
                    Adicione um produto para começar.
                </span>
            </div>
        `;

    }


    // Criando cada produto dentro do carrinho
    carrinho.forEach(function(produto, indice) {

        const item = document.createElement('div');

        item.classList.add('item-carrinho');


        item.innerHTML = `
            <div class="item-nome">

                <div class="item-icon">
                    🛍️
                </div>

                <div>
                    <h4>${produto.nome}</h4>

                    <span>
                        R$ ${produto.preco.toFixed(2).replace('.', ',')}
                    </span>
                </div>

            </div>

            <div class="item-preco">

                <strong>
                    R$ ${produto.preco.toFixed(2).replace('.', ',')}
                </strong>

                <button
                    class="remover"
                    data-indice="${indice}">
                    Remover
                </button>

            </div>
        `;


        listaCarrinho.appendChild(item);

    });


    // Adiciona o evento aos botões de remover
    const botoesRemover =
        document.querySelectorAll('.remover');


    botoesRemover.forEach(function(botao) {

        botao.addEventListener('click', function() {

            const indice =
                Number(botao.dataset.indice);


            // splice() remove um elemento do array
            carrinho.splice(indice, 1);


            atualizarCarrinho();

        });

    });


    atualizarInformacoes();

}


// ==========================================
// ATUALIZAR INFORMAÇÕES
// ==========================================

function atualizarInformacoes() {

    // length mostra a quantidade de itens
    const quantidadeItens = carrinho.length;


    // reduce() calcula o valor total
    const valorTotal = carrinho.reduce(
        function(acumulador, produto) {

            return acumulador + produto.preco;

        },
        0
    );


    // ======================================
    // filter()
    // ======================================

    // Cria uma lista contendo apenas
    // produtos que aparecem uma única vez

    const produtosFiltrados = carrinho.filter(
        function(produto, indice) {

            return carrinho.findIndex(
                function(item) {

                    return item.nome === produto.nome;

                }
            ) === indice;

        }
    );


    // ======================================
    // join()
    // ======================================

    // Transforma o array em uma frase
    const nomes = produtosFiltrados
        .map(function(produto) {
            return produto.nome;
        })
        .join(', ');


    // Atualizando o DOM

    quantidade.textContent = quantidadeItens;

    quantidadeHero.textContent = quantidadeItens;


    total.textContent =
        `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

    totalHero.textContent =
        `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;


    if (quantidadeItens === 1) {

        contador.textContent = '1 item';

    } else {

        contador.textContent =
            `${quantidadeItens} itens`;

    }


    if (nomes === '') {

        produtosUnicos.textContent =
            'Nenhum produto adicionado.';

    } else {

        produtosUnicos.textContent = nomes;

    }

}


// ==========================================
// LIMPAR CARRINHO
// ==========================================

botaoLimpar.addEventListener('click', function() {

    // pop() remove o último elemento do array
    while (carrinho.length > 0) {

        carrinho.pop();

    }


    atualizarCarrinho();

});


// ==========================================
// FINALIZAR COMPRA
// ==========================================

botaoFinalizar.addEventListener('click', function() {

    if (carrinho.length === 0) {

        alert('Seu carrinho está vazio!');

        return;

    }


    const valorTotal = carrinho.reduce(
        function(acumulador, produto) {

            return acumulador + produto.preco;

        },
        0
    );


    alert(
        `Compra finalizada!\n\n` +
        `Quantidade de itens: ${carrinho.length}\n` +
        `Total: R$ ${valorTotal.toFixed(2).replace('.', ',')}`
    );

});


// ==========================================
// INÍCIO
// ==========================================

atualizarCarrinho();    


// DESAFIO FINAL - LISTA DE ITENS

const input = document.getElementById('item');
const botao = document.getElementById('adicionar');
const lista = document.getElementById('lista');

botao.addEventListener('click', function() {
    const textoDigitado = input.value;

    if (textoDigitado === '') {
        return;
    }

    const novoParagrafo = document.createElement('p');

    novoParagrafo.textContent = textoDigitado;

    lista.appendChild(novoParagrafo);

    botao.style.backgroundColor = 'green';

    input.value = '';
}); 