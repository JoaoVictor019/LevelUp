// script.js

// Espera que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o título e os parágrafos
    const titulo = document.querySelector('h1');
    const parrafos = document.querySelectorAll('.conteudoPrincipal p');
    
    // Adiciona a classe 'pulse' ao título após um pequeno atraso
    setTimeout(() => {
        titulo.classList.add('pulse'); // Adiciona efeito de pulsar ao título
    }, 500);

    // Adiciona a classe 'visible' aos parágrafos com atraso escalonado
    parrafos.forEach((paragrafo, index) => {
        setTimeout(() => {
            paragrafo.classList.add('fade-in', 'visible'); // Aplica o efeito fade-in
        }, 500 + index * 500); // Atraso crescente para cada parágrafo
    });
});
