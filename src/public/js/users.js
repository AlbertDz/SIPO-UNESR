const add = document.getElementById('add-user');
const list = document.querySelector('.list-users');
const form = document.querySelector('.form-user');
const del = document.querySelector('.delete');
const upd = document.querySelector('.update');
const reset = document.querySelector('.reset');

add.addEventListener('click', e => {
    list.classList.toggle('hide');
    form.classList.toggle('hide');
})