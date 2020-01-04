const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isNotLoggedIn, userYes } = require('../lib/auth');
const helpers = require('../lib/helpers');

router.get('/step/1', userYes, isNotLoggedIn, (req, res) => {
    res.render('recover/stepOne', { title: 'Paso 1' });
});

router.post('/step/2', userYes, isNotLoggedIn, async (req, res) => {
    const { cedula } = req.body;
    const usuarios = await pool.query('select id_usuario,primer_nom,primer_ape,pregunta1,pregunta2 from usuario inner join primera_pregunta on usuario.id_primera_pre = primera_pregunta.id_primera_pre inner join segunda_pregunta on usuario.id_segunda_pre = segunda_pregunta.id_segunda_pre where id_usuario = ?', [cedula]);

    if (usuarios.length > 0) {
        const usuario = usuarios[0];
        res.render('recover/stepTwo', { title: 'Paso 2', usuario });
    } else {
        req.flash('message', 'El usuario no existe');
        res.redirect('/recover/step/1');
    }
});

router.post('/step/3/:id', userYes, isNotLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { respuesta1, respuesta2 } = req.body;
    const usuarios = await pool.query('select id_usuario,primer_nom,primer_ape,respuesta1,respuesta2 from usuario inner join primera_pregunta on usuario.id_primera_pre = primera_pregunta.id_primera_pre inner join segunda_pregunta on usuario.id_segunda_pre = segunda_pregunta.id_segunda_pre where id_usuario = ?', [id]);

    if (usuarios.length > 0) {
        const usuario = usuarios[0];
        const valueRes1 = await helpers.matchPassword(respuesta1.toUpperCase(), usuario.respuesta1);
        const valueRes2 = await helpers.matchPassword(respuesta2.toUpperCase(), usuario.respuesta2);

        if (valueRes1 && valueRes2) {
            res.render('recover/stepThree', { title: 'Paso 3', usuario });
        } else {
            req.flash('message', 'Verifique sus respuestas');
            res.redirect('/recover/step/1');
        }
    }
});

router.post('/step/completed/:id', userYes, isNotLoggedIn, async (req, res) => {
    const { id } = req.params;
    let { pass } = req.body;
    pass = await helpers.encryptPassword(pass),
    await pool.query('update login set  bloqueado = 0, intentos = 3, password = ? where id_usuario = ?', [pass, id]);

    req.flash('success', 'Contraseña cambiada exitosamente');
    res.redirect('/login');
});

module.exports = router;