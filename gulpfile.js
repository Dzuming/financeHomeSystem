var gulp = require('gulp');
var jshint = require('gulp-jshint');
var open = require('gulp-open');
gulp.task('default', function () {
    // place code for your default task here
});
gulp.task('scripts', function () {
    return gulp.src('client/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('clean', function () {
    return del(['core/css/styles.css']);
});

gulp.task('watch', function () {
    gulp.watch('client/**/*.js', ['scripts']);

});
gulp.src('./client/index.html').pipe(open({uri: 'http://localhost:3000', app: 'chrome'}));