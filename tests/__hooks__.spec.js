before(function(done) {
	console.log("Init tests ...");
	require("../app.js");
	console.log("done");
	done();
});

after(function(done) {
	console.log("... Finish tests");
	done();
});