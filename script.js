document.getElementById('searchBar').addEventListener('input', filterContent);
document.getElementById('subjectFilter').addEventListener('change', filterContent);
document.getElementById('typeFilter').addEventListener('change', filterContent);

function filterContent() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const subject = document.getElementById('subjectFilter').value;
    const type = document.getElementById('typeFilter').value;

    const materials = document.querySelectorAll('.material'); // Considerando que cada material é um elemento com a classe "material"

    materials.forEach(material => {
        const title = material.getAttribute('data-title').toLowerCase();
        const materialSubject = material.getAttribute('data-subject');
        const materialType = material.getAttribute('data-type');

        if ((title.includes(searchQuery) || searchQuery === '') &&
            (subject === 'all' || materialSubject === subject) &&
            (type === 'all' || materialType === type)) {
            material.style.display = 'block';
        } else {
            material.style.display = 'none';
        }
    });
}

