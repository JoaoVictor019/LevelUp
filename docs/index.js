document.addEventListener("DOMContentLoaded", function () {
  // Cria o botão
  const welcomeButton = document.createElement("button");
  welcomeButton.textContent = "Clique para uma saudação!";
  welcomeButton.style.padding = "10px 20px";
  welcomeButton.style.fontFamily = "Press Start 2P";
  welcomeButton.style.cursor = "pointer";
  welcomeButton.style.margin = "20px auto";

  // Adiciona o botão ao conteúdo principal
  const contentDiv = document.querySelector(".conteudoPrincipal");
  contentDiv.appendChild(welcomeButton);

  // Seleciona o título e parágrafos
  const titulo = document.querySelector("h1");
  const parrafos = document.querySelectorAll(".conteudoPrincipal p");

  // Anima o título
  setTimeout(() => {
    titulo.classList.add("pulse");
  }, 500);

  // Evento de clique no botão
  welcomeButton.addEventListener("click", function () {
    alert("Bem-vindo à LevelUp! Prepare-se para jogos incríveis!");

    // Anima cada parágrafo com atraso escalonado
    parrafos.forEach((paragrafo, index) => {
      setTimeout(() => {
        paragrafo.classList.add("fade-in", "visible");
      }, 500 + index * 500);
    });
  });
});