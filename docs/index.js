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


// index.js
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os links de navegação
    const links = document.querySelectorAll(".navegacao nav a");

    // Adiciona um evento de clique em cada link para evitar o carregamento completo
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Impede o comportamento padrão de redirecionamento

            // Obtém a URL do link clicado
            const url = link.getAttribute("href");

            // Chama a função de carregar o conteúdo da página
            carregarPagina(url);
        });
    });
});

async function carregarPagina(url) {
    try {
        // Busca o conteúdo da página de forma assíncrona
        const response = await fetch(url);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) throw new Error("Erro ao carregar a página.");

        // Lê o conteúdo HTML da página
        const conteudo = await response.text();

        // Insere o conteúdo na div principal
        document.querySelector(".conteudoPrincipal").innerHTML = conteudo;
    } catch (erro) {
        console.error("Erro:", erro);
        document.querySelector(".conteudoPrincipal").innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
    }
}
