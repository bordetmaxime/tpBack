BEGIN;

DROP TABLE IF EXISTS "todolist", "item";

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