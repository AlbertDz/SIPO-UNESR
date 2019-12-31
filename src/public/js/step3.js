const pass = document.getElementById('pass');
const ver = document.getElementById('ver');
const enviar = document.getElementById('enviar');

const validPass = e => {
    const valor = e.target;

    if (valor.value.length >= 8 && valor.value.length <= 25) {
        valor.classList.remove('color-red');
        enviar.innerHTML = `<button class='btn btn-grey form-button br-3'>Guardar</button>`;
    } else {
        valor.classList.add('color-red');
        valor.focus();
        enviar.innerHTML = `<span class='btn btn-grey form-button br-3'>Guardar</span>`;
    }
};

const changeType = e => {
    if (pass.type === 'password') {
        ver.innerHTML = '<i class="fas fa-eye-slash"></i>';
        pass.type = 'text'
    }  else {
        ver.innerHTML = '<i class="fas fa-eye"></i>';
        pass.type = 'password';
    };
};

window.addEventListener('load', () => {
    pass.addEventListener('keyup', validPass);

    ver.addEventListener('click', changeType);
});