const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task('clean', function () {
    return gulp.src('./dist/css/**/*', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('sass', gulp.series('clean', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Use 'expanded' to preserve the source structure
        .pipe(concat('index.css'))  // Concatenate all CSS files into index.css
        .pipe(cleanCSS())  // Minify the concatenated CSS file
        .pipe(gulp.dest('./dist/css/'));  // Output the result to dist/css
}));

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('sass')); // Watch all SCSS files
});

gulp.task('default', gulp.series('sass', 'watch')); // Default task to run sass and watch tasks
