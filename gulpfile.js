var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var prefix = require('gulp-autoprefixer');


gulp.task("sass", function () {
    return gulp.src("scss/main.scss")
        .pipe (sourcemaps.init())
        .pipe (sass({errLogToConsole: true}))
        .on('error',function(e){
            console.error("gulpError", e)
        })
        .pipe(prefix('last 2 versions'))
        .pipe (sourcemaps.write())
        .pipe (gulp.dest("css/."))
});


gulp.task("watch", function () {
    gulp.watch("scss/**/*.scss", ["sass"]);
});