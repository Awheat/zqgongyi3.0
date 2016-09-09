/*
    gulpfile.js
    create by wuwc in 2016-08-17
*/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglifycss = require('gulp-uglifycss'),
    uglify = require('gulp-uglify'),
    htmlImport = require('gulp-html-import'),
    transport = require('gulp-seajs-transport'),
    concat = require('gulp-seajs-concat'),
    replace = require('gulp-replace'),
    merge = require('merge-stream'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;
    
    //server
    gulp.task('server', function() {
        browserSync.init({
            server: './'
        });
        gulp.watch('src/css/*.css').on('change', reload);
        gulp.watch('src/*.html', ['importHTML']);
        gulp.watch("src/js/**/*.js").on('change', reload);
    });

    //处理css
    gulp.task('css', function() {
        return gulp.src('src/css/*.css')
            .pipe(uglifycss())
            .pipe(gulp.dest('dist/css'))
    });
    //引入公共部分
    gulp.task('importHTML',function(){
        return gulp.src('src/*.html')
            .pipe(htmlImport('src/tpl/'))
            .pipe(gulp.dest('src/views'))
            .pipe(reload({stream: true}));
    });
    // 处理html
    gulp.task('html',function(){
        return gulp.src('src/views/*.html')
            .pipe(replace(/(\/src\/)/g, '/dist/'))
            .pipe(gulp.dest('dist/views'))
    });

    // 处理img
    gulp.task('img',function(){
        return gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/images'));
    });

    //处理Js
    gulp.task('js',function(){
        return gulp.src(['dist/js/**/*.js','!dist/js/libs/*.js'])
            .pipe(uglify({
                mangle: { except: ['require', 'exports', 'module', '$'] },
                preserveComments: 'license'
            }).on('error',function(e){console.log(e)}))
            .pipe(gulp.dest('dist/jss'))
            .pipe(reload({stream: true}));
    });


    //seajs
    gulp.task("seajs",function(){
        return merge(
            gulp.src(['src/js/**/*.js','!src/js/libs/*.js'], {base:'src/js'})
                .pipe(replace(/src/g, 'dist'))
                .pipe(transport())
                .pipe(concat({
                    base: 'src/js'
                }))
                .pipe(uglify({
                    mangle: { except: ['require', 'exports', 'module', '$'] }
                    //preserveComments: 'license'
                }).on('error',function(e){console.log(e)}))
                .pipe(gulp.dest('dist/js')),
            gulp.src(['src/js/libs/**/*.js'], {base: 'src/js'})
                .pipe(gulp.dest('dist/js'))
        );
    });

    //开发
    gulp.task('default',['server']);

    //生产
    gulp.task('build',['css','img','html','seajs','server']);