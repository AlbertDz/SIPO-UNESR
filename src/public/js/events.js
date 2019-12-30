// Const and Variables

const formUser = document.querySelector('.form-user');
const btnAddUser = document.querySelector('.btn-add-user');
const btnClose = document.querySelector('.btn-close');

// Funtions Independent

fadeIn = (nameClass, speed = 1, actionClass = 'none', text = 'none') => {
    speed /= 100;
    if (text != 'none') {
        actionClass.innerHTML = text;
    }
    nameClass.style.visibility = 'visible';
    for (i = 0; i <= 1; i += speed) {
        nameClass.style.opacity = i;
    }
};
fadeOut = (nameClass, speed = 1, actionClass = 'none', text = 'none') => {
    speed /= 100;
    if (text != 'none') {
        actionClass.innerHTML = text;
    }
    nameClass.style.visibility = 'hidden';
    for (i = 1; i >= 0; i -= speed) {
        nameClass.style.opacity = i;
    }
};

// Events

showUserAdd = e => fadeIn(formUser);
hideUserAdd = e => fadeOut(formUser);

// Load Document

loadDocument = () => {
    btnAddUser.addEventListener('click', showUserAdd);
    btnClose.addEventListener('click', hideUserAdd);
};

window.addEventListener('load', loadDocument);