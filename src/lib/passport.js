const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'cedula',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, cedula, pass, done) => {
    const rows = await pool.query('select * from login where id_usuario = ?', [cedula]);
    if (rows.length > 0) {
        const user = rows[0];
        const valuepass = await helpers.matchPassword(pass, user.password);

        if (user.bloqueado) {
            done(null, false, req.flash('message', 'Usuario Bloqueado.'));
        } else {
            if (valuepass) {
                intentos = 3;
                await pool.query('update login set intentos = ? where id_usuario = ?', [intentos, cedula]);
                done(null, user);
            } else {
                if (user.intentos > 1) {
                    intentos = user.intentos - 1;
                    await pool.query('update login set intentos = ? where id_usuario = ?', [intentos, cedula]);
                    done(null, false, req.flash('message', 'Contraseña Incorrecta. Quedan ' + intentos + ' intento(s).'));
                } else {
                    bloqueado = true;
                    await pool.query('update login set bloqueado = ? where id_usuario = ?', [bloqueado, cedula]);
                    done(null, false, req.flash('message', 'Ha exedido el número de intentos. Su usuario a sido bloqueado.'));
                }
            };
        };
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe'));
    };
}));

passport.serializeUser((user, done) => {
    done(null, user.id_usuario);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('select id_usuario,primer_nom,segundo_nom,primer_ape,segundo_ape,nombre_cargo,numero,correo,pregunta1,pregunta2 from usuario inner join cargo on usuario.id_cargo = cargo.id_cargo inner join telefono on usuario.id_telefono = telefono.id_telefono inner join correo on usuario.id_correo = correo.id_correo inner join primera_pregunta on usuario.id_primera_pre = primera_pregunta.id_primera_pre inner join segunda_pregunta on usuario.id_segunda_pre = segunda_pregunta.id_segunda_pre where id_usuario = ?', [id]);

    const acceso = await pool.query('select admin,analista_admin,control_estudio from tipo_acceso_usuario inner join tipo_acceso on tipo_acceso_usuario.id_acceso = tipo_acceso.id_acceso where id_usuario = ?', [id])

    rows[0].admin = acceso[0].admin;
    rows[0].analista_admin = acceso[0].analista_admin;
    rows[0].control_estudio = acceso[0].control_estudio;

    done(null, rows[0]);
});