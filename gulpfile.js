var gulp = require('gulp');
var less = require('gulp-less');
var nano = require('gulp-cssnano');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var swig = require('gulp-swig');
var markdown = require('markdown').markdown;
var unirest = require('unirest');
var runSequence = require('run-sequence');
var GulpSSH = require('gulp-ssh');

gulp.task('less', function() {
    return gulp.src('styles/style.less')
        .pipe(less())
        .pipe(nano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/'));
});
var functions_list = '';
gulp.task('get_functions_from_github', function(done){
    unirest.get('https://raw.githubusercontent.com/ClienDDev/ClienD-ext/dev/readme.md').end(function(res){
        var md = res.raw_body;
        var index_of_functions = md.indexOf('Функции');
        md = md.substring(index_of_functions);
        var header_index = md.indexOf('#');
        md = md.substr(0, header_index);
        md = '# ' + md;
        functions_list = markdown.toHTML(md);
        done();
    });
});

gulp.task('swig', function() {
    return gulp.src('./templates/index.html')
        .pipe(swig({
            data: {
                store_link: 'https://chrome.google.com/webstore/detail/hehpfoecbadnfboagjkeifdfgajhlloh',
                functions_list: functions_list,
                year: (new Date()).getFullYear()
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['get_functions_from_github'], function(){
	livereload.listen();
    var cb = function(){
        livereload.reload();
    };

	gulp.watch('styles/*.less', ['less', cb]);
    gulp.watch([
        'templates/*.html',
        'templates/pages/*.html',
    ], ['swig', cb]);
});

gulp.task('default', function(){
    return runSequence(
        'get_functions_from_github', 
        ['less', 'swig']
    );
});