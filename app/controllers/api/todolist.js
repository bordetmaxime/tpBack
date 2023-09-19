/* eslint-disable max-len */
const todolistDatamapper = require('../../models/todolist');
const itemDatamapper = require('../../models/item');

const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const todolists = await todolistDatamapper.findAll();
        return res.json(todolists);
    },
    async readOne(req, res) {
        const todolist = await todolistDatamapper.findByPk(req.params.id);
        if (!todolist) {
            throw new ApiError('todolis not found', { statusCode: 404 });
        }
        return res.json(todolist);
    },

    async readAllItem(req, res) {
        const todolistAndItems = await todolistDatamapper.findByPkAllItems(req.params.id);
        if (!todolistAndItems) {
            throw new ApiError('todolis not found', { statusCode: 404 });
        }
        const result = {
            todolistAndItems,
        };
        return res.json(result);
    },

    async allTodolistOfFamily(req, res) {
        const todolists = await todolistDatamapper.findByFamily(req.params.id);
        if (!todolists) {
            throw new ApiError('todolis not found', { statusCode: 404 });
        }
        return res.json(todolists);
    },
    async create(req, res) {
        const {
            title,
            color,
            memberId,
            familyId,
        } = req.body;
        if (!title) {
            res.status(401).json({ msg: 'le champs titre est requis !' });
            return;
        }
        const titleTodolist = await todolistDatamapper.findOneTilteOfFamily(familyId, title);
        if (titleTodolist) {
            res.status(401).json({ msg: 'titre est déjà utilisé !' });
            return;
        }
        const newTodolist = await todolistDatamapper.create({
            title,
            color,
            memberId,
        });
        await todolistDatamapper.AddTodolistOfFamily({
            familyId,
            todolistId: newTodolist.todolist_id,
        });
        res.json({
            msg: 'Todolist crée', newTodolist,
        });
    },
    async addItemOfTodolist(req, res) {
        const {
            title,
            color,
            deadline,
        } = req.body;
        const { id } = req.params;
        if (!title) {
            res.status(401).json({ msg: 'le champs titre est requis !' });
            return;
        }
        const newItemOfTodo = await itemDatamapper.create({
            title,
            color,
            deadline,
            todolistId: id,
        });
        res.json({
            msg: 'item ajouté !', newItemOfTodo,
        });
    },

    async update(req, res) {
        const {
            title,
            color,
            position,
            status,
        } = req.body;
        const { id } = req.params;
        const todolist = await todolistDatamapper.findByPk(id);
        if (!todolist) {
            throw new ApiError('todolist not found', { statusCode: 401 });
        }
        const updateTodolist = await todolistDatamapper.update({
            id,
            title,
            color,
            position,
            status,
        });
        return res.json({
            msg: 'todolist modifiée !', updateTodolist,
        });
    },
    async delete(req, res) {
        const deleteTodolist = await todolistDatamapper.delete(req.params.id);
        if (!deleteTodolist) {
            throw new ApiError('todolist not found', { statusCode: 404 });
        }
        return res.json({
            msg: 'todolist supprimée !', deleteTodolist,
        });
    },
};
