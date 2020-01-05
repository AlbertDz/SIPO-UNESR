const form = document.querySelector('.form-admin');

window.addEventListener('load', () => {
    fetch('/login/user/show', {method: 'POST'})
    .then(res => res.text())
    .then(data => {
        form.innerHTML = data;
    });
});