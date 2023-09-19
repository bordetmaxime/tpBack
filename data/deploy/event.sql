-- Active: 1654854605320@@127.0.0.1@5432
BEGIN;
DROP TABLE IF EXISTS "event";

-- table event

CREATE TABLE "event" (
    "event_id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "event_date" TEXT,
    "event_title" TEXT NOT NULL, 
    "event_category" TEXT NOT NULL,
    "event_locality" TEXT,
    "event_parent" TEXT NOT NULL,
    "event_informations" VARCHAR (250),
    "event_position" SMALLINT NOT NULL DEFAULT 0,
    "event_color" TEXT,
    "event_status" BOOLEAN NOT NULL DEFAULT FALSE,
    "event_created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "event_updated_at" TIMESTAMPTZ,
    "event_family_id" INTEGER NOT NULL REFERENCES "family"("family_id") ON DELETE CASCADE
);

INSERT INTO "event"( "event_date", "event_title", "event_category", "event_locality", "event_parent", "event_informations", "event_position", "event_color", "event_status", "event_family_id") VALUES
('19/10/2022', 'Titre Pro', 'Ecole', 'Paris', 'Père', 'Journée complète', 1, '#ffooff', FALSE, 1),
('22/10/2022', 'Fête Titre Pro', 'Maison', 'ici', 'Père, Mère, enfants', 'Journée et soirée', 2, '#ffooff', FALSE, 1);

COMMIT;