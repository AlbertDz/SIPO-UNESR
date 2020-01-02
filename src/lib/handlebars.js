const helpers = {};

const semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let date;

helpers.fecha = () => {
    const actualizarFecha = () => {
        let fecha = new Date(),
            horas = fecha.getHours(),
            ampm = '',
            minutos = fecha.getMinutes(),
            segundos = fecha.getSeconds(),
            diaSemana = fecha.getDay(),
            dia = fecha.getDate(),
            mes = fecha.getMonth(),
            year = fecha.getFullYear();

        if (horas >= 12) {
            horas -= 12;
            ampm = 'PM';
        } else {
            ampm = 'AM';
        };

        if (horas === 0) {
            horas = 12;
        }

        (horas < 10) ? horas = '0' + horas: horas;
        (minutos < 10) ? minutos = '0' + minutos: minutos;
        (segundos < 10) ? segundos = '0' + segundos: segundos;

        date = `Los Teques ${semana[diaSemana]} ${dia} de ${meses[mes]} del ${year} ${horas}:${minutos}:${segundos} ${ampm}`;
    };

    actualizarFecha();

    return date;
};

helpers.addUser = () => {
    const data = `<section class="container z-index-1010">
                    <form action="/users/add" method="POST" class="form c-default">
                        <h2 class="form-title font-f-s p-10 color-b-blue-3 font-18">
                            REGISTRAR USUARIO
                            <span class="container btn btn-blue-2 br-3 btn-title font-12" id="cancel"><i class="fas fa-times"></i></span>
                        </h2>
                        <div class="form-section-parts g-t-c-4">
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="nombre1" id="pn" required autofocus>
                                <label for="" class="form-label">
                                    <span class="label-content">Primer Nombre*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="nombre2" id="sn">
                                <label for="" class="form-label">
                                    <span class="label-content">Segundo Nombre</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="apellido1" id="pa" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Primer Apellido*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="apellido2" id="sa">
                                <label for="" class="form-label">
                                    <span class="label-content">Segundo Apellido</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="cedula" id="ced" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Cedula*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="telefono" id="tel" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Télefono*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="email" class="form-input" name="correo" id="email" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Correo*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="cargo" id="car" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Cargo*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input type="password" class="form-input" name="pass" id="pass" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Contraseña*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input type="password" class="form-input" name="repeatPass" id="repeatPass" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Repetir Contraseña*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="pregunta1" id="pp" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Primera Pregunta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="respuesta1" id="pr" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Respuesta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="pregunta2" id="sp" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Segunda Pregunta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input" name="respuesta2" id="sr" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Respuesta*</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-section">
                            <p class="color-red">Datos requeridos (*)</p>
                        </div>
                        <div class="form-section container">
                            <div class="form-check br-3">
                                <input type="checkbox" name="acceso3" id="3">
                                <label for="3" class="checkbox br-3">Administrador</label>
                            </div>
                            <div class="form-check br-3">
                                <input type="checkbox" name="acceso2" id="2">
                                <label for="2" class="checkbox br-3">Analista Administrativo</label>
                            </div>
                            <div class="form-check br-3">
                                <input type="checkbox" name="acceso1" id="1">
                                <label for="1" class="checkbox br-3">Control Estudio</label>
                            </div>
                        </div>
                        <div class="form-section container">
                            <button class="btn btn-grey form-button br-3">Registrar</button>
                        </div>
                    </form>
                </section>
                <script src="/js/form.js"></script>
                <script src="/js/content.js"></script>`;

    return data;
};

module.exports = helpers;