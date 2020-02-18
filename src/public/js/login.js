const recoverPass = document.getElementById('recover-pass');
const content = document.querySelector('.content-hide');
const popup = document.querySelector('.popup');

const recover = e => {    
    fetch('/recover', {
        method: 'POST',
    })
    .then(res => res.text())
    .then(data => {
        content.classList.add('active');
        popup.classList.add('active');
        popup.innerHTML = `{{> ${{data}} }}`;
    });
};

window.addEventListener('load', () => {
    recoverPass.addEventListener('click', recover);
});