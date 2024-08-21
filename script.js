function searchPDF() {
    let query = document.getElementById('search').value;
    alert('Você buscou por: ' + query);
    // Aqui você pode adicionar a lógica para buscar o PDF no servidor
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
