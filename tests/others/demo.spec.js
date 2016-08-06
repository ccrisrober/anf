var expect = require("chai").expect;
var assert = require("chai").assert;
var Counter = (function () {
	function Counter() {
		this._value = 0;
	}
	Counter.prototype.get = function () {
		return this._value;
	};
	Counter.prototype.add = function () {
		this._value += 1;
	};
	return Counter;
}());

describe("Example", function() {
	var arr;
	var counter = new Counter();
	before(function() {
		arr = [0, 1, 2, 3, 4, 5];
	});
	context("with the def validation rules", function() {
		it("arr is array", function(done) {
			assert.isArray(arr);
			for(var i = 0; i < arr.length; i++) {
				expect(arr[i]).to.equal(i);
			}
			done();
		});
		context("context counter", function() {
			var i = 0;
			it("tries counter", function(done) {
				expect(counter.get()).to.equal(i++);
				counter.add();
				done();
			});
			it("tries counter", function(done) {
				expect(counter.get()).to.equal(i++);
				counter.add();
				done();
			});
			it("tries counter", function(done) {
				expect(counter.get()).to.equal(i++);
				counter.add();
				done();
			});
		});
	});
});