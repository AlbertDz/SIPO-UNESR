const btn = document.getElementById('btn-option-sesion');
const option = document.querySelector('.option-sesion');
const fecha = document.getElementById('fecha');
const btnPass = document.getElementById('change-pass');
const btnQuestion = document.getElementById('change-question');
const content = document.querySelector('.change-content');
const cancel = document.getElementById('cancel');

const hideShow = e => option.classList.toggle('hide');

const ajax = e => {
    fetch('/fecha', {method: 'POST'})
    .then(res => res.text())
    .then(data => {
        fecha.innerText = data;
    });
};

const changePass = e => {
    const html = `<section class="container">
        <form action="" method="POST" class="form color-b-white">
            <h1 class="form-title font-f-s p-10 color-b-blue-3 font-14">CAMBIAR CONTRASEÑA</h1>
            <div class="form-section-parts">
                <div class="form-section">
                    <input autofocus autocomplete="off" type="password" class="form-input" id="pass" name="pass" required >
                    <label for="" class="form-label">
                        <span class="label-content">Contraseña actual</span>
                    </label>
                    <div class="c-point" class="ver"><i class="fas fa-eye"></i></div>
                </div>
                <div class="form-section">
                    <input autofocus autocomplete="off" type="password" class="form-input" id="new-pass" name="pass" required >
                    <label for="" class="form-label">
                        <span class="label-content">Nueva Contraseña</span>
                    </label>
                    <div class="c-point" class="ver"><i class="fas fa-eye"></i></div>
                </div>
            </div>
            <div class="form-section container" id="enviar">
                <span class="btn btn-grey br-3">Guardar</span>
                <span class="btn btn-red br-3" id="cancel">Cancelar</span>
            </div>
        </form>
    </section>`;

    content.innerHTML = html;
};

const changeQuestions = e => {};

const closeContent = e => content.classList.toogle('hide');

window.addEventListener('load', () => {
    setInterval(ajax, 1000);
    btn.addEventListener('click', hideShow);
    btnPass.addEventListener('click', changePass);
    btnQuestion.addEventListener('click', changeQuestions);
    cancel.addEventListener('click', closeContent);
});