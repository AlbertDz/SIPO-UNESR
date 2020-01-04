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
        if (req.user.control_estudio) {
            return next();
        };
        return res.redirect('/profile');
    },
    async userYes(req, res, next) {
        const usuarios = await pool.query('select admin from tipo_acceso');

        for (let i in usuarios) {
            if (usuarios[i].admin === 'on') {
                return next();
            };
        };

        return res.redirect('/login/user');
    },
    async userNone(req, res, next) {
        const usuarios = await pool.query('select admin from tipo_acceso');

        for (let i in usuarios) {
            if (usuarios[i].admin === 'on') {
                return res.redirect('/login');
            };
        };

        return next();
    }
};