const select = document.getElementsByClassName('select-estudiante');
const content = document.getElementById('pago-arancel');

const showEstudiante = e => {
    const id = e.path[1].dataset.id;

    fetch('/analista-admin/pago-arancel/show', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(res => res.text())
    .then(data => {
        content.innerHTML = data;
    });
};

window.addEventListener('load', () => {
    for (let i = 0; i < select.length; i++) select[i].addEventListener('click', showEstudiante);
});