const searchBar = document.getElementById('searchBar');
const subjectFilter = document.getElementById('subjectFilter');
const typeFilter = document.getElementById('typeFilter');

// Verificar se a opção "Todas as Disciplinas" já existe no filtro
const allOption = subjectFilter.querySelector('option[value="all"]');
if (!allOption) {
    const option = document.createElement('option');
    option.value = "all";
    option.text = "Todas as Disciplinas";
    subjectFilter.add(option, subjectFilter.firstChild);
}

if (searchBar && subjectFilter && typeFilter) {
    const debouncedFilterContent = debounce(filterContent, 300);

    searchBar.addEventListener('input', debouncedFilterContent);
    subjectFilter.addEventListener('change', debouncedFilterContent);
    typeFilter.addEventListener('change', debouncedFilterContent);
}

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
