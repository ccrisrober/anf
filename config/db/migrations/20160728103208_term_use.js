
exports.up = function(knex, Promise) {
	return knex.schema.createTable("term_use", function(table) {
		table.primary(["lang", "type"]);
		table.string("lang");
		table.string("type");
		table.text("content");
		//table.string('type').primary();
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('term_use');
};
