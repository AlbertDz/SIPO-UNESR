const add = document.getElementById('add-user');
const del = document.querySelector('.delete');
const upd = document.querySelector('.update');
const reset = document.querySelector('.reset');
const content = document.querySelector('.content-hide');

const addUser = e => {
    fetch('/show/add', {method: 'GET'})
    .then(res => res.text())
    .then(data => {
        content.style.display = 'flex';
        content.innerHTML = data;
    });
};

window.addEventListener('load', () => {
    add.addEventListener('click', addUser);
});