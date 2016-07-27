
exports.up = function(knex, Promise) {
	return knex.schema.createTable("user", function(table) {
		table.increments();
		table.string("email").notNullable().unique();
		table.string("password").notNullable();
		table.string("name").notNullable();
	});
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable("user");
};