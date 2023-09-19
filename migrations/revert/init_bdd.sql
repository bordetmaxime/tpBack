-- Revert family_deck:init_bdd from pg

BEGIN; -- début de la transaction


DROP TABLE IF EXISTS "family_has_member_has_role";
DROP TABLE IF EXISTS "family_has_todolist";

DROP TABLE IF EXISTS "family", "member", "member_data", "role", "todolist", "item";


COMMIT; -- fin de la transaction

