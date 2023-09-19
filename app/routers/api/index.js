const express = require('express');

const userRouter = require('./user');

const roleRouter = require('./role');

const memberRouter = require('./member');

const todolistRouter = require('./todolist');

const itemRouter = require('./item');

const familyRouter = require('./family');

const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use('/role', roleRouter);

router.use('/user', userRouter);

router.use('/member', memberRouter);

router.use('/todolist', todolistRouter);

router.use('/item', itemRouter);

router.use('/family', familyRouter);

router.all('/', apiController.home);

router.use(() => {
    throw new ApiError('API route not found', { statusCode: 404 });
});

module.exports = router;
