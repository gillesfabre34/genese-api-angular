"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var file_service_1 = require("../services/file.service");
var class_service_1 = require("../services/class.service");
var method_1 = require("../models/method");
var tools_1 = require("../services/tools");
var class_service_factory_1 = require("./class-service.factory");
var GetRequestFactory = /** @class */ (function () {
    function GetRequestFactory() {
        this.classService = new class_service_1.ClassService();
        this.className = '';
        this.classNameService = '';
        this.content = '';
        this.fileName = '';
        this.fileService = new file_service_1.FileService();
        this.classServiceFactory = new class_service_factory_1.ClassServiceFactory();
        this.method = new method_1.Method();
        this.observableType = '';
        this.path = '';
    }
    GetRequestFactory.prototype.create = function (path, content) {
        // console.log('GET REQUEST FACTORY create content', content);
        this.path = path;
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
        this.fileService.createFile("/genese/genese-api/services/" + this.fileName + ".service.ts", this.classService.getContent());
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
        var returnLine = "return this.geneseService.getGeneseInstance(" + dtoName + ")." + geneseMethod + "Custom('" + this.path + "') as any;";
        this.classService.addLineToMethod(this.method.name, returnLine);
        this.classService.addImport(dtoName, "../dtos/" + this.classService.formatFileName(dtoName) + ".dto");
    };
    GetRequestFactory.prototype.setFileName = function () {
        var cleanedPath = this.path.charAt(0) === '/' ? this.path.slice(1) : this.path;
        cleanedPath = cleanedPath.replace('{', '');
        cleanedPath = cleanedPath.replace('}', '');
        var fileName = cleanedPath.replace(/\//g, '-');
        this.fileName = fileName.replace('_', '-');
    };
    GetRequestFactory.prototype.setClassName = function () {
        var cleanedPath = this.path.charAt(0) === '/' ? this.path.slice(1) : this.path;
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
        this.addMethod('getOne', this.getDtoName(referenceSchema));
    };
    GetRequestFactory.prototype.getRootSchema = function (rootSchema) {
        switch (rootSchema.type) {
            case 'array':
                if (rootSchema.items) {
                    if (rootSchema.items.$ref) {
                        this.observableType = this.getDtoName(this.getDtoName(rootSchema.items.$ref) + "[]");
                        this.addMethod('getAll', this.getDtoName(rootSchema.items.$ref));
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
        return __awaiter(this, void 0, void 0, function () {
            var geneseRequestService;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.classServiceFactory.createClassServiceFromFile("/genese/genese-api/services/genese-request.service.ts")];
                    case 1:
                        geneseRequestService = _a.sent();
                        geneseRequestService.addLineToMethod('init', "this." + this.method.name + " = this." + tools_1.Tools.unCapitalize(this.classNameService) + "." + this.method.name + ";");
                        geneseRequestService.addProperty("public " + this.method.name + ": () => Observable<" + this.observableType + ">;\r\n");
                        console.log('ZZZZZZZZZZZZ geneseRequestService.getContent()', geneseRequestService.getContent());
                        // this.fileService.removeFile(`/genese/genese-api/services/genese-request.service.ts`);
                        this.fileService.createFile("/genese/genese-api/services/genese-request.service.ts", geneseRequestService.getContent());
                        return [2 /*return*/];
                }
            });
        });
    };
    // ----------------------------------------------------------------------------
    //							TODO Methods to remove ?
    // ----------------------------------------------------------------------------
    GetRequestFactory.prototype.createDtoByMediaType = function (mediaType) {
        switch (mediaType) {
            case 'application/json':
                // console.log('GET REQUEST FACTORY createDtoByMediaType mediaType', mediaType);
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
