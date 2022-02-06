const jwt = require('jsonwebtoken');
const jwtsecret = process.env.SECRET_JWT || 'secretJWT';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['token'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, jwtsecret, (err, user) => {
            if (err) {
                return res.status(403).send({ error: 'Forbidden' });
            }
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).send({ error: 'Unauthorized' });
    }
};

const verifyandAuthorize = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isSeller) {
            next();
        } else {
            return res.status(401).send({ error: 'Unauthorized' });
        }
    });
};

const verifyandAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(401).send({ error: 'Unauthorized' });
        }
    });
};

const verifyandSeller = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isSeller) {
            next();
        } else {
            return res.status(401).send({ error: 'Unauthorized' });
        }
    });
};

module.exports = {
    verifyToken,
    verifyandAuthorize,
    verifyandAdmin,
    verifyandSeller
};