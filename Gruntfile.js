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
};