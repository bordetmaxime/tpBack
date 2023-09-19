-- Revert family_deck:viewsTodolist from pg

BEGIN;

DROP VIEW todolist_of_family, item_of_todolist, item_todo_of_family;

COMMIT;
