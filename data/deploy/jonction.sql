BEGIN;

DROP TABLE IF EXISTS "family_has_member_has_role", "family_has_todolist";


-- table jonction family / member

-- table jonction family / member

CREATE TABLE "family_has_member_has_role" (
  "family_has_member_has_role_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "family_has_member_has_role_family_id" INTEGER NOT NULL REFERENCES "family"("family_id") ON DELETE CASCADE,
  "family_has_member_has_role_member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE,
  "family_has_member_has_role_role_id" INTEGER NOT NULL REFERENCES "role"("role_id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- table jonction family / todolist

CREATE TABLE "family_has_todolist" (
   "family_has_todolist_Id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "family_has_todolist_family_id" INTEGER NOT NULL REFERENCES "family"("family_id") ON DELETE CASCADE,
   "family_has_todolist_todolist_id" INTEGER NOT NULL REFERENCES "todolist"("todolist_id") ON DELETE CASCADE,
   "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO "family_has_member_has_role"("family_has_member_has_role_family_id", "family_has_member_has_role_member_id", "family_has_member_has_role_role_id") VALUES 
(1, 1, 1),
(1, 2, 3),
(2, 3, 2),
(2, 4, 1),
(2, 1, 1),
(2, 5, 3);


INSERT INTO "family_has_todolist"("family_has_todolist_family_id", "family_has_todolist_todolist_id") VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 5),
(1, 6);

COMMIT; -- fin de la transaction






















