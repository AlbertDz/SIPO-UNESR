const ced = document.getElementById('ced');
const enviar = document.getElementById('enviar');

const validCed = e => {
    const valor = e.target;

    if (/^([0-9])*$/.test(valor.value) && valor.value.length === 8) {
        valor.classList.remove('color-red');
        enviar.innerHTML = `<button class='btn btn-grey form-button br-3'>Siguiente</button>`;
    } else {
        valor.classList.add('color-red');
        valor.focus();
        enviar.innerHTML = `<span class='btn btn-grey form-button br-3'>Siguiente</span>`;
    }
};

window.addEventListener('load', () => {
    ced.addEventListener('keyup', validCed);
});