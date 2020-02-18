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
};