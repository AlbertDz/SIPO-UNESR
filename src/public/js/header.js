const btn = document.getElementById('btn-option-sesion');
const option = document.querySelector('.option-sesion');
const fecha = document.getElementById('fecha');

const hideShow = e => option.classList.toggle('hide');

const ajax = e => {
    fetch('/fecha', {method: 'POST'})
    .then(res => res.text())
    .then(data => {
        fecha.innerText = data;
    });
};

window.addEventListener('load', () => {
    btn.addEventListener('click', hideShow);
});