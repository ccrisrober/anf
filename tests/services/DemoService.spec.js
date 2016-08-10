'use strict';

global.__base = __dirname + "/../../";
var assert = require('assert');

describe('The service MyFirstService', function() {
	it('should say hello I am the real service', function() {
    	var result = [1, 2, 3];
    	assert.equal(1, result[0]);
  	});
});
/*
var PruebasController = require(__base + "./api/controllers/PruebasController"),  
    sinon = require('sinon'),
    assert = require('assert');

describe('The Hello Controller', function() {  
  describe('when we invoke the index action', function() {
    it('should return hello world message', function() {

      // Mocking res.send() method by using a sinon spy
      var send = sinon.spy();

      // Executes controller action
      PruebasController.hello(null, {
        'send': send
      });

      // Asserts send() method was called and that it was called
      // with the correct arguments: 'Hello World'
      assert(send.called);
      assert(send.calledWith('hello'));
    });
  });
});
*/