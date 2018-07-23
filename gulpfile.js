var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var del = require('del');
//var pug = require('gulp-pug');
// Static server
gulp.task('clean', function () {
    return del.sync('build'); // Удаляем папку dist перед сборкой
});
gulp.task('server', function () {
    browserSync.init({
        server: {
            port:9000,
            baseDir: "build"
        }
    });
    gulp.watch('./build/**/*').on('change', browserSync.reload);
  //  gulp.watch('index.html').on('change', browserSync.reload);
});
//gulp.task('compile', function buildHTML() {
//    return gulp.src('source/templates/index.pug')
//        .pipe(pug({
//            pretty: true
        
//            // Your options in here.
//        }))
//    .pipe(gulp.dest('build'))
//});
gulp.task('sass', function () {
    return gulp.src('./source/scss/bootstrap.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('bootstrap.min.css'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./source/scss/*.scss', ['sass']);
});

gulp.task('copy:images', function () {
    return gulp.src('./source/images/*.*')
        .pipe(gulp.dest('./build/images'));
});
gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'));
});
gulp.task('copy:html', function () {
    return gulp.src('./source/index.html')
        .pipe(gulp.dest('./build/'));
});

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'copy:html'));

gulp.task('watch', function () {
    gulp.watch('source/scss/**/*.scss', gulp.series('sass'));
   
});

gulp.task('default', gulp.series(
    gulp.parallel('sass', 'copy'),
    gulp.parallel('watch','server')
)
);
