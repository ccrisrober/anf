
exports.up = function(knex, Promise) {
	return knex.schema.createTable('user', function(table) {
      table.increments('userid').primary();
      table.string('username');
      table.string('password');
      table.string('name');
      table.string('email');
      table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  	return knex.schema.dropTable('user');
};