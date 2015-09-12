// Gulp Config
var gulp            = require("gulp"),
    connect         = require("gulp-connect"),
    concat          = require("gulp-concat"),
    minify_css      = require("gulp-minify-css"),
    plumber         = require("gulp-plumber"),
    sass            = require("gulp-sass"),
    uglify          = require("gulp-uglify"),
    watch           = require("gulp-watch"),
    prefix          = require("gulp-autoprefixer"),
    sourcemaps      = require("gulp-sourcemaps"),
    jshint          = require("gulp-jshint");


//----------------------------------------------
// Routes
var source  = '_resources';
var dest    = 'assets';


// Source
var src = {
    sass    : source + '/sass/**/*.sass',
    js      : source + '/js/**/*.js',
    php     : '**/*.php'
};

// Destinations
var dist = {
    css     : dest + '/css',
    js      : dest + '/js'
};


// File Name After Render
var min = {
    css  : "main-theme.min.css",
    js   : "function.min.js"
};


//----------------------------------------------
// Error Handler

var onError = function(error) {
    console.log(error);
    this.emit('end');
};



//----------------------------------------------
// SASS TASK

gulp.task('sass', function() {

    return gulp.src(src.sass)

        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(concat(min.css))
        .pipe(minify_css())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist.css))
        .pipe(connect.reload());
});

//----------------------------------------------
// JS TASK

gulp.task('js', function() {

    return gulp.src(src.js)

        .pipe(plumber({ errorHandler: onError }))
        .pipe(uglify())
        .pipe(concat(min.js))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist.js))
        .pipe(connect.reload());
});

//----------------------------------------------
// PHP TASK
gulp.task('php', function() {

    return gulp.src(src.php)
    
          .pipe(connect.reload());
  
});

//----------------------------------------------
// CONNECT TASK

gulp.task('connect', function() {

    connect.server({
      
      // Port Default 8080
//      port        : 8080,
      livereload  : true,
      root        : '/'
      
    });

});

//----------------------------------------------
// WATCH TASK

gulp.task('watch', function() {

    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.js, ['js']);
    gulp.watch(src.php, ['php']);

});


//----------------------------------------------
// DEFAULT TASK

gulp.task('default', [

    'js',
    'sass',
    'php',
    'watch',
    'connect'

]);


//----------------------------------------------