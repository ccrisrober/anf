
exports.up = function(knex, Promise) {
	return knex.schema.createTable("post", function(table) {
		table.increments('id').primary();
		table.string('title').notNullable();
		table.string('slug').notNullable();
		table.string('html').notNullable();
		//table.integer('user_id').unsigned();
		table.integer('user_id').unsigned().references('userid').inTable('user'); 
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('post');
};
