const add = document.getElementById('add-user');
const edit = document.getElementsByClassName('edit-user');
const reset = document.getElementsByClassName('reset-user');
const content = document.querySelector('.content-hide');
const cancel = document.getElementsByClassName('cancel');

const addUser = e => {
    fetch('/admin/users/add/show', {method: 'POST'})
    .then(res => res.text())
    .then(data => {
        content.style.display = 'flex';
        content.innerHTML = data;

        cancelLoad();
    });   
};

const editUser = e => {
    const id = e.target.dataset.id;

    if (confirm(`Desea editar este usuario ${id}`)) {
        fetch('/admin/users/edit/show', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({id: id})
        })
        .then(res => res.text())
        .then(data => {
            content.style.display = 'flex';
            content.innerHTML = data;
            
            cancelLoad();
        });
    }
};

const resetUser = e => {
    const id = e.target.dataset.id;

    if (confirm(`Desea resetear este usuario ${id}`)) {
        fetch('/admin/users/reset/show', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({id: id})
        })
        .then(res => res.text())
        .then(data => {
            content.style.display = 'flex';
            content.innerHTML = data;
            
            cancelLoad();
        });
    }
};

const cancelLoad = () => {
    for (let i = 0; i < cancel.length; i++) {      
        cancel[i].addEventListener('click', hideContent);
    }
};

const hideContent = e => content.style.display = 'none';

window.addEventListener('load', () => {
    add.addEventListener('click', addUser);
    for (let i = 0; i < edit.length; i++) {      
        edit[i].addEventListener('click', editUser);
    };
    for (let i = 0; i < reset.length; i++) {      
        reset[i].addEventListener('click', resetUser);
    };
});