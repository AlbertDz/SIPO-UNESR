const pn = document.getElementById('pn');
const sn = document.getElementById('sn');
const pa = document.getElementById('pa');
const sa = document.getElementById('sa');
const ced = document.getElementById('ced');
const tel = document.getElementById('tel');
const car = document.getElementById('car');
const email = document.getElementById('email');

const validName = e => {
    const valor = e.target;

    if (/^([a-z,A-Z])*$/.test(valor.value) && valor.value.length <= 50) {
        valor.classList.remove('color-red');
        valor.value = valor.value.toUpperCase();
    } else {
        valor.classList.add('color-red');
        valor.value = valor.value.toUpperCase();
        valor.focus();
    }
};

const validCed = e => {
    const valor = e.target;

    if (/^([0-9])*$/.test(valor.value) && valor.value.length === 8) {
        valor.classList.remove('color-red');
    } else {
        valor.classList.add('color-red');
        valor.focus();
    }
};

const validTel = e => {
    const valor = e.target;

    if (/^([0-9])*$/.test(valor.value) && valor.value.length >= 10 && valor.value.length <= 11) {
        valor.classList.remove('color-red');
    } else {
        valor.classList.add('color-red');
        valor.focus();
    }
};

const validCar = e => {
    const valor = e.target;

    if (/^([a-z,A-Z, ,.])*$/.test(valor.value) && valor.value.length <= 50) {
        valor.classList.remove('color-red');
        valor.value = valor.value.toUpperCase();
    } else {
        valor.classList.add('color-red');
        valor.value = valor.value.toUpperCase();
        valor.focus();
    }
};

const validEmail = e => {
    const valor = e.target;

    valor.value = valor.value.toUpperCase();
};

window.addEventListener('load', () => {
    pn.addEventListener('keyup', validName);
    pn.addEventListener('blur', validName);
    sn.addEventListener('keyup', validName);
    sn.addEventListener('blur', validName);
    pa.addEventListener('keyup', validName);
    pa.addEventListener('blur', validName);
    sa.addEventListener('keyup', validName);
    sa.addEventListener('blur', validName);

    ced.addEventListener('keyup', validCed);
    ced.addEventListener('blur', validCed);

    tel.addEventListener('keyup', validTel);
    tel.addEventListener('blur', validTel);

    car.addEventListener('keyup', validCar);
    car.addEventListener('blur', validCar);

    email.addEventListener('keyup', validEmail);
});