
import produtos from './produtos.js';

let idsSelectionados = new Set();
let produtosSelecionados = [];

document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos(produtos);
    atualizaCesto();
});

function carregarProdutos(produtosList) {
    const sectionProdutos = document.querySelector("#allProducts");
    sectionProdutos.innerHTML = "";

    produtosList.forEach(produto => {
        const elementoProduto = criaProduto(produto, function () {
            if (!idsSelectionados.has(produto.id)) {
                idsSelectionados.add(produto.id);
                carregarProdutosSelecionados();
                localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
            }
        });
        sectionProdutos.appendChild(elementoProduto);
    });
}

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

    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao cesto';
    botao.addEventListener("click", callback);

    article.appendChild(titulo);
    article.appendChild(imagem);
    article.appendChild(preco);
    article.appendChild(descricao);
    article.appendChild(botao);

    return article;
}

function carregarProdutosSelecionados() {
    const idsSelectionadosArray = [...idsSelectionados];
    produtosSelecionados = produtos.filter(produto => idsSelectionadosArray.includes(produto.id));

    const sectionSelecionados = document.querySelector("#selecionados");
    const custoTotalElement = document.querySelector("#custoTotal");

    sectionSelecionados.innerHTML = "";

    produtosSelecionados.forEach(produto => {
        const elementoProduto = criaProdutoCesto(produto);
        sectionSelecionados.appendChild(elementoProduto);
    });

    const precoTotal = produtosSelecionados.map(({ price }) => price).reduce((acc, val) => acc + val, 0);
    custoTotalElement.textContent = `Custo total: ${precoTotal.toFixed(2)}€`;
}

function criaProdutoCesto(produto) {
    const elementoProduto = criaProduto(produto, function () {
        idsSelectionados.delete(produto.id);
        carregarProdutosSelecionados();
        localStorage.setItem("produtos-selecionados", JSON.stringify(produtosSelecionados));
    });

    const paragrado = elementoProduto.querySelector("p");
    paragrado.remove();
    const botao = elementoProduto.querySelector("button");
    botao.textContent = '- Remover do cesto';
    return elementoProduto;
}
