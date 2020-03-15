"use strict";
exports.__esModule = true;
var class_service_1 = require("../services/class.service");
var file_service_1 = require("../services/file.service");
var method_1 = require("../models/method");
var ClassServiceFactory = /** @class */ (function () {
    function ClassServiceFactory() {
        this.classService = new class_service_1.ClassService();
        this.contentFile = '';
        this.fileService = new file_service_1.FileService();
        this.partOfContentFile = '';
    }
    // ----------------------------------------------------------------------------
    //					New ClassService from existing file
    // ----------------------------------------------------------------------------
    ClassServiceFactory.prototype.createClassServiceFromFile = function (path) {
        var _this = this;
        return this.fileService.readFile(path).then(function (contentFile) {
            _this.contentFile = contentFile;
            _this.partOfContentFile = _this.contentFile;
            _this.addImports()
                .addDeclaration()
                .addProperties()
                .addConstructor()
                .addMethods();
            return _this.classService;
        });
    };
    ClassServiceFactory.prototype.addImports = function () {
        var beforeExportClass = this.partOfContentFile.slice(0, this.partOfContentFile.indexOf('export class'));
        this.classService.importsPart = beforeExportClass.slice(0, beforeExportClass.lastIndexOf('@'));
        this.partOfContentFile = this.partOfContentFile.slice(beforeExportClass.lastIndexOf('@'));
        return this;
    };
    ClassServiceFactory.prototype.addDeclaration = function () {
        this.classService.classDeclarationPart = this.partOfContentFile.slice(0, this.partOfContentFile.indexOf('{') + 1) + "\r\n";
        this.partOfContentFile = this.partOfContentFile.slice(this.partOfContentFile.indexOf('{') + 1);
        return this;
    };
    ClassServiceFactory.prototype.addProperties = function () {
        this.classService.propertiesPart = "" + this.partOfContentFile.slice(0, this.partOfContentFile.indexOf('constructor') - 3);
        this.partOfContentFile = this.partOfContentFile.slice(this.partOfContentFile.indexOf('constructor') - 3);
        return this;
    };
    ClassServiceFactory.prototype.addConstructor = function () {
        this.classService.constructorPart = this.partOfContentFile.slice(0, this.partOfContentFile.indexOf('}') + 1) + "\r\n";
        this.partOfContentFile = this.partOfContentFile.slice(this.partOfContentFile.indexOf('}'));
        return this;
    };
    ClassServiceFactory.prototype.addMethods = function () {
        this.partOfContentFile = this.partOfContentFile.slice(1, this.partOfContentFile.lastIndexOf('}'));
        while (this.partOfContentFile.indexOf('{') > 0) {
            this.addLastMethod(this.partOfContentFile);
        }
        this.partOfContentFile.lastIndexOf('}');
        this.classService.setMethodsPart();
        return this;
    };
    ClassServiceFactory.prototype.addLastMethod = function (text) {
        var method = new method_1.Method();
        var textBeforeLastBracket = text.slice(0, text.lastIndexOf('}'));
        var numberOfRightBrackets = 1;
        var charIndex = this.partOfContentFile.length;
        while (numberOfRightBrackets > 0 && charIndex > 0) {
            if (textBeforeLastBracket.charAt(charIndex) === '}') {
                numberOfRightBrackets++;
            }
            if (textBeforeLastBracket.charAt(charIndex) === '{') {
                numberOfRightBrackets--;
            }
            charIndex--;
        }
        method.body = textBeforeLastBracket.slice(charIndex + 2);
        var textBeforeFirstBracketLastMethod = textBeforeLastBracket.slice(0, charIndex + 2);
        method.declaration = textBeforeFirstBracketLastMethod.slice(textBeforeFirstBracketLastMethod.lastIndexOf('\t') + 1);
        method.setNameParamsType(method.declaration);
        this.partOfContentFile = textBeforeFirstBracketLastMethod.slice(0, textBeforeFirstBracketLastMethod.lastIndexOf('\t'));
        this.classService.addMethod(method);
    };
    return ClassServiceFactory;
}());
exports.ClassServiceFactory = ClassServiceFactory;
