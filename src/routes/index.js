const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { fecha } = require('../lib/handlebars')
const { insertUser } = require('../lib/database');
const { generarFecha } = require('../lib/funciones');

// FECHA
router.post('/fecha', (req, res) => {
    const fecha = generarFecha();

    pool.query('insert into fecha set ?', [fecha], (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });  
});

router.delete('/fecha/:id', (req, res) => {
    pool.query('delete from fecha where id_fecha = ?', [req.params.id], (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    })
});
// FIN FECHA

// PERIODO, POSTGRADO, CARRERA
router.get('/periodos', (req, res) => {
    pool.query('select * from periodo', (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });
});

router.get('/postgrados', (req, res) => {
    pool.query('select * from postgrado', (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });
});

router.get('/carreras', (req, res) => {
    pool.query('select * from carrera', (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });
});
// FIN PERIODO, POSTGRADO, CARRERA

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

// router.post('/fecha', isLoggedIn, (req, res) => {
//     const date = fecha();
    
//     res.send(date);
// });

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