const add = document.getElementById('add-user');
const edit = document.getElementsByClassName('edit-user');
const reset = document.getElementsByClassName('reset-user');
const content = document.querySelector('.content-hide');
const popup = document.querySelector('.popup');
const cancel = document.getElementsByClassName('cancel');

const sendData = (info, variables) => {
    fetch(info.url, {
            method: info.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(variables)
        })
        .then(res => res.text())
        .then(data => {
            content.classList.add('active');
            popup.classList.add('active');
            popup.innerHTML = data;

            cancelLoad();
        });
};

const addUser = e => {
    const info = {
        'url': '/admin/users/add/show',
        'method': 'POST'
    };
    const variables = {};

    sendData(info, variables);
};

const editUser = e => {
    const id = e.target.dataset.id;

    if (confirm(`Desea editar este usuario ${id}`)) {
        const info = {
            'url': '/admin/users/edit/show',
            'method': 'POST'
        };
        const variables = {id:id};
    
        sendData(info, variables);
    };
};

const resetUser = e => {
    const id = e.target.dataset.id;

    if (confirm(`Desea resetear este usuario ${id}`)) {
        const info = {
            'url': '/admin/users/reset/show',
            'method': 'POST'
        };
        const variables = {id:id};
    
        sendData(info, variables); 
    }
};

const cancelLoad = () => {
    for (let i = 0; i < cancel.length; i++) {
        cancel[i].addEventListener('click', hideContent);
    }
};

const hideContent = e => {
    content.classList.remove('active');
    popup.classList.remove('active');
}

window.addEventListener('load', () => {
    add.addEventListener('click', addUser);
    for (let i = 0; i < edit.length; i++) {
        edit[i].addEventListener('click', editUser);
    };
    for (let i = 0; i < reset.length; i++) {
        reset[i].addEventListener('click', resetUser);
    };
});