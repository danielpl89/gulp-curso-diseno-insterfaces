'use-strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    navegador = require('browser-sync').create();

gulp.task('mover', function(){
  gulp.src('./src/bower_components/bootstrap/dist/css/bootstrap.min.css')
  .pipe(gulp.dest('./dist/css'));
  gulp.src('./src/bower_components/bootstrap/dist/js/bootstrap.min.js')
  .pipe(gulp.dest('./dist/js'));
  gulp.src('./src/bower_components/bootstrap/dist/fonts/*.*')
  .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./src/bower_components/jquery/dist/jquery.min.js')
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('compilar-sass',function(){
  gulp.src('./src/sass/*.sass')
  .pipe(sass().on('error', sass.logError ))
  .pipe(gulp.dest('./dist/css/'))
});


gulp.task('compilar-jade',function(){
  gulp.src('./src/layouts/index.jade')
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'))
});

gulp.task('default', function(){
  gulp.watch('./src/sass/*.sass', ['compilar-sass']);
  gulp.watch('./src/layouts/*.jade', ['compilar-jade']);

  //Servidor
   var files = [
      './dist/*.html',
      './dist/css/*.css',
      './dist/css/*.js'
    ];
    navegador.init(files, {
      server: {
         baseDir: './dist/'
      }
   });

});
