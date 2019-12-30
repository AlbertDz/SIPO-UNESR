const pool = require('../database');

module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        };
        return res.redirect('/login');
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        };
        return res.redirect('/profile');
    },
    admin(req, res, next) {
        if (req.user.admin) {
            return next();
        };
        return res.redirect('/profile');
    },
    analistaAdmin(req, res, next) {
        if (req.user.analista_admin) {
            return next();
        };
        return res.redirect('/profile');
    },
    controlEst(req, res, next) {
        if (req.user.analista_control_est) {
            return next();
        };
        return res.redirect('/profile');
    },
    async userYes(req, res, next) {
        const usuarios = await pool.query('select admin from tipo_acceso');
        if (usuarios.length <= 0 || usuarios[0].admin === null) {
            console.log('Estamos aqui')
            return res.redirect('/login/user');
        } else {
            return next();
        }
    },
    async userNone(req, res, next) {
        const usuarios = await pool.query('select admin from tipo_acceso');
        if (usuarios.length <= 0 || usuarios[0].admin === null) {
            return next();
        } else {
            return res.redirect('/login');
        }
    }
};