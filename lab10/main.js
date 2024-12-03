<<<<<<< HEAD
import produtos from './produtos.js';


// Variáveis globais para gerir os produtos selecionados.
let idsSelectionados = new Set(); // Armazena os IDs dos produtos que foram adicionados ao cesto.
let produtosSelecionados = []; // Armazena os detalhes dos produtos atualmente no cesto.

// Evento principal: ao carregar o DOM, inicializa os produtos e atualiza o cesto.
document.addEventListener("DOMContentLoaded", () => {
    inicializarLocalStorage(); // Verifica e inicializa o localStorage para persistência.
    carregarProdutos(produtos); // Carrega todos os produtos na secção de produtos disponíveis.
    carregarProdutosSelecionados(); // Atualiza a secção do cesto com produtos armazenados no localStorage.
});

/**
 * Verifica se a chave "produtos-selecionados" existe no localStorage.
 * Se não existir, cria-a com uma lista vazia. 
 * Caso já exista, carrega os produtos guardados no cesto e atualiza o estado.
 */
function inicializarLocalStorage() {
    const storedProdutos = localStorage.getItem("produtos-selecionados"); // Obtém os produtos armazenados.
    if (!storedProdutos) {
        localStorage.setItem("produtos-selecionados", JSON.stringify([])); // Inicializa como uma lista vazia, se não existir.
    } else {
        produtosSelecionados = JSON.parse(storedProdutos); // Carrega os produtos armazenados.
        idsSelectionados = new Set(produtosSelecionados.map(produto => produto.id)); // Atualiza os IDs selecionados.
    }
}

/**
 * Carrega todos os produtos disponíveis na página.
 * @param {Array} produtosList - Lista de produtos disponíveis.
 */
function carregarProdutos(produtosList) {
    const sectionProdutos = document.querySelector("#allProducts"); // Seleciona o elemento onde os produtos serão exibidos.
    sectionProdutos.innerHTML = ""; // Limpa o conteúdo atual.

    produtosList.forEach(produto => {
        // Cria cada produto como um elemento HTML.
        const elementoProduto = criaProduto(produto, function () {
            if (!idsSelectionados.has(produto.id)) { // Verifica se o produto já foi adicionado ao cesto.
                idsSelectionados.add(produto.id); // Adiciona o ID ao conjunto de selecionados.
                carregarProdutosSelecionados(); // Atualiza o cesto.
                localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados)); // Atualiza o localStorage.
            }
        });
        sectionProdutos.appendChild(elementoProduto); // Adiciona o produto à secção de produtos disponíveis.
    });
}

/**
 * Cria o elemento HTML de um produto.
 * @param {Object} produto - Objeto do produto contendo suas informações.
 * @param {Function} callback - Função a ser chamada ao clicar no botão "Adicionar ao cesto".
 * @returns {HTMLElement} - Elemento HTML representando o produto.
 */
function criaProduto(produto, callback) {
    const article = document.createElement('article'); // Cria um elemento 'article' para o produto.
    article.classList.add('produto'); // Adiciona uma classe para estilização.
    article.setAttribute("id", String(produto.id)); // Define o ID do produto como atributo.

    // Criação e configuração dos elementos internos.
    const titulo = document.createElement('h3'); // Título do produto.
    titulo.textContent = produto.title;

    const imagem = document.createElement('img'); // Imagem do produto.
=======
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
>>>>>>> 4831268 (lab 10 quase completo)
    imagem.classList.add('produto__image');
    imagem.src = produto.image;
    imagem.alt = produto.title;

<<<<<<< HEAD
    const preco = document.createElement('span'); // Preço do produto.
    preco.classList.add('produto__price');
    preco.textContent = `Preço: ${produto.price.toFixed(2)}€`;

    const descricao = document.createElement('p'); // Descrição do produto.
    descricao.classList.add('produto__description');
    descricao.textContent = produto.description;

    const botao = document.createElement('button'); // Botão para adicionar ao cesto.
    botao.textContent = '+ Adicionar ao cesto';
    botao.addEventListener("click", callback); // Liga o botão à função callback.

    // Adiciona todos os elementos criados ao 'article'.
=======
    const preco = document.createElement('span');
    preco.classList.add('produto__price');
    preco.textContent = `Preço: ${produto.price.toFixed(2)}€`;

    const descricao = document.createElement('p');
    descricao.classList.add('produto__description');
    descricao.textContent = produto.description;

    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao cesto';
    botao.addEventListener("click", callback);

>>>>>>> 4831268 (lab 10 quase completo)
    article.appendChild(titulo);
    article.appendChild(imagem);
    article.appendChild(preco);
    article.appendChild(descricao);
    article.appendChild(botao);

<<<<<<< HEAD
    return article; // Retorna o elemento HTML do produto.
}

