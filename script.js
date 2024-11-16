// Função para carregar os filmes do arquivo filmes.json
function getFilmes() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'filmes.json', true);
    
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4) {
            let conteudo = document.getElementById('conteudo');
            if (xmlHttp.status == 200) {
                const filmesJSON = JSON.parse(xmlHttp.responseText);
                conteudo.innerHTML = ''; // Limpa conteúdo anterior

                filmesJSON.filmes.forEach(filme => {
                    let div = document.createElement('div');
                    div.classList.add('filme', 'border', 'p-3', 'mb-3');

                    // Gêneros e elenco
                    const generos = filme.generos.map(g => g.genero).join(', ');
                    const elenco = filme.elenco.map(e => e.ator).join(', ');

                    div.innerHTML = `
                        <h4>${filme.titulo}</h4>
                        <p>${filme.resumo}</p>
                        <p><strong>Gêneros:</strong> ${generos}</p>
                        <p><strong>Elenco:</strong> ${elenco}</p>
                        <p><strong>Data de Lançamento:</strong> ${filme.dataLancamento.data} (${filme.dataLancamento.pais})</p>
                    `;
                    conteudo.appendChild(div);
                });
            } else {
                conteudo.innerHTML = '<p class="text-danger">Erro ao carregar os filmes.</p>';
            }
        }
    };

    xmlHttp.onerror = () => {
        let conteudo = document.getElementById('conteudo');
        conteudo.innerHTML = '<p class="text-danger">Erro de conexão. Verifique sua internet.</p>';
    };

    xmlHttp.send();
}

// Chama a função getFilmes quando a página é carregada
window.onload = getFilmes;

// Função para requisitar páginas assíncronas
function requisitarPagina(url) {
    let conteudo = document.getElementById('conteudo');
    let botoes = document.querySelectorAll('.nav-link');

    // Limpa o conteúdo atual
    conteudo.innerHTML = '';

    // Exibe a imagem de loading
    if (!document.getElementById('loading')) {
        let imgLoading = document.createElement('img');
        imgLoading.id = 'loading';
        imgLoading.src = 'loading.gif'; // Certifique-se de que o caminho está correto
        imgLoading.className = 'rounded mx-auto d-block';
        conteudo.appendChild(imgLoading);
    }

    // Desabilita os links da navbar enquanto carrega
    botoes.forEach(link => link.classList.add('disabled'));

    let ajax = new XMLHttpRequest();
    ajax.open('GET', url);

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                // Define apenas o conteúdo retornado no div 'conteudo'
                conteudo.innerHTML = ajax.responseText;
            } else {
                conteudo.innerHTML = '<p class="text-danger">Erro ao carregar a página. Por favor, tente novamente mais tarde.</p>';
            }
            botoes.forEach(link => link.classList.remove('disabled'));
            // Remove a imagem de loading após o carregamento
            let loadingImg = document.getElementById('loading');
            if (loadingImg) {
                loadingImg.remove();
            }
        }
    };

    ajax.onerror = () => {
        conteudo.innerHTML = '<p class="text-danger">Erro de conexão. Verifique sua internet.</p>';
        botoes.forEach(link => link.classList.remove('disabled'));
        // Remove a imagem de loading em caso de erro
        let loadingImg = document.getElementById('loading');
        if (loadingImg) {
            loadingImg.remove();
        }
    };

    ajax.send();
}
