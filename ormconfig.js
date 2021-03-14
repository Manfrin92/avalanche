const srcConfig = {
	name: 'default',
	type: 'postgres',
	host: String(process.env.DB_HOST),
	port: process.env.DB_PORT,
	username: String(process.env.DB_USERNAME),
	password: String(process.env.DB_PASSWORD),
	database: String(process.env.DB_DATABASE),
	entities: [ 'src/modules/**/infra/typeorm/entities/*.ts' ],
	migrations: [ 'src/shared/infra/typeorm/migrations/*.ts' ],
	cli: {
		migrationsDir: 'src/shared/infra/typeorm/migrations'
	},
	logging: process.env.DB_LOGGING && process.env.DB_LOGGING === 'true' ? true : false,
	cache: false
};

const distConfig = {
	name: 'default',
	type: 'postgres',
	host: String(process.env.DB_HOST),
	port: process.env.DB_PORT,
	username: String(process.env.DB_USERNAME),
	password: String(process.env.DB_PASSWORD),
	database: String(process.env.DB_DATABASE),
	entities: [ './modules/**/infra/typeorm/entities/*.js' ],
	migrations: [ 'shared/infra/typeorm/migrations/*.js' ],
	cli: {
		migrationsDir: 'shared/infra/typeorm/migrations'
	},
	logging: process.env.DB_LOGGING && process.env.DB_LOGGING === 'true' ? true : false,
	cache: false
};
module.exports = process.env.TS_NODE ? srcConfig : distConfig;