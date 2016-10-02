var gulp = require('gulp');
var tslint = require("gulp-tslint");
var open = require('gulp-open');
gulp.task('default', function () {
    // place code for your default task here
});
gulp.task('clean', function () {
    return del(['core/css/styles.css']);
});

gulp.task('watch', function () {
    gulp.watch('client/core/**/*.ts', ['scripts']);

});
gulp.src('./client/index.html').pipe(open({uri: 'http://localhost:3000', app: 'chrome'}));
gulp.task('tslint', () =>
    gulp.src('client/core/**/*.ts')
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);