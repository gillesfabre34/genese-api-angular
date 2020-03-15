"use strict";
exports.__esModule = true;
var fse = require('fs-extra');
var appRootPath = require('app-root-path');
var FileService = /** @class */ (function () {
    function FileService() {
        this.appRoot = appRootPath.toString();
    }
    FileService.prototype.createFile = function (path, data) {
        // console.log('createFile path', path);
        // console.log('createFile this.appRoot', this.appRoot);
        // console.log('createFile', this.appRoot + path);
        var pathFolder = this.appRoot + path;
        if (path.includes('/')) {
            var splittedPath = path.split('/');
            pathFolder = this.appRoot + path.slice(0, path.length - splittedPath[splittedPath.length - 1].length);
            fse.mkdirpSync(pathFolder);
        }
        fse.writeFileSync(this.appRoot + path, data);
    };
    FileService.prototype.readFile = function (path) {
        return fse.readFileSync(this.appRoot + path, 'utf-8');
    };
    FileService.prototype.removeFile = function (path) {
        return fse.removeSync(this.appRoot + path);
    };
    return FileService;
}());
exports.FileService = FileService;
