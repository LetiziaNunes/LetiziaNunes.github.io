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
    imagem.classList.add('produto__image');
    imagem.src = produto.image;
    imagem.alt = produto.title;

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
    article.appendChild(titulo);
    article.appendChild(imagem);
    article.appendChild(preco);
    article.appendChild(descricao);
    article.appendChild(botao);

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
        const elementoProduto = criaProdutoCesto(produto);
        sectionSelecionados.appendChild(elementoProduto);
    });

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