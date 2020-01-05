const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn, userNone, userYes } = require('../lib/auth');
const { fecha } = require('../lib/handlebars')
const { addUser } = require('../lib/form');
const { insertUser } = require('../lib/database');

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

module.exports = router;