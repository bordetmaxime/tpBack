-- SQLBook: Code
-- Deploy family_deck:init_bdd to pg

BEGIN; -- début de la transaction


-- table famille

CREATE TABLE "family" (
  "family_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "family_name" TEXT NOT NULL,
  "family_description" TEXT,
  "family_created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "family_updated_at" TIMESTAMPTZ
);

INSERT INTO "family"("family_name", "family_description") VALUES 
('hobbit', null),
('superman', 'famille de super héro du dev');

COMMIT; -- fin de la transaction

BEGIN;

-- table membre liste tous les membres 

CREATE TABLE "member" (
  "member_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "member_lastname" TEXT NOT NULL,
  "member_firstname" TEXT NOT NULL,
  "member_email" TEXT NOT NULL,
  "member_password" VARCHAR(255) NOT NULL,
  "member_username" TEXT NOT NULL, 
  "member_created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "member_updated_at" TIMESTAMPTZ
);

COMMIT; -- fin de la transaction

BEGIN;

INSERT INTO "member"
(
    "member_lastname",
    "member_firstname",
    "member_email",
    "member_password",
    "member_username"
)
VALUES
(
		'Sacquet',
		'Bilbo',
		'terremilieu@free.fr',
		'$2b$10$w/QpWSe.oZcOX2KoWfC.u.hrRK4wNrTFxSkTcza4HRpR4erLli.2e',
		'terremilieu@free.fr'

        ), -- superpass
        (

		'Sacquet',
		'Frodon',
		'terrehobbit@free.fr',
		'$2b$10$3NmoaKrTDQpRgndT8GM7w.j9VMisebIbXpCKG1O/XSsMoUjoYubZi',
		'terrehobbit@free.fr'

        ), -- superpass
        (

		'Brandibouc',
		'Amaranth',
		'Gorbadoc@free.fr',
		'$2b$10$6KuNZlNeE3aCVQCNPWr5nuo8IPVRsXVNNiNovz75dYF7d4lzMUslW',
		'Gorbadoc@free.fr'

        ), -- superpass
        (

		'Bolgeurre',
		'Odovacar',
		'Bolgeurre@free.fr',
		'$2b$10$I26oizHPor2sUwPHS1YEquz8027vE4.F2Cr.pLI4oT.87k4zIpTTC',
		'Bolgeurre@free.fr'
         
        ), -- superpass
        (

		'Bolgeurre',
		'Jule',
		'BolgeurreJule@free.fr',
		'$2b$10$AAbM4KcifObhL.VyWdC4Xu7T3/Z70K4ck/WASBONIgAv8qoKSMMe.',
		'BolgeurreJule@free.fr'

);

COMMIT; -- fin de la transaction

BEGIN;

-- table member__data regroupe les infos utilies des membres

CREATE TABLE "member_data" (
  "member_data_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "member_data_date_birth" TEXT,
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
BEGIN;

-- table role regroupe le rôle de chaque membre

CREATE TABLE "role" (
  "role_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "role_label" TEXT NOT NULL, 
  "role_icon" TEXT NOT NULL,
  "role_created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "role_updated_at" TIMESTAMPTZ
);
INSERT INTO "role"("role_label", "role_icon") VALUES 
('papa', '/icone/papa.png'),
('maman', '/icone/maman.png'),
('enfant', '/icone/enfant.png'),
('conjoint', '/icone/conjoint.png'),
('conjointe', '/icone/conjointe.png'),
('charly', '/icone/charly.png');

-- table todolist 

CREATE TABLE "todolist" (
  "todolist_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "todolist_title" TEXT NOT NULL,
  "todolist_color" TEXT,
  "todolist_position" SMALLINT NOT NULL DEFAULT 0,
  "todolist_status" BOOLEAN NOT NULL DEFAULT FALSE,
  "todolist_created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "todolist_updated_at" TIMESTAMPTZ,
  "todolist_member_id" INTEGER NOT NULL REFERENCES "member"("member_id") ON DELETE CASCADE
);

-- table item  

CREATE TABLE "item" (
  "item_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "item_title" TEXT NOT NULL,
  "item_color" TEXT,
  "item_position" SMALLINT NOT NULL DEFAULT 0,
  "item_deadline" TEXT,
  "item_status" BOOLEAN NOT NULL DEFAULT FALSE,
  "item_created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "item_updated_at" TIMESTAMPTZ,
  "item_todolist_id" INTEGER NOT NULL REFERENCES "todolist"("todolist_id") ON DELETE CASCADE
);


INSERT INTO "todolist"("todolist_title", "todolist_color", "todolist_position", "todolist_status", "todolist_member_id") VALUES 
('post1', '#ff00ff', 1, FALSE, 1),
('post2', '#ff00ff', 1, FALSE, 2),
('post3', '#ff00ff', 1, FALSE, 3),
('post4', '#ff00ff', 1, FALSE, 4),
('post5', '#ff00ff', 1, FALSE, 5),
('post6', '#ff00ff', 1, FALSE, 1);

INSERT INTO "item"("item_title", "item_color", "item_position", "item_deadline", "item_status", "item_todolist_id") VALUES 
('repas', '#ff00ff', 1, '30/09/2022', FALSE, 1),
('course', '#ff00ff', 2, '25/08/2022', FALSE, 1),
('trico', '#ff00ff', 2, '25/08/2022', FALSE, 3),
('aqua poney', '#ff00ff', 2, '25/08/2022', FALSE, 3),
('changer la litiere', '#ff00ff', 2, '25/08/2022', FALSE, 4),
('faire le jardin', '#ff00ff', 2, '25/08/2022', FALSE, 5),
('jardin', '#ff00ff', 1, '30/09/2022', FALSE, 2);

COMMIT; -- fin de la transaction
BEGIN;

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

