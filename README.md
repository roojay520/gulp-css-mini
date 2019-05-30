# gulp-css-min
一个 gulp css 压缩插件, fork 自[gulp-cssmin](https://www.npmjs.com/package/gulp-cssmin) 原项目已不再维护, 替换了一些已经过期的依赖包.

## 安装

`yarn add @feq/gulp-css-min -D `

## 示例

```javascript
const gulp = require('gulp');
const rename = require('gulp-rename');
const cssmin = require('@feq/gulp-css-min');

gulp.task('default', async () => {
  await gulp.src('demo/test.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('demo/'));
});
```

## 配置

`cssmin(minifyOptions?: object, pluginOptions?: object)`

* minifyOptions: 查看 clean-css [options](https://github.com/jakubpawlowicz/clean-css)
* pluginOptions
  * log?: boolean,  是否显示日志, 默认为`false`