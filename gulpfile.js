var gulp = require('gulp');
var tslint = require("gulp-tslint");
var stylish = require('gulp-tslint-stylish');
var runSequence = require('run-sequence');
var open = require('gulp-open');
gulp.task('clean', function () {
    return del(['core/css/styles.css']);
});
gulp.task('default', function (callback) {
runSequence('lint', 'watch', 'server', callback);
});
gulp.task('watch', function () {
    gulp.watch('client/core/**/*.ts');

});
gulp.task('server', function () {
gulp.src('./client/index.html').pipe(open({ uri: 'http://localhost:3000', app: 'chrome' }));
});
gulp.task('lint', function () {
    gulp.src('client/core/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report(stylish, {
            emitError: false,
            sort: true,
            bell: true,
            fullPath: true
        }))
        .on('error', function(e){
            console.log(e);
         })
});