var superagent = require("superagent");
var expect = require("chai").expect;

describe("express example", function() {
	it("GET example", function() {
		superagent.get("http://localhost:3333/v1/timezone")
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.eql(1);
				expect(res.text).to.eql("TIMEZONE V1");
			});
	});
	it("POST example", function() {
		superagent.post("http://localhost:3333/v1/data/666")
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.eql(1);
				expect(res.text).to.eql(666);
			});
	});
});