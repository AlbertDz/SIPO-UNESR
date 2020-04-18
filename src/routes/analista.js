const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, analista } = require('../lib/auth');

// CONCEPTOS
router.get('/conceptos', (req, res) => {
    pool.query('select * from concepto', (errors, results, fields) => {
    	if (errors) { return res.send(errors) }
    		else { return res.send(results) }
    });
});

router.post('/conceptos', (req, res) => {
	pool.query('insert into concepto set ?', [req.body], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	});
});

router.put('/conceptos/:codigo', (req,res) => {
	pool.query('update concepto set ? where codigo = ?', [req.body, req.params.codigo], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send('!Datos actualizados exitosamente¡') }
	});
});

router.delete('/conceptos/:codigo', (req, res) => {
	pool.query('delete from concepto where codigo = ?', [req.params.codigo], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	});
});
// FIN CONCEPTOS

// PLANILLA ARANCELES
router.get('/planilla/:id', (req, res) => {
	pool.query(`select id_planilla,concepto,total_conceptos,total_banco,
				diferencia_pago,dia,mes,anio,cedula,
				primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,id_carrera,nombre_periodo
				from planilla_arancel inner join fecha on planilla_arancel.id_fecha = fecha.id_fecha
				inner join estudiante on planilla_arancel.id_estudiante = estudiante.cedula
				inner join periodo on planilla_arancel.id_periodo = periodo.id_periodo where id_planilla = ?`,[req.params.id], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	})
});

router.post('/planilla', (req, res) => {
	pool.query('insert into planilla_arancel set ?', [req.body], (errors, results, fields) => {
    	if (errors) { return res.send(errors) }
    		else { return res.send(results) }
    });  
});

router.delete('/planilla/:id', (req, res) => {
	pool.query('delete from planilla_arancel where id_planilla = ?', [req.params.id], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	})
});
// FIN PLANILLA ARANCELES

// PLANILLA CONCEPTOS
router.get('/planilla/:id/conceptos', (req, res) => {
	pool.query(`select cantidad,monto_planilla,sub_total,codigo,descripcion
				from planilla_concepto inner join concepto on planilla_concepto.id_codigo = concepto.codigo
				where id_planilla = ?`,[req.params.id], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	})
});

router.post('/planilla/conceptos', (req, res) => {
	pool.query('insert into planilla_concepto set ?', [req.body], (errors, results, fields) => {
    	if (errors) { return res.send(errors) }
    		else { return res.send(results) }
    });
});

router.delete('/planilla/conceptos/:id', (req, res) => {
	pool.query('delete from planilla_concepto where id_planilla_concepto = ?', [req.params.id], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	})
});
// FIN PLANILLA CONCEPTOS

// PLANILLA REFERENCIA
router.get('/planilla/:id/referencia', (req, res) => {
	pool.query(`select valor_referencia,monto,fecha,nombre_banco
				from planilla_referencia inner join banco on planilla_referencia.id_banco = banco.id_banco
				where id_planilla = ?`,[req.params.id], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	})
});

router.post('/planilla/referencia', (req, res) => {
	pool.query('insert into planilla_referencia set ?', [req.body], (errors, results, fields) => {
    	if (errors) { return res.send(errors) }
    		else { return res.send(results) }
    });
});

router.delete('/planilla/referencia/:id', (req, res) => {
	pool.query('delete from planilla_referencia where id_referencia = ?', [req.params.id], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	})
});
// FIN PLANILLA REFERNCIA

// BANCO
router.get('/bancos', (req, res) => {
    pool.query('select * from banco', (errors, results, fields) => {
    	if (errors) { return res.send(errors) }
    		else { return res.send(results) }
    });
});

router.post('/bancos', (req, res) => {
	pool.query('insert into banco set ?', [req.body], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send('!Datos guardados exitosamente¡') }
	});
});

router.put('/bancos/:codigo', (req,res) => {
	pool.query('update banco set ? where id_banco = ?', [req.body, req.params.codigo], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send('!Datos actualizados exitosamente¡') }
	});
});

router.delete('/bancos/:codigo', (req, res) => {
	pool.query('delete from banco where id_banco = ?', [req.params.codigo], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send('!Datos eliminados exitosamente¡') }
	});
});
// FIN BANCO

// REPORTES
router.get('/reporte/:periodo', (req, res) => {
	pool.query(`select id_planilla,concepto,mes,cedula,primer_nombre,primer_apellido
				from planilla_arancel inner join fecha on planilla_arancel.id_fecha = fecha.id_fecha
				inner join estudiante on planilla_arancel.id_estudiante = estudiante.cedula where id_periodo = ?`,[req.params.periodo], (errors, results, fields) => {
		if (errors) { return res.send(errors) }
			else { return res.send(results) }
	})
});
// FIN REPORTES
module.exports = router;