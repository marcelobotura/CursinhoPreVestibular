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
        if (!hasResults) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }
}
