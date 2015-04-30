module.exports = function(grunt) {

  grunt.initConfig({
    inline: {
      dist: {
        options: {
          tag: '',
          cssmin: true,
          uglify: true
        },
        src: 'src/aquietplace.html',
        dest: 'index.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-inline');

  grunt.registerTask('build', ['inline']);
};
