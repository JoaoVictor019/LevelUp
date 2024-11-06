// Navegação assíncrona entre páginas
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os links de navegação
    const links = document.querySelectorAll(".navegacao nav a");

    // Adiciona evento para carregamento assíncrono
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Impede o redirecionamento padrão
            const url = link.getAttribute("href"); // Obtém a URL do link clicado
            carregarPagina(url); // Chama função para carregar a nova página
        });
    });
});

async function carregarPagina(url) {
    try {
        const response = await fetch(url); // Busca conteúdo da página
        if (!response.ok) throw new Error("Erro ao carregar a página.");
        
        const conteudo = await response.text(); // Converte conteúdo para texto
        document.querySelector(".conteudoPrincipal").innerHTML = conteudo; // Insere conteúdo na div

        aplicarEfeitos(); // Aplica animações nos elementos carregados
    } catch (erro) {
        console.error("Erro:", erro);
        document.querySelector(".conteudoPrincipal").innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
    }
}

// Função para aplicar efeitos
function aplicarEfeitos() {
    const titulo = document.querySelector("h1");
    const parrafos = document.querySelectorAll(".conteudoPrincipal p");

    // Adiciona efeito de pulsar ao título
    setTimeout(() => {
        titulo?.classList.add('pulse'); // Adiciona classe ao título se existir
    }, 500);

    // Adiciona efeito de fade-in nos parágrafos com atraso escalonado
    parrafos.forEach((paragrafo, index) => {
        setTimeout(() => {
            paragrafo.classList.add('fade-in', 'visible');
        }, 500 + index * 500); // Atraso crescente para cada parágrafo
    });
}
