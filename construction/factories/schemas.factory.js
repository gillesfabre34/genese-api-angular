"use strict";
exports.__esModule = true;
var open_api_service_1 = require("../services/open-api.service");
var dto_file_factory_1 = require("./dto-file.factory");
var SchemasFactory = /** @class */ (function () {
    function SchemasFactory() {
        this.openApiService = open_api_service_1.OpenApiService.getInstance();
    }
    SchemasFactory.prototype.init = function (target) {
        var _a;
        // console.log('SCHEMAS init target', target);
        if ((_a = target) === null || _a === void 0 ? void 0 : _a.schemas) {
            this.openApiService.openApi.components.schemas = {};
            for (var _i = 0, _b = Object.keys(target.schemas); _i < _b.length; _i++) {
                var dtoName = _b[_i];
                var dtoFileFactory = new dto_file_factory_1.DtoFileFactory();
                dtoFileFactory.create(dtoName, target.schemas[dtoName]);
                this.openApiService.openApi.components.schemas[dtoName] = target.schemas[dtoName];
            }
        }
    };
    return SchemasFactory;
}());
exports.SchemasFactory = SchemasFactory;
