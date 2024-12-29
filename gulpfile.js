const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const paths = {
  scss: './scss/**/*.scss',
  css: './dist/css'
};

gulp.task('clean', function () {
    return gulp.src('./dist/css/**/*', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('build', gulp.series('clean', function () {
    return gulp.src(paths.scss)
        .pipe(sass({ outputStyle: 'expanded' })
        .on('error', sass.logError))
        .pipe(concat('index.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.css));
}));

gulp.task('watch', function () {
    gulp.watch(paths.scss, gulp.series('build'));
});

gulp.task('default', gulp.series('build', 'watch'));