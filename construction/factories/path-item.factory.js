"use strict";
exports.__esModule = true;
var dto_file_factory_1 = require("./dto-file.factory");
var get_request_factory_1 = require("./get-request.factory");
var open_api_service_1 = require("../services/open-api.service");
var PathItemFactory = /** @class */ (function () {
    function PathItemFactory() {
        this.openApiService = open_api_service_1.OpenApiService.getInstance();
    }
    PathItemFactory.prototype.init = function (target, path) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.openApiService.openApi.paths[path] = {};
        if ((_d = (_c = (_b = (_a = target) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.responses) === null || _c === void 0 ? void 0 : _c['200']) === null || _d === void 0 ? void 0 : _d['content']) {
            var getRequestFactory = new get_request_factory_1.GetRequestFactory();
            getRequestFactory.create(path, (_h = (_g = (_f = (_e = target) === null || _e === void 0 ? void 0 : _e.get) === null || _f === void 0 ? void 0 : _f.responses) === null || _g === void 0 ? void 0 : _g['200']) === null || _h === void 0 ? void 0 : _h['content']);
        }
    };
    PathItemFactory.prototype.createDtos = function (path, pathItem) {
        this.createDtoIfMethodExists('get', pathItem);
    };
    PathItemFactory.prototype.createDtoIfMethodExists = function (method, pathItem) {
        var _a;
        if ((_a = pathItem) === null || _a === void 0 ? void 0 : _a[method]) {
            this.createDto(method, pathItem);
        }
    };
    PathItemFactory.prototype.createDto = function (method, pathItem) {
        switch (method) {
            case 'get':
                var dtoGetFactory = new get_request_factory_1.GetRequestFactory();
                // dtoGetFactory.create(pathItem[method]);
                break;
            default:
        }
    };
    PathItemFactory.prototype.createDtoFiles = function (source) {
        for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
            var path = _a[_i];
            this.createDtoFile(path, source[path]);
        }
    };
    PathItemFactory.prototype.createDtoFile = function (path, schema) {
        var dtoFile = new dto_file_factory_1.DtoFileFactory();
        dtoFile.setContent(path, schema);
        // this.createFile(this.pathGeneseApi + '/dtos/' + key.toLowerCase() + '.dto.ts', dtoFile.getContent());
    };
    PathItemFactory.prototype.extractDtos = function (data) {
        try {
            var api = JSON.parse(data);
            return api.components.schemas;
        }
        catch (err) {
            throw err;
        }
    };
    return PathItemFactory;
}());
exports.PathItemFactory = PathItemFactory;
