var faker = require("faker");
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('post').insert({
          title: faker.name.findName(), 
          slug: faker.address.streetAddress(),
          html: faker.lorem.paragraphs(5),
          user_id: knex('user').where('userid', 1)[0],
        })
      ]);
    });
};
