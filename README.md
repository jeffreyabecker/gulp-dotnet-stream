gulp-dotnet-stream
=============

A module to use the dotnet command in a gulp file with streams.
```js
var gulp = require('gulp');
var dotnet = require('gulp-dotnet-streams');
gulp.task('build',function(){
    gulp.src('path\to\my\project.json')
    .pipe(dotnet.build({'-f':'net461'}));
});
```

Supported Commands

  * dotnet build
  * dotnet restore
  * dotnet run
  * dotnet test
  * dotnet pack
  * dotnet publish

