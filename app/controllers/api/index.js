/* eslint-disable max-len */
const userController = require('./user');
const roleController = require('./role');
const memberController = require('./member');
const todolistController = require('./todolist');
const itemController = require('./item');
const familyController = require('./family');

const apiController = {
    home(req, res) {
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        return res.json({
            documentation_url: `${fullUrl}${process.env.API_DOCUMENTATION_ROUTE}`,
        });
    },
};

module.exports = {
    familyController, apiController, userController, roleController, memberController, todolistController, itemController,
};
