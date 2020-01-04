const esp = document.getElementById('esp');
const materias = document.getElementById('materias');

const selectCarrera = e => {
    const valor = e.target.value;
    
    if (valor != '') {
        fetch('/control-estudio/materias', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({codigo: valor})
        })
        .then(res => res.text())
        .then(data => {
            materias.innerHTML = data;

            cancelLoad();
        });
    } else {
        materias.innerHTML = '';
    };
};

window.addEventListener('load', () => {
    esp.addEventListener('change', selectCarrera);
});