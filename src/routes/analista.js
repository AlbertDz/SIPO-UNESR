const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { generarFecha } = require('../lib/funciones');
var jwt = require('jsonwebtoken')

// CONCEPTOS
router.get('/conceptos', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
		    pool.query('select * from concepto', (errors, results, fields) => {
		    	if (errors) { return res.send(errors) }
		    		else { return res.send(results) }
		    });
	    }
	})
});

router.post('/conceptos', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('insert into concepto set ?', [req.body], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.put('/conceptos/:codigo', isLoggedIn, (req,res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('update concepto set ? where codigo = ?', [req.body, req.params.codigo], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.delete('/conceptos/:codigo', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('delete from concepto where codigo = ?', [req.params.codigo], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});
// FIN CONCEPTOS

// PLANILLA ARANCELES
router.get('/planilla/:id', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query(`select P.id_planilla,P.total_conceptos,P.total_banco,P.diferencia_pago,F.dia,F.mes,F.anio,
						E.cedula,E.primer_nombre,E.segundo_nombre,E.primer_apellido,E.segundo_apellido,
						C.nombre_carrera,P.id_periodo,O.nombre_postgrado
						from planilla_arancel P join fecha F on P.id_fecha = F.id_fecha 
						join estudiante E on P.id_estudiante = E.cedula join carrera C on E.id_carrera = C.id_carrera 
						join postgrado O on C.id_postgrado = O.id_postgrado 
						where id_planilla = ?`,[req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			})
	    }
	})
});

router.get('/planillas/:cedula', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query(`select P.id_planilla,E.cedula,E.primer_nombre,E.primer_apellido,
						C.nombre_carrera,P.id_periodo,O.nombre_postgrado
						from planilla_arancel P join estudiante E on P.id_estudiante = E.cedula 
						join carrera C on E.id_carrera = C.id_carrera 
						join postgrado O on C.id_postgrado = O.id_postgrado 
						where P.id_estudiante = ? order by id_planilla desc`,[req.params.cedula], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			})
	    }
	})
});

router.post('/planilla', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	const fecha = generarFecha();

		    pool.query('insert into fecha set ?', [fecha], (errors, results, fields) => {
		        if (errors) { return res.send(errors) }
		            else {
					    const planilla = {
					    	id_planilla: req.body.id_planilla,
					        total_conceptos: req.body.total_conceptos,
					        total_banco: req.body.total_banco,
					        diferencia_pago: req.body.diferencia_pago,
					        id_fecha: results.insertId,
					        id_estudiante: req.body.id_estudiante,
					        id_periodo: req.body.id_periodo,
					        concepto_principal: req.body.concepto_principal
					    }

						pool.query('insert into planilla_arancel set ?', [planilla], (errors, results, fields) => {
					    	if (errors) { return res.send(errors) }
					    		else {
					    			pool.query(`select id_planilla,dia,mes,anio
					                from planilla_arancel P join fecha F on P.id_fecha = F.id_fecha 
					                where P.id_planilla = ?`, [results.insertId], (errors, results, fields) => {
					                	if (errors) { return res.send(errors) }
					                		else { return res.send(results) }
					                })
					    		}
					    });  
		            }
		    });
	    }
	})
});

router.delete('/planilla/:id', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('delete from planilla_arancel where id_planilla = ?', [req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			})
	    }
	})
});
// FIN PLANILLA ARANCELES

// PLANILLA CONCEPTOS
router.get('/planilla/:id/conceptos', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query(`select P.cantidad,P.monto_planilla,P.sub_total,C.codigo,C.descripcion
						from planilla_concepto P join concepto C on P.id_codigo = C.codigo
						where id_planilla = ?`,[req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			})
	    }
	})
});

router.post('/planilla/:id/conceptos', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	let sql = 'insert into planilla_concepto (id_codigo,id_planilla,cantidad,monto_planilla,sub_total) values ';

	    	for (let i = 0; i < req.body.length; i++) {
	    		sql += `(${req.body[i].codigo},${req.params.id},${req.body[i].cantidad},${req.body[i].monto},${req.body[i].subtotal})`;
	    		(i < req.body.length-1) ?sql += ',' :sql;
	    	}

			pool.query(sql, (errors, results, fields) => {
		    	if (errors) { return res.send(errors) }
		    		else { return res.send(results) }
		    });
	    }
	})
});

router.delete('/planilla/conceptos/:id', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('delete from planilla_concepto where id_planilla_concepto = ?', [req.params.id], (errors, results, fields) => {
			 	if (errors) { return res.send(errors) }
					else { return res.send(results) }
			})
	    }
	})
});
// FIN PLANILLA CONCEPTOS

// PLANILLA REFERENCIA
router.get('/planilla/:id/referencia', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query(`select P.valor_referencia,P.monto,P.fecha,B.nombre_banco
						from planilla_referencia P join banco B on P.id_banco = B.id_banco
						where id_planilla = ?`,[req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			})
	    }
	})
});

router.post('/planilla/:id/referencia', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	let sql = 'insert into planilla_referencia (valor_referencia,monto,fecha,id_banco,id_planilla) values ';

	    	for (let i = 0; i < req.body.length; i++) {
	    		sql += `("${req.body[i].referencia}",${req.body[i].monto},"${req.body[i].fecha}",${req.body[i].id},${req.params.id})`;
	    		(i < req.body.length-1) ?sql += ',' :sql;
	    	}

			pool.query(sql, (errors, results, fields) => {
		    	if (errors) { return res.send(errors) }
		    		else { return res.send(results) }
		    });
	    }
	})
});

router.delete('/planilla/referencia/:id', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('delete from planilla_referencia where id_referencia = ?', [req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			})
	    }
	})
});
// FIN PLANILLA REFERNCIA

// BANCO
router.get('/bancos', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
		    pool.query('select * from banco', (errors, results, fields) => {
		    	if (errors) { return res.send(errors) }
		    		else { return res.send(results) }
		    });
	    }
	})
});

router.post('/bancos', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('insert into banco set ?', [req.body], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send('!Datos guardados exitosamente¡') }
			});
	    }
	})
});

router.put('/bancos/:codigo', isLoggedIn, (req,res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('update banco set ? where id_banco = ?', [req.body, req.params.codigo], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send('!Datos actualizados exitosamente¡') }
			});
	    }
	})
});

router.delete('/bancos/:codigo', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('delete from banco where id_banco = ?', [req.params.codigo], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send('!Datos eliminados exitosamente¡') }
			});
	    }
	})
});
// FIN BANCO

// REPORTES
router.put('/reporte/aranceles', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query(`select E.primer_nombre,E.primer_apellido,E.cedula,A.id_planilla,R.fecha,
						R.valor_referencia,R.monto,B.nombre_banco,A.concepto_principal 
						from planilla_referencia R join banco B on R.id_banco=B.id_banco 
						join planilla_arancel A on R.id_planilla = A.id_planilla 
						join estudiante E on A.id_estudiante = E.cedula
						join fecha F on A.id_fecha = F.id_fecha
						where A.id_periodo=? and E.id_carrera=? and F.mes=?`,[req.body.id_periodo,req.body.id_carrera,req.body.id_mes], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
				else { return res.send(results) }
			})
	    }
	})
});
// FIN REPORTES

// ESTUDIANTES
router.get('/estudiante/arancel/:cedula', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
		    pool.query(`select cedula,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,nombre_carrera,nombre_postgrado
		                from estudiante E join carrera C on E.id_carrera = C.id_carrera join postgrado P on C.id_postgrado = P.id_postgrado 
		                where E.cedula = ?`, [req.params.cedula], (errors, results, fields) => {
		        return (errors) ?res.send(errors) :res.send(results);
		    })
	    }
	})
}) 
// FIN ESTUDIANTES

// PERIODO, POSTGRADO, CARRERA
router.get('/meses/:id', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_analista', (err, data) => {
		if (err) {
			res.sendStatus(403)
		} else {
			pool.query(`select M.id_mes, M.nombre_mes 
						from periodo_mes P join mes M on P.id_mes=M.id_mes 
						where P.id_periodo = ?`, [req.params.id], (errors, results, fields) => {
							return (errors) ?res.send(errors) :res.send(results);
						})
		}
	})
})
// FIN PERIODO, POSTGRADO, CARRERA
module.exports = router;