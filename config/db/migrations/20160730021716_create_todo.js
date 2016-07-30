
exports.up = function(knex, Promise) {
	return knex.schema.createTable("todo", function(table) {
		table.increments('id').primary();
		table.string('todo');
		table.integer('user_id').unsigned().references('id').inTable('user'); 
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('todo');
};
