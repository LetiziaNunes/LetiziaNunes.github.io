// Variável global para armazenar os produtos carregados.
let listaProdutos = [];
let idsSelectionados = new Set(); // Armazena os IDs dos produtos que foram adicionados ao cesto.
let produtosSelecionados = [];

// Função para buscar os produtos da API.
async function fetchProdutos() {
    const resposta = await fetch("https://deisishop.pythonanywhere.com/products");
    const produtos = await resposta.json();
    console.log(produtos);
    return produtos;
}

// Função para buscar as categorias da API.
async function fetchCategorias() {
    const resposta = await fetch("https://deisishop.pythonanywhere.com/categories");
    const categorias = await resposta.json();
    console.log(categorias);
    return categorias;
}

// Inicializa os dados armazenados no LocalStorage.
function inicializarLocalStorage() {
    const storedProdutos = localStorage.getItem("produtos-selecionados");
    if (!storedProdutos) {
        localStorage.setItem("produtos-selecionados", JSON.stringify([]));
    } else {
        produtosSelecionados = JSON.parse(storedProdutos);
        idsSelectionados = new Set(produtosSelecionados.map(produto => produto.id));
    }
}

// Carrega os produtos na página.
async function carregarProdutos(produtos) {
    listaProdutos = produtos; // Armazena os produtos carregados na variável global.
    const sectionProdutos = document.querySelector("#allProducts");

    produtos.forEach(produto => {
        const elementoProduto = criaProduto(produto, function () {
            if (!idsSelectionados.has(produto.id)) {
                idsSelectionados.add(produto.id);
                carregarProdutosSelecionados(); // Atualiza o cesto.
                localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
            }
        });
        sectionProdutos.appendChild(elementoProduto);
    });
}

// Cria um elemento HTML para representar um produto.
function criaProduto(produto, callback) {
    const article = document.createElement('article');
    article.classList.add('produto');
    article.setAttribute("id", String(produto.id));

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.classList.add('produto__image');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement('span');
    preco.classList.add('produto__price');
    preco.textContent = `Preço: ${produto.price.toFixed(2)}€`;

    const descricao = document.createElement('p');
    descricao.classList.add('produto__description');
    descricao.textContent = produto.description;

    const rate = document.createElement('span');
    rate.classList.add('produto__rate');
    rate.textContent = produto.rate;


    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao cesto';
    botao.addEventListener("click", callback);

    article.appendChild(titulo);
    article.appendChild(imagem);
    article.appendChild(preco);
    article.appendChild(descricao);
    article.appendChild(rate);
    article.appendChild(botao);

    return article;
}

// Carrega os produtos selecionados no cesto.
function carregarProdutosSelecionados() {
    produtosSelecionados = listaProdutos.filter(produto => idsSelectionados.has(produto.id));

    const sectionSelecionados = document.querySelector("#selecionados");
    const custoTotalElement = document.querySelector("#custoTotal");

    sectionSelecionados.innerHTML = "";

    produtosSelecionados.forEach(produto => {
        const elementoProduto = criaProdutoCesto(produto);
        sectionSelecionados.appendChild(elementoProduto);
    });

    const precoTotal = produtosSelecionados.map(({ price }) => price).reduce((acc, val) => acc + val, 0);
    custoTotalElement.textContent = `Custo total: ${precoTotal.toFixed(2)}€`;

    localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
}

// Cria um elemento HTML para representar um produto no cesto.
function criaProdutoCesto(produto) {
    const elementoProduto = criaProduto(produto, function () {
        idsSelectionados.delete(produto.id);
        carregarProdutosSelecionados(); // Atualiza o cesto.
        localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
    });

    const descricao = elementoProduto.querySelector("p");
    descricao.remove();

    const botao = elementoProduto.querySelector("button");
    botao.textContent = '- Remover do cesto';
    return elementoProduto;
}

// Filtra os produtos baseando-se no termo de busca inserido
// Filtra os produtos baseando-se no termo de busca inserido (apenas pelo título)
function buscarProdutos(termo) {
    const sectionProdutos = document.querySelector("#allProducts");
    sectionProdutos.innerHTML = ""; // Limpa os produtos exibidos

    const termoNormalizado = termo.trim().toLowerCase();

    // Filtra os produtos com base no termo apenas no título
    const produtosFiltrados = listaProdutos.filter(produto =>
        produto.title.toLowerCase().includes(termoNormalizado) || produto.description.toLowerCase().includes(termoNormalizado)

    );

    // Atualiza a secção com os produtos filtrados
    if (produtosFiltrados.length > 0) {
        produtosFiltrados.forEach(produto => {
            const elementoProduto = criaProduto(produto, function () {
                if (!idsSelectionados.has(produto.id)) {
                    idsSelectionados.add(produto.id);
                    carregarProdutosSelecionados();
                    localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
                }
            });
            sectionProdutos.appendChild(elementoProduto);
        });
    } else {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum produto encontrado.";
        sectionProdutos.appendChild(mensagem);
    }
}

// Evento para escutar a digitação no campo de busca
document.querySelector("#buscaProduto").addEventListener("input", (evento) => {
    buscarProdutos(evento.target.value);
});



