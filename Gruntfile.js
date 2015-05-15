module.exports = function(grunt) {

  grunt.initConfig({
    inline: {
      dist: {
        options: {
          tag: '',
          cssmin: true,
          uglify: true
        },
        src: 'src/index.html',
        dest: 'index.html'
      }
    },
    copy: {
      main: {
        src: 'index.html',
        dest: 'redirect.html',
        options: {
          process: function (content, srcpath) {
            return '<html><head><META http-equiv="refresh" content="0;URL=data:text/html;base64,'+
              (new Buffer(content).toString('base64'))+'"></head></html>';
          },
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['inline', 'copy']);
};
