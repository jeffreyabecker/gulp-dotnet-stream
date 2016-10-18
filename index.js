'use strict';

var proc = require('child_process');
var through = require('through2');
var process = require('process');


function _flattenOptions(optionsArr){
    let result = [];
    optionsArr = optionsArr || [];
    for(let i = 0; i<optionsArr.length; i++){
        let val = optionsArr[i];
        if(typeof val === 'object'|| val instanceof Object){
            for(let k in val){
                if(val.hasOwnProperty(k) && val[k] !== undefined){
                    result.push(k);
                    result.push(val[k]);
                }
            }
        } 
        else{
            if(val !== undefined ){
                result.push(val);
            }
        }
    }
    return result;
}


module.exports = {

    restore:function(options){
        return through.obj(function (file, enc, cb) {
            if (!file || !file.path) {
                cb(null, file);
                return;
            }                       
            let args = _flattenOptions(['restore', file.path, options]);
            let cmd = proc.spawn('dotnet', args);
            cmd.stdout.pipe(process.stdout);
            cmd.stderr.pipe(process.stderr);
            cmd.on('close',(code)=>cb());
        });
    },
    build:function(options){

        return through.obj(function (file, enc, cb) {
            if (!file || !file.path) {
                cb(null, file);
                return;
            }

            let args = _flattenOptions(['build', options, file.path]);
            let cmd = proc.spawn('dotnet', args);
            cmd.stdout.pipe(process.stdout);
            cmd.stderr.pipe(process.stderr);
            cmd.on('close',(code)=>cb());
        });
    },
    publish:function(options){
        return through.obj(function (file, enc, cb) {
            if (!file || !file.path) {
                cb(null, file);
                return;
            }

            let args = _flattenOptions(['publish', options, file.path]);
            let cmd = proc.spawn('dotnet', args);
            cmd.stdout.pipe(process.stdout);
            cmd.stderr.pipe(process.stderr);
            cmd.on('close',(code)=>cb());
        });
    },

    run:function(options){
        return through.obj(function (file, enc, cb) {
            if (!file || !file.path) {
                cb(null, file);
                return;
            }

            let args = _flattenOptions(['run', options, '--project', file.path]);
            let cmd = proc.spawn('dotnet', args);
            cmd.stdout.pipe(process.stdout);
            cmd.stderr.pipe(process.stderr);
            cmd.on('close',(code)=>cb());
        });        
    },
    test:function(options){
        return through.obj(function (file, enc, cb) {
            if (!file || !file.path) {
                cb(null, file);
                return;
            }

            let args = _flattenOptions(['test', options, file.path]);
            console.log(args.join(', '));
            let cmd = proc.spawn('dotnet', args);
            cmd.stdout.pipe(process.stdout);
            cmd.stderr.pipe(process.stderr);
            cmd.on('close',(code)=>cb());
        });
    }    

}
;