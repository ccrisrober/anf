var faker = require("faker");
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      var seed = [
        // Inserts seed entries
        knex('user').insert({
          email: "ccrisrober@gmail.com",
          password: "12345678",
          name: "maldicion069"
        })
      ];
      for(var i = 0; i < 2; i++) {
        seed.push(knex("user").insert({
          email: faker.internet.email(),
          password: (i % 2 == 0)? "12345678" : "87654321",
          name: faker.name.findName()
        }));
      }
      return Promise.all(seed);
    });
};
// http://mherman.org/blog/2016/04/28/test-driven-development-with-node/