const recoverPass = document.getElementById('recover-pass');
const content = document.querySelector('.content-hide');
const popup = document.querySelector('.popup');

const recover = e => {    
    content.classList.add('active');
    popup.classList.add('active');
};

window.addEventListener('load', () => {
    recoverPass.addEventListener('click', recover);
});