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
		},

		nodemon: {
			dev: {
				script: "app.js"
			}
		},

		mocha_istanbul: {
			coverage: {
				src: "tests", // directory, not files
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
		}
	});

	// Nodemon
	grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask("watch", ["watch:js"]); // TODO: JSHINT NO VA D:

	grunt.loadNpmTasks('grunt-apidoc')
	grunt.registerTask("server", ["apidoc:myapp", "nodemon"]);

	grunt.loadNpmTasks('grunt-mocha-istanbul');

	// Adding test task enabling "grunt test" command
	grunt.registerTask('test', [  
		'mocha_istanbul:coverage'
	]);
};