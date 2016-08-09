"use strict";

module.exports = {
	/**
	 * @api {get} / Index view
	 * @apiDescription Default index
	 * 
	 * @apiName Index
	 * @apiGroup Welcome
	 *
	 **/
	index: function(req, res) {
		res.htmlFile("index.html");
	}
};