const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM member');
        return result.rows;
    },

    async findOneEmail(email) {
        const result = await client.query('SELECT * FROM member WHERE member_email = $1', [email]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
        
    },

    async findOnelastname(lastname) {
        const result = await client.query('SELECT * FROM member WHERE member_lastname = $1', [lastname]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async findByPk(memberId) {
        const result = await client.query('SELECT * FROM member WHERE id = $1', [memberId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async create(member) {
        const savedMember = await client.query(
            `
                INSERT INTO member
                (member_lastname, member_firstname, member_email, member_password, member_username) VALUES
                ($1, $2, $3, $4, $5) RETURNING *
            `,
            [member.lastname, member.firstname,
                member.email,
                member.password, member.username],
        );

        return savedMember.rows[0];
    },

};
