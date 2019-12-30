const edit = document.getElementById('profile-edit');
const cards = document.querySelector('.cards');
const fomr = document.querySelector('.form-profile-edit');

edit.addEventListener('click', e => {
    cards.classList.toggle('hide');
    fomr.classList.toggle('hide');
});