"use strict";
exports.__esModule = true;
var file_service_1 = require("../services/file.service");
var method_1 = require("../models/method");
var class_service_1 = require("../services/class.service");
var GeneseRequestServiceFactory = /** @class */ (function () {
    function GeneseRequestServiceFactory() {
        this.classCreatorService = new class_service_1.ClassService();
        this.fileService = new file_service_1.FileService();
    }
    GeneseRequestServiceFactory.prototype.init = function () {
        this.addImports();
        this.addDeclaration();
        this.addConstructor();
        this.addMethods();
        this.fileService.createFile("/genese/genese-api/services/genese-request.service.ts", this.classCreatorService.getContent());
    };
    GeneseRequestServiceFactory.prototype.addDeclaration = function () {
        this.classCreatorService.setClassDeclarationPart('GeneseRequestService', '@Injectable()');
    };
    GeneseRequestServiceFactory.prototype.addImports = function () {
        this.classCreatorService.addImport('Observable', 'rxjs');
        this.classCreatorService.addImport('HttpClient', '@angular/common/http');
        this.classCreatorService.addImport('Injectable', '@angular/core');
        this.classCreatorService.addImport('GeneseEnvironmentService', 'genese-angular');
    };
    GeneseRequestServiceFactory.prototype.addConstructor = function () {
        this.classCreatorService.addParamToConstructor("private http: HttpClient,");
        this.classCreatorService.addParamToConstructor("private geneseEnvironmentService: GeneseEnvironmentService,");
        this.classCreatorService.addInstructionToConstructor("this.init();");
    };
    GeneseRequestServiceFactory.prototype.addMethods = function () {
        var method = new method_1.Method();
        method.setDeclaration('init');
        this.classCreatorService.addMethod(method);
    };
    return GeneseRequestServiceFactory;
}());
exports.GeneseRequestServiceFactory = GeneseRequestServiceFactory;
