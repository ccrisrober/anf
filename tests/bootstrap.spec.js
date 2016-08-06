
before(function(done) {
	require("../app.js");
	// Increase the Mocha timeout so that Sails has enough time to lift.
	//this.timeout(100000);
	console.log("Init tests ...");
	console.log("done");
	done();
});

after(function(done) {
	console.log("... Finish tests");
	// TODO: Close server
	done();
});