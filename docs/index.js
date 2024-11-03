// Espera até que o conteúdo da página esteja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Cria um novo botão
    const welcomeButton = document.createElement("button");
    welcomeButton.textContent = "Clique para uma saudação!";
    welcomeButton.style.padding = "10px 20px"; // Define o estilo do botão
    welcomeButton.style.fontFamily = "Press Start 2P"; // Estilo de fonte
    welcomeButton.style.cursor = "pointer"; // Muda o cursor ao passar sobre o botão
    welcomeButton.style.margin = "20px auto"; // Centraliza o botão

    // Seleciona o elemento onde o botão será adicionado
    const contentDiv = document.querySelector(".conteudoPrincipal");
    contentDiv.appendChild(welcomeButton); // Adiciona o botão ao conteúdo principal

    // Adiciona um evento de clique ao botão
    welcomeButton.addEventListener("click", function () {
        // Exibe uma mensagem de saudação quando o botão é clicado
        alert("Bem-vindo à LevelUp! Prepare-se para jogos incríveis!");
    });
});