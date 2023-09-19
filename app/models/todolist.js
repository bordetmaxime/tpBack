const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM todolist');
        return result.rows;
    },

    async findByPk(todolistId) {
        const result = await client.query('SELECT * FROM todolist WHERE todolist_id = $1', [todolistId]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async findOneTilteOfFamily(familyId, title) {
        const result = await client.query('SELECT * FROM todolist_of_family WHERE family_id = $1 and todolist_title = $2;', [familyId, title]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async findByPkAllItems(todolistId) {
        const result = await client.query('SELECT * FROM item_of_todolist WHERE item_todolist_id = $1', [todolistId]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows;
    },

    async findByFamily(familyId) {
        const todolists = await client.query('SELECT * FROM todolist_of_family WHERE family_id = $1', [familyId]);
        if (todolists.rowCount === 0) {
            return null;
        }
        return todolists.rows;
    },

    async create(todolist) {
        const savedTodolist = await client.query(
            `
                INSERT INTO todolist
                ("todolist_title", "todolist_color", "todolist_member_id") VALUES
                ($1, $2, $3) RETURNING *
            `,
            [todolist.title, todolist.color, todolist.memberId],
        );

        return savedTodolist.rows[0];
    },

    async update(update) {
        const updateTodolist = await client.query(
            `
            UPDATE todolist
            SET todolist_title = $1,
             todolist_color = $2
            WHERE todolist_id = $3 RETURNING *
            `,
            [update.title, update.color, update.id],
        );
        return updateTodolist.rows[0];
    },

    async updateStatus(update) {
        const updateTodolist = await client.query(
            `
            UPDATE todolist
            SET todolist_status = $1
            WHERE todolist_id = $2 RETURNING *
            `,
            [update.status, update.id],
        );
        return updateTodolist.rows[0];
    },

    async delete(todolistId) {
        const result = await client.query('DELETE FROM todolist WHERE todolist_id = $1 RETURNING *', [todolistId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async AddTodolistOfFamily(TodolistOfFamily) {
        const newTodolistOfFamily = await client.query(
            `
                INSERT INTO family_has_todolist
                (family_has_todolist_family_id, family_has_todolist_todolist_id) VALUES
                ($1, $2) RETURNING *
            `,
            [TodolistOfFamily.familyId,
                TodolistOfFamily.todolistId,
            ],
        );
        return newTodolistOfFamily.rows[0];
    },
};
