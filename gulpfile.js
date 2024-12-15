const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

// Task to clean the dist/css folder
gulp.task('clean', function () {
    return gulp.src('./dist/css/**/*', { read: false, allowEmpty: true })
        .pipe(clean());
});

// Task to compile Sass files, minify, and output to dist/css
gulp.task('sass', gulp.series('clean', function () {
    return gulp.src('./scss/**/*.scss')  // Adjust if your SCSS files are in another directory
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))  // Compile Sass
        .pipe(concat('index.css'))  // Concatenate all CSS into index.css
        .pipe(cleanCSS())  // Minify the CSS
        .pipe(gulp.dest('./dist/css/'));  // Output the result
}));

// Task to watch SCSS files for changes
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));  // Watch SCSS files for changes
    // Optionally add other watches, like:
    // gulp.watch('src/**/*.js', gulp.series('js')); // Watch JS files
    // gulp.watch('src/**/*.html', gulp.series('html')); // Watch HTML files
});

// Default task to run Sass compilation and watch for changes
gulp.task('default', gulp.series('sass', 'watch'));