const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require("cssnano");
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const useref = require('gulp-useref');
const tap = require('gulp-tap')
const zip = require('gulp-zip')
var php = require('gulp-connect-php')
const del = require('del')
var path = require('path');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

require('dotenv').config();


/*****************************************/
/*  GULP PROJECT ENVIRONMENT VARIABLES   */
/*****************************************/

const theme = `public/wp-content/themes/${process.env.THEME_NAME}`
const server = 'http://127.0.0.1:8080/'

gulp.task('test', function () {
    return console.log(process.env.DB_USER)
})

// Compile global SCSS and reloads browser
gulp.task('scss', function () {
    return gulp.src('src/assets/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(theme + '/assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Compile global JS and reloads browser
gulp.task('js', function(){
    return gulp.src('src/assets/js/index.js')
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(webpack({
        output: {
            filename: 'main.min.js'
        },
        devtool: 'source-map'
    }))
    .pipe(useref())
    .pipe(gulp.dest(theme + '/assets/js/'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest(theme + '/assets/fonts'))
});

gulp.task('cmp_js', function(){
    return gulp.src('src/components/**/index.js')
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(tap((file, t) => {
        console.log(path.parse(file.path).name)
        webpack({
            output: {
                filename: `${path.parse(file.path).name}.min.js`
            },
            devtool: 'source-map'
        })
    }))
    .pipe(useref())
    .pipe(gulp.dest(theme + '/components/'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('cmp_scss', function(){
    return gulp.src('src/components/**/index.+(scss|css)')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(theme + '/components/'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('cmp_fields', function(){
    return gulp.src('src/components/**/fields.php')
    .pipe(gulp.dest(theme + '/fields/'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

gulp.task('cmp_component', function() {
    return gulp.src('src/components/**/*.php')
        .pipe(gulp.dest(theme + '/components/'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('cmp_assets', function() {
    return gulp.src('src/components/**/assets')
        .pipe(gulp.dest(theme + '/components/'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('acf', function() {
    return gulp.src('vendor/advanced-custom-fields/**/*')
        .pipe(gulp.dest(theme + '/lib/'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('functions', function() {
    return gulp.src('src/functions/*.php')
        .pipe(gulp.dest(theme + '/functions/'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('fields', function() {
    return gulp.src('src/fields/*.php')
        .pipe(gulp.dest(theme + '/fields/'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('theme', function() {
    return gulp.src('src/*.+(php|css)')
        .pipe(gulp.dest(theme))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('compress', function() {
    return gulp.src(theme + '/**/*')
    .pipe(zip(`${process.env.THEME_NAME}.zip`))
    .pipe(gulp.dest('./'))
})

// Cleans the dist folder
gulp.task('cleandist', function () {
    return del([theme]);
})

gulp.task('images', function () {
    return gulp.src('src/assets/img/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(theme + '/assets/img'))
})

gulp.task('components',
    gulp.series(
        'cmp_fields',
        'cmp_component',
        'cmp_scss',
        'cmp_js',
        'cmp_assets',
    )
)

 gulp.task('build',
    gulp.series(
        'acf',
        'components',
        'scss',
        'js',
        'fonts',
        'functions',
        'fields',
        'theme',
        'images',
        'compress',
    )
)

gulp.task('php', function (){
    php.server({base:'./public', port:8080, keepalive:true});
});

gulp.task('serve', function() {
    browserSync.init({
        proxy: server,
    })
})

gulp.task('watch', function () {
    gulp.watch('./src/**/**/*', gulp.series('build', 'reload'))
})

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
})

gulp.task('browser',
    gulp.parallel(
        'php',
        'serve',
        'watch'
    )
)

gulp.task('develop',
    gulp.series(
        'build',
        'browser',
    )
)