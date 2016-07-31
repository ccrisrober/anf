"use strict";

var extend = require('extend'); // TODO: Moverlo luego a un proyecto (quitarlo del package.json eh)

module.exports = function (Bookshelf) {
  	Bookshelf.Model = Bookshelf.Model.extend({}, {
		findAll: function(filter, opts) {
			return this.forge().where(filter).fetchAll(opts);
		},
		findOne: function (query, opts) {
			if(query && query.id && this.prototype.idAttribute !== "id") {
				// Rename "id" if exist in query
				query[this.prototype.idAttribute] = query.id;
				delete query.id;
			}
			// require: Reject the returned response with a NotFoundError if results are empty.
			opts = extend({ require: true }, opts)
			return this.forge(query).fetch(opts)
		},
		findById: function(id, opts) {
			return this.findOne({ [this.prototype.idAttribute ]: id}, opts);
		},
		create: function(data, opts) {
			return this.forge(data).save(null, opts);
		},
		destroy: function(opts) {
			// require: Throw a Model.NoRowsDeletedError if no records are affected by destroy.
			opts = extend({ require: true }, opts);
			return this.forge({ [this.prototype.idAttribute]: opts.id})
				.destroy(opts);
		},
		update: function(opts, data) {
			// patch: Only save attributes supplied in arguments to save.
			// require: Throw a Model.NoRowsUpdatedError if no records are affected by save.
			opts = extend({ patch: true, require: true }, opts);
			return this.forge({ [this.prototype.idAttribute]: opts.id }).fetch(opts)
				.then(function (model) {
					return model ? model.save(data, opts) : undefined
				});
		}
	});
};