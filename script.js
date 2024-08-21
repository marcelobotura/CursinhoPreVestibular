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

document.getElementById('searchButton').addEventListener('click', function() {
    var query = document.getElementById('searchBar').value;
    // Lógica para filtrar e exibir resultados com base na busca

    // Redirecionar para a página inicial após 3 segundos
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 3000); // Tempo em milissegundos
});
document.getElementById('backToIndex').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    window.location.href = 'index.html'; // Redireciona para a página inicial
});