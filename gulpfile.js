const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify-es').default;
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const del = require('del');
// const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const zip = require("gulp-zip");
const concat = require("gulp-concat");
const runSequence = require('run-sequence');

  /*****************************************/
 /*  GULP PROJECT ENVIRONMENT VARIABLES   */
/*****************************************/

const theme = 'public/wp-content/themes/NDS'
const static = 'src/static'
const server = 'http://localhost/'

let dist = theme;

// Compile SCSS and reloads browser
gulp.task('sass', function(){
    return gulp.src('src/assets/scss/*.scss')
            .pipe(plumber({
                errorHandler: function(err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(postcss([ autoprefixer(), cssnano() ]))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(dist + '/assets/css'))
            .pipe(browserSync.reload({
                 stream: true
             }))
});


// Watch SCSS
gulp.task('watch', function(){
    gulp.watch('./src/assets/scss/**/*.scss', gulp.series('sass', 'reload'));
    gulp.watch('./src/assets/js/*.js', gulp.series('js', 'reload'));
    gulp.watch('./src/**/*.php', gulp.series('theme', 'reload'));
});

gulp.task('serve', function(){
    browserSync.init({
        proxy: server,
        notify: false
    });
});

//Browser Reload Function
gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

gulp.task('js', function(){
    return gulp.src('src/assets/js/**/*.js')
    .pipe(useref())
    .pipe(uglify())
    .pipe(gulp.dest(dist + '/assets/js'))
});



gulp.task('fonts', function(){
    return gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest(dist + '/assets/fonts'))
});

// Cleans the dist folder
gulp.task('cleandist', function() {
    return del([dist + '/**', '!' + dist]);
})

gulp.task('images', function(){
    return gulp.src('src/assets/img/*.+(png|jpg|gif|svg)')
    // Cache images that run through imagemin
    // .pipe(cache(imagemin({
    //     interlaced: true
    // })))
    .pipe(gulp.dest(dist + '/assets/img'))
});

gulp.task('video', function() {
    return gulp.src('src/assets/video/**').
    pipe(gulp.dest(dist + '/assets/video'))
})

gulp.task('theme', function() {
    return gulp.src('src/**/*.+(php|css)').
    pipe(gulp.dest(dist + ''))
})

gulp.task('icons', function() {
    return gulp.src('src/assets/icons/*').
    pipe(gulp.dest(dist + '/assets/icons'))
})

gulp.task('compress', function() {
    return gulp.src(dist + '/**/*')
    .pipe(zip("NDS_theme.zip"))
    .pipe(gulp.dest('./'))
})

gulp.task('set-theme', function(done) {
    dist = theme;
    done();
})

gulp.task('set-static', function(done) {
    dist = static;
    done();
})

gulp.task('static-serve', function(){
    browserSync.init({
        server: 'src/static',
        notify: false
    });
});

gulp.task('dev-theme',
    gulp.parallel(
        'serve',
        'watch'
    )
)

gulp.task('dev-static',
    gulp.parallel(
        'static-serve',
        'watch'
    )
)

gulp.task('fields', function() {
    return gulp.src(dist + '/acfe-php/**/*')
        .pipe(gulp.dest('src/acfe-php'))
})



gulp.task('default',
    gulp.series(
        'cleandist',
        'theme',
        'sass',
        'images',
        'icons',
        'video',
        'js',
        'fonts'
    )
);

gulp.task('static-default',
    gulp.series(
        'sass',
        'images',
        'icons',
        'video',
        'js',
        'fonts'
    )
);

gulp.task('build',
    gulp.series(
        'set-theme',
        'default',
        'compress',
    )
);

gulp.task('develop',
    gulp.series(
        'set-theme',
        'default',
        'dev-theme',
    )
);

gulp.task('static',
    gulp.series(
        'set-static',
        'static-default',
        'dev-static',
    )
);
