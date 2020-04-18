create database unesr;

use unesr;

CREATE TABLE periodo (
    id_periodo INT NOT NULL auto_increment PRIMARY KEY,
    nombre_periodo VARCHAR(50) NOT NULL
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

CREATE TABLE estudiante (
    cedula INT(8) NOT NULL UNIQUE,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    id_carrera INT,
    PRIMARY KEY (cedula),
    constraint fk_estudiante_carrera foreign KEY (id_carrera) references carrera(id_carrera)
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

CREATE TABLE fecha (
    id_fecha INT NOT NULL PRIMARY KEY auto_increment,
    hora VARCHAR(11) NOT NULL,
    dia INT(2) NOT NULL,
    mes INT(2) NOT NULL,
    anio INT(4) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT(8) NOT NULL UNIQUE,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    cargo VARCHAR(250) NOT NULL,
    id_pregunta INT,
    PRIMARY KEY (id_usuario),
    constraint fk_usuario_pregunta foreign KEY (id_pregunta) references pregunta(id_pregunta)
);

CREATE TABLE sesion (
    id_sesion INT NOT NULL PRIMARY KEY auto_increment,
    id_usuario INT(8),
    bloqueado boolean,
    intentos INT(1),
    password VARCHAR(250) NOT NULL,
    constraint fk_sesion_usuario foreign KEY (id_usuario) references usuario(id_usuario)
);

CREATE TABLE tipo_acceso_usuario (
    id_usuario INT(8),
    id_acceso INT,
    constraint fk_usuario_acceso foreign KEY (id_usuario) references usuario(id_usuario),
    constraint fk_acceso_usuario foreign KEY (id_acceso) references tipo_acceso(id_acceso)
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
    id_periodo INT,
    constraint fk_planilla_fecha foreign KEY (id_fecha) references fecha(id_fecha),
    constraint fk_planilla_periodo foreign KEY (id_periodo) references periodo(id_periodo),
    constraint fk_planilla_estudiante foreign KEY (id_estudiante) references estudiante(cedula)
);

CREATE TABLE planilla_concepto (
    id_planilla_concepto INT NOT NULL auto_increment PRIMARY KEY,
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
    id_referencia INT auto_increment NOT NULL PRIMARY KEY,
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

insert into periodo (id_periodo, nombre_periodo) values
    (1, "2019-I"),
    (2, "2019-II"),
    (3, "2020-I");

insert into postgrado (id_postgrado, nombre_postgrado) values 
    (1, "Especialización"),
    (2, "Maestría"),
    (3, "Doctorado");

insert into carrera (id_carrera, nombre_carrera, id_postgrado) values 
    (1, "Gerencia estratégica", 2),
    (2, "Ciencias de la educación", 2),
    (3, "Ciecncias de la educación", 3),
    (4, "Ciencias administrativa", 3);

insert into estudiante (cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, id_carrera) values 
    (25332322, "Albert", "Gustavo", "Diaz", "Gonzalez", 2),
    (27513828, "Daniela", "Carolina", "Codecido", "Martinez", 4),
    (10989690, "Francis", "Yamilet", "Gonzalez", "Espinola", 3);

insert into tipo_acceso (id_acceso, nombre_acceso) values 
    (1, "Analista"),
    (2, "Control estudio");

insert into pregunta (id_pregunta, pregunta, respuesta) values 
    (1, "¿Número de cedula?", "25332322");

insert into usuario (id_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, cargo, id_pregunta) values 
    (25332322, "Gustavo", "Albert", "Gonzalez", "Diaz", "Analista administrativo", 1);

insert into tipo_acceso_usuario (id_usuario, id_acceso) values 
    (25332322, 1);