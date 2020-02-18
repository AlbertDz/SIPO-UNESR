const popup = {};

popup.recover = () => {
    const data = `<div class="recover p-10">
    <div class="recover-step container">
        <section class="step color-b-blue-3 p-10">
            <span class="btn-35 btn btn-white br-50 container font-b c-default">1</span>
            <p class="color-white">Ingrese su Cedula</p>
        </section>
        <section class="step color-b-white p-10">
            <span class="btn-35 btn btn-blue-2 br-50 container font-b c-default">2</span>
            <p class="color-grey">Responda las preguntas</p>
        </section>
        <section class="step color-b-white p-10">
            <span class="btn-35 btn btn-blue-2 br-50 container font-b c-default">3</span>
            <p class="color-grey">Ingrese su nueva clave</p>
        </section>
    </div>
    <div class="recover-form">
        <section class="container">
            <form action="/recover/step/2" method="POST" class="form">
                <h1 class="form-title font-f-s p-10 color-b-blue-3">Cedula</h1>
                <div class="form-section-parts">
                    <div class="form-section">
                        <input autofocus autocomplete="off" type="text" class="form-input" id="ced" name="cedula" required>
                        <label for="" class="form-label">
                            <span class="label-content uppercase">Cedula</span>
                        </label>
                    </div>
                </div>
                <div class="form-section" id="enviar">
                    <span class="btn btn-grey form-button br-3 uppercase">Siguiente</span>
                </div>
            </form>
        </section>
        <div class="form-section container">
            <a href="/login">Iniciar Sesión</a>
        </div>
    </div>
</div>
<script src="/js/step1.js"></script>`;

    return data;
};

module.exports = popup;