const pool = require('../database');

const form = {};

form.addUser = () => {
    const data = `<section class="container">
                    <form action="/admin/users/add" method="POST" class="form c-default">
                        <h2 class="form-title font-f-s p-10 color-b-blue-3 font-18">
                            REGISTRAR USUARIO
                            <span class="container btn btn-blue-2 br-3 btn-title font-12 cancel"><i class="fas fa-times"></i></span>
                        </h2>
                        <div class="form-section-parts g-t-c-4">
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input pn" name="nombre1" required autofocus>
                                <label for="" class="form-label">
                                    <span class="label-content">Primer Nombre*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input sn" name="nombre2">
                                <label for="" class="form-label">
                                    <span class="label-content">Segundo Nombre</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input pa" name="apellido1" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Primer Apellido*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input sa" name="apellido2">
                                <label for="" class="form-label">
                                    <span class="label-content">Segundo Apellido</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input ced" name="cedula" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Cedula*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input tel" name="telefono" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Télefono*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="email" class="form-input email" name="correo" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Correo*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input car" name="cargo" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Cargo*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input type="password" class="form-input pass" name="pass" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Contraseña*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input type="password" class="form-input repeatPass" name="repeatPass" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Repetir Contraseña*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input pp" name="pregunta1" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Primera Pregunta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input pr" name="respuesta1" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Respuesta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input sp" name="pregunta2"required>
                                <label for="" class="form-label">
                                    <span class="label-content">Segunda Pregunta*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input autocomplete="off" type="text" class="form-input sr" name="respuesta2" required>
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
                    <form action="" method="POST" class="form">
                        <h2 class="form-title font-f-s p-10 color-b-blue-3 font-18">
                            EDITAR ${rows[0].primer_nom} ${rows[0].primer_ape}
                            <span class="container btn btn-blue-2 br-3 btn-title font-12 cancel"><i class="fas fa-times"></i></span>
                        </h2>
                        <div class="form-section-parts g-t-c-4">
                            <div class="form-section">
                                <input value="${rows[0].primer_nom}" autocomplete="off" type="text" class="form-input" name="nombre1" id="pn" autofocus required>
                                <label for="" class="form-label">
                                    <span class="label-content">Primer Nombre*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].segundo_nom}" autocomplete="off" type="text" class="form-input" name="nombre2" id="sn">
                                <label for="" class="form-label">
                                    <span class="label-content">Segundo Nombre</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].primer_ape}" autocomplete="off" type="text" class="form-input" name="apellido1" id="pa" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Primer Apellido*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].segundo_ape}" autocomplete="off" type="text" class="form-input" name="apellido2" id="sa">
                                <label for="" class="form-label">
                                    <span class="label-content">Segundo Apellido</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].id_usuario}" autocomplete="off" type="text" class="form-input" name="cedula" id="ced" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Cedula*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="0${rows[0].numero}" autocomplete="off" type="text" class="form-input" name="telefono" id="tel" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Télefono*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].correo}" autocomplete="off" type="email" class="form-input" name="correo" id="email" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Correo*</span>
                                </label>
                            </div>
                            <div class="form-section">
                                <input value="${rows[0].nombre_cargo}" autocomplete="off" type="text" class="form-input" name="cargo" id="car" required>
                                <label for="" class="form-label">
                                    <span class="label-content">Cargo*</span>
                                </label>
                            </div>
                        </div>
                        <div class="form-section">
                            <p class="color-red">Datos requeridos (*)</p>
                        </div>
                        <div class="form-section container">
                            <div class="form-check br-3">
                                <input type="checkbox" name="acceso3" id="3" ${rows[0].admin}>
                                <label for="3" class="checkbox br-3">Administrador</label>
                            </div>
                            <div class="form-check br-3">
                                <input type="checkbox" name="acceso2" id="2"
                                ${rows[0].analista_admin}>
                                <label for="2" class="checkbox br-3">Analista Administrativo</label>
                            </div>
                            <div class="form-check br-3">
                                <input type="checkbox" name="acceso1" id="1" ${rows[0].control_estudio}>
                                <label for="1" class="checkbox br-3">Control Estudio</label>
                            </div>
                        </div>
                        <div class="form-section container">
                            <button class="btn btn-grey form-button br-3">Actualizar</button>
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
                        <h2 class="form-title font-f-s p-10 color-b-blue-3 font-18">
                            RESETEAR ${rows[0].primer_nom} ${rows[0].primer_ape}
                            <span class="container btn btn-blue-2 br-3 btn-title font-12 cancel"><i class="fas fa-times"></i></span>
                        </h2>
                        <div class="form-section-parts g-t-c-3">
                            <div class="form-section">
                                <input type="password" class="form-input" name="pass" id="pass" autofocus required>
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
                            <button class="btn btn-grey form-button br-3">Resetear</button>
                        </div>
                    </form>
                </section>
                <script src="/js/form.js"></script>`;

    return data;
};


module.exports = form;