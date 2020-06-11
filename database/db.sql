create database unesr;

use unesr;

CREATE TABLE periodo (
    id_periodo VARCHAR(10) NOT NULL UNIQUE,
    PRIMARY KEY (id_periodo)
);

CREATE TABLE mes (
    id_mes INT(2) NOT NULL auto_increment PRIMARY KEY,
    nombre_mes VARCHAR(10) NOT NULL
);

CREATE TABLE periodo_mes (
    id_periodo VARCHAR(10) NOT NULL,
    id_mes INT(2) NOT NULL,
    constraint fk_periodo_mes foreign KEY (id_periodo) references periodo(id_periodo),
    constraint fk_mes_periodo foreign KEY (id_mes) references mes(id_mes)
);

CREATE TABLE postgrado (
    id_postgrado INT NOT NULL PRIMARY KEY auto_increment,
    nombre_postgrado VARCHAR(50)
);

CREATE TABLE carrera (
    id_carrera INT NOT NULL PRIMARY KEY auto_increment,
    nombre_carrera VARCHAR(250) NOT NULL,
    id_postgrado INT,
    constraint fk_postgrado_carrera foreign KEY (id_postgrado) references postgrado(id_postgrado)
);

CREATE TABLE turno (
    id_turno INT NOT NULL PRIMARY KEY auto_increment,
    nombre_turno VARCHAR(250) NOT NULL
);

CREATE TABLE semestre (
    id_semestre INT NOT NULL PRIMARY KEY auto_increment
);

CREATE TABLE materia (
    id_materia INT NOT NULL PRIMARY KEY auto_increment,
    nombre_materia VARCHAR(250) NOT NULL,
    unidad_credito INT(2) NOT NULL,
    modalidad VARCHAR(250) NOT NULL,
    id_carrera INT,
    id_semestre INT NOT NULL,
    constraint fk_materia_semestre foreign KEY (id_semestre) references semestre(id_semestre),
    constraint fk_carrera_materia foreign KEY (id_carrera) references carrera(id_carrera)
);

CREATE TABLE materia_turno (
    id_materia INT NOT NULL,
    id_turno INT NOT NULL,
    constraint fk_materia_turno foreign KEY (id_materia) references materia(id_materia),
    constraint fk_turno_materia foreign KEY (id_turno) references turno(id_turno)
);

CREATE TABLE documento (
    id_documento INT NOT NULL PRIMARY KEY auto_increment,
    nombre_documento VARCHAR(250) NOT NULL
);

CREATE TABLE nacionalidad (
    id_nacionalidad INT NOT NULL PRIMARY KEY auto_increment,
    nombre_nacionalidad VARCHAR(250) NOT NULL
);

CREATE TABLE estudiante (
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    cedula INT(8) NOT NULL UNIQUE,
    fecha_nacimiento VARCHAR(10) NOT NULL,
    id_nacionalidad INT NOT NULL,
    lugar_nacimiento VARCHAR(250) NOT NULL,
    telefono_principal INT(11) NOT NULL,
    telefono_secundario INT(11),
    telefono_local INT(11),
    correo_principal VARCHAR(250) NOT NULL,
    correo_secundario VARCHAR(250),
    estado VARCHAR(250) NOT NULL,
    municipio VARCHAR(250) NOT NULL,
    parroquia VARCHAR(250) NOT NULL,
    sector VARCHAR(250) NOT NULL,
    calle VARCHAR(250) NOT NULL,
    casa_apartamento VARCHAR(250) NOT NULL,
    id_carrera INT NOT NULL,
    cohorte VARCHAR(10) NOT NULL,
    PRIMARY KEY (cedula),
    constraint fk_estudiante_nacionalidad foreign KEY (id_nacionalidad) references nacionalidad(id_nacionalidad),
    constraint fk_estudiante_cohorte foreign KEY (cohorte) references periodo(id_periodo),
    constraint fk_estudiante_carrera foreign KEY (id_carrera) references carrera(id_carrera)
);

CREATE TABLE fecha (
    id_fecha INT NOT NULL PRIMARY KEY auto_increment,
    hora VARCHAR(11) NOT NULL,
    dia INT(2) NOT NULL,
    mes INT(2) NOT NULL,
    anio INT(4) NOT NULL
);