// Cria o menu de filtros para categorias.
async function menuFiltrar() {
    const categorias = await fetchCategorias();
    const menuFiltros = document.querySelector("#categorias");

    // Adicionar uma opção padrão
    const opcaoPadrao = document.createElement("option");
    opcaoPadrao.value = "";
    opcaoPadrao.textContent = "Todas as categorias";
    menuFiltros.appendChild(opcaoPadrao);

    // Adicionar opções de categorias
    categorias.forEach(categoria => {
        const opcao = document.createElement("option");
        opcao.value = categoria;
        opcao.textContent = categoria;
        menuFiltros.appendChild(opcao);
    });

    // Adicionar evento para filtrar produtos quando a categoria for alterada
    menuFiltros.addEventListener("change", () => {
        const categoriaSelecionada = menuFiltros.value;
        filtrarProdutos(categoriaSelecionada);
    });
}

// Filtra os produtos com base na categoria selecionada.
function filtrarProdutos(categoria) {
    const sectionProdutos = document.querySelector("#allProducts");
    sectionProdutos.innerHTML = ""; // Limpa os produtos exibidos.

    const produtosFiltrados = categoria
        ? listaProdutos.filter(produto => produto.category === categoria)
        : listaProdutos; // Exibe todos os produtos se nenhuma categoria estiver selecionada.

    produtosFiltrados.forEach(produto => {
        const elementoProduto = criaProduto(produto, function () {
            if (!idsSelectionados.has(produto.id)) {
                idsSelectionados.add(produto.id);
                carregarProdutosSelecionados(); // Atualiza o cesto.
                localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
            }
        });
        sectionProdutos.appendChild(elementoProduto);
    });

    // Ordenar os produtos após aplicar o filtro
    ordenarPorPreco();
}



function ordenarPorPreco() {
    const menuOrdenacao = document.querySelector("#ordenacao");
    const categoriaAtiva = document.querySelector("#categorias").value;
    const criterioOrdenacao = menuOrdenacao.value;

    // Filtrar os produtos com base na categoria ativa (se houver)
    const produtosFiltrados = categoriaAtiva
        ? listaProdutos.filter(produto => produto.category === categoriaAtiva)
        : listaProdutos;

    // Ordenar os produtos com base no critério selecionado
    const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
        if (criterioOrdenacao === "crescente") {
            return a.price - b.price; // Ordenação crescente
        } else if (criterioOrdenacao === "decrescente") {
            return b.price - a.price; // Ordenação decrescente
        }
        return 0; // Sem ordenação
    });

    // Atualizar a exibição dos produtos
    const sectionProdutos = document.querySelector("#allProducts");
    sectionProdutos.innerHTML = ""; // Limpar a lista de produtos exibidos
    produtosOrdenados.forEach(produto => {
        const elementoProduto = criaProduto(produto, function () {
            if (!idsSelectionados.has(produto.id)) {
                idsSelectionados.add(produto.id);
                carregarProdutosSelecionados(); // Atualiza o cesto
                localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
            }
        });
        sectionProdutos.appendChild(elementoProduto);
    });
}

async function pedidoCompra(dados) {

    const pedido = await fetch('https://deisishop.pythonanywhere.com/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(dados)
    });

    const resposta = await pedido.json();

    return resposta;
    
}

document.querySelector('#comprar').addEventListener('click', async () => {
    const products = JSON.parse(localStorage.getItem('produtos-selecionados')).map(produto => `${produto.id}`);
    const checkbox = document.querySelector('#estudante').checked;
    const desconto = document.querySelector('#desconto').value;
    let resposta;

    const data = {
        "products": products,
        "student": checkbox,
        "coupon": desconto
    }
    
    resposta = await pedidoCompra(data);

    // Selecionar o elemento de checkout existente
    const pagamento = document.querySelector('#checkout');

    // Verificar se os elementos de preço e referência já existem
    let preco = pagamento.querySelector('.preco');
    let referencia = pagamento.querySelector('.referencia');

    // Se não existirem, criar os elementos
    if (!preco) {
        preco = document.createElement('p');
        preco.classList.add('preco');
        preco.style.fontSize = '24px';
        preco.style.fontWeight = 'bold';
        pagamento.appendChild(preco);
    }

    if (!referencia) {
        referencia = document.createElement('p');
        referencia.classList.add('referencia');
        referencia.style.fontSize = '20px';
        referencia.style.fontWeight = 'bold';
        referencia.style.marginBottom = '20px';
        pagamento.appendChild(referencia);
    }

    // Atualizar o conteúdo dos elementos
    preco.textContent = `Custo total: ${resposta.totalCost} €`;
    referencia.textContent = `Referência de pagamento: ${resposta.reference}`;
});




document.querySelector("#ordenacao").addEventListener("change", ordenarPorPreco);


// Evento principal ao carregar o DOM.
document.addEventListener("DOMContentLoaded", async () => {
    inicializarLocalStorage();
    const produtos = await fetchProdutos();
    carregarProdutos(produtos);
    carregarProdutosSelecionados();

    // Inicializa o menu de filtros.
    await menuFiltrar();
});




document.addEventListener("DOMContentLoaded", () => {
    const selecionadosContainer = document.getElementById("selecionados");
    const custoTotal = document.getElementById("custoTotal");

    // Evento para remover todos os produtos
    document.getElementById("removerTudo").addEventListener("click", () => {
        // Esvaziar o conteúdo do contêiner de produtos selecionados
        selecionadosContainer.innerHTML = "";

        // Atualizar o custo total para zero
        custoTotal.textContent = "Custo total: 0€";
    });
});



