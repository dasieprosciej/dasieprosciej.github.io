module.exports = function(grunt) {
  grunt.initConfig({
    imageoptim: {
      png: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        // src: ['source/images/**/*.png'] //zdjecia glowne        
        src: ['build/**/images/*.png', '!build/images/*.png'] //zdjecia w build w projektach i blogu, ale nie original
      },
      jpg: {
        options: {
          jpegMini: true,
          imageAlpha: false,
          quitAfter: true
        },
        // src: ['source/**/images/img-*.{jpg,jpeg}']
        // src: ['source/images/**/*.{jpg,jpeg}']     //zdjecia glowne
        src: ['build/**/images/*.{jpg,jpeg}', '!build/images/*.{jpg,jpeg}'] //zdjecia w build w projektach i blogu, ale nie original

      }
    }
  });
  grunt.loadNpmTasks('grunt-imageoptim');
};