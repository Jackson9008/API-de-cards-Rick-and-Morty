
# Cartoons Archive — Front-End Project
Projeto de Front-End para consumir a API Rick and Morty e exibir cards dinâmicos.

## Tecnologias
- HTML
- CSS (puro)
- JavaScript (fetch API, DOM manipulation)

## Como usar
1. Abra `index.html` no navegador (recomendado usar um servidor local como Live Server ou `python -m http.server`)
2. A página irá carregar personagens da API. Use a busca e filtros para refinar.
3. Clique 'Carregar Mais' para obter a próxima página de resultados.

## Arquivos
- index.html — estrutura da página
- styles.css — estilos
- app.js — lógica de consumo da API e geração dos cards

## Notas técnicas
- API escolhida: https://rickandmortyapi.com/
- Requisitos cumpridos: fetch, criação dinâmica dos elementos via `document.createElement`, `appendChild`.
- Compatibilidade: navegadores modernos (Chrome, Edge, Firefox, Safari).
