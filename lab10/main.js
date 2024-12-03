/*
é async pq queremos garantir que a função só vai ser executada depois que a página for carregada
o await faz com que a função espere a resposta da requisição
*/
async function fetchProdutos(){

    const resposta = await fetch("https://deisishop.pythonanywhere.com/produtos");
    const produtos = await resposta.json();
    console.log(produtos);
    return produtos;

}