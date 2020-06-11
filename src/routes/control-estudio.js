const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { generarFecha } = require('../lib/funciones');
var jwt = require('jsonwebtoken')

// ESTUDIANTE
router.get('/estudiante/:id', isLoggedIn, (req, res) => {
    jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
		    pool.query(`select E.primer_nombre,E.segundo_nombre,E.primer_apellido,E.segundo_apellido,E.cedula,E.cohorte,
		    			C.nombre_carrera,C.id_carrera,P.nombre_postgrado from estudiante E join carrera C on E.id_carrera=C.id_carrera 
		    			join postgrado P on C.id_postgrado=P.id_postgrado
		    			where cedula = ?`, [req.params.id], (errors, results, fields) => {
		        return (errors) ?res.send(errors) :res.send(results);
		    })
	    }
	})
});

router.post('/estudiante', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
		if (err) { res.sendStatus(403) }
			else {
				pool.query('insert into estudiante set ?', [req.body], (errors, results, fields) => {
					if (errors) { return res.send(errors) }
						else { return res.send(results) }
				})
			}
	})
})

router.post('/estudiante/documentos', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	let sql = 'insert into estudiante_documento (cedula,id_documento,status) values ';

	    	for (let i = 0; i < req.body.length; i++) {
	    		sql += `(${req.body[i].cedula},${req.body[i].id_documento},${req.body[i].status})`;
	    		(i < req.body.length-1) ?sql += ',' :sql;
	    	}

			pool.query(sql, (errors, results, fields) => {
		    	if (errors) { return res.send(errors) }
		    		else { return res.send(results) }
		    });
	    }
	})
});
// FIN ESTUDIANTE

// NACIONALIDAD
router.get('/nacionalidad', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) { res.sendStatus(403) }
	    else {
			pool.query('select * from nacionalidad', (errors, results, fields) => {
		        return (errors) ?res.send(errors) :res.send(results);
		    })
	    }
	})
})
// FIN NACIONALIDDA

// DOCUMENTOS
router.get('/documentos', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) { res.sendStatus(403) }
	    else {
			pool.query('select * from documento', (errors, results, fields) => {
		        return (errors) ?res.send(errors) :res.send(results);
		    })
	    }
	})
})

router.get('/documentos/:cedula', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) { res.sendStatus(403) }
	    else {
			pool.query(`select D.id_documento,D.nombre_documento 
						from estudiante_documento E join documento D on E.id_documento=D.id_documento 
						where cedula = ? and status = 0`, [req.params.cedula], (errors, results, fields) => {
		        return (errors) ?res.send(errors) :res.send(results);
		    })
	    }
	})
})

router.put('/documentos/:cedula', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query('update estudiante_documento set status = ? where id_documento = ?', [true, req.body.id_documento], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else {
						pool.query(`select D.id_documento,D.nombre_documento 
									from estudiante_documento E join documento D on E.id_documento=D.id_documento 
									where cedula = ? and status = 0`, [req.params.cedula], (errors, results, fields) => {
					        return (errors) ?res.send(errors) :res.send(results);
					    })
					}
			});
	    }
	})
});
// FIN DOCUMENTOS

// POSTGRADOS, CARRERAS, MATERIAS
router.get('/postgrados/:id', isLoggedIn, (req, res) => {
    jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query('select * from postgrado where id_postgrado = ?', [req.params.id], (errors, results, fields) => {
		        if (errors) { return res.send(errors) }
		            else { return res.send(results) }
		    });
	    }
	})
});

router.post('/postgrados', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query('insert into postgrado set ?', [req.body], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { console.log(results); return res.send(results) }
			});
	    }
	})
});

router.put('/postgrados/:id', isLoggedIn, (req,res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('update postgrado set ? where id_postgrado = ?', [req.body, req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.delete('/postgrados/:id', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('delete from postgrado where id_postgrado = ?', [req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.get('/carrera/:id', isLoggedIn, (req, res) => {
    jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query('select * from carrera where id_carrera = ?', [req.params.id], (errors, results, fields) => {
		        if (errors) { return res.send(errors) }
		            else { return res.send(results) }
		    });
	    }
	})
});

router.post('/carreras', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query('insert into carrera set ?', [req.body], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { console.log(results); return res.send(results) }
			});
	    }
	})
});

router.put('/carreras/:id', isLoggedIn, (req,res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('update carrera set ? where id_carrera = ?', [req.body, req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.delete('/carreras/:id', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('delete from carrera where id_carrera = ?', [req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.get('/materias', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) { res.sendStatus(403) }
	    else {
			pool.query('select * from materia', (errors, results, fields) => {
		        return (errors) ?res.send(errors) :res.send(results);
		    })
	    }
	})
})

router.get('/materia/:id', isLoggedIn, (req, res) => {
    jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query('select * from materia where id_materia = ?', [req.params.id], (errors, results, fields) => {
		        if (errors) { return res.send(errors) }
		            else { return res.send(results) }
		    });
	    }
	})
});

router.post('/materias', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query('insert into materia set ?', [req.body], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.put('/materias/:id', isLoggedIn, (req,res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('update materia set ? where id_materia = ?', [req.body, req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.delete('/materias/:id', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
			pool.query('delete from materia where id_materia = ?', [req.params.id], (errors, results, fields) => {
				if (errors) { return res.send(errors) }
					else { return res.send(results) }
			});
	    }
	})
});

router.get('/carrera/:idCarrera/materias/semestre/:idSemestre', isLoggedIn, (req, res) => {
    jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query('select * from materia where id_semestre = ? and id_carrera = ?', [req.params.idSemestre, req.params.idCarrera], (errors, results, fields) => {
		        if (errors) { return res.send(errors) }
		            else { return res.send(results) }
		    });
	    }
	})
});
// FIN POSTGRADOS, CARRERAS, MATERIAS

// ARANCELES
router.get('/arancel/:id', isLoggedIn, (req, res) => {
    jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	pool.query(`select C.descripcion,C.monto,PA.total_conceptos,PA.total_banco,
	    				F.dia,F.mes,F.anio from planilla_arancel PA join 
	    				planilla_concepto PC on PC.id_planilla=PA.id_planilla join 
	    				concepto C on PC.id_codigo=C.codigo join 
	    				fecha F on PA.id_fecha=F.id_fecha where PA.id_planilla = ?`, [req.params.id], (errors, results, fields) => {
		        if (errors) { return res.send(errors) }
		            else { return res.send(results) }
		    });
	    }
	})
});
// FIN ARANCELES

// MATERIAS INSCRITAS
router.post('/inscripcion/planilla', isLoggedIn, (req, res) => {
	jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	const fecha = generarFecha();

		    pool.query('insert into fecha set ?', [fecha], (errors, results, fields) => {
		        if (errors) { return res.send(errors) }
		            else {
		            	const planilla = {
					    	id_planilla_materia: 0,
					        id_fecha: results.insertId,
					        tipo: req.body.tipo,
					        situacion: req.body.situacion
					    }

						pool.query('insert into planilla_materias set ?', [planilla], (errors, results, fields) => {
					    	if (errors) { return res.send(errors) }
					    		else {
					    			pool.query(`select P.id_planilla_materia,P.tipo,P.situacion,F.dia,F.mes,F.anio
					                from planilla_materias P join fecha F on P.id_fecha = F.id_fecha 
					                where P.id_planilla_materia = ?`, [results.insertId], (errors, results, fields) => {
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

router.post('/inscripcion/materias', isLoggedIn, (req, res) => {
    jwt.verify(req.token, 'key_control_estudio', (err, data) => {
	    if (err) {
	        res.sendStatus(403)
	    } else {
	    	let sql = 'insert into estudiante_materia (id_planilla_materia,cedula,id_materia,nota,aprobado) values ';

	    	for (let i = 0; i < req.body.length; i++) {
	    		sql += `(${req.body[i].id_planilla_materia},${req.body[i].cedula},${req.body[i].id_materia},${null},${null})`;
	    		(i < req.body.length-1) ?sql += ',' :sql;
	    	}

			pool.query(sql, (errors, results, fields) => {
		    	if (errors) { return res.send(errors) }
		    		else { return res.send(results) }
		    });
	    }
	})
});
// FIN MATERIAS INSCRITAS

module.exports = router;