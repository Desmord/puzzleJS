const gulp = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const runSequence = require('run-sequence');

const htmlmin = require('gulp-htmlmin');

const plumber = require('gulp-plumber');
const gulpImportCss = require('gulp-import-css');
const gulpAutoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

gulp.task('cleanHTML', () => {
    return del('build/client/index.html');
});


gulp.task('updateHTML', () => {

    console.log('Uaktualnianie pliku index.html.');

    return gulp.src('dev/html/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build/client/'));

});


gulp.task('watchHTML', () => {

    console.log('Uruchamianie obserwowania pliku index.html.');

    gulp.watch('dev/html/index.html', ['updateHTML', browserSync.reload]);

});

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

gulp.task('cleanCss', () => {
    return del('build/client/style.css');
});


gulp.task('updateCss', () => {

    console.log('Uaktualnianie plików css.');

    return gulp.src('dev/css/style.css')
        .pipe(plumber())
        .pipe(gulpImportCss()) //Łączenie importów
        .pipe(gulpAutoprefixer({
            browsers: ['last 5 versions', 'IE 9']
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('build/client/'))
        .pipe(browserSync.stream());

});


gulp.task('watchCss', () => {

    console.log('Uruchamianie obserwowania plików css.');

    gulp.watch('dev/css/*.css', ['updateCss', browserSync.reload]);

});

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

gulp.task('cleanJs', () => {
    return del('build/client/*.js');
});


gulp.task('updateJs', () => {

    console.log('Uaktualnianie plików Js.');

    return gulp.src([`dev/js/client/ElementsCreator.js`,`dev/js/client/TransitionsManager.js`,`dev/js/client/EventsManager.js`,'dev/js/client/main.js' /*, 'dev/js/minrorJs.js']*/ ])
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env'],
            //minified: true
        }))
        .pipe(concat('main.js')) //nazwa
        .pipe(uglify())
        .pipe(gulp.dest('build/client/'));

});


gulp.task('watchJs', () => {

    console.log('Uruchamianie obserwowania plików Js.');

    gulp.watch('dev/js/client/*', ['updateJs', browserSync.reload]);

});


//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------


gulp.task('serwer', () => {

    console.log('Uruchamianie automatycznego odswieżania plików.');

    browserSync.init({
        server: 'build/client/'
    });

});


gulp.task('build', () => {
    runSequence('cleanJs', 'cleanCss', 'cleanHTML', 'updateJs', 'updateCss', 'updateHTML', 'watchJs', 'watchCss', 'watchHTML', 'serwer');
});