const gulp = require('gulp')
const minify = require('gulp-minify')

gulp.task('minify', () => {
  return gulp.src('_js/functions.js', {allowEmpty: true})
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest('assets/js/'))
})

gulp.task('default', gulp.series(['minify']))
