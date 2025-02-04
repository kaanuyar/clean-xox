> ## Improvements

- logging
- docker


> ## Fixes

- expired token message doesnt work (jwt verify returns the expiration error)
- add id property for all model types (only matchplayermodel have it)
- all repository methods that inserts data, it should only return id
- check import statements for circular dependency
- add db transaction for join-match