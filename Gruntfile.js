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

		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		stylus: {
			options: {
				linenos: true,
				compress: false
	        },
	        files: [{
	      		expand: true,
	          	cwd: 'source',
	          	src: [ '**/*.styl' ],
	          	dest: 'build',
	          	ext: '.css'
	        }]
		},

		mocha_istanbul: {
			coverage: {
				src: "tests", // directory
				options: {
					coverageFolder: "coverage",
					mask: "./**/*.spec.js",
					root: "api/",
					reportFormats: ["html"]
				}
			}
		},

		apidoc: {
			myapp: {
				src: "api/controllers/",
				dest: "apidoc/"
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
		}


	});

	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.registerTask("client", ["stylus"]);

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
	grunt.registerTask("serve", ["apidoc:myapp", "nodemon"]);

	grunt.loadNpmTasks('grunt-mocha-istanbul');

	// Adding test task enabling "grunt test" command
	grunt.registerTask('test', [  
		'mocha_istanbul:coverage'
	]);
};