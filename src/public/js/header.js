const btn = document.getElementById('btn-option-sesion');
const option = document.querySelector('.option-sesion');
const fecha = document.getElementById('fecha');
const search = document.getElementById('search');
const contentSearch = document.querySelector('.content-search');
let list = {};

const ajax = e => {
    fetch('/fecha', {
            method: 'POST'
        })
        .then(res => res.text())
        .then(data => {
            fecha.innerText = data;
        });
};

const listSearch = () => {
    fetch('/list', {
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => {
            list = data;
        });
};

const hideShow = e => option.classList.toggle('hide');

const autocomplete = e => {
    let num = 0;
    const newList = {};

    const valor = e.target.value;
    if (valor != '') {
        const exp = new RegExp(`${valor}+`, 'gi');

        for (let i in list) {
            if (list[i].match(exp)) {
                newList[num] = list[i];

                num++;
            }
        }
    }

    if (valor != '' && Object.keys(newList).length > 0) {
        contentSearch.classList.remove('hide');
    } else {
        hideSearch();
    }
};

const hideSearch = () => contentSearch.classList.add('hide');;

window.addEventListener('load', () => {
    btn.addEventListener('click', hideShow);
    search.addEventListener('focus', listSearch);
    search.addEventListener('input', autocomplete);
    search.addEventListener('blur', hideSearch);
});