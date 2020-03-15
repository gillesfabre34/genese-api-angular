"use strict";
exports.__esModule = true;
var file_service_1 = require("../services/file.service");
var class_service_1 = require("../services/class.service");
var method_1 = require("../models/method");
var tools_1 = require("../services/tools");
var genese_request_service_factory_1 = require("./genese-request-service.factory");
var GetRequestFactory = /** @class */ (function () {
    function GetRequestFactory() {
        this.classService = new class_service_1.ClassService();
        this.className = '';
        this.classNameService = '';
        this.content = '';
        this.fileService = new file_service_1.FileService();
        this.method = new method_1.Method();
        this.observableType = '';
        this.route = '';
    }
    GetRequestFactory.prototype.create = function (route, content) {
        // console.log('GET REQUEST FACTORY create content', content);
        this.route = route;
        this.setFileName();
        this.setClassName();
        this.addImports();
        this.addDeclaration();
        this.addConstructor();
        this.classService.setClassDeclarationPart(this.classNameService, '@Injectable()');
        for (var _i = 0, _a = Object.keys(content); _i < _a.length; _i++) {
            var mediaType = _a[_i];
            this.addMediaTypes(content[mediaType]);
        }
        this.fileService.createFile('/genese/genese-api/services/', this.classService.fileName + ".service.ts", this.classService.getContent());
        this.addMethodToGeneseRequestService();
    };
    GetRequestFactory.prototype.addImports = function () {
        this.classService.addImport('Observable', 'rxjs');
        this.classService.addImport('HttpClient', '@angular/common/http');
        this.classService.addImport('Injectable', '@angular/core');
        this.classService.addImport('GeneseEnvironmentService, GeneseService', 'genese-angular');
    };
    GetRequestFactory.prototype.addDeclaration = function () {
        this.classService.setClassDeclarationPart(this.classNameService, '@Injectable()');
    };
    GetRequestFactory.prototype.addConstructor = function () {
        this.classService.addParamToConstructor("private http: HttpClient,");
        this.classService.addParamToConstructor("private geneseEnvironmentService: GeneseEnvironmentService,");
        this.classService.addParamToConstructor("private geneseService: GeneseService,");
    };
    GetRequestFactory.prototype.addMethod = function (geneseMethod, dtoName) {
        this.method.name = "" + geneseMethod + this.className;
        this.method.setDeclaration(this.method.name, '', "Observable<" + this.observableType + ">");
        this.classService.addMethod(this.method);
        var returnLine = "return this.geneseService.getGeneseInstance(" + dtoName + ")." + geneseMethod + "Custom('" + this.route + "') as any;";
        this.classService.addLineToMethod(this.method.name, returnLine);
        this.classService.addImport(dtoName, "../dtos/" + this.fileService.formatFileName(dtoName) + ".dto");
    };
    GetRequestFactory.prototype.setFileName = function () {
        var cleanedPath = this.route.charAt(0) === '/' ? this.route.slice(1) : this.route;
        cleanedPath = cleanedPath.replace('{', '');
        cleanedPath = cleanedPath.replace('}', '');
        var fileName = cleanedPath.replace(/\//g, '-');
        this.classService.fileName = fileName.replace('_', '-');
    };
    GetRequestFactory.prototype.setClassName = function () {
        var cleanedPath = this.route.charAt(0) === '/' ? this.route.slice(1) : this.route;
        cleanedPath = cleanedPath.replace('{', '');
        cleanedPath = cleanedPath.replace('}', '');
        var splittedFileName = cleanedPath.split('/');
        var className = tools_1.Tools.capitalize(splittedFileName[0]);
        this.className = className;
        for (var i = 1; i < splittedFileName.length; i++) {
            className += tools_1.Tools.capitalize(splittedFileName[i]);
        }
        this.classNameService = className + "Service";
    };
    GetRequestFactory.prototype.addMediaTypes = function (mediaType) {
        if (mediaType.schema) {
            this.getReferenceOrSchema(mediaType.schema);
        }
    };
    GetRequestFactory.prototype.getReferenceOrSchema = function (schema) {
        if (schema['$ref']) {
            this.getReference(schema['$ref']);
        }
        else if (schema['type']) {
            this.getRootSchema(schema);
        }
    };
    GetRequestFactory.prototype.getReference = function (referenceSchema) {
        this.observableType = this.getDtoName(referenceSchema);
        this.addMethod('get', this.getDtoName(referenceSchema));
    };
    GetRequestFactory.prototype.getRootSchema = function (rootSchema) {
        switch (rootSchema.type) {
            case 'array':
                if (rootSchema.items) {
                    if (rootSchema.items.$ref) {
                        this.observableType = this.getDtoName(this.getDtoName(rootSchema.items.$ref) + "[]");
                        this.addMethod('get', this.getDtoName(rootSchema.items.$ref));
                    }
                }
                break;
            default: { }
        }
    };
    GetRequestFactory.prototype.getDtoName = function (referenceSchema) {
        var splittedReferenceSchema = referenceSchema.split('/');
        return splittedReferenceSchema[splittedReferenceSchema.length - 1];
    };
    GetRequestFactory.prototype.addMethodToGeneseRequestService = function () {
        var geneseRequestService = genese_request_service_factory_1.GeneseRequestServiceFactory.getInstance().classService;
        geneseRequestService.addImport(this.observableType, "../dtos/" + this.observableType);
        geneseRequestService.addLineToMethod('init', "this." + this.method.name + " = this." + tools_1.Tools.unCapitalize(this.classNameService) + "." + this.method.name + ";");
        geneseRequestService.addProperty("public " + this.method.name + ": () => Observable<" + this.observableType + ">;");
        console.log('ZZZZZZZZZZZZ geneseRequestService.getContent()', geneseRequestService.getContent());
        // this.fileService.removeFile(`/genese/genese-api/services/genese-request.service.ts`);
        this.fileService.createFile("/genese/genese-api/services/", "genese-request.service.ts", geneseRequestService.getContent());
    };
    // ----------------------------------------------------------------------------
    //							TODO Methods to remove ?
    // ----------------------------------------------------------------------------
    GetRequestFactory.prototype.createDtoByMediaType = function (mediaType) {
        switch (mediaType) {
            case 'application/json':
                break;
            default:
        }
    };
    GetRequestFactory.prototype.getContent = function () {
        return this.content;
    };
    GetRequestFactory.prototype.addDefaultValue = function (property) {
        switch (property.type) {
            case 'array':
                this.addContentForArrays(property);
                break;
            case 'boolean':
                this.content += 'false';
                break;
            case 'integer':
            case 'number':
                this.content += '0';
                break;
            case 'string':
                this.content += '\'\'';
                break;
            default: {
                if (property['$ref']) {
                    this.addNestedSchema(property['$ref']);
                }
            }
        }
    };
    GetRequestFactory.prototype.addNestedSchema = function (path) {
        var pathSplitted = path.split('/');
        var schema = pathSplitted ? pathSplitted[pathSplitted.length - 1] : '';
        if (schema) {
            this.content += 'new ' + schema + '()';
        }
        var lineImport = 'import { ' + schema + ' } from \'./' + schema.toLowerCase() + '.dto\';\r\n';
        return this.content = lineImport + this.content;
    };
    GetRequestFactory.prototype.addContentForArrays = function (property) {
        this.content += '[';
        if (property && property.items) {
            this.addDefaultValue(property.items);
        }
        this.content += ']';
    };
    return GetRequestFactory;
}());
exports.GetRequestFactory = GetRequestFactory;
