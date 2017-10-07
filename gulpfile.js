//本地安装gulp:为了在此处引入gulp
//require():commonjs的规范
var gulp = require('gulp');
var sass = require('gulp-sass');


// 编译sass
// 利用gulp任务来编译
// 创建gulp任务：gulp.task()
gulp.task('g',function(){
    // 查找sass文件
    // 匹配文件成功后，返回文档流
    // gulp.src(['./src/sass/*.scss','!./src/sass/var.scss'])
    gulp.src('./src/sass/*.scss')

        // 编译sass文件
        .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))

        // 输出文件到硬盘
        .pipe(gulp.dest('./src/css/'));
});



// 监听sass文件修改
gulp.task('j',function(){
    // 监听home.scss文件，如果有修改,则自动自动compileSass任务
    gulp.watch('./src/sass/*.scss',['g']);
});

// 合并压缩
/*var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('mergeJs',function(){
    // 匹配所有js文件
    gulp.src(['./src/js/*.js','!./src/js/all.js'])

        // 合并所有js文件到all.js
        .pipe(concat('all.js'))

        // 输出文件
        .pipe(gulp.dest('./src/js/'))

        // 压缩
        .pipe(uglify())

        // 改名
        .pipe(rename({suffix:'.min'}))

        .pipe(gulp.dest('./src/js/'))
});*/

//自动刷新服务器
// php服务器(12306):能解析php文件
// browserSync服务器(666):能自动刷新
var browserSync = require('browser-sync');
gulp.task('s',function(){
    // 创建服务器
    browserSync({
        //指定服务器目录
        //server:'./src',
        //代理
        proxy:'http://localhost:1704',

        //指定服务器端口
        // port:666
        
        //监听文件修改
        //当文件有修改时,自动刷新页面
        
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    });

    //监听sass的修改
    gulp.watch('./src/sass/*.scss',['g']);
});