"use strict";

module.exports = {
	trololo_lang: function(req, res) {
		__ioc.$inject("workflow", function(workflow) {
			workflow = workflow(req, res);

			workflow.on("validate", function() {
				req.assert('lang', 'can not be empty').notEmpty();
				req.assert('lang', 'must be string').isString();
				req.assert("lang", "2 characters required").len(2, 2);
				var errors = req.validationErrors();

				if (errors) {
					workflow.outcome.errfor.email = 'email already taken';
					workflow.outcome.errors = errors;
					return workflow.emit('response');
				}
				workflow.emit('finishcall');
			});

			workflow.on("finishcall", function() {
				workflow.emit('response', req.params.lang);
			});
			
			workflow.emit("validate");
		});
	}
};