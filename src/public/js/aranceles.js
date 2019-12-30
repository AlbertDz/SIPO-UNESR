const add = document.getElementById('add-arancel');
const list = document.querySelector('.list-aranceles');
const form = document.querySelector('.form-arancel');
const del = document.querySelector('.delete');
const upd = document.querySelector('.update');
const reset = document.querySelector('.reset');

add.addEventListener('click', e => {
    list.classList.toggle('hide');
    form.classList.toggle('hide');
})