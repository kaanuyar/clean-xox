> ## Improvements

- logging
- docker


> ## Fixes

- expired token message doesnt work (jwt verify returns the expiration error)
- add id property for all model types (only matchplayermodel have it)
- all repository methods that inserts data, it should only return id
- divide enums and tables schemas into multiple folders
- check import statements for circular dependency
- for all timestamp columns add withTimezone:true config
- add db transaction for join-match