const searchBar = document.getElementById('searchBar');
const subjectFilter = document.getElementById('subjectFilter');
const typeFilter = document.getElementById('typeFilter');

// Verificar se os elementos existem antes de adicionar os event listeners
if (searchBar && subjectFilter && typeFilter) {
    const debouncedFilterContent = debounce(filterContent, 300); // Usando debounce para otimizar a função de filtro

    searchBar.addEventListener('input', debouncedFilterContent);
    subjectFilter.addEventListener('change', filterContent);
    typeFilter.addEventListener('change', filterContent);
}

// Função debounce para limitar a frequência de chamadas da função de filtro
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

function filterContent() {
    const searchQuery = searchBar.value.toLowerCase();
    const subject = subjectFilter.value;
    const type = typeFilter.value;

    const materials = document.querySelectorAll('.material');
    let hasResults = false;

    materials.forEach(material => {
        const title = material.getAttribute('data-title').toLowerCase();
        const materialSubject = material.getAttribute('data-subject');
        const materialType = material.getAttribute('data-type');

        if ((title.includes(searchQuery) || searchQuery === '') &&
            (subject === 'all' || materialSubject === subject) &&
            (type === 'all' || materialType === type)) {
            material.style.display = 'block';
            hasResults = true;
        } else {
            material.style.display = 'none';
        }
    });

    const noResultsMessage = document.getElementById('noResultsMessage');
    if (noResultsMessage) {
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Função para ordenar as divs
    function sortMaterials() {
        const materialsContainer = document.getElementById('content');
        const materials = Array.from(materialsContainer.querySelectorAll('.material'));

        materials.sort((a, b) => {
            const aHasLink = a.querySelector('a') !== null;
            const bHasLink = b.querySelector('a') !== null;

            if (aHasLink && !bHasLink) return -1;
            if (!aHasLink && bHasLink) return 1;

            // Se ambos têm links, ordenar pela quantidade de downloads
            const aDownloads = parseInt(a.getAttribute('data-downloads'), 10);
            const bDownloads = parseInt(b.getAttribute('data-downloads'), 10);

            return bDownloads - aDownloads; // Ordena em ordem decrescente
        });

        // Reordenar as divs no DOM
        materials.forEach(material => {
            materialsContainer.appendChild(material);
        });
    }

    // Função para incrementar a contagem de downloads
    function updateDownloadCount(materialDiv) {
        const downloadCountSpan = materialDiv.querySelector('.download-count');
        let currentCount = parseInt(downloadCountSpan.textContent, 10);
        currentCount += 1;
        downloadCountSpan.textContent = currentCount;
        materialDiv.setAttribute('data-downloads', currentCount);

        sortMaterials(); // Reordenar após o incremento
    }

    // Adiciona o evento de clique nos links para atualizar o contador
    const materials = document.querySelectorAll('.material a');
    materials.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Evita o redirecionamento imediato para capturar o clique
            const materialDiv = this.closest('.material');
            updateDownloadCount(materialDiv);

            // Redireciona para o link após o incremento
            window.location.href = this.href;
        });
    });

    sortMaterials(); // Ordena as divs na inicialização
});
