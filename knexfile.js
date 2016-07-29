// Update with your config settings.

module.exports = {
	test: {
		client: 'mysql',
		connection: {
			database: 'nodebd2T',
			user:     'root',
			password: ''
		},
		migrations: {
			directory: __dirname + '/config/db/migrations'
		},
		seeds: {
			directory: __dirname + '/config/db/seeds/test'
		}
	},
	development: {
		client: 'mysql',
		connection: {
			database: 'nodebd2D',
			user:     'root',
			password: ''
		},
		migrations: {
			directory: __dirname + '/config/db/migrations'
		},
		seeds: {
			directory: __dirname + '/config/db/seeds/development'
		}
	},
	production: {
		client: 'mysql',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: __dirname + '/config/db/migrations'
		},
		seeds: {
			directory: __dirname + '/config/db/seeds/production'
		}
	}
};