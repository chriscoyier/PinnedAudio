var gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create(),
  replace = require("gulp-replace");

var paths = {
  styles: {
    src: "scss/*.scss",
    dest: "./",
  },
  scripts: {
    src: "javascripts/*.js",
    dest: "javascripts/min/",
  },
};

function cacheBust(src, dest) {
  var cbString = new Date().getTime();
  return gulp
    .src(src)
    .pipe(
      replace(/cache_bust=\d+/g, function() {
        return "cache_bust=" + cbString;
      })
    )
    .pipe(gulp.dest(dest));
}

function doStyles(done) {
  return gulp.series(style, (done) => {
    cacheBust("./functions.php", "./");
    done();
  })(done);
}

function style() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function doScripts(done) {
  return gulp.series(reload, (done) => {
    cacheBust("./footer.php", "./");
    done();
  })(done);
}

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  // This URL is specific to how I have my Local by Flywheel setup 🤷‍♀️
  browserSync.init({
    proxy: "localhost:10042",
  });
  gulp.watch(paths.styles.src, doStyles);
  gulp.watch(paths.scripts.src, doScripts);
  gulp.watch("src/*.php").on("change", browserSync.reload);
}

exports.watch = watch;

// $ gulp style
exports.style = style;

var build = gulp.parallel(style, watch);

gulp.task("default", build);
