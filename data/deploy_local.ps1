
<# scrpit de deploy #>

psql -d familydeck -f projet-02-family-deck-back\data\family.sql

psql -d familydeck -f projet-02-family-deck-back\data\role.sql

psql -d familydeck -f projet-02-family-deck-back\data\todolist.sql

psql -d familydeck -f projet-02-family-deck-back\data\table_jonction.sql



