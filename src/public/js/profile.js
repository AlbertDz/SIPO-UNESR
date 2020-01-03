const edit = document.getElementById('profile-edit');
const content = document.querySelector('.content-hide');
const cancel = document.getElementsByClassName('cancel');

const showContent = e => content.style.display = 'flex';

const hideContent = e => content.style.display = 'none';

window.addEventListener('load', () => {
    edit.addEventListener('click', showContent);
    for (let i = 0; i < cancel.length; i++) {      
        cancel[i].addEventListener('click', hideContent);
    }
});