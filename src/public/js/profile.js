const edit = document.getElementById('profile-edit');
const content = document.querySelector('.content-hide');
const popup = document.querySelector('.popup');
const cancel = document.getElementsByClassName('cancel');

const showContent = e => {
    content.classList.add('active');
    popup.classList.add('active');
};

const hideContent = e => {
    content.classList.remove('active');
    popup.classList.remove('active');
};

window.addEventListener('load', () => {
    edit.addEventListener('click', showContent);
    for (let i = 0; i < cancel.length; i++) {      
        cancel[i].addEventListener('click', hideContent);
    }
});