BEGIN;

-- table role regroupe le rôle de chaque membre
DROP TABLE IF EXISTS "family_has_member", "family_has_todolist", "member_has_role" ;
DROP TABLE IF EXISTS "role", "member_data";


CREATE TABLE "role" (
  "role_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "role_label" TEXT NOT NULL, 
  "role_icon" TEXT NOT NULL,
  "role_created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


INSERT INTO "role"("role_label", "role_icon") VALUES 
('papa', '/icone/papa.png'),
('maman', '/icone/maman.png'),
('enfant', '/icone/enfant.png'),
('conjoint', '/icone/conjoint.png'),
('conjointe', '/icone/conjointe.png'),
('charly', '/icone/charly.png');

-- table member__data regroupe les infos utilies des membres

CREATE TABLE "member_data" (
  "member_data_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "member_data_date_birth" VARCHAR (12),
  "member_data_size" SMALLINT,
  "member_data_top_size" TEXT,
  "member_data_bottom_size" TEXT,
  "member_data_shoes_size" SMALLINT,
  "member_data_school" TEXT,
  "member_data_hobbies" TEXT,
  "member_data_created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "member_data_updated_at" TIMESTAMPTZ,
  "member_data_member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE
);


INSERT INTO "member_data"("member_data_date_birth", "member_data_size", "member_data_top_size", "member_data_bottom_size", "member_data_shoes_size", "member_data_school", "member_data_hobbies" ,"member_data_member_id") VALUES 
('25/01/1980', 180, 'xl', '40', 46, 'Oclock', 'rien', 1),
('25/01/2000', 160, 'xxl', '40', 46, 'Oclock', 'rien', 2),
('25/01/1000', 100, 'xxxl', '50', 45, 'la baron', 'rien', 3);

COMMIT; -- fin de la transaction