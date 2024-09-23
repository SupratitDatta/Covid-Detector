const {src,dest,watch} = require('gulp')

const sass = require('gulp-sass')(require('sass'));

function css() {
    return src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(dest('./src/css/'))
}

exports.buildCss = css

exports.watch = function (){
    watch('./src/scss/*.scss',css)
}
