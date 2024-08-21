const searchWrapper = document.querySelector(".search");
const inputBox = searchWrapper.querySelector("input");
const sugestBox = searchWrapper.querySelector(".list");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

inputBox.onkeyup = (e) => {
  let userData = e.target.value; // Dados digitados pelo usuário
  let emptyArray = [];

  if (e.key === 'Enter') {
    if (userData) {
      document.getElementById('results').classList.remove('hidden');
      window.open(`https://www.google.com/search?q=${userData}`, '_blank');
    }
  }

  if (userData) {
    icon.onclick = () => {
      webLink = `https://www.google.com/search?q=${userData}`;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
    };
    emptyArray = suggestions.filter((data) => {
      // Filtrar valores do array e caracteres digitados pelo usuário
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // Passar dados retornados dentro da tag li
      return data = `<li>${data}</li>`;
    });
    searchWrapper.classList.add("active"); // Mostrar caixa de autocompletar
    showSuggestions(emptyArray);
    let allList = sugestBox.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      // Adicionar atributo onclick em todas as tags li
      allList[i].setAttribute("onclick", "select(this)");
    }

    if (e.key === 'Escape') {
      searchWrapper.classList.remove("active");
    }
  } else {
    searchWrapper.classList.remove("active"); // Esconder caixa de autocompletar
  }
};

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = () => {
    webLink = `https://www.google.com/search?q=${selectData}`;
    linkTag.setAttribute("href", webLink);
    linkTag.click();
  };
  searchWrapper.classList.remove("active");
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userValue = inputBox.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join('');
  }
  sugestBox.innerHTML = listData;
}

function filterByCourse() {
  const filterValue = document.getElementById('courseFilter').value;
  const mostSearched = document.getElementById('most-searched').querySelectorAll('li');
  const mostDownloaded = document.getElementById('most-downloaded').querySelectorAll('li');

  filterList(mostSearched, filterValue);
  filterList(mostDownloaded, filterValue);
}

function filterList(items, filterValue) {
  items.forEach((item) => {
    if (filterValue === 'all' || item.classList.contains(filterValue)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
