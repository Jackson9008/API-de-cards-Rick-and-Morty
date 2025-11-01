// URL base da API Rick and Morty (endpoint de personagens)
const API_URL = 'https://rickandmortyapi.com/api/character';

// Variável que guarda o link da próxima página da API (para paginação)
let proximaPagina = API_URL;

// Referências aos elementos do HTML usados no JavaScript
const listaCards = document.getElementById('listaCards');   // container onde os cards serão inseridos
const carregando = document.getElementById('carregando');   // mensagem de "Carregando..."
const erro = document.getElementById('erro');               // mensagem de erro
const botaoMais = document.getElementById('carregarMais');  // botão "Carregar Mais"
const busca = document.getElementById('busca');             // campo de busca por nome
const filtroStatus = document.getElementById('filtroStatus'); // filtro dropdown de status



// ======================================================================
// 🔍 Função principal que consome a API e busca personagens
// ======================================================================
async function buscarPersonagens(url = API_URL) {
    try {
        // Mostra mensagem "Carregando..." enquanto faz a requisição
        carregando.style.display = 'block';
        erro.textContent = '';

        // Obtém valores dos filtros preenchidos pelo usuário
        const nome = busca.value.trim();      // busca pelo nome
        const status = filtroStatus.value;    // filtro de status selecionado

        // Cria um objeto para montar os parâmetros da URL
        const params = new URLSearchParams();
        if (nome) params.set('name', nome);       // adiciona parâmetro name=...
        if (status) params.set('status', status); // adiciona parâmetro status=...

        // Monta a URL final considerando paginação e filtros
        const fullUrl = url.includes('?')
            ? url + '&' + params
            : (params ? url + '?' + params : url);

        // Requisição usando Fetch API (assíncrona)
        const resposta = await fetch(fullUrl);

        // Se a resposta NÃO estiver OK (status 200), lança erro
        if (!resposta.ok) throw new Error('Erro ao buscar dados');

        // Converte a resposta em JSON
        const dados = await resposta.json();

        // Atualiza a variável com o link da próxima página da API
        proximaPagina = dados.info.next;

        // Envia a lista de personagens para criação dos cards
        mostrarPersonagens(dados.results);

    } catch (e) {
        // Exibe mensagem de erro na tela
        erro.textContent = 'Erro: ' + e.message;

    } finally {
        // Esconde mensagem "Carregando..." após a requisição
        carregando.style.display = 'none';
    }
}



// ======================================================================
// 🧩 Função que cria e insere os cards dinamicamente no DOM
// ======================================================================
function mostrarPersonagens(lista) {
    lista.forEach(p => {

        // Cria um elemento <div> para representar um card
        const card = document.createElement('div');

        // Adiciona a classe CSS para estilização
        card.className = 'card';

        // Insere conteúdo HTML dentro do card (imagem, nome, status etc.)
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Status: ${p.status}</p>
            <p>Espécie: ${p.species}</p>
        `;

        // Insere o card dentro da grade (#listaCards)
        listaCards.appendChild(card);
    });
}



// ======================================================================
// 🎛️ EVENTOS DO USUÁRIO (busca, filtro e botão de carregar mais)
// ======================================================================

// Evento acionado enquanto o usuário digita no campo de busca
busca.addEventListener('input', () => {
    listaCards.innerHTML = '';             // limpa os cards atuais
    buscarPersonagens(API_URL);            // busca novamente desde o início
});

// Evento acionado quando o usuário muda o filtro de status
filtroStatus.addEventListener('change', () => {
    listaCards.innerHTML = '';             // limpa a grade
    buscarPersonagens(API_URL);            // busca com novo filtro
});

// Botão "Carregar Mais": chama a próxima página da API
botaoMais.addEventListener('click', () => {
    if (proximaPagina) buscarPersonagens(proximaPagina);
});



// ======================================================================
// 🚀 Quando a página termina de carregar, busca automaticamente a 1ª página
// ======================================================================
document.addEventListener('DOMContentLoaded', () => buscarPersonagens(API_URL));
