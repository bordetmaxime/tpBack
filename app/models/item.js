const client = require('../config/db');
const letter = require('../middleware/MajLetter');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM item');
        return result.rows;
    },

    async findByPk(itemId) {
        const result = await client.query('SELECT * FROM item WHERE item_id = $1', [itemId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async findItemsOfTodo(todolistId) {
        const result = await client.query('SELECT * FROM item_of_todolist WHERE todolist_id = $1', [todolistId]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows;
    },

    async create(item) {
        const title = letter.MajFirstLetter(item.title);
        const saveItem = await client.query(
            `
                INSERT INTO item
                (item_title, item_color, item_deadline, item_todolist_id) VALUES
                ($1, $2, $3, $4) RETURNING *
            `,
            [title, item.color, item.deadline, item.todolistId],
        );

        return saveItem.rows[0];
    },
    async update(update) {
        const title = letter.MajFirstLetter(update.title);
        const updateItem = await client.query(
            `
            UPDATE item
            SET item_title = $1, item_color = $2, item_deadline = $3
            WHERE item_id = $4 RETURNING *
            `,
            [title, update.color, update.deadline, update.id],
        );
        return updateItem.rows[0];
    },

    async delete(id) {
        const result = await client.query('DELETE FROM item WHERE item_id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async updateStatus(update) {
        const updateItemStatus = await client.query(
            `
            UPDATE item
            SET item_status = $1
            WHERE item_id = $2 RETURNING *
            `,
            [update.status, update.id],
        );
        return updateItemStatus.rows[0];
    },
};
