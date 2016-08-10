
exports.up = function(knex, Promise) {
	return knex.schema.createTable("todo", function(table) {
		table.increments('id').primary();
		table.string('todo').notNullable();
		//table.integer('user_id').unsigned().references('userid').inTable('user'); 
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('todo');
};
