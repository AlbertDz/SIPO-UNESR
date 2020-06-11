const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'cedula',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, cedula, password, done) => {
    const rows = await pool.query('select * from sesion where id_usuario = ?', [cedula]);

    if (rows.length > 0) {
        const user = rows[0];
        const valuePass = await helpers.matchPassword(password, user.password);

        if (user.bloqueado) {
            done(null, false, {mensaje: '¡Este usuario se encuentra bloqueado!'});
        } else {
            if (valuePass) {
                intentos = 3;
                await pool.query('update sesion set intentos = ? where id_usuario = ?', [intentos, cedula]);
                done(null, user);
            } else {
                if (user.intentos > 1) {
                    intentos = user.intentos - 1;
                    await pool.query('update sesion set intentos = ? where id_usuario = ?', [intentos, cedula]);
                    done(null, false, {mensaje: `¡Contraseña incorrecta, le quedan ${intentos} intentos!`});
                } else {
                    bloqueado = true;
                    await pool.query('update login set bloqueado = ? where id_usuario = ?', [bloqueado, cedula]);
                    done(null, false, {mensaje: '¡Ha excedido el número de intentos, usuario bloqueado!'});
                }
            };
        };
    } else {
        return done(null, false, {mensaje: '¡El usuario no existe!'});
    };
}));

passport.serializeUser((user, done) => {
    done(null, user.id_usuario);
});

passport.deserializeUser(async (id, done) => {
    // Creando variable global para usuario(user)
    const rows = await pool.query(`select U.id_usuario,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,cargo,T.id_acceso,nombre_acceso 
                                    from usuario U join tipo_acceso_usuario A on U.id_usuario = A.id_usuario join  tipo_acceso T on A.id_acceso = T.id_acceso
                                    where id_usuario = ?`, [id]);

    done(null, rows[0]);
});