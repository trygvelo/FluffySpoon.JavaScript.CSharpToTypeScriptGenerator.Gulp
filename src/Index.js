"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fluffy_spoon_javascript_csharp_to_typescript_generator_1 = require("fluffy-spoon.javascript.csharp-to-typescript-generator");
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'fluffy-spoon.javascript.csharp-to-typescript-generator.gulp';
module.exports = function (options) {
    if (!options)
        options = {};
    var stream = through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, "Streams not supported yet!"));
            return cb();
        }
        if (file.isBuffer()) {
            if (file.contents) {
                var csharpCode = file.contents.toString();
                var emitter = new fluffy_spoon_javascript_csharp_to_typescript_generator_1.FileEmitter(csharpCode);
                var typescriptCode = emitter.emitFile(options);
                file.contents = new Buffer(typescriptCode);
                var suffix = "d.ts";
                file.path = file.path.substring(0, file.path.length - 2) + suffix;
            }
        }
        this.push(file);
        cb();
    });
    return stream;
};
//# sourceMappingURL=Index.js.map