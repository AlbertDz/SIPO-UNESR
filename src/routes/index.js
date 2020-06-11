const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { generarFecha } = require('../lib/funciones');
const helpers = require('../lib/helpers');
var jwt = require('jsonwebtoken')

// FECHA
router.get('/fecha', isLoggedIn, (req, res) => {
    const fecha = generarFecha();

    pool.query('insert into fecha set ?', [fecha], (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });  
});

router.get('/fecha/:id', isLoggedIn, (req, res) => {
    const fecha = generarFecha();

    pool.query('select * from fecha where id_fecha = ?', [req.params.id], (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });  
});

router.delete('/fecha/:id', isLoggedIn, (req, res) => {
    pool.query('delete from fecha where id_fecha = ?', [req.params.id], (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    })
});
// FIN FECHA

// LOGIN
router.post('/login', isNotLoggedIn, async (req, res) => {
    const { cedula, password } = req.body;
    const rows = await pool.query('select * from usuario where id_usuario = ?', [cedula]);

    if (rows.length > 0) {
        const user = rows[0];
        const valuePass = await helpers.matchPassword(password, user.password);

        if (user.bloqueado) {
            return res.json({mensaje: '¡Este usuario se encuentra bloqueado!'});
        } else {
            if (valuePass) {
                intentos = 3;
                await pool.query('update usuario set intentos = ? where id_usuario = ?', [intentos, cedula]);
                if (user.id_acceso === 1) {
                    const tokenAnalista = jwt.sign({user}, 'key_analista', { expiresIn: 60*60*24 })
                    return res.json({tokenAnalista})
                } else {
                    const tokenControlEstudio = jwt.sign({user}, 'key_control_estudio', { expiresIn: 60*60*24 })
                    return res.json({tokenControlEstudio})
                }
            } else {
                if (user.intentos > 1) {
                    intentos = user.intentos - 1;
                    await pool.query('update usuario set intentos = ? where id_usuario = ?', [intentos, cedula]);
                    return res.json({mensaje: `¡Contraseña incorrecta, le quedan ${intentos} intentos!`});
                } else {
                    bloqueado = true;
                    await pool.query('update usuario set bloqueado = ? where id_usuario = ?', [bloqueado, cedula]);
                    return res.json({mensaje: '¡Ha excedido el número de intentos, usuario bloqueado!'});
                }
            };
        };
    } else {
        return res.json({mensaje: '¡El usuario no existe!'});
    };
});
// FIN LOGIN
 
// USUARIO
router.get('/usuario/:id', isLoggedIn, (req, res) => {
    pool.query(`select U.primer_nombre, U.segundo_nombre, U.primer_apellido, U.segundo_apellido,
                U.id_usuario, U.cargo, P.pregunta, P.respuesta, P.id_pregunta
                from usuario U join pregunta P on P.id_pregunta = U.id_pregunta 
                where id_usuario = ?`, [req.params.id], (errors, results, fields) => {
        if (errors) { return results.send(errors) }
            else { return res.send(results) }
    })
})

router.put('/usuario/:id', isLoggedIn, (req, res) => {
    pool.query('update usuario set ? where id_usuario = ?', [req.body, req.params.id], (errors, results, fields) => {
        if (errors) { return results.send(errors) }
            else { return res.send(results) }
    })
})

router.put('/usuario/password/:id', isLoggedIn, async (req, res) => {
    const newPassword = await helpers.encryptPassword(req.body.password);

    pool.query('update usuario set password = ? where id_usuario = ?', [newPassword, req.params.id], (errors, results, fields) => {
        if (errors) { return results.send(errors) }
            else { return res.send(results) }
    })
})

router.put('/usuario/pregunta/:id', isLoggedIn, (req, res) => {
    pool.query('update pregunta set ? where id_pregunta = ?', [req.body, req.params.id], (errors, results, fields) => {
        if (errors) { return results.send(errors) }
            else { return res.send(results) }
    })
})

router.get('/user/:id', isNotLoggedIn, (req, res) => {
    pool.query(`select P.pregunta, P.respuesta from usuario U 
                join pregunta P on P.id_pregunta = U.id_pregunta 
                where id_usuario = ?`, [req.params.id], (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    })
});
// FIN USUARIO

// PERIODO, POSTGRADO, CARRERA, MATERIA
router.get('/periodos', isLoggedIn, (req, res) => {
    pool.query('select * from periodo order by id_periodo desc', (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });
});

router.get('/postgrados', isLoggedIn, (req, res) => {
    pool.query('select * from postgrado', (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });
});

router.get('/carreras/:id', isLoggedIn, (req, res) => {
    pool.query('select * from carrera where id_postgrado = ?', [req.params.id], (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });
});

router.get('/materias/:id', isLoggedIn, (req, res) => {
    pool.query('select * from materia where id_carrera = ? order by id_semestre', [req.params.id], (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });
});

router.get('/semestres', isLoggedIn, (req, res) => {
    pool.query('select * from semestre', (errors, results, fields) => {
        if (errors) { return res.send(errors) }
            else { return res.send(results) }
    });
});
// FIN POSTGRADO, CARRERA, MATERIA
module.exports = router;