const express = require('express');
const router = express.Router();
const pool = require('../database');
const arancel = require('../arancel');
const { isLoggedIn, admin } = require('../lib/auth');
const valid = require('../lib/valid');
const { addUser, editUser, resetUser } = require('../lib/form');
const { insertUser } = require('../lib/database');

router.get('/users', isLoggedIn, admin, async (req, res) => {
    const usuarios = await pool.query('select id_usuario,primer_nom,segundo_nom,primer_ape,segundo_ape,nombre_cargo,numero,correo from usuario inner join cargo on usuario.id_cargo = cargo.id_cargo inner join telefono on usuario.id_telefono = telefono.id_telefono inner join correo on usuario.id_correo = correo.id_correo order by id_usuario asc');

    const lista = {};
    let usuario = 0;

    for (let i in usuarios) {
        if (usuarios[i].id_usuario != req.user.id_usuario) {
            lista[usuario] = usuarios[i];

            usuario ++;
        }
    }

    res.render('admin/users', { lista, title: 'Usuarios' });
});

router.post('/users/add/show', isLoggedIn, admin, (req,res) => {
    const form = {
        "action": "/admin/users/add",
        "title": "Registrar Usuario",
        "button": "<span class='container btn btn-blue-2 br-3 btn-title font-12 cancel'><i class='fas fa-times'></i></span>",
        "checked": "",
        "disabled": ""
    };

    const data = addUser(form);
    
    res.send(data);
});

router.post('/users/add', isLoggedIn, admin, async (req, res) => {
    req.body.correcto = '/admin/users';
    req.body.fallo = '/admin/users';

    insertUser(req,res);
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