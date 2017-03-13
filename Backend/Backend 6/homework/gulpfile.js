let gulp = require('gulp');
let jshint = require('gulp-jshint');
let stylish = require('jshint-stylish');
let csslint = require('gulp-csslint');
let cssStylish = require('csslint-stylish');

gulp.task('jshint', () => {
	gulp.src('main.js')
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
});

gulp.task('csslint', () => {
	gulp.src('mystyle.css')
			.pipe(csslint())
			.pipe(csslint.formatter(cssStylish));
})