/**
 * Atualiza a secção do cesto com os produtos atualmente selecionados.
 */
function carregarProdutosSelecionados() {
    const idsSelectionadosArray = [...idsSelectionados]; // Converte o conjunto de IDs para uma lista.
    produtosSelecionados = produtos.filter(produto => idsSelectionadosArray.includes(produto.id)); // Filtra os produtos selecionados.

    const sectionSelecionados = document.querySelector("#selecionados"); // Seleciona a secção do cesto.
    const custoTotalElement = document.querySelector("#custoTotal"); // Seleciona o elemento do custo total.

    sectionSelecionados.innerHTML = ""; // Limpa o conteúdo atual do cesto.

    produtosSelecionados.forEach(produto => {
        // Adiciona cada produto selecionado ao cesto.
=======
    return article;
}

// Carrega os produtos selecionados no cesto.
function carregarProdutosSelecionados() {
    produtosSelecionados = listaProdutos.filter(produto => idsSelectionados.has(produto.id));

    const sectionSelecionados = document.querySelector("#selecionados");
    const custoTotalElement = document.querySelector("#custoTotal");

    sectionSelecionados.innerHTML = "";

    produtosSelecionados.forEach(produto => {
>>>>>>> 4831268 (lab 10 quase completo)
        const elementoProduto = criaProdutoCesto(produto);
        sectionSelecionados.appendChild(elementoProduto);
    });

<<<<<<< HEAD
    // Calcula o custo total dos produtos no cesto.
    const precoTotal = produtosSelecionados.map(({ price }) => price).reduce((acc, val) => acc + val, 0);
    custoTotalElement.textContent = `Custo total: ${precoTotal.toFixed(2)}€`;

    // Atualiza o localStorage com os produtos selecionados.
    localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
}

/**
 * Cria o elemento HTML de um produto no cesto.
 * @param {Object} produto - Objeto do produto no cesto.
 * @returns {HTMLElement} - Elemento HTML representando o produto no cesto.
 */
function criaProdutoCesto(produto) {
    const elementoProduto = criaProduto(produto, function () {
        idsSelectionados.delete(produto.id); // Remove o ID do conjunto de selecionados.
        carregarProdutosSelecionados(); // Atualiza o cesto.
        localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados)); // Atualiza o localStorage.
    });

    const paragrado = elementoProduto.querySelector("p"); // Remove a descrição do produto no cesto.
    paragrado.remove();
    const botao = elementoProduto.querySelector("button"); // Atualiza o botão para remover do cesto.
    botao.textContent = '- Remover do cesto';
    return elementoProduto; // Retorna o elemento HTML do produto no cesto.
}
=======
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

document.querySelector('#comprar').addEventListener('click', async ()=> {

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

    const preco = document.createElement('p');
    preco.textContent = `Custo total: ${resposta.totalCost} €`;
    preco.style.fontSize = '24px';
    preco.style.fontWeight = 'bold';

    const referencia = document.createElement('p');
    referencia.textContent = `Referência de pagamento: ${resposta.reference}`;
    referencia.style.fontSize = '20px';
    referencia.style.fontWeight = 'bold';
    referencia.style.marginBottom = '20px';

    const pagamento = document.querySelector('#checkout');
    
    pagamento.querySelectorAll('*').forEach(element => element.setAttribute('hidden', ''));
    
    pagamento.appendChild(preco);
    pagamento.appendChild(referencia);

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
>>>>>>> 4831268 (lab 10 quase completo)
