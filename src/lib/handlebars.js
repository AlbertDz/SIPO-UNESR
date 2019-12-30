const helpers = {};

const semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let date;

helpers.fecha = () => {
    const actualizarFecha = () => {
        let fecha = new Date(),
            horas = fecha.getHours(),
            ampm = '',
            minutos = fecha.getMinutes(),
            segundos = fecha.getSeconds(),
            diaSemana = fecha.getDay(),
            dia = fecha.getDate(),
            mes = fecha.getMonth(),
            year = fecha.getFullYear();

        if (horas >= 12) {
            horas -= 12;
            ampm = 'PM';
        } else {
            ampm = 'AM';
        };

        if (horas === 0) {
            horas = 12;
        }

        (horas < 10) ? horas = '0' + horas : horas;
        (minutos < 10) ? minutos = '0' + minutos : minutos;
        (segundos < 10) ? segundos = '0' + segundos : segundos;

        date = `Los Teques ${semana[diaSemana]} ${dia} de ${meses[mes]} del ${year} ${horas}:${minutos}:${segundos} ${ampm}`; 
    };
    
    actualizarFecha();

    return date;
};

module.exports = helpers;