const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
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

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('user/login', { title: 'Login' });
});

router.post('/login', isNotLoggedIn, (req, res) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res);
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