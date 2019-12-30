const pn = document.getElementById('pn');
const sn = document.getElementById('sn');
const pa = document.getElementById('pa');
const sa = document.getElementById('sa');
const pp = document.getElementById('pp');
const sp = document.getElementById('sp');
const pr = document.getElementById('pr');
const sr = document.getElementById('sr');
const ced = document.getElementById('ced');
const tel = document.getElementById('tel');
const car = document.getElementById('car');
const pass = document.getElementById('pass');
const repeatPass = document.getElementById('repeatPass');
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

const validPre = e => {
    const valor = e.target;

    if (/^([a-z,A-Z, ,¿,?])*$/.test(valor.value) && valor.value.length <= 50) {
        valor.classList.remove('color-red');
        valor.value = valor.value.toUpperCase();
    } else {
        valor.classList.add('color-red');
        valor.value = valor.value.toUpperCase();
        valor.focus();
    }
};

const validRes = e => {
    const valor = e.target;

    if (/^([a-z,A-Z, ,0-9])*$/.test(valor.value) && valor.value.length <= 250) {
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

const validPass = e => {
    const valor = e.target;

    if (valor.value != repeatPass.value) {
        repeatPass.value = '';
    }

    if (valor.value.length >= 8 && valor.value.length <= 25) {
        valor.classList.remove('color-red');
    } else {
        valor.classList.add('color-red');
        valor.focus();
    }
};

const validRepeatPass = e => {
    const valor = e.target;

    if (pass.value != '') {
        if (valor.value === pass.value) {
            valor.classList.remove('color-red');
        } else {
            valor.classList.add('color-red');
            valor.focus();
        }
    } else {
        pass.focus();
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

    pp.addEventListener('keyup', validPre);
    pp.addEventListener('blur', validPre);
    sp.addEventListener('keyup', validPre);
    sp.addEventListener('blur', validPre);

    pr.addEventListener('keyup', validRes);
    pr.addEventListener('blur', validRes);
    sr.addEventListener('keyup', validRes);
    sr.addEventListener('blur', validRes);

    ced.addEventListener('keyup', validCed);
    ced.addEventListener('blur', validCed);

    tel.addEventListener('keyup', validTel);
    tel.addEventListener('blur', validTel);

    car.addEventListener('keyup', validCar);
    car.addEventListener('blur', validCar);

    pass.addEventListener('keyup', validPass);
    pass.addEventListener('blur', validPass);
    repeatPass.addEventListener('keyup', validRepeatPass);
    repeatPass.addEventListener('blur', validRepeatPass);

    email.addEventListener('keyup', validEmail);
});