"use strict";
var env = require("./application").environment;

var knex      = require('knex')(require(process.cwd() + '/config/__knexfile')[env]), // Selects the correct DB config object for the current environment
	bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry'); // Resolve circular dependencies with relations

module.exports = bookshelf;