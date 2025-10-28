const API_URL = 'https://rickandmortyapi.com/api/character';
let proximaPagina = API_URL;

const listaCards = document.getElementById('listaCards');
const carregando = document.getElementById('carregando');
const erro = document.getElementById('erro');
const botaoMais = document.getElementById('carregarMais');
const busca = document.getElementById('busca');
const filtroStatus = document.getElementById('filtroStatus');

async function buscarPersonagens(url = API_URL) {
    try {
        carregando.style.display = 'block';
        erro.textContent = '';
        const nome = busca.value.trim();
        const status = filtroStatus.value;
        const params = new URLSearchParams();
        if (nome) params.set('name', nome);
        if (status) params.set('status', status);
        const fullUrl = url.includes('?') ? url + '&' + params : (params ? url + '?' + params : url);

        const resposta = await fetch(fullUrl);
        if (!resposta.ok) throw new Error('Erro ao buscar dados');

        const dados = await resposta.json();
        proximaPagina = dados.info.next;
        mostrarPersonagens(dados.results);
    } catch (e) {
        erro.textContent = 'Erro: ' + e.message;
    } finally {
        carregando.style.display = 'none';
    }
}

function mostrarPersonagens(lista) {
    lista.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Status: ${p.status}</p>
            <p>Espécie: ${p.species}</p>
        `;
        listaCards.appendChild(card);
    });
}

busca.addEventListener('input', () => {
    listaCards.innerHTML = '';
    buscarPersonagens(API_URL);
});

filtroStatus.addEventListener('change', () => {
    listaCards.innerHTML = '';
    buscarPersonagens(API_URL);
});

botaoMais.addEventListener('click', () => {
    if (proximaPagina) buscarPersonagens(proximaPagina);
});

document.addEventListener('DOMContentLoaded', () => buscarPersonagens(API_URL));
