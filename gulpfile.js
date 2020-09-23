const gulp = require('gulp');
const rename = require('gulp-rename');
const cssmin = require('./src/index');

gulp.task('default', async () => {
  await gulp.src('demo/test.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('demo/'));
});
