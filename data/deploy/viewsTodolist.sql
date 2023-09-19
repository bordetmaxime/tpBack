BEGIN;

CREATE VIEW  todolist_of_family AS
SELECT family.family_id,
        todolist.*
FROM family_has_todolist
JOIN todolist
	ON todolist.todolist_id = family_has_todolist.family_has_todolist_todolist_id	
JOIN family
    ON family_has_todolist.family_has_todolist_family_id = family.family_id
;

CREATE VIEW  item_of_todolist AS
SELECT item.*
FROM item
JOIN todolist
	ON item.item_todolist_id = todolist.todolist_id
;

CREATE VIEW  item_todo_of_family AS
SELECT family.*, todolist.*, item.*
FROM item
JOIN todolist
	ON item.item_todolist_id = todolist.todolist_id
JOIN family_has_todolist
	ON todolist.todolist_id = family_has_todolist.family_has_todolist_todolist_id
JOIN family
    ON family_has_todolist.family_has_todolist_family_id = family.family_id	
;
COMMIT; -- fin de la transaction