-- Deploy family_deck:viewsFamily to pg

BEGIN;

CREATE VIEW  family_with_member_and_roles AS
SELECT family.*, member.*
FROM family_has_member_has_role
JOIN family
    ON "family_has_member_has_role"."family_has_member_has_role_family_id" = "family"."family_id"
JOIN member
	ON "family_has_member_has_role"."family_has_member_has_role_member_id" = "member"."member_id"
JOIN role
	ON "family_has_member_has_role"."family_has_member_has_role_role_id" = "role"."role_id"
;

COMMIT;
