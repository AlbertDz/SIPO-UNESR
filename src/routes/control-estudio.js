const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const { isLoggedIn, controlEst } = require('../lib/auth');
const valid = require('../lib/valid');
const { showMaterias } = require('../lib/form');

router.get('/nuevo-ingreso',isLoggedIn, controlEst, (req, res) => {
    res.render('control-estudio/new', { title: 'Nuevo Usuario' });
});

router.post('/materias', isLoggedIn, controlEst, (req, res) => {
    const { codigo } = req.body;
    const data = showMaterias(codigo);

    res.send(data);
});

module.exports = router;