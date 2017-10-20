//
// gulpfile.babel.js
// calder-gl
//

import babel      from "gulp-babel";
import gulp       from "gulp";
import merge      from "merge2";
import typescript from "gulp-typescript";

const src = ["./src/**/*.ts", "./test/**/*.ts"];
const out = "./build";
const babelConf = { presets: ["es2015"] };

const project = typescript.createProject("tsconfig.json", {
  outDir: out,
  typescript: require("typescript")
});

// Gulp task to build .ts to es5 using babel
gulp.task("build", function () {
  var result = gulp.src(src).pipe(typescript(project));

  return merge([
    result.dts.pipe(gulp.dest(`${out}/definitions`)),
    result.js
      .pipe(babel(babelConf))
      .pipe(gulp.dest(`${out}/js`))
  ]);
});

// Gulp task to watch for changes to .ts files, and build on change
gulp.task("watch", ["build"], function () {
  gulp.watch(src, ["build"]);
});

// Set default gulp task as 'build' task
gulp.task("default", ["build"]);
