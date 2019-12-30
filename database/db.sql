create database unesr;

use unesr;

CREATE TABLE cargo (
    id_cargo INT auto_increment NOT NULL PRIMARY KEY,
    nombre_cargo VARCHAR(50) NOT NULL
);

CREATE TABLE tipo_acceso (
    id_acceso INT auto_increment NOT NULL PRIMARY KEY,
    admin CHAR(2),
    analista_admin CHAR(2),
    control_estudio CHAR(2)
);

CREATE TABLE primera_pregunta (
    id_primera_pre INT NOT NULL PRIMARY KEY auto_increment,
    pregunta1 VARCHAR(50) NOT NULL,
    respuesta1 VARCHAR(250) NOT NULL
);

CREATE TABLE segunda_pregunta (
    id_segunda_pre INT NOT NULL PRIMARY KEY auto_increment,
    pregunta2 VARCHAR(50) NOT NULL,
    respuesta2 VARCHAR(250) NOT NULL
);

CREATE TABLE telefono (
    id_telefono INT NOT NULL PRIMARY KEY auto_increment,
    numero BIGINT(11) NOT NULL
);

CREATE TABLE correo (
    id_correo INT NOT NULL PRIMARY KEY auto_increment,
    correo VARCHAR(100) NOT NULL
);

CREATE TABLE fecha (
    id_fecha INT NOT NULL PRIMARY KEY auto_increment,
    hora VARCHAR(8) NOT NULL,
    dia INT(2) NOT NULL,
    mes INT(2) NOT NULL,
    anio INT(4) NOT NULL
);

CREATE TABLE usuario (
    id_usuario INT(8) NOT NULL UNIQUE,
    primer_nom VARCHAR(50) NOT NULL,
    segundo_nom VARCHAR(50),
    primer_ape VARCHAR(50) NOT NULL,
    segundo_ape VARCHAR(50),
    id_cargo INT,
    id_primera_pre INT,
    id_segunda_pre INT,
    id_telefono INT,
    id_correo INT,
    PRIMARY KEY (id_usuario),
    constraint fk_usuario_cargo foreign KEY (id_cargo) references cargo(id_cargo),
    constraint fk_usuario_primera_pre foreign KEY (id_primera_pre) references primera_pregunta(id_primera_pre),
    constraint fk_usuario_segunda_pre foreign KEY (id_segunda_pre) references segunda_pregunta(id_segunda_pre),
    constraint fk_usuario_telefono foreign KEY (id_telefono) references telefono(id_telefono),
    constraint fk_usuario_correo foreign KEY (id_correo) references correo(id_correo)
);

CREATE TABLE login (
    id_login INT NOT NULL PRIMARY KEY auto_increment,
    id_usuario INT(8),
    bloqueado boolean,
    intentos INT(1),
    password VARCHAR(250) NOT NULL,
    constraint fk_login_usuario foreign KEY (id_usuario) references usuario(id_usuario)
);

CREATE TABLE tipo_acceso_usuario (
    id_usuario INT(8),
    id_acceso INT,
    constraint fk_usuario_acceso foreign KEY (id_usuario) references usuario(id_usuario),
    constraint fk_acceso_usuario foreign KEY (id_acceso) references tipo_acceso(id_acceso)
);

CREATE TABLE crear (
    id_crear INT NOT NULL PRIMARY KEY auto_increment,
    id_fecha INT,
    constraint fk_fecha_crear foreign KEY (id_fecha) references fecha(id_fecha)
);

CREATE TABLE crear_usuario (
    id_usuario_admin INT(8),
    id_usuario INT(8),
    id_crear INT,
    constraint fk_usuario_admin_crear foreign KEY (id_usuario_admin) references usuario(id_usuario),
    constraint fk_usuario_crear foreign KEY (id_usuario) references usuario(id_usuario),
    constraint fk_crear_usuario foreign KEY (id_crear) references crear(id_crear)
);

CREATE TABLE actualizar (
    id_actualizar INT NOT NULL PRIMARY KEY auto_increment,
    id_fecha INT,
    constraint fk_fecha_actualizar foreign KEY (id_fecha) references fecha(id_fecha)
);

CREATE TABLE actualizar_usuario (
    id_usuario_admin INT(8),
    id_usuario INT(8),
    id_actualizar INT,
    constraint fk_usuario_admin_actualizar foreign KEY (id_usuario_admin) references usuario(id_usuario),
    constraint fk_usuario_actualizar foreign KEY (id_usuario) references usuario(id_usuario),
    constraint fk_actualizar_usuario foreign KEY (id_actualizar) references actualizar(id_actualizar)
);

CREATE TABLE resetear (
    id_resetear INT NOT NULL PRIMARY KEY auto_increment,
    id_fecha INT,
    constraint fk_fecha_resetear foreign KEY (id_fecha) references fecha(id_fecha)
);

CREATE TABLE resetear_usuario (
    id_usuario_admin INT(8),
    id_usuario INT(8),
    id_resetear INT,
    constraint fk_usuario_admin_resetear foreign KEY (id_usuario_admin) references usuario(id_usuario),
    constraint fk_usuario_resetear foreign KEY (id_usuario) references usuario(id_usuario),
    constraint fk_resetear_usuario foreign KEY (id_resetear) references resetear(id_resetear)
);