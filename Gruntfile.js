// Estrutura do arquivo Gruntfile.js
module.exports = function( grunt ) {

	// Carrega plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// Define as configurações
	grunt.initConfig({

		// Compressão de CSS
		cssmin: {
			dev: {

			},
			dist: {
				src: "assets/stylesheets/*.css",
				dest: "public/stylesheets/all.css"
			}
		}
	});

	// Registro das tarefas
	grunt.registerTask('default', ['watch']);
};