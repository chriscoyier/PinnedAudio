var gulp = require("gulp"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  sourcemaps = require("gulp-sourcemaps"),
  browserSync = require("browser-sync").create();

var paths = {
  styles: {
    src: "scss/*.scss",
    dest: "./",
  },
};

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

function reload(done) {
  browserSync.reload();
  done();
}

function watch() {
  browserSync.init({
    proxy: "localhost:10042",
  });
  gulp.watch(paths.styles.src, style);
  gulp.watch("src/*.php").on("change", browserSync.reload);
}

exports.watch = watch;

// $ gulp style
exports.style = style;

var build = gulp.parallel(style, watch);

gulp.task("default", build);
