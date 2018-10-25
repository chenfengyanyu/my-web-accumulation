var gulp = require('gulp'),
	staticHash = require('gulp-static-hash'),
	sass = require('gulp-sass'),
	jade = require('gulp-jade'),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence'),
	gulpCopy = require('gulp-copy'),
	browserSync = require('browser-sync'),
     plumber = require('gulp-plumber'),
	colors = require('colors'),
     Fontmin = require('fontmin'),
     fontSpider = require( 'gulp-font-spider' );

//编译sass，移动新文件至public目录下
gulp.task('sass', function () {
	gulp.src('sass/**/[^_]*.scss')
     .pipe(plumber())
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./public/zh/assets/css'));
    	console.log(colors.yellow('<----------sass compile running!---------->'));
});
//编译jade，在views目录下创建html新文件
gulp.task('jade', function () {
	gulp.src('templates/**/[^_]*.jade')
     .pipe(plumber())
	.pipe(jade())
	.pipe(gulp.dest('./public/'));
	console.log(colors.yellow('<----------jade compile running!---------->'));
});
// 转换ttf平方字体包
gulp.task('font-convert',function() {
  var fontmin = new Fontmin()
    .src('fonts/*.ttf')
    .dest('public/zh/assets/fonts')
    .use(Fontmin.ttf2eot())
    .use(Fontmin.ttf2woff({
        deflate: true
    }))
    fontmin.run(function (err, files) {
      if (err) {
          throw err;
      }
    })
    console.log(colors.yellow('<----------font convert task running!---------->'));
});
// 精简字体包
gulp.task('font-min', function() {
    gulp.src('public/zh/**/*.html')
        .pipe(fontSpider({silent: false,backup: false,ignore: ['\\.woff2$']}))
    console.log(colors.yellow('<----------font min task running!---------->'));
});
//将assets静态资源拷贝到public发布目录下
gulp.task('copy',function () {
	gulp.src('assets/**/*')
	.pipe(gulpCopy('./public/zh/'));
  console.log(colors.yellow('<----------copy task running!---------->'));
});
//防止缓存
gulp.task('staticHash', function () {
    console.log(colors.yellow('<----------staticHash task running!---------->'));
    return gulp.src('public/zh/**/*.html')
    .pipe(staticHash({asset: 'public/'}))
    .pipe(gulp.dest('public/zh/'));
});
//清理
gulp.task('clean', function() {
    return gulp.src(['public'], {
        read: false
    })
    .pipe(clean());
    console.log(colors.yellow('<----------clean task  running!---------->'));
});
// 实时同步到浏览器
gulp.task('refresh',function() {
    browserSync({
        files: '**',
        server: {
            baseDir: './public/'
        },
        port: 4001
    });
});
gulp.task('default', ['clean'] , function() {
  runSequence('sass', 'jade','font-convert','copy','staticHash');
});
//监听
gulp.task('watch', function() {
   gulp.watch('sass/*.scss', ['sass']);
   gulp.watch('templates/**/*', ['jade']);
   gulp.watch('assets/**/*', ['copy']);
   // gulp.watch('fonts/*.ttf', ['font-convert']);
});
