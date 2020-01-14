const pool = require('../database');
const materias = require('../materias');

const form = {};

form.addUser = form => {
    const data = `<section class="container">
                    <form action="${form.action}" method="POST" class="form c-default">
                        <h2 class="form-title font-f-s p-10 color-b-blue-3 font-18 uppercase">
                            ${form.title}
                            ${form.button}
                        </h2>
                        <div class="form-section-parts g-t-c-4">
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input pn uppercase" name="nombre1" required autofocus>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Primer Nombre*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input sn uppercase" name="nombre2">
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Segundo Nombre</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase pa" name="apellido1" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Primer Apellido*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase sa" name="apellido2">
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Segundo Apellido</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input ced" name="cedula" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Cedula*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input tel" name="telefono" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Télefono*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="email" class="form-input uppercase email" name="correo" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Correo*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase car" name="cargo" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Cargo*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input type="password" class="form-input pass" name="pass" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Contraseña*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input type="password" class="form-input repeatPass" name="repeatPass" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Repetir Contraseña*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase pp" name="pregunta1" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Primera Pregunta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase pr" name="respuesta1" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Respuesta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase sp" name="pregunta2"required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Segunda Pregunta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase sr" name="respuesta2" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Respuesta*</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-section">
                            <p class="color-red">Datos requeridos (*)</p>
                        </div>
                        <div class="form-section">
                            <input class="check-list" type="checkbox" name="acceso3" id="3" ${form.checked} ${form.disabled}>
                            <label for="3" class="uppercase">Administrador</label>

                            <input class="check-list" type="checkbox" name="acceso2" id="2">
                            <label for="2" class="uppercase">Analista Administrativo</label>

                            <input class="check-list" type="checkbox" name="acceso1" id="1">
                            <label for="1" class="uppercase">Control Estudio</label>
                        </div>
                        <div class="form-section">
                            <button class="btn btn-grey form-button br-3 uppercase">Registrar</button>
                        </div>
                    </form>
                </section>
                <script src="/js/form.js"></script>`;

    return data;
};

form.editUser = async id => {
    const rows = await pool.query('select id_usuario,primer_nom,segundo_nom,primer_ape,segundo_ape,nombre_cargo,numero,correo from usuario inner join cargo on usuario.id_cargo = cargo.id_cargo inner join telefono on usuario.id_telefono = telefono.id_telefono inner join correo on usuario.id_correo = correo.id_correo where id_usuario = ?', [id]);

    const acceso = await pool.query('select admin,analista_admin,control_estudio from tipo_acceso_usuario inner join tipo_acceso on tipo_acceso_usuario.id_acceso = tipo_acceso.id_acceso where id_usuario = ?', [id]);

    (acceso[0].admin === 'on') ? rows[0].admin = 'checked' : rows[0].admin = '';
    (acceso[0].analista_admin === 'on') ? rows[0].analista_admin = 'checked' : rows[0].analista_admin = '';
    (acceso[0].control_estudio === 'on') ? rows[0].control_estudio = 'checked' : rows[0].control_estudio = '';

    const data = `<section class="container">
                    <form action="/admin/users/edit/${rows[0].id_usuario}" method="POST" class="form">
                        <h2 class="form-title font-f-s p-10 color-b-blue-3 font-18 uppercase">
                            EDITAR ${rows[0].primer_nom} ${rows[0].primer_ape}
                            <span class="container btn btn-blue-2 br-3 btn-title font-12 cancel"><i class="fas fa-times"></i></span>
                        </h2>
                        <div class="form-section-parts g-t-c-4">
                            <div class="form-section">
                                <input value="${rows[0].primer_nom}" autocomplete="off" type="text" class="form-input uppercase" name="nombre1" id="pn" autofocus required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Primer Nombre*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].segundo_nom}" autocomplete="off" type="text" class="form-input uppercase" name="nombre2" id="sn">
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Segundo Nombre</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].primer_ape}" autocomplete="off" type="text" class="form-input uppercase" name="apellido1" id="pa" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Primer Apellido*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].segundo_ape}" autocomplete="off" type="text" class="form-input uppercase" name="apellido2" id="sa">
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Segundo Apellido</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].id_usuario}" autocomplete="off" type="text" class="form-input" name="cedula" id="ced" required disabled>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Cedula*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="0${rows[0].numero}" autocomplete="off" type="text" class="form-input" name="telefono" id="tel" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Télefono*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].correo}" autocomplete="off" type="email" class="form-input uppercase" name="correo" id="email" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Correo*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].nombre_cargo}" autocomplete="off" type="text" class="form-input uppercase" name="cargo" id="car" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Cargo*</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-section">
                            <p class="color-red">Datos requeridos (*)</p>
                        </div>
                        <div class="form-section">
                            <input class="check-list" type="checkbox" name="acceso3" id="3" ${rows[0].admin}>
                            <label for="3" class="uppercase">Administrador</label>

                            <input class="check-list" type="checkbox" name="acceso2" id="2" ${rows[0].analista_admin}>
                            <label for="2" class="uppercase">Analista Administrativo</label>

                            <input class="check-list" type="checkbox" name="acceso1" id="1" ${rows[0].control_estudio}>
                            <label for="1" class="uppercase">Control Estudio</label>
                        </div>
                        <div class="form-section">
                            <button class="btn btn-grey form-button br-3 uppercase">Actualizar</button>
                        </div>
                    </form>
                </section>
                <script src="/js/form-edit.js"></script>`;

    return data;
};

form.resetUser = async id => {
    const rows = await pool.query('select id_usuario,primer_nom,primer_ape from usuario where id_usuario = ?', [id]);

    const data = `<section class="container">
                    <form action="/admin/users/add" method="POST" class="form c-default">
                        <h2 class="form-title font-f-s p-10 color-b-blue-3 font-18 uppercase">
                            RESETEAR ${rows[0].primer_nom} ${rows[0].primer_ape}
                            <span class="container btn btn-blue-2 br-3 btn-title font-12 cancel"><i class="fas fa-times"></i></span>
                        </h2>
                        <div class="form-section-parts g-t-c-3">
                            <div class="form-section">
                                <input type="password" class="form-input" name="pass" id="pass" autofocus required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Contraseña*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input type="password" class="form-input" name="repeatPass" id="repeatPass" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Repetir Contraseña*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase" name="pregunta1" id="pp" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Primera Pregunta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase" name="respuesta1" id="pr" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Respuesta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase" name="pregunta2" id="sp" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Segunda Pregunta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input uppercase" name="respuesta2" id="sr" required>
                                <label for="" class="form-label uppercase">
                                    <span class="label-content">Respuesta*</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-section">
                            <p class="color-red">Datos requeridos (*)</p>
                        </div>
                        <div class="form-section">
                            <button class="btn btn-grey form-button br-3 uppercase">Resetear</button>
                        </div>
                    </form>
                </section>
                <script src="/js/form.js"></script>`;

    return data;
};

form.showMaterias = codigo => {
    let data = '';
    for (let i in materias) {
        data += `
            <input class="check-list" type="checkbox" name="${materias[i].codigo}" id="${materias[i].codigo}">
            <label for="${materias[i].codigo}" class="uppercase">${materias[i].materia}</label>
        `;
    }

    return data;
};

form.pagoArancel = () => {
    const data = ``;

    return data;
};

module.exports = form;