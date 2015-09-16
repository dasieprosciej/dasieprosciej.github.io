module.exports = function(grunt) {


  grunt.initConfig({
    responsive_images: {
      myTask: {
        options: {
          // createNoScaledImage: true,
          sizes: [
          {
            width: 320,
            name: 'small'
          },
          {
            name: 'large',
            width: 3000
          }
          ]
        },
        files: [{
          expand: true,
          // flatten:true,
          // cwd: 'source',
          // src: ['**/original/*.{jpg,gif,png}'],
          src: ['source/**/original/*.{jpg,gif,png}'],
          // cwd: 'test/',
          // dest: 'temp'
          // dest: 'temp/'
          custom_dest: '{%= path  %}/aaa/'
          

        }]
      }
    },
  })


  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('responsive', ['responsive_images']);
};