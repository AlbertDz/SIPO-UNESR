const express = require('express');
const router = express.Router();
const pool = require('../database');
const arancel = require('../arancel');
const helpers = require('../lib/helpers');
const { isLoggedIn, admin } = require('../lib/auth');
const valid = require('../lib/valid');
const { addUser, editUser, resetUser } = require('../lib/form');

router.get('/users', isLoggedIn, admin, async (req, res) => {
    const usuarios = await pool.query('select id_usuario,primer_nom,segundo_nom,primer_ape,segundo_ape,nombre_cargo,numero,correo from usuario inner join cargo on usuario.id_cargo = cargo.id_cargo inner join telefono on usuario.id_telefono = telefono.id_telefono inner join correo on usuario.id_correo = correo.id_correo order by id_usuario asc');
    res.render('admin/users', { usuarios, title: 'Usuarios' });
});

router.post('/users/add/show', isLoggedIn, admin, (req,res) => {
    const data = addUser();
    
    res.send(data);
});

router.post('/users/add', isLoggedIn, admin, async (req, res) => {
    let { nombre1, nombre2, apellido1, apellido2, cedula, telefono, correo, cargo, pass, pregunta1, respuesta1, pregunta2, respuesta2, acceso1, acceso2, acceso3 } = req.body;
    const newUser = {
        id_usuario: parseInt(cedula),
        primer_nom: nombre1.toUpperCase(),
        segundo_nom: nombre2.toUpperCase(),
        primer_ape: apellido1.toUpperCase(),
        segundo_ape: apellido2.toUpperCase()
    }
    const newCargo = {
        nombre_cargo: cargo.toUpperCase()
    }
    const newPre1 = {
        pregunta1: pregunta1.toUpperCase(),
        respuesta1: await helpers.encryptPassword(respuesta1)
    }
    const newPre2 = {
        pregunta2: pregunta2.toUpperCase(),
        respuesta2: await helpers.encryptPassword(respuesta2)
    }

    const newTipoAcceso = {
        admin: acceso3,
        analista_admin: acceso2,
        control_estudio: acceso1
    }
    const newAccesoUser = {
        id_usuario: parseInt(cedula)
    };
    const newLogin = {
        id_usuario: parseInt(cedula),
        bloqueado: false,
        intentos: 3,
        password: await helpers.encryptPassword(pass),
    }
    const newTelefono = {
        numero: parseInt(telefono)
    }
    const newCorreo = {
        correo: correo.toUpperCase()
    }
    
    // Validando todos los campos
    if (valid.validName(nombre1) && valid.validName(nombre2) && valid.validName(apellido1) && valid.validName(apellido2) && valid.validPre(pregunta1) && valid.validPre(pregunta2) && valid.validRes(respuesta1) && valid.validRes(respuesta2) && valid.validCed(cedula) && valid.validTel(telefono) && valid.validCar(cargo) && valid.validPass(pass)) {
        // Verificar que no exista usuario con la misma cedula
        const usuario = await pool.query('select * from usuario where id_usuario = ?', [cedula]);
        
        if (usuario.length > 0) {
            req.flash('message', 'Ya existe un registro con ese documento de identidad, por favor verifique los datos');
            res.redirect('/users');
        } else {
            // guardar nuevo registro
            const resultCargo = await pool.query('insert into cargo set ?', [newCargo]);
            newUser.id_cargo = resultCargo.insertId;
            const resultPre1 = await pool.query('insert into primera_pregunta set ?', [newPre1])
            newUser.id_primera_pre = resultPre1.insertId;
            const resultPre2 = await pool.query('insert into segunda_pregunta set ?', [newPre2])
            newUser.id_segunda_pre = resultPre2.insertId;
            const resultTel = await pool.query('insert into telefono set ?', [newTelefono]);
            newUser.id_telefono = resultTel.insertId;
            const resultCorreo = await pool.query('insert into correo set ?', [newCorreo]);
            newUser.id_correo = resultCorreo.insertId;
            
            const resultAcceso = await pool.query('insert into tipo_acceso set ?', [newTipoAcceso]);
            newAccesoUser.id_acceso = resultAcceso.insertId;
            
            await pool.query('insert into usuario set ?', [newUser]);
            await pool.query('insert into login set ?', [newLogin]);
            await pool.query('insert into tipo_acceso_usuario set ?', [newAccesoUser]);
            
            req.flash('success', 'Usuario registrado satisfactoriamente');
        };
    } else {
        req.flash('message', 'Datos incorrectos, por favor verifique y vuelva a intentar');
    };
    
    res.redirect('/admin/users');
});

router.post('/users/edit/show', isLoggedIn, admin, async (req,res) => {
    const { id } = req.body;
    const data = await editUser(id);

    res.send(data);
});

router.post('/users/edit/:id_usuario', isLoggedIn, admin, async (req, res) => {
    const { id_usuario } = req.params;
    const { nombre1, nombre2, apellido1, apellido2, telefono, correo, cargo, acceso1, acceso2, acceso3 } = req.body;

    console.log(acceso1, acceso2, acceso3)

    const id = await pool.query('select id_cargo, id_telefono, id_correo from usuario where id_usuario = ?', [id_usuario]);
    const id_acceso = await pool.query('select id_acceso from tipo_acceso_usuario where id_usuario = ?', [id_usuario]);

    if (valid.validName(nombre1) && valid.validName(nombre2) && valid.validName(apellido1) && valid.validName(apellido2) && valid.validTel(telefono) && valid.validCar(cargo)) {

        await pool.query('update cargo set nombre_cargo = ? where id_cargo = ?', [cargo.toUpperCase(), id[0].id_cargo]);
        await pool.query('update telefono set numero = ? where id_telefono = ?', [parseInt(telefono), id[0].id_telefono]);
        await pool.query('update correo set correo = ? where id_correo = ?', [correo.toUpperCase(), id[0].id_correo]);
        await pool.query('update tipo_acceso set admin = ?, analista_admin = ?, control_estudio = ? where id_acceso = ?', [acceso3, acceso2, acceso1, id_acceso[0].id_acceso]);

        await pool.query('update usuario set primer_nom = ?, segundo_nom = ?, primer_ape = ?, segundo_ape = ? where id_usuario = ?', [nombre1.toUpperCase(), nombre2.toUpperCase(), apellido1.toUpperCase(), apellido2.toUpperCase(), id_usuario]);

        req.flash('success', 'Usuario actualizado satisfactoriamente');
    } else {
        req.flash('message', 'Datos incorrectos, por favor verifique y vuelva a intentar');
    }

    res.redirect('/admin/users');
});

router.post('/users/reset/show', isLoggedIn, admin, async (req,res) => {
    const { id } = req.body;
    const data = await resetUser(id);

    res.send(data);
});

router.get('/aranceles', isLoggedIn, admin, async (req, res) => {
    res.render('admin/aranceles', { arancel, title: 'Aranceles' });
});

module.exports = router;