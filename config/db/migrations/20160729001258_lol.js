
exports.up = function(knex, Promise) {
		return Promise.all([
			knex.schema.createTable("pepito", function(table) {
			table.increments('userId').primary();
			table.string('username');
			table.string('email',60);
			table.string('password',65);
			table.timestamps();
		}),
		knex.schema.createTable("comment", function(table) {
			table.increments('commentId').primary();
			table.string('comment');
			table.integer('username').unsigned().references('userId').inTable('pepito'); 
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('comment'),
		knex.schema.dropTable('pepito')
	]);
};
