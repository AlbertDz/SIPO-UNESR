const btn = document.getElementById('btn-option-sesion');
const option = document.querySelector('.option-sesion');

const hideShow = e => option.classList.toggle('hide');

window.addEventListener('load', () => {
    btn.addEventListener('click', hideShow);
});