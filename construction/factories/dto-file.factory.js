"use strict";
exports.__esModule = true;
var file_service_1 = require("../services/file.service");
var DtoFileFactory = /** @class */ (function () {
    function DtoFileFactory() {
        this.content = '';
        this.fileService = new file_service_1.FileService();
    }
    DtoFileFactory.prototype.create = function (dtoName, schema) {
        var fileName = this.fileService.formatFileName(dtoName) + ".dto.ts";
        // const fileName = `${dtoName.charAt(0).toLowerCase()}${dtoName.slice(1)}.dto.ts`;
        var path = "/genese/genese-api/dtos/";
        this.setContent(dtoName, schema);
        this.fileService.createFile(path, fileName, this.content);
    };
    DtoFileFactory.prototype.setContent = function (dtoName, schema) {
        this.content = '\r\nexport class ' + dtoName + ' {\r\n\r\n';
        if (schema.properties) {
            for (var _i = 0, _a = Object.keys(schema.properties); _i < _a.length; _i++) {
                var propertyName = _a[_i];
                this.addLineProperty(propertyName, schema.properties[propertyName]);
            }
        }
        else if (schema["enum"]) {
        }
        this.content += '\r\n}';
    };
    DtoFileFactory.prototype.addLineProperty = function (propertyName, property) {
        this.content += '\tpublic ' + propertyName + ' ?= ';
        this.addDefaultValue(property);
        this.content += ';\r\n';
    };
    DtoFileFactory.prototype.addDefaultValue = function (property) {
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
                else {
                    this.content += '\'\'';
                }
            }
        }
    };
    DtoFileFactory.prototype.addNestedSchema = function (path) {
        var pathSplitted = path.split('/');
        var schema = pathSplitted ? pathSplitted[pathSplitted.length - 1] : '';
        if (schema) {
            this.content += 'new ' + schema + '()';
        }
        var lineImport = 'import { ' + schema + ' } from \'./' + schema.toLowerCase() + '.dto\';\r\n';
        return this.content = lineImport + this.content;
    };
    DtoFileFactory.prototype.addContentForArrays = function (property) {
        this.content += '[';
        if (property && property.items) {
            this.addDefaultValue(property.items);
        }
        this.content += ']';
    };
    return DtoFileFactory;
}());
exports.DtoFileFactory = DtoFileFactory;
