function searchPDF() {
    let query = document.getElementById('search').value;

    if (query.trim() !== "") {
        document.getElementById('results').classList.remove('hidden');
        alert('Você buscou por: ' + query);
        // Aqui você pode adicionar a lógica para buscar o PDF no servidor
    } else {
        alert('Por favor, insira um termo de busca.');
    }
}

function filterByCourse() {
    let filter = document.getElementById('courseFilter').value;
    let items = document.querySelectorAll('.list ul li');

    items.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
