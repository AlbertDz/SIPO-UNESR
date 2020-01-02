const content = document.querySelector('.content-hide');
const cancel = document.getElementById('cancel');

const hideContent = e => alert('si funciona');

window.addEventListener('load', () => {
    content.addEventListener('click', hideContent);
});