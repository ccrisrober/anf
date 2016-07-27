
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('user').insert({
          email: "ccrisrober@gmail.com",
          password: "12345678",
          name: "maldicion069"
        }),
        knex('user').insert({
          email: "pepito@gmail.com",
          password: "12345678",
          name: "pepito"
        })
      ]);
    });
};
// http://mherman.org/blog/2016/04/28/test-driven-development-with-node/