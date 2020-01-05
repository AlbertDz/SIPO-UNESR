const express = require('express');
const router = express.Router();
const arancel = require('../arancel');
const { isLoggedIn, analistaAdmin } = require('../lib/auth');
const valid = require('../lib/valid');
const estudiantes = require('../estudiantes');
const { pagoArancel } = require('../lib/form');

router.get('/pago-arancel', isLoggedIn, analistaAdmin, (req, res) => {
    res.render('analista-admin/pago-arancel', {title: 'Pago Arancel', estudiantes});
});

router.post('/pago-arancel/show', isLoggedIn, analistaAdmin, (req, res) => {
    const data = pagoArancel();

    res.send(data);
});

module.exports = router;