
// Função para aplicar animação de fade-in
function fadeIn(element, duration) {
    element.style.opacity = 0; // Começa com o elemento invisível (opacidade 0)
    let last = +new Date(); // Armazena a hora atual
    const tick = function () {
        // Aumenta a opacidade do elemento com base no tempo decorrido
        element.style.opacity = +element.style.opacity + (new Date() - last) / duration; 
        last = +new Date(); // Atualiza a hora atual

        // Se a opacidade ainda não for 1 (totalmente visível), continua a animação
        if (+element.style.opacity < 1) { 
            requestAnimationFrame(tick); // Solicita o próximo quadro da animação
        }
    };
    tick(); // Inicia a animação chamando a função tick
}

// Função para carregar a animação quando a página é carregada
function animateOnLoad() {
    // Seleciona o container da review
    const container = document.querySelector('.conteiner'); 
    // Seleciona a imagem dentro do container
    const img = container.querySelector('img'); 
    // Seleciona o texto dentro do container
    const text = container.querySelector('.texto'); 

    // Aplica a animação de fade-in à imagem e ao texto
    fadeIn(img, 1000); // 1000ms para a animação da imagem
    fadeIn(text, 1000); // 1000ms para a animação do texto
}

// Adiciona um evento para animar os elementos quando a página for carregada
window.onload = animateOnLoad; // Quando a janela é carregada, chama a função animateOnLoad

// Função para animar ao clicar no botão "Próximo review"
function animateNextReview() {
    // Seleciona o botão "Próximo review" usando um seletor CSS
    const nextReviewButton = document.querySelector('a[href="review2.html"]'); 
    // Aplica a animação de fade-in ao botão
    fadeIn(nextReviewButton, 1000); // 1000ms para a animação do botão
}

// Adiciona um evento de clique ao botão "Próximo review"
const nextReviewButton = document.querySelector('a[href="review2.html"]'); // Seleciona o botão novamente
if (nextReviewButton) { // Verifica se o botão existe
    nextReviewButton.addEventListener('click', animateNextReview); // Adiciona o evento de clique
}


// reviews.js

// Estrutura de dados com os reviews
const reviews = [
    {
        title: "Resident Evil 7",
        url: "reviews.html" // Substitua pelo nome do arquivo correto
    },
    {
        title: " Need for Speed Underground 2",
        url: "Need underground 2.html" // Exemplo de outro review
    },
       {
        title: "Subnautica",
        url: "Subnautica.html" // Exemplo de outro review
    },
    // Adicione mais reviews aqui
];

// Função para filtrar e exibir os resultados da busca
function filterReviews() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer'); // Container para os resultados
    resultsContainer.innerHTML = ""; // Limpa resultados anteriores

    // Filtra os reviews com base na entrada do usuário
    const filteredReviews = reviews.filter(review => review.title.toLowerCase().includes(filter));

    // Exibe os resultados filtrados
    filteredReviews.forEach(review => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${review.url}">${review.title}</a>`; // Cria um link para o review
        resultsContainer.appendChild(listItem); // Adiciona o item à lista
    });
}
