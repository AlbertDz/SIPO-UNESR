const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn, userNone, userYes } = require('../lib/auth');
const { fecha } = require('../lib/handlebars')
const { addUser } = require('../lib/form');
const { insertUser } = require('../lib/database');
const estudiantes = require('../estudiantes');

router.get('/', isLoggedIn, (req, res) => {
    res.redirect('/profile');
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('user/profile', { title: 'Perfil' });
});

router.get('/login', userYes, isNotLoggedIn, (req, res) => {
    res.render('user/login', { title: 'Login' });
});

router.post('/login', userYes, isNotLoggedIn, (req, res) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res);
});

router.get('/login/user', userNone, isNotLoggedIn, (req, res) => {
    res.render('user/user-admin', { title: 'Usuario Administrador' })
});

router.post('/login/user/show', userNone, isNotLoggedIn, (req, res) => {
    const form = {
        "action": "/login/user",
        "title": "No existe ningun usuario administrador para el sistema, por favor cree uno",
        "button": "",
        "checked": "checked",
        "disabled": "disabled"
    };

    const data = addUser(form);

    res.send(data);
});

router.post('/login/user', userNone, isNotLoggedIn, async (req, res) => {
    req.body.acceso3 = 'on';
    req.body.correcto = '/login';
    req.body.fallo = '/login/user';

    insertUser(req,res);
});

router.get('/exit', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.post('/fecha', isLoggedIn, (req, res) => {
    const date = fecha();
    
    res.send(date);
});

router.post('/list', isLoggedIn, async (req, res) => {
    let list = {};
    let num = 0;

    if (req.user.control_estudio) {
        const student = estudiantes;

        for (const i in student) {
            list[num] += `${student[i].cedula} ${student[i].nombres} ${student[i].apellidos}`;

            num++;
        }
    };

    if (req.user.admin) {
        const users = await pool.query('select id_usuario,primer_nom,segundo_nom,primer_ape,segundo_ape from usuario');

        for (const i in users) {
            list[num] += `${users[i].id_usuario} ${users[i].primer_nom} ${users[i].segundo_nom} ${users[i].primer_ape} ${users[i].segundo_ape}`;

            num++;
        }
    }

    res.send(list);
});

module.exports = router;