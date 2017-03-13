let gulp = require('gulp');
let nodemon = require('gulp-nodemon');
let minify = require('gulp-minify');
let browserSync = require('browser-sync');

gulp.task('default', ['task1', 'task2'], () => {
	console.log("Default task");
});

gulp.task('task1', () => {
	console.log("ahihi");
});

gulp.task('task2', () => {
	console.log("dsdsdds ");
});

gulp.task('serve', ['run'], () => {
	browserSync.init({
		proxy	: 'http://localhost:9000',
		files : ['client/**/*.*'],
		port	:	9001
	})
})

gulp.task('run', () => {
	nodemon({
		script: 'app.js'
	});
});

gulp.task('minify', () => {
	gulp.src('src/*.js')
			.pipe(minify())
			.pipe(gulp.dest('dest'));
});

gulp.task('watch', () => {
	gulp.watch('app.js', () => {
		console.log('app.js is changed');
	});
});
