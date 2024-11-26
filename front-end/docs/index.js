
// Espera até que o conteúdo da página esteja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Cria um novo botão
    const welcomeButton = document.createElement("button");
    welcomeButton.textContent = "Clique para uma saudação!";
    welcomeButton.style.padding = "10px 20px"; // Define o estilo do botão
    welcomeButton.style.fontFamily = "Press Start 2P"; // Estilo de fonte
    welcomeButton.style.cursor = "pointer"; // Muda o cursor ao passar sobre o botão
    welcomeButton.style.margin = "20px auto"; // Centraliza o botão
// script.js

    // Seleciona o elemento onde o botão será adicionado
    const contentDiv = document.querySelector(".conteudoPrincipal");
    contentDiv.appendChild(welcomeButton); // Adiciona o botão ao conteúdo principal
// Espera que o DOM esteja completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o título e os parágrafos
    const titulo = document.querySelector('h1');
    const parrafos = document.querySelectorAll('.conteudoPrincipal p');
    
    // Adiciona a classe 'pulse' ao título após um pequeno atraso
    setTimeout(() => {
        titulo.classList.add('pulse'); // Adiciona efeito de pulsar ao título
    }, 500);

    // Adiciona um evento de clique ao botão
    welcomeButton.addEventListener("click", function () {
        // Exibe uma mensagem de saudação quando o botão é clicado
        alert("Bem-vindo à LevelUp! Prepare-se para jogos incríveis!");
    // Adiciona a classe 'visible' aos parágrafos com atraso escalonado
    parrafos.forEach((paragrafo, index) => {
        setTimeout(() => {
            paragrafo.classList.add('fade-in', 'visible'); // Aplica o efeito fade-in
        }, 500 + index * 500); // Atraso crescente para cada parágrafo
    });
});
});
