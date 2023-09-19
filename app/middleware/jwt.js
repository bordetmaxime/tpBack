/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { ApiError } = require('../helpers/errorHandler');

const secret = process.env.JWT_SECRET || 'passphrase';

module.exports = {

    createToken(userData) {
        const options = {};
        options.expiresIn = process.env.JWT_EXPIRES;
        const user = {
            id: userData.member_id,
            lastname: userData.member_lastname,
            firstname: userData.member_firstname,
            email: userData.member_email,
        };

        return {
            token: jwt.sign(user, secret, options),
            expiresIn: options.expiresIn,
        };
    },

    ckeckToken(req, res, next) {
        const authHeader = req.headers.authorization;
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
