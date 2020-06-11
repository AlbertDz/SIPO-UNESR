const pool = require('../database');

const FUNCIONES = {};

FUNCIONES.generarFecha = (req, res) => {
	let fecha = [];
	let date = new Date(),
		hora = date.getHours(),
        ampm = '',
        minutos = date.getMinutes(),
        segundos = date.getSeconds(),
        dia = date.getDate(),
        mes = date.getMonth(),
        year = date.getFullYear();

     if (hora >= 12) {
            hora -= 12;
            ampm = 'PM';
    } else { ampm = 'AM' };

    (hora === 0) ? hora = 12: hora;
    (hora < 10) ? hora = '0' + hora: hora;
    (minutos < 10) ? minutos = '0' + minutos: minutos;
    (segundos < 10) ? segundos = '0' + segundos: segundos;

    hora = hora.toString();
    minutos = minutos.toString();
    segundos = segundos.toString();

    fecha = {id_fecha: 0, hora:`${hora}:${minutos}:${segundos} ${ampm}`, dia: dia, mes: mes+1, anio: year};

    return fecha;
};

module.exports = FUNCIONES;