var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var consolidate = require('gulp-consolidate');
var iconfont = require('gulp-iconfont');
var plumber= require('gulp-plumber');             

gulp.task('scss', function () {
  return gulp.src('src/scss/style.scss')         
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));                   
});

gulp.task('scss-lint', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sassLint({
      configFile: '.scss-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('iconfont', function () {
  return gulp.src('src/svg/*.svg')
    .pipe(plumber())
    .pipe(iconfont({
      fontName: 'iconfont',
      formats:['ttf', 'eot', 'woff', 'woff2'],
      appendCodepoints:true,
      appendUnicode: false,
      normalize: true,
      fontHeight: 1000,
      centerHorizontally:true
    }))
    .on('glyphs', function(glyphs, options) {
      gulp.src('src/iconfont-template/iconfont.scss')
          .pipe(consolidate('underscore', {
            glyphs: glyphs,
            fontName: options.fontName,
            fontDate: new Date().getTime()
          }))
          .pipe(gulp.dest('src/scss/icon-font'));
    })
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-html', function () {
  return gulp.src('*.html')         
    .pipe(gulp.dest('dist'));                
});

gulp.task('copy-js', function () {  
  return gulp.src('src/js/*.js')        
    .pipe(gulp.dest('dist/js'));
});


gulp.task('default', ['scss', 'scss-lint'], function() {
  gulp.watch('src/**/*.scss' , ['scss', 'scss-lint']);
  gulp.watch('*.html' , ['copy-html']);
  gulp.watch('src/js/*.js' , ['copy-js']); 
});
 
 gulp.task('copy-data', function() {
  gulp.src('./src/images/*').pipe(gulp.dest('./dist/images')),
  gulp.src('./src/js/*').pipe(gulp.dest('./dist/js')),
  gulp.src('./src/fonts/*').pipe(gulp.dest('./dist/fonts')),
  gulp.src('./src/svg/*').pipe(gulp.dest('./dist/svg')),
  gulp.src('*.html').pipe(gulp.dest('./dist/'))
});


