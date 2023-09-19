/* eslint-disable max-len */
/* eslint-disable no-tabs */
const client = require('../config/db');
const letter = require('../middleware/MajLetter');

module.exports = {
    
    async findOneName(name) {
        const familyName = letter.MajFirstLetter(name);
        const result = await client.query(`
        SELECT * FROM family WHERE family_name='${familyName}'
        `);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async findOneId(id) {
        const result = await client.query(`
        SELECT * FROM family WHERE family_id='${id}'
        `);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async create(family) {
        const familyName = letter.MajFirstLetter(family.familyName);
        const savedFamily = await client.query(
            `
            INSERT INTO family
            (family_name) VALUES
            ($1) RETURNING *
        `,
            [familyName],
        );
        return savedFamily.rows[0];
    },
    
    async AddMemberOfFamily(AddMembreOfFamily) {
        const memberOfFamily = await client.query(
            `
                INSERT INTO family_has_member_has_role
                (family_has_member_has_role_family_id,
                family_has_member_has_role_member_id,
                family_has_member_has_role_role_id
                 ) VALUES
                ($1, $2, $3) RETURNING *
            `,
            [AddMembreOfFamily.familyId,
                AddMembreOfFamily.memberId,
                AddMembreOfFamily.roleId,
            ],
        );

        return memberOfFamily.rows[0];
    },

    async allMembersByFamily(familyId) {
        const result = await client.query(`
    SELECT 
        member.member_id,
        member.member_lastname,
        member.member_firstname,
        member.member_email,
        member.member_username,
        role.role_id AS roleId,
        role.role_label AS label,
        role.role_icon AS icon,
        member_data.member_data_id AS data_id,
        member_data.member_data_date_birth AS birth,
        member_data.member_data_size AS size,
        member_data.member_data_top_size AS top_size,
        member_data.member_data_bottom_size AS bottom_size,
        member_data.member_data_shoes_size AS shoes_size,
        member_data.member_data_school AS school,
        member_data.member_data_hobbies AS hobbies
    FROM family_has_member_has_role
    JOIN family
        ON "family_has_member_has_role"."family_has_member_has_role_family_id" = "family"."family_id"
    JOIN member
        ON "family_has_member_has_role"."family_has_member_has_role_member_id" = "member"."member_id"
    JOIN role
        ON "family_has_member_has_role"."family_has_member_has_role_role_id" = "role"."role_id"
    JOIN member_data
        ON "member"."member_id" = "member_data"."member_data_member_id"
         WHERE family_id='${familyId}'
        `);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows;
    },

    async membersByFamily(colonne, data) {
        const result = await client.query(`
        SELECT family.*, member.*, role.* AS family
        FROM family_has_member_has_role
        JOIN family
            ON "family_has_member_has_role"."family_has_member_has_role_family_id" = "family"."family_id"
        JOIN member
            ON "family_has_member_has_role"."family_has_member_has_role_member_id" = "member"."member_id"
        JOIN role
            ON "family_has_member_has_role"."family_has_member_has_role_role_id" = "role"."role_id"
        WHERE ${colonne}='${data}'
        `);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async dataMemberByFamily(memberFamily) {
        const result = await client.query(
            `
         SELECT
             member.member_id,
             member.member_lastname,
             member.member_firstname,
             member.member_email,
             member.member_username,
             role.role_id AS roleId,
             role.role_label AS label,
             role.role_icon AS icon,
             member_data.member_data_id AS data_id,
             member_data.member_data_date_birth AS birth,
             member_data.member_data_size AS size,
             member_data.member_data_top_size AS top_size,
             member_data.member_data_bottom_size AS bottom_size,
             member_data.member_data_shoes_size AS shoes_size,
             member_data.member_data_school AS school,
             member_data.member_data_hobbies AS hobbies
         FROM family_has_member_has_role
         JOIN family
             ON "family_has_member_has_role"."family_has_member_has_role_family_id" = "family"."family_id"
         JOIN member
             ON "family_has_member_has_role"."family_has_member_has_role_member_id" = "member"."member_id"
         JOIN role
             ON "family_has_member_has_role"."family_has_member_has_role_role_id" = "role"."role_id"
         JOIN member_data
             ON "member"."member_id" = "member_data"."member_data_member_id"
          WHERE family_id=$1 AND member_id=$2
        `,
            [memberFamily.familyId, memberFamily.memberId],
        );
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },
    async update(update) {
        const familyName = letter.MajFirstLetter(update.name);
        const updateFamily = await client.query(
            `
            UPDATE family
            SET family_name = $1, family_description = $2
            WHERE family_id = $3 RETURNING *
            `,
            [familyName,
                update.description, update.familyId],
        );
        return updateFamily.rows[0];
    },
    async deleteMemberByfamily(deletMember) {
        const deleteMember = await client.query(
            `
            DELETE FROM family_has_member_has_role
            WHERE family_has_member_has_role_id =( 
                SELECT family_has_member_has_role_id FROM family_has_member_has_role 
                WHERE family_has_member_has_role_family_id = $1
                AND family_has_member_has_role_member_id = $2
            ) RETURNING *
            `,
            [deletMember.familyId, deletMember.memberId],
        );
        return deleteMember.rows[0];
    },
    async verifyMember() {
        const result = await client.query('SELECT * FROM member');
        return result.rows;
    },
};
