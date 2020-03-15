"use strict";
exports.__esModule = true;
var fse = require('fs-extra');
var appRootPath = require('app-root-path');
var FileService = /** @class */ (function () {
    function FileService() {
        this.appRoot = appRootPath.toString();
    }
    FileService.prototype.createFile = function (folder, name, data) {
        console.log('createFile folder', folder);
        console.log('createFile name', name);
        var pathFolder = this.appRoot + folder;
        fse.mkdirpSync(pathFolder);
        fse.writeFileSync(pathFolder + name, data);
    };
    // createFile(path, data): void {
    // 	console.log('createFile path', path);
    // 	let pathFolder = this.appRoot + path;
    // 	if (path.includes('/')) {
    // 		const splittedPath = path.split('/');
    // 		pathFolder = this.appRoot + path.slice(0, path.length - splittedPath[splittedPath.length - 1].length);
    // 		fse.mkdirpSync(pathFolder);
    // 	}
    // 	fse.writeFileSync(this.appRoot + path, data);
    // }
    FileService.prototype.readFile = function (path) {
        return fse.readFile(this.appRoot + path, 'utf-8');
    };
    FileService.prototype.removeFile = function (path) {
        return fse.removeSync(this.appRoot + path);
    };
    FileService.prototype.formatFileName = function (className) {
        var fileName = className.charAt(0).toLowerCase();
        for (var i = 1; i < className.length; i++) {
            if (className.charAt(i).toLowerCase() !== className.charAt(i)) {
                fileName += "-" + className.charAt(i).toLowerCase();
            }
            else {
                fileName += className.charAt(i);
            }
        }
        fileName = fileName.replace('_', '-');
        return fileName;
    };
    return FileService;
}());
exports.FileService = FileService;
