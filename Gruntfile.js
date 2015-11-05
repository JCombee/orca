module.exports = function (grunt) {
	
	grunt.loadNpmTasks('grunt-include-source');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-loopback-sdk-angular');
	grunt.loadNpmTasks('grunt-docular');
	
	grunt.initConfig({
		clean: ['client/*.*', 'client/js', 'client/css', 'client/views'],
		
		loopback_sdk_angular: {
			services: {
				options: {
					input: 'server/server.js',
					output: 'app/js/services/lb-services.js'
				}
			}
		},
		docular: {
			groups: [
			{
				groupTitle: 'LoopBack',
				groupId: 'loopback',
				sections: [
					{
						id: 'lbServices',
						title: 'LoopBack Services',
						scripts: [ 'app/js/services/lb-services.js' ]
					}
				]
			}
			]
		},
		
		copy: {
			main: {
				expand: true,
				cwd: 'app',
				src: ['*.*', 'js/**', 'views/**'],
				dest: 'client/',
			},
		},
		
		includeSource: {
			options: {
				basePath: 'client',
				baseUrl: '',
				templates: {
				html: {
					js: '<script src="{filePath}"></script>',
					css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
				},
				haml: {
					js: '%script{src: "{filePath}"}/',
					css: '%link{href: "{filePath}", rel: "stylesheet"}/'
				},      
				jade: {
					js: 'script(src="{filePath}", type="text/javascript")',    
					css: 'link(href="{filePath}", rel="stylesheet", type="text/css")'
				},
				scss: {
					scss: '@import "{filePath}";',
					css: '@import "{filePath}";',
				},
				less: {
					less: '@import "{filePath}";',
					css: '@import "{filePath}";',
				},
				ts: {
					ts: '/// <reference path="{filePath}" />'
				}
				}
			},
			myTarget: {
				files: {
				'client/index.html': 'app/index.html'
				}
			}
		},
		
		wiredep: {
			task: {
				src: ['client/index.html']
			}
		},
		
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: {                         // Dictionary of files
					'client/css/main.css': 'app/scss/main.scss',
				}
			}
		},
		
		nodemon: {
			dev: {
				script: '.'
			}
		},
		
		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: ['app/scss/**/*.*'],
				tasks: ['sass', 'includeSource', 'wiredep']
			},
			
			html: {
				files: ['app/**/*.html', 'app/**/*.js'],
				tasks: ['copy', 'includeSource', 'wiredep']
			},
			
			backend: {
				files: ['server/**'],
				tasks: ['loopback_sdk_angular', 'docular']
			},
			
			grunt: {
				files: ['Gruntfile.js'],
				options: {
					reload: true
				}
			}
		},
		
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	
	});
	
	grunt.registerTask('default', ['clean', 'loopback_sdk_angular', 'docular', 'copy', 'sass', 'includeSource', 'wiredep', 'concurrent']);
	
	grunt.loadTasks('tasks');
};