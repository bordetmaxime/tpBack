const client = require('../config/db');

module.exports = {

    async findAll() {
        const result = await client.query('SELECT * FROM "member_data"');
        return result.rows;
    },
    async findByPk(memberDataId) {
        const result = await client.query('SELECT * FROM "member_data" WHERE member_data_member_id = $1', [memberDataId]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },
    async findOneBirthDay(dateBirth) {
        const result = await client.query('SELECT * FROM "member_data" WHERE member_data_date_birth = $1', [dateBirth]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.row[0];
    },
    async creatOfBirth(addDateBirth) {
        const result = await client.query(
            'INSERT INTO "member_data" (member_data_date_birth, member_data_member_id ) VALUES ($1, $2) RETURNING *',
            [addDateBirth.dateBirth, addDateBirth.memberId],
        );
        return result.rows[0];
    },

    async create(memberdata) {
        const savedMember = await client.query(
            `
              INSERT INTO member_data
              (member_data_date_birth, member_data_size, member_data_top_size, member_data_bottom_size,
               member_data_shoes_size, member_data_school, member_data_hobbies, member_data_member_id ) VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
          `,
            [memberdata.datebirth, memberdata.size, memberdata.topsize, memberdata.bottomsize,
                memberdata.shoesize, memberdata.school, memberdata.hobbies, memberdata.memberId],
        );

        return savedMember.rows[0];
    },

    async update(update) {
        const updateMemberData = await client.query(
            `
            UPDATE member_data
            SET member_data_date_birth = $1,
             member_data_size = $2,
             member_data_top_size = $3,
             member_data_bottom_size = $4,
             member_data_shoes_size = $5,
             member_data_school = $6,
             member_data_hobbies = $7
            WHERE member_data_member_id = $8 RETURNING *

            `,
            [update.datebirth, update.size, update.topsize, update.bottomsize,
                update.shoesize, update.school, update.hobbies, update.id],
        );
        return updateMemberData.rows[0];
    },

};
