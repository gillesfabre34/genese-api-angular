"use strict";
exports.__esModule = true;
var part_file_enum_1 = require("../models/part-file.enum");
var ClassService = /** @class */ (function () {
    function ClassService() {
        this.classDeclarationPart = '';
        this.constructorInstructions = '';
        this.constructorParams = '';
        this.constructorPart = '';
        this.content = '';
        this.endOfFilePart = '\r\n}\r\n';
        this.importsPart = '';
        this.methods = [];
        this.methodsPart = '';
        this.propertiesPart = '\r\n';
    }
    ClassService.prototype.addLine = function (partClass, text) {
        this[partClass] += text;
    };
    ClassService.prototype.addImport = function (name, from) {
        var line = "import { " + name + " } from '" + from + "';\r\n";
        this.addLine(part_file_enum_1.PartFile.IMPORTS, line);
    };
    // ----------------------------------------------------------------------------
    //							Properties generation
    // ----------------------------------------------------------------------------
    ClassService.prototype.addProperty = function (line) {
        if (line === void 0) { line = ''; }
        this.propertiesPart = this.propertiesPart ? this.propertiesPart + "\t" + line + "\r\n\t" : "\t" + line + "\r\n\t";
    };
    // ----------------------------------------------------------------------------
    //							Constructor generation
    // ----------------------------------------------------------------------------
    ClassService.prototype.setConstructorPart = function () {
        this.constructorPart = "\tconstructor(\r\n\t\t" + this.constructorParams + ") {\r\n\t\t" + this.constructorInstructions + "}\r\n";
    };
    ClassService.prototype.addInstructionToConstructor = function (line) {
        if (line === void 0) { line = ''; }
        this.constructorInstructions = "" + this.constructorInstructions + line + "\r\n\t";
        this.setConstructorPart();
    };
    ClassService.prototype.addParamToConstructor = function (param) {
        if (param === void 0) { param = ''; }
        this.constructorParams = "" + this.constructorParams + param + "\r\n\t\t";
        this.setConstructorPart();
    };
    // ----------------------------------------------------------------------------
    //							 Methods generation
    // ----------------------------------------------------------------------------
    ClassService.prototype.setMethodsPart = function () {
        this.methodsPart = '';
        for (var _i = 0, _a = this.methods; _i < _a.length; _i++) {
            var method = _a[_i];
            this.methodsPart += "\r\n\r\n\r\n\t" + method.stringify();
        }
    };
    ClassService.prototype.addMethod = function (method) {
        this.methods.push(method);
        this.setMethodsPart();
    };
    ClassService.prototype.addLineToMethod = function (methodName, line) {
        var method = this.methods.find(function (e) { return e.name === methodName; });
        if (method) {
            method.body = method.body ? method.body + "\t" + line : "\t\t" + line;
        }
        this.setMethodsPart();
    };
    // ----------------------------------------------------------------------------
    //							Other methods
    // ----------------------------------------------------------------------------
    ClassService.prototype.setClassDeclarationPart = function (className, decorator) {
        var firstLine = decorator ? "\r\n" + decorator + "\r\n" : '\r\n';
        this.classDeclarationPart = firstLine + "export class " + className + " {\r\n\r\n";
    };
    ClassService.prototype.getContent = function () {
        this.content = "" + this.importsPart + this.classDeclarationPart + this.propertiesPart +
            ("" + this.constructorPart + this.methodsPart + this.endOfFilePart);
        return this.content;
    };
    ClassService.prototype.formatFileName = function (className) {
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
    return ClassService;
}());
exports.ClassService = ClassService;
