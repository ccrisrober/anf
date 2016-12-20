var args = process.argv.slice(2); // Remove unnecesary args
var commit = args.join(" ");
console.log(commit);
if(!commit) {
	return console.log("COMMIT NOT FOUND");
}
console.log(commit);

/**/
var exec = require('child_process').exec;

exec("git add .");
exec("git commit -m '" + commit + '"');
exec("git push");

var jenkins = require('jenkins')({ 
	baseUrl: 'http://admin:59bc3a8c0b1e4cf9947c49dcae6a2e48@localhost:9090', 
	crumbIssuer: true 
});

exec("git push");
jenkins.job.build("demoExpressCI", function(err) {
	if(err) return console.log(err);
	console.log("Trigger deploy launching");
});
/**/