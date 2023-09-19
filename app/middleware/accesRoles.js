const familyDatamapper = require('../models/family');

const { ApiError } = require('../helpers/errorHandler');

module.exports = {
    /* voir pour résalier middleware de controle de route */
    
    ckeckToken(req, res, next) {
        const authHeader = req.headers.roles;
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, secret, (err, user) => {
                if (err) {
                    throw new ApiError(err.message);
                }
                req.user = user;
                next();
            });
        } else {
            throw new ApiError('Missing token');
        }
    },

};
