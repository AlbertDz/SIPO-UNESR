const pool = require('../database');
const helpers = require('../lib/helpers');

const database = {};

// database.insertUser = async (req,res) => {
//     let {
//         nombre1,
//         nombre2,
//         apellido1,
//         apellido2,
//         cedula,
//         telefono,
//         correo,
//         cargo,
//         pass,
//         pregunta1,
//         respuesta1,
//         pregunta2,
//         respuesta2,
//         acceso1,
//         acceso2,
//         acceso3,
//         correcto,
//         fallo
//     } = req.body;
//     const newUser = {
//         id_usuario: parseInt(cedula),
//         primer_nom: nombre1.toUpperCase(),
//         segundo_nom: nombre2.toUpperCase(),
//         primer_ape: apellido1.toUpperCase(),
//         segundo_ape: apellido2.toUpperCase()
//     }
//     const newCargo = {
//         nombre_cargo: cargo.toUpperCase()
//     }
//     const newPre1 = {
//         pregunta1: pregunta1.toUpperCase(),
//         respuesta1: await helpers.encryptPassword(respuesta1)
//     }
//     const newPre2 = {
//         pregunta2: pregunta2.toUpperCase(),
//         respuesta2: await helpers.encryptPassword(respuesta2)
//     }

//     const newTipoAcceso = {
//         admin: acceso3,
//         analista_admin: acceso2,
//         control_estudio: acceso1
//     }
//     const newAccesoUser = {
//         id_usuario: parseInt(cedula)
//     };
//     const newLogin = {
//         id_usuario: parseInt(cedula),
//         bloqueado: false,
//         intentos: 3,
//         password: await helpers.encryptPassword(pass),
//     }
//     const newTelefono = {
//         numero: parseInt(telefono)
//     }
//     const newCorreo = {
//         correo: correo.toUpperCase()
//     }

//     // Validando todos los campos
//     if (valid.validName(nombre1) && valid.validName(nombre2) && valid.validName(apellido1) && valid.validName(apellido2) && valid.validPre(pregunta1) && valid.validPre(pregunta2) && valid.validRes(respuesta1) && valid.validRes(respuesta2) && valid.validCed(cedula) && valid.validTel(telefono) && valid.validCar(cargo) && valid.validPass(pass)) {
//         // Verificar que no exista usuario con la misma cedula
//         const usuario = await pool.query('select * from usuario where id_usuario = ?', [cedula]);

//         if (usuario.length > 0) {
//             req.flash('message', 'Ya existe un registro con ese documento de identidad, por favor verifique los datos');
//             res.redirect(fallo);
//         } else {
//             // guardar nuevo registro
//             const resultCargo = await pool.query('insert into cargo set ?', [newCargo]);
//             newUser.id_cargo = resultCargo.insertId;
//             const resultPre1 = await pool.query('insert into primera_pregunta set ?', [newPre1])
//             newUser.id_primera_pre = resultPre1.insertId;
//             const resultPre2 = await pool.query('insert into segunda_pregunta set ?', [newPre2])
//             newUser.id_segunda_pre = resultPre2.insertId;
//             const resultTel = await pool.query('insert into telefono set ?', [newTelefono]);
//             newUser.id_telefono = resultTel.insertId;
//             const resultCorreo = await pool.query('insert into correo set ?', [newCorreo]);
//             newUser.id_correo = resultCorreo.insertId;

//             const resultAcceso = await pool.query('insert into tipo_acceso set ?', [newTipoAcceso]);
//             newAccesoUser.id_acceso = resultAcceso.insertId;

//             await pool.query('insert into usuario set ?', [newUser]);
//             await pool.query('insert into login set ?', [newLogin]);
//             await pool.query('insert into tipo_acceso_usuario set ?', [newAccesoUser]);

//             req.flash('success', 'Usuario registrado satisfactoriamente');

//             res.redirect(correcto);
//         };
//     } else {
//         req.flash('message', 'Datos incorrectos, por favor verifique y vuelva a intentar');

//         res.redirect(fallo);
//     };
// };

module.exports = database;