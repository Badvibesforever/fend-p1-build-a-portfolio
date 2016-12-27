module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['js/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		RI: {
			options: {
				engine: 'im'
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: ['css/*.css',
						'index.html'
					]
				}
			},
			options: {
				server: {
					baseDir: './'
				}
			}
		}


	});

	grunt.registerTask('sync', ['browserSync']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('images', ['RI']);
	grunt.registerTask('default', ['concat', 'uglify', 'responsive-images']);

};
