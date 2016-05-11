var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var gulpNgConfig = require("gulp-ng-config");
var size = require('gulp-size');
var templateCache = require('gulp-angular-templatecache');
var RevAll = require('gulp-rev-all');
var runSequence = require('run-sequence');
var del = require('del');
var bower = require('gulp-bower');
var gutil = require('gulp-util');

var SOURCE_PATH = "src";
var BUILD_PATH = 'build';
var BUILD_PATH_TEMP = 'build/temp';

var config = {

  assets: {
    appHtmlSrc: [
      SOURCE_PATH + '/*/*.html'
    ],

    // App app javascript source
    appSrc: [
      SOURCE_PATH + '/**/*.js'
    ],

    // App style source
    appStyleSrc: [
      'bower_components/bootstrap-sass/assets/stylesheets/*.scss',
      SOURCE_PATH + '/**/*.scss'
    ],

    // Dependencies
    libSrc: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
    ],

    // Define lib styles here
    libStyleSrc: [

    ],

    // Define path for fonts
    fontSrc: [
      SOURCE_PATH + "/Fonts/*",
      "bower_components/bootstrap-sass/assets/fonts/bootstrap/**/*",
      "bower_components/font-awesome/fonts/**/*"
    ],

    // Define path for images
    imageSrc: [
      SOURCE_PATH + "/images/*"
    ],

    // Bundle files
    appScriptsBundleFileSrc: BUILD_PATH + '/js/app-bundle.min.js',
    libScriptsBundleFileSrc: BUILD_PATH + '/js/lib-bundle.min.js',
    appStylesBundleFileSrc: BUILD_PATH + '/css/style-bundle.min.css',
    libStylesBundleFileSrc: BUILD_PATH + '/css/libstyle-bundle.min.css',
  }
};

// Revisioned files
var revFiles = [
  config.assets.appScriptsBundleFileSrc,
  config.assets.libScriptsBundleFileSrc,
  config.assets.libStylesBundleFileSrc,
  config.assets.appStylesBundleFileSrc
];

// Use command line flag to trigger this, eg. 'gulp build --production'
var isProduction = gutil.env.production ? true : false;

// Renames files after build
gulp.task('rev-all', function () {
  var revAll = new RevAll({ dontRenameFile: ['index.html'] });
  return gulp.src(
    revFiles
    .concat(BUILD_PATH + '/index.html')
  )
  .pipe(revAll.revision())
  .pipe(size({
    title: 'rev'
  }))
  .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('templatecache', function () {
  return gulp.src(config.assets.appHtmlSrc)
  .pipe(size({
    title: 'html'
  }))
  .pipe(templateCache({
    standalone: true,
    transformUrl: function (url) {
        return 'views/' + url;
    }
    }))
  .pipe(isProduction ? uglify() : gutil.noop())
  .pipe(gulp.dest(SOURCE_PATH));
});

// Copy additional html files
gulp.task('html', function () {
  return gulp.src([SOURCE_PATH + '/index.html', SOURCE_PATH + "/robots.txt"])
  .pipe(gulp.dest(BUILD_PATH));
});

// Deletes all build files
gulp.task('clean', [], function () {
  return del([
    BUILD_PATH + '/index.html',
    BUILD_PATH + '/css',
    BUILD_PATH + '/js',
    BUILD_PATH + '/fonts',
    BUILD_PATH + '/images'
  ]);
});

gulp.task('del-lib-js', function () {
  return del([config.assets.libScriptsBundleFileSrc]);
});

gulp.task('del-app-js', function () {
  return del([config.assets.appScriptsBundleFileSrc]);
});

gulp.task('del-app-css', function () {
  return del([config.assets.appStylesBundleFileSrc]);
});

gulp.task('del-lib-css', function () {
  return del([config.assets.libStylesBundleFileSrc]);
});

gulp.task('del-temp', function () {
  return del(
    revFiles
  .concat(BUILD_PATH + '/js/templates.js')
  );
});

gulp.task("app-js", function () {
  return gulp.src(config.assets.appSrc)
    .pipe(concat("app-bundle.js"))
    .pipe(gulp.dest(BUILD_PATH + "/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(BUILD_PATH + "/js"));
});

gulp.task("app-css", function () {
  return gulp.src(config.assets.appStyleSrc)
  .pipe(sass().on("error", sass.logError))
  .pipe(concat("style-bundle.css"))
  .pipe(gulp.dest(BUILD_PATH + "/css"))
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest(BUILD_PATH + "/css"));
});

gulp.task("lib-js", function () {
  return gulp.src(config.assets.libSrc)
  .pipe(concat("lib-bundle.js"))
  .pipe(gulp.dest(BUILD_PATH + "/js"))
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest(BUILD_PATH + "/js"));
});

gulp.task("lib-css", [], function () {
  return gulp.src(config.assets.libStyleSrc)
 .pipe(concat("libstyle-bundle.css"))
 .pipe(gulp.dest(BUILD_PATH + "/css"))
 .pipe(minifyCss())
 .pipe(concat("libstyle-bundle.min.css"))
 .pipe(gulp.dest(BUILD_PATH + "/css"));
});

gulp.task("fonts", function () {
  gulp.src(config.assets.fontSrc)
    .pipe(gulp.dest(BUILD_PATH + "/fonts"));
});

gulp.task("images", function () {
  gulp.src(config.assets.imageSrc)
    .pipe(gulp.dest(BUILD_PATH + "/images"));
});

gulp.task("set-production-env", function () {
  gulp.src("config.json")
    .pipe(gulpNgConfig("appConfig", { environment: "production" }))
    .pipe(gulp.dest(SOURCE_PATH + "/js"));
});

gulp.task("set-dev-env", function () {
  gulp.src("config.json")
    .pipe(gulpNgConfig("appConfig", { environment: "development" }))
    .pipe(gulp.dest(SOURCE_PATH + "/js"));
});

gulp.task('build', function (callback) {
  runSequence(
    'clean',
    'templatecache',
    isProduction ? 'set-production-env' : 'set-dev-env',
    ['app-js', 'lib-js', 'app-css', 'lib-css', 'fonts', 'images', 'html'],
    'rev-all',
    'del-temp',
    callback
  );
});

gulp.task("watch", function () {
  gulp.watch("./src/**/*.html", ["build"]);
  gulp.watch("./src/**/*.js", ["app-js"]);
  gulp.watch("./src/**/*.scss", ["app-css"]);
});

//Set a default tasks
gulp.task("default", ["watch", "templatecache", "app-js", "app-css", "lib-js", "lib-css", "images", "fonts", "html"]);
