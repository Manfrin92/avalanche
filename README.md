# template-typescript-node-backend

Template using eslint+prettier+editorconfig

# Configuration

postgres acording to ormconfig.json; script: yarn dev:server


## TypeORM

[https://typeorm.io](https://typeorm.io)

### New Entity

yarn typeorm entity:create -n User -d src/user/entity

### New Migration

yarn typeorm migration:create -n UserMigration

npx typeorm migration:create -n AlterFKUserCentral

### Generate Schema

yarn typeorm migration:generate -n UserMigration

### Run Migrations

yarn typeorm migration:run

npm run typeorm migration:run

### Revert Migrations

yarn typeorm migration:revert

obs: Necessário criar script (yarn typeorm) no package.json