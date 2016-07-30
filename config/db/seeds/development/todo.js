var faker = require("faker");
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      return Promise.all([
        knex('todo').insert({
          user_id: 1, 
          todo: faker.name.findName()
        }),
        knex('todo').insert({
          user_id: 1, 
          todo: faker.name.findName()
        }),
        knex('todo').insert({
          user_id: 1, 
          todo: faker.name.findName()
        }),
        knex('todo').insert({
          user_id: 1, 
          todo: faker.name.findName()
        }),
        knex('todo').insert({
          user_id: 1, 
          todo: faker.name.findName()
        })
      ]);
    });
};