CREATE TABLE planilla_materias (
    id_planilla_materia INT NOT NULL PRIMARY KEY auto_increment,
    id_fecha INT NOT NULL,
    tipo VARCHAR(250) NOT NULL,
    situacion VARCHAR(250) NOT NULL,
    constraint fk_planilla_materia_fecha foreign KEY (id_fecha) references fecha(id_fecha)
);

CREATE TABLE estudiante_materia (
    id_planilla_materia INT NOT NULL,
    cedula INT(8) NOT NULL,
    id_materia INT NOT NULL,
    nota INT(3),
    aprobado boolean,
    constraint fk_estudiante_materia_planilla foreign KEY (id_planilla_materia) references planilla_materias(id_planilla_materia),
    constraint fk_estudiante_materia foreign KEY (cedula) references estudiante(cedula),
    constraint fk_materia_estudiante foreign KEY (id_materia) references materia(id_materia)
);

CREATE TABLE estudiante_documento (
    cedula INT(8) NOT NULL,
    id_documento INT NOT NULL,
    status boolean NOT NULL,
    constraint fk_estudiante_documento foreign KEY (cedula) references estudiante(cedula),
    constraint fk_documento_estudiante foreign KEY (id_documento) references documento(id_documento)
);

CREATE TABLE tipo_acceso (
    id_acceso INT auto_increment NOT NULL PRIMARY KEY,
    nombre_acceso VARCHAR(50) NOT NULL
);

CREATE TABLE pregunta (
    id_pregunta INT NOT NULL PRIMARY KEY auto_increment,
    pregunta VARCHAR(50) NOT NULL,
    respuesta VARCHAR(250) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT(8) NOT NULL UNIQUE,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    cargo VARCHAR(250) NOT NULL,
    id_pregunta INT,
    bloqueado boolean,
    intentos INT(1),
    password VARCHAR(250) NOT NULL,
    id_acceso INT(8),
    PRIMARY KEY (id_usuario),
    constraint fk_acceso_usuario foreign KEY (id_acceso) references tipo_acceso(id_acceso),
    constraint fk_usuario_pregunta foreign KEY (id_pregunta) references pregunta(id_pregunta)
);

CREATE TABLE concepto (
    codigo INT NOT NULL UNIQUE,
    descripcion VARCHAR(250) NOT NULL,
    monto INT NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE planilla_arancel (
    id_planilla INT NOT NULL PRIMARY KEY auto_increment,
    total_conceptos INT NOT NULL,
    total_banco INT NOT NULL,
    diferencia_pago INT NOT NULL,
    id_fecha INT,
    id_estudiante INT(8),
    id_periodo VARCHAR(10),
    concepto_principal VARCHAR(255),
    constraint fk_planilla_fecha foreign KEY (id_fecha) references fecha(id_fecha),
    constraint fk_planilla_estudiante foreign KEY (id_estudiante) references estudiante(cedula)
);

CREATE TABLE planilla_concepto (
    id_codigo INT,
    id_planilla INT,
    cantidad INT NOT NULL,
    monto_planilla INT NOT NULL,
    sub_total INT NOT NULL,
    constraint fk_codigo_planilla foreign KEY (id_codigo) references concepto(codigo),
    constraint fk_planilla_codigo foreign KEY (id_planilla) references planilla_arancel(id_planilla)
);

CREATE TABLE banco (
    id_banco INT NOT NULL auto_increment PRIMARY KEY,
    nombre_banco VARCHAR(250)
);

CREATE TABLE planilla_referencia (
    valor_referencia VARCHAR(250) NOT NULL,
    monto INT NOT NULL,
    fecha VARCHAR(10) NOT NULL,
    id_banco INT,
    id_planilla INT,
    constraint fk_planilla_referencia foreign KEY (id_planilla) references planilla_arancel(id_planilla),
    constraint fk_planilla_referencia_banco foreign KEY (id_banco) references banco(id_banco)
);


CREATE TABLE grupo_conceptos (
    id_grupo_conceptos INT NOT NULL auto_increment PRIMARY KEY
);

CREATE TABLE grupo_conceptos_concepto (
    codigo INT,
    id_grupo_conceptos INT,
    cantidad INT NOT NULL,
    constraint fk_grupo_concepto foreign KEY (id_grupo_conceptos) references grupo_conceptos(id_grupo_conceptos),
    constraint fk_concepto_grupo foreign KEY (codigo) references concepto(codigo)
);

insert into mes (id_mes, nombre_mes) values
    (1, "Enero"),
    (2, "Febrero"),
    (3, "Marzo"),
    (4, "Abril"),
    (5, "Mayo"),
    (6, "Junio"),
    (7, "Julio"),
    (8, "Agosto"),
    (9, "Septiembre"),
    (10, "Octubre"),
    (11, "Noviembre"),
    (12, "Diciembre");

insert into banco (id_banco, nombre_banco) values
    (1, "Banco Caroní"),
    (2, "Banco Canarias de Venezuela"),
    (3, "Banco Confederado"),
    (4, "Bolívar Banco"),
    (5, "Corp Banca"),
    (6, "Banco de Crédito de Colombia"),
    (7, "Banco Do Brasil"),
    (8, "Banco del Caribe"),
    (9, "Bancoro"),
    (10, "Banco de Venezuela"),
    (11, "Banco Sofitasa"),
    (12, "Banpro"),
    (13, "Stanford Bank"),
    (14, "Banco Provincial"),
    (15, "Banco Tequendama"),
    (16, "Banesco"),
    (17, "Banco Fondo Común"),
    (18, "Banfoandes"),
    (19, "Banco Occidental de Descuento"),
    (20, "Banco Venezolano de Crédito"),
    (21, "Central"),
    (22, "Banco Guayana"),
    (23, "Banco Exterior"),
    (24, "Banco Industrial de Venezuela"),
    (25, "Banco Mercantil"),
    (26, "Banco Plaza"),
    (27, "Citibank"),
    (28, "Total Bank"),
    (29, "Instituto Municipal de Crédito Popular"),
    (30, "Nuevo Mundo"),
    (31, "Banco Federal"),
    (32, "Casa Propia"),
    (33, "Del Sur"),
    (34, "Mi Casa"),
    (35, "Merenap");

insert into periodo (id_periodo) values
    ("2019-I"),
    ("2019-II"),
    ("2020-I");

insert into periodo_mes (id_periodo, id_mes) values
    ("2019-I", 1),
    ("2019-I", 2),
    ("2019-I", 3),
    ("2019-I", 4),
    ("2019-I", 5),
    ("2019-I", 6),
    ("2019-II", 7),
    ("2019-II", 8),
    ("2019-II", 9),
    ("2019-II", 10),
    ("2019-II", 11),
    ("2019-II", 12),
    ("2020-I", 1),
    ("2020-I", 2),
    ("2020-I", 3),
    ("2020-I", 4),
    ("2020-I", 5),
    ("2020-I", 6);

insert into postgrado (id_postgrado, nombre_postgrado) values 
    (1, "Especialización"),
    (2, "Maestría"),
    (3, "Doctorado");

insert into carrera (id_carrera, nombre_carrera, id_postgrado) values 
    (1, "Gerencia estratégica", 2),
    (2, "Ciencias de la educación", 2),
    (3, "Ciecncias de la educación", 3),
    (4, "Ciencias administrativa", 3);

insert into tipo_acceso (id_acceso, nombre_acceso) values 
    (1, "Analista administrativo"),
    (2, "Control estudio");

insert into pregunta (id_pregunta, pregunta, respuesta) values 
    (1, "¿Color #000?", "Negro"),
    (2, "¿Color #fff?", "Blanco");

insert into usuario (id_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, cargo, id_pregunta, bloqueado, intentos, password, id_acceso) values 
    (12345678, "Admin", "", "Admin", "", "Analista administrativo", 1, false, 3, "$2a$10$UUwZxHWDzjyxQXIG8g9y3.n6OY.6GPpM0BBY1jbM2faQxoMLkekw2", 1),
    (87654321, "Admin", "", "Admin", "", "Control Estudio", 2, false, 3, "$2a$10$UUwZxHWDzjyxQXIG8g9y3.n6OY.6GPpM0BBY1jbM2faQxoMLkekw2", 2);

insert into documento (id_documento, nombre_documento) values
    (1, "Carta compromiso"),
    (2, "Fondo negro de notas certificadas de pregrado"),
    (3, "Notas certificadas pregrado"),
    (4, "Fondo negro del titulo de pregrado"),
    (5, "Titulo pregrado");

insert into turno (id_turno, nombre_turno) values
    (1, "Diurno"),
    (2, "Nocturno");

insert into nacionalidad (id_nacionalidad, nombre_nacionalidad) values
    (1, "Venezolano"),
    (2, "Extranjero");

insert into semestre (id_semestre) values
    (1),(2),(3),(4),(5),(6),(7),(8),(9);