// TODO: Añadir knex a servicios grunt
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		watch: {
			js: {
				files: ["api/**/*.js"],
				tasks: ["jshint"]
			}
		},
		jshint: {
			all: ["Gruntfile.js", "api/**/*.js"],
			options: {
				jshintrc: true
			}
		},

		nodemon: {
			dev: {
				script: "app.js"
			}
		},

		nodemonCluster: {
			dev: {
				script: "appCluster.js"
			}
		},

		concurrent: {
			dev: {
				tasks: ['nodemon', "notify:server", 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		mocha_istanbul: {
			coverage: {
				src: "tests", // directory
				options: {
					coverageFolder: "coverage",
					mask: "./**/*.spec.js",
					root: "api/",
					reportFormats: ["html"],
					timeout: 20000,
					excludes: ["models"]
				}
			}
		},

		apidoc: {
			myapp: {
				src: "api/controllers/",
				dest: "apidoc/",
				options: {
					packageInfo: {
						"name": "anf",
						"version": "0.0.1",
						"description": "First API version",
						"apidoc": {
							"title": "Custom apiDoc browser title",
							"url" : "https://mydomain.com/api/"
						}
					}
				}
			}
		},

		clean: {
			js: {
				src: [
					"public/js/**/*..min.js",
					"public/js/**/*..min.js.map"
				]
			},
			css: {
				src: [
					"public/css/**/*.min.css"
				]
			},
			vendor: {
				src: ["public/vendor/**"]
			}
		},

		env: {
			options: {},
			dev: {
				NODE_ENV: "development"
			},
			test: {
				NODE_ENV: "test"
			}
		},

		notify: {
			server: {
				options: {
					title: "Task Complete",
					message: 'Server is ready!'
				}
			},
			client: {
				options: {
					title: "Sass Task Complete",
					message: "CSS is ready!!"
				}
			}
		},

		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: './resources/assets/sass',
        			src: ['*.scss'],
					dest: './public/css',
					ext: '.css'
				}]
			}
		},
		knex: {
			file: process.cwd() + "/knexfile.js",


			config: {
				development: {
					client: 'mysql',
					connection: {
						host: "127.0.0.1",
						database: "demo",
						user: "root",
						password: ""
					},
					migrations: {
						directory: __dirname + '/config/db/migrations'
					},
					seeds: {
						directory: __dirname + '/config/db/seeds/development'
					}
				}
			}
		}
	});

	// sass
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask("client", ["sass", "notify:client"]);

	grunt.loadNpmTasks('grunt-notify');

	// Nodemon
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.registerTask("watch", ["watch:js"]);

	grunt.registerTask("hint", ["jshint"]);

	grunt.registerTask('default', ['concurrent']);

	grunt.loadNpmTasks('grunt-apidoc');
	grunt.registerTask("server", ["apidoc:myapp", "nodemon"]);
	grunt.registerTask("serve", ["nodemon"]);

	grunt.registerTask("cluster", ["nodemonCluster"]);

	grunt.registerTask("foo", ["apidoc:myapp", "notify:server"]);

	grunt.loadNpmTasks('grunt-mocha-istanbul');
	grunt.loadNpmTasks('grunt-env');

	grunt.registerTask('test', [  
		//"env:test",
		'mocha_istanbul:coverage'
	]);

	grunt.registerTask('benchmark', 'A sample task that logs stuff.', function(iterations) {
		var done = this.async();
		if (arguments.length === 0) {
			iterations = 1000;
		}
		console.log(iterations);
		
		var siege = require("siege");
		var config = require(process.cwd() + '/config/application');
		
		siege()
			.on(config.port)
			.for(iterations).times
			.get('/')
			.attack()
	});

	grunt.registerTask('benchmark2', 'A sample task that logs stuff.', function(iterations) {
		var done = this.async();
		if (arguments.length === 0) {
			iterations = 1000;
		}
		console.log(iterations);
		
		var siege = require("siege");
		var config = require(process.cwd() + '/config/application');
		
		siege()
			.on(config.port)
			.concurrent(iterations)
			.get('/')
			.attack()
	});
	grunt.registerTask("routes", "", function() {
		var done = this.async();
		var server = require("./app");
		/*server.app._router.stack.forEach(function(r) {
			if (r.route && r.route.path && r.route.path !== "*") {
				if(r.route.methods.get) {
					console.log("GET\t" + r.route.path);
				} else if(r.route.methods.post) {
					console.log("POST\t" + r.route.path);
				} else if(r.route.methods.put) {
					console.log("PUT\t" + r.route.path);
				} else if(r.route.methods.delete) {
					console.log("DELETE\t" + r.route.path);
				} else if(r.route.methods.head) {
					console.log("HEAD\t" + r.route.path);
				}
			}
		});*/
		var Table = require('cli-table');
		var table = new Table({ head: ["", "Name", "Path"] });
		var routes = server.app._router.stack;
		console.log('\n********************************************');
		console.log('\t\ANF routes');
		console.log('********************************************\n');
		for (var key in routes) {
			if (routes.hasOwnProperty(key)) {
				var val = routes[key];
				if(val.route) {
					//console.log(JSON.stringify(val, null, 4));
					//for(var i = 0; i < val.route.stack.length - 1; i++) {
					//	console.log(JSON.stringify(val.route.stack[i], null, 4));
					//}
					val = val.route;
					var _o = {};
					_o[val.stack[0].method.toUpperCase()]  = [val.path, val.path ]; 	
					table.push(_o);
				}		
			}
		}

		console.log(table.toString());

		server.stop();
		done(true);
	});

	// TODO: No funciona
	//grunt.loadNpmTasks('grunt-knex');

};