module.exports = function(grunt) {
  grunt.initConfig({
    imageoptim: {
      png: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['build/**/*.png']
      },
      jpg: {
        options: {
          jpegMini: true,
          imageAlpha: false,
          quitAfter: true
        },
        src: ['build/**/images/img-*.{jpg,jpeg,png}']
      }
    }
  });
  grunt.loadNpmTasks('grunt-imageoptim');
};