"use strict";
exports.__esModule = true;
var file_service_1 = require("../services/file.service");
var method_1 = require("../models/method");
var class_service_1 = require("../services/class.service");
var GeneseRequestServiceFactory = /** @class */ (function () {
    function GeneseRequestServiceFactory() {
        this.classService = new class_service_1.ClassService();
        this.fileService = new file_service_1.FileService();
    }
    GeneseRequestServiceFactory.prototype.init = function () {
        this.addImports();
        this.addDeclaration();
        this.addConstructor();
        this.addMethods();
        this.fileService.createFile("/genese/genese-api/services/genese-request.service.ts", this.classService.getContent());
    };
    GeneseRequestServiceFactory.prototype.addDeclaration = function () {
        this.classService.setClassDeclarationPart('GeneseRequestService', '@Injectable()');
    };
    GeneseRequestServiceFactory.prototype.addImports = function () {
        this.classService.addImport('Observable', 'rxjs');
        this.classService.addImport('HttpClient', '@angular/common/http');
        this.classService.addImport('Injectable', '@angular/core');
        this.classService.addImport('GeneseEnvironmentService', 'genese-angular');
    };
    GeneseRequestServiceFactory.prototype.addConstructor = function () {
        this.classService.addParamToConstructor("private http: HttpClient,");
        this.classService.addParamToConstructor("private geneseEnvironmentService: GeneseEnvironmentService,");
        this.classService.addInstructionToConstructor("this.init();");
    };
    GeneseRequestServiceFactory.prototype.addMethods = function () {
        var method = new method_1.Method();
        method.setDeclaration('init');
        this.classService.addMethod(method);
    };
    return GeneseRequestServiceFactory;
}());
exports.GeneseRequestServiceFactory = GeneseRequestServiceFactory;
