
<# scrpit de deploy #>

psql -d postgres://pdsahmow:WyYMkNV1CZLZCLEoGwSUqBhOkhqsfNmK@abul.db.elephantsql.com/pdsahmow -f projet-02-family-deck-back\data\deploy\family.sql
\deploy
psql -d postgres://pdsahmow:WyYMkNV1CZLZCLEoGwSUqBhOkhqsfNmK@abul.db.elephantsql.com/pdsahmow -f projet-02-family-deck-back\data\deploy\role.sql
\deploy
psql -d postgres://pdsahmow:WyYMkNV1CZLZCLEoGwSUqBhOkhqsfNmK@abul.db.elephantsql.com/pdsahmow -f projet-02-family-deck-back\data\deploy\todolist.sql
\deploy
psql -d postgres://pdsahmow:WyYMkNV1CZLZCLEoGwSUqBhOkhqsfNmK@abul.db.elephantsql.com/pdsahmow -f projet-02-family-deck-back\data\deploy\jonction.sql



