const jwt = require('jsonwebtoken');
const jwtsecret = process.env.SECRET_JWT || 'secretJWT';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['x-access-token']; // here it is requesting header 
    // authenticating the token
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // we split to access Authorization which is a string then we split it
        jwt.verify(token, jwtsecret, (err, user) => { // verifying the token with the secret
            if (err) {
                return res.status(403).send({ error: 'Forbidden' }); // if error
            }
            req.user = user;
            next(); // if no error then next
        });
    }
    else {
        return res.status(401).send({ error: 'Unauthorized' }); // if no token, sends 401
    }
};

const verifyandAuthorize = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isSeller) { // if the user is the same as the id 
            next(); 
        } else {
            return res.status(401).send({ error: 'Unauthorized' });  // if not, sends 401
        }
    });
};

const verifyAdmin = (req, res, next) => { // if user is admin
    verifyToken(req, res, () => { // verifies token
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(401).send({ error: 'Unauthorized' });
        }
    });
};

const verifyandSeller = (req, res, next) => { // if user is a seller
    verifyToken(req, res, () => { // verifies token
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
    verifyAdmin,
    verifyandSeller
};