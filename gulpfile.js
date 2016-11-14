// gulpを導入
var gulp = require('gulp');

// 導入されているプラグイン
var rename = require('gulp-rename'),
	 SCSS = require('gulp-sass'),
	sass = require('gulp-sass'),
	path = require('path'),
	cssnano = require('gulp-cssnano'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	csscomb = require('gulp-csscomb'),
	plumber = require('gulp-plumber'),
	replace = require('gulp-replace');

//cenecテーマ
//SCSSファイルをCSSにコンパイルする
gulp.task('sass', function () {
	gulp.src(['src/scss/**/*.scss'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9'],
			cascade: false
		}))
		.pipe(csscomb())
		.pipe(replace('!important',''))
		.pipe(replace('@charset \"UTF-8\";\n',''))
		.pipe(gulp.dest('dist/css'));
});
// SCSSファイルを圧縮する
gulp.task('min', function () {
	gulp.src(['src/scss/**/*.scss'])
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9'],
			cascade: false
		}))
		.pipe(csscomb())
		.pipe(replace('!important',''))
		.pipe(replace('@charset \"UTF-8\";\n',''))
		.pipe(cssnano({safe: true}))
		.pipe(gulp.dest('dist/css'));
});


//cenecの SCSSとCSSファイルを監視する
gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss',['sass']);
	gulp.watch('src/scss/amp.scss',['min']);
});

// デフォルトのタスク
gulp.task('default', ['watch']);
