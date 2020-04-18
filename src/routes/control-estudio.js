const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const { isLoggedIn, controlEst } = require('../lib/auth');

router.get('/estudiante/registrar',isLoggedIn, controlEst, (req, res) => {
    res.render('control-estudio/registrar', { title: 'Registrar', recaudos });
});

router.get('/estudiantes',isLoggedIn, controlEst, (req, res) => {
    res.render('control-estudio/ver-todos', { title: 'Estudiantes' });
});

router.get('/inscripcion',isLoggedIn, controlEst, (req, res) => {
    res.render('control-estudio/inscripcion', { title: 'Inscripcion' });
});

router.get('/inscripcion/validar',isLoggedIn, controlEst, (req, res) => {
    res.render('control-estudio/validar', { title: 'Validar' });
});

router.post('/materias', isLoggedIn, controlEst, (req, res) => {
    const { codigo } = req.body;
    const data = showMaterias(codigo);

    res.send(data);
});

module.exports = router;