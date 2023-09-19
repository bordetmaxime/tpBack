const client = require('../config/db');
const letter = require('../middleware/MajLetter');

module.exports = {
    /**
     * Récupère tout les membre sans filtre ni ordre
     * @returns - tous les posts dans la base de donnée
     */

    async findAll() {
        const result = await client.query('SELECT * FROM "member"');
        return result.rows;
    },
    /**
     * Récupère les membres par son id
     * @param {number} memberId - l'id du membre souhaité
     * @returns Le membre souhaité ou undefined si aucun membre avec cet id
     */

    async findByPk(memberId) {
        const result = await client.query(`SELECT member.member_id,
            member.member_lastname,
            member.member_firstname,
            member.member_email,
            member.member_username,
            member_data.member_data_id AS data_id,
            member_data.member_data_date_birth AS birth,
            member_data.member_data_size AS size,
            member_data.member_data_top_size AS top_size,
            member_data.member_data_bottom_size AS bottom_size,
            member_data.member_data_shoes_size AS shoes_size,
            member_data.member_data_school AS school,
            member_data.member_data_hobbies AS hobbies
            FROM member JOIN member_data ON member.member_id = member_data.member_data_member_id WHERE member.member_id = $1`, [memberId]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },
    /**
     * Création du membre
     * @param {number} memberId - l'id du membre souhaité
     * @returns Le membre souhaité ou undefined si aucun membre avec cet id
     */
    async create(member) {
        const firstname = letter.MajFirstLetter(member.firstname);
        const username = letter.minFirstLetter(member.username);
        const savedMember = await client.query(
            `
                INSERT INTO member
                (member_firstname, member_username, member_password) VALUES
                ($1, $2, $3) RETURNING *
            `,
            [firstname, username, member.password],
        );

        return savedMember.rows[0];
    },
    async isUnique(userName) {
        const userNameMember = letter.minFirstLetter(userName);
        const isUnique = await client.query(
            `
            SELECT * FROM "member" WHERE member.member_username= $1
            `,
            [userNameMember],
        );
        return isUnique.rows[0];
    },
    /**
     * Ajoute un membre dans la base de données
     * @param {InputPost} post - les données à insèrer
     * @returns le membre inséré
     */

    async insert(member) {
        const savedMember = await client.query(
            'SELECT * FROM insert_member($1)',
            [member],
        );
        return savedMember.rows[0];
    },

    /**
     * Modifie un membre dans la base de données
     * @param {number} id - L'id à modifier
     * @param {InputPost} member - Le membre modifié
     * @returns L'id et/ou le membre modifié
     */

    async update(update) {
        const firstname = letter.MajFirstLetter(update.firstname);
        const email = letter.minFirstLetter(update.email);
        const updateMember = await client.query(
            `
            UPDATE member
             SET member_firstname = $1,
             member_email = $2
             WHERE member_id = $3 RETURNING *
            `,
            [firstname, email, update.id],
        );
        return updateMember.rows[0];
    },
    /**
     * Supprime de la base de donnée un membre
     * @param {number} id - l'id du membre supprimé
     * @param {string} le membre supprimé
     * @returns le résultat de la suppression
     */

    async delete(memberId) {
        const deleteMember = await client.query('DELETE FROM member WHERE member_id = $1 RETURNING *', [memberId]);
        return deleteMember.rows;
    },


};
