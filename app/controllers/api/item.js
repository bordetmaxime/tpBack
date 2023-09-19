/*   je suis la   */

const itemDatamapper = require('../../models/item');
const todolistDatamapper = require('../../models/todolist');

const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const items = await itemDatamapper.findAll();
        return res.json(items);
    },
    async readOne(req, res) {
        const item = await itemDatamapper.findByPk(req.params.id);
        if (!item) {
            throw new ApiError('item not found', { statusCode: 404 });
        }
        return res.json(item);
    },
    async update(req, res) {
        const {
            title,
            color,
            deadline,
        } = req.body;
        const { id } = req.params;
        const item = await itemDatamapper.findByPk(id);
        if (!item) {
            throw new ApiError('item not found', { statusCode: 401 });
        }
        const updateItem = await itemDatamapper.update({
            id,
            title,
            color,
            deadline,
        });
        return res.json({
            msg: 'item modifié !', updateItem,
        });
    },

    async updateStatus(req, res) {
        const { status } = req.body;
        const { id } = req.params;
        const item = await itemDatamapper.findByPk(id);
        if (!item) {
            throw new ApiError('item not found', { statusCode: 401 });
        }
        const updateItem = await itemDatamapper.updateStatus({
            id,
            status,
        });
        const todolists = await todolistDatamapper.findByPkAllItems(item.item_todolist_id);
        if (!todolists) {
            throw new ApiError('todolis not found', { statusCode: 404 });
        }
        const todoStatus = todolists.filter((todo) => todo.item_status === false);
        if (todoStatus[0] === undefined) {
            await todolistDatamapper.updateStatus({
                id: item.item_todolist_id,
                status: true,
            });
        } else {
            await todolistDatamapper.updateStatus({
                id: item.item_todolist_id,
                status: false,
            });
        }

        return res.json({
            msg: 'Status item modifié !', updateItem,
        });
    },

    async delete(req, res) {
        const deleteItem = await itemDatamapper.delete(req.params.id);
        if (!deleteItem) {
            throw new ApiError('item not found', { statusCode: 404 });
        }
        return res.json({
            msg: 'item supprimé !', deleteItem,
        });
    },

};
