const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename'); // To rename files

const paths = {
  scss: './scss/**/*.scss',
  css: './dist/css'
};

gulp.task('build', function () {
    console.log('build css');
  return gulp
    .src(paths.scss) // Source files
    .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
    .pipe(cleanCSS()) // Minify CSS
    .pipe(rename({ suffix: '.min' })) // Rename to include `.min` suffix
    .pipe(gulp.dest(paths.css)); // Output to the CSS directory
});

gulp.task('clean', function () {
    return gulp.src('./dist/css/**/*', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('sass', gulp.series('clean', function () {
    return gulp.src('./scss/**/*.scss')  // Adjust if your SCSS files are in another directory
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))  // Compile Sass
        .pipe(concat('index.css'))  // Concatenate all CSS into index.css
        .pipe(cleanCSS())  // Minify the CSS
        .pipe(gulp.dest('./dist/css/'));  // Output the result
}));

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'watch'));