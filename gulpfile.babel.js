//
// gulpfile.babel.js
// calder-gl
//

import babel from "gulp-babel";
import gulp from "gulp";
import changed from "gulp-changed";
import merge from "merge2";
import typescript from "gulp-typescript";
import browserify from "browserify";
import uglify from "gulp-uglify";
import sourcemaps from "gulp-sourcemaps";
import source from "vinyl-source-stream";
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';

const src = ["./src/**/*.ts"];
const test =  ["./test/**/*.js"]
const sample =  ["./sample/**/*.js"]
const out = "./build";
const babelConf = { presets: ["es2015"] };

const project = typescript.createProject("tsconfig.json", {
    outDir: out,
    typescript: require("typescript")
});

// Gulp task to build changed Typescript and tests
gulp.task("build", function () {
    const sourceDestination = `${out}/js/src`;
    const testDestination = `${out}/js/test`;
    const sampleDestination = `${out}/js/sample`;

    const result = gulp.src(src)
    .pipe(changed(sourceDestination))
    .pipe(typescript(project));

    return merge([
        result.dts.pipe(gulp.dest(`${out}/definitions`)),
        result.js
            .pipe(babel(babelConf))
            .pipe(gulp.dest(sourceDestination)),
        gulp.src(test)
            .pipe(changed(testDestination))
            .pipe(babel(babelConf))
            .pipe(gulp.dest(testDestination)),
        gulp.src(sample)
            .pipe(changed(sampleDestination))
            .pipe(babel(babelConf))
            .pipe(gulp.dest(sampleDestination))
    ]);
});

gulp.task("browser", function() {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: `${out}/js/sample/index.js`,
        debug: true
    });

    return b.bundle()
        .pipe(source(`index.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${out}/js/browser`));
});

// Gulp task to watch for changes to .ts files, and build on change
gulp.task("watch", ["build"], function () {
    gulp.watch([src, test], ["build"]);
});

// Set default gulp task as 'build' task
gulp.task("default", ["build"]);
