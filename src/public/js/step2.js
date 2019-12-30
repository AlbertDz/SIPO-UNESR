const pr = document.getElementById('pr');
const sr = document.getElementById('sr');

const validRes = e => {
    const valor = e.target;

    valor.value = valor.value.toUpperCase();
};

window.addEventListener('load', () => {
    pr.addEventListener('keyup', validRes);
    sr.addEventListener('keyup', validRes);
});