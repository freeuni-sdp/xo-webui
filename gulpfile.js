var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

var entryPoint = 'index.js';
var serverGlob = 'public/*.js';
var clientGlob = 'views/*.jade';
 
gulp.task('default', function() {
    livereload.listen();

    nodemon({ script: entryPoint })
        .on('restart', function() {
            setTimeout(function() {
                gulp.src(serverGlob).pipe(livereload());
            }, 250);
        })

    gulp.watch(clientGlob, function() {
        gulp.src(clientGlob).pipe(livereload());
    });
});