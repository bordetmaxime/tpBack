const client = require('../config/db');

module.exports = {
    /**
     * role models to get all roles.
     * ExpressMiddleware signature
     * @returns controller response
     */
    async findAll() {
        const result = await client.query('SELECT * FROM role');
        return result.rows;
    },

    /**
     * role models to get findByPk roles.
     * ExpressMiddleware signature
     * @param {*} roleId
     * @returns controller response all roles
     */

    async findByPk(roleId) {
        const result = await client.query('SELECT * FROM role WHERE role_id = $1', [roleId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },
    /**
     * role models to get findOneLabel roles.
     * ExpressMiddleware signature
     * @param {*} label
     * @returns controller response one label
     */

    async findOneLabel(label) {
        const result = await client.query('SELECT * FROM role WHERE role_label = $1', [label]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async create(role) {
        const savedRole = await client.query(
            `
                INSERT INTO role
                (role_label, role_icon) VALUES
                ($1, $2) RETURNING *
            `,
            [role.label, role.icon],
        );

        return savedRole.rows[0];
    },
    async update(update) {
        const updateRole = await client.query(
            `
            UPDATE role
            SET role_label = $1, role_icon = $2
            WHERE role_id = $3 RETURNING *
            `,
            [update.label, update.icon, update.id],
        );
        return updateRole.rows[0];
    },

    async delete(roleId) {
        const result = await client.query('DELETE FROM role WHERE role_id = $1 RETURNING *', [roleId]);

        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    },

    async AddRoleOfMember(RoleOfMember) {
        const newRoleOfMember = await client.query(
            `
            INSERT INTO member_has_role
                (member_has_role_member_id, member_has_role_role_id) VALUES
                ($1, $2) RETURNING *
            `,
            [RoleOfMember.memberId,
                RoleOfMember.roleId,
            ],
        );

        return newRoleOfMember.rows[0];
    },
    async udpadteRoleofMember(UroleOfMember) {
        const newUroleofMember = await client.query(
            `
            UPDATE family_has_member_has_role SET family_has_member_has_role_role_id = $1 
            WHERE family_has_member_has_role_id = (
                SELECT family_has_member_has_role_id FROM family_has_member_has_role 
                WHERE family_has_member_has_role_family_id = $2
                AND family_has_member_has_role_member_id = $3
            ) RETURNING *
            `,
            [UroleOfMember.roleId,
                UroleOfMember.familyId,
                UroleOfMember.id,
            ],
        );
        return newUroleofMember.rows[0];
    },
};
