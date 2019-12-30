const btn = document.getElementById('btn-option-sesion');
const optSesion = document.querySelector('.option-sesion');

btn.addEventListener('click', e => {
    optSesion.classList.toggle('hide');
});

optSesion.addEventListener('blur', e => {
    optSesion.classList.remove('hide');
});