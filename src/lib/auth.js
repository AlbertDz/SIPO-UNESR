module.exports = {
    isLoggedIn(req, res, next) {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader !== 'undefined') {
            req.token = bearerHeader;
            next();
        } else {
            res.sendStatus(403)
        }
    },
    isNotLoggedIn(req, res, next) {
        const bearerHeader = req.headers['Authorization'];

        if (typeof bearerHeader !== 'undefined') {
            res.sendStatus(403)
        } else {
            next();
        }
    },
};