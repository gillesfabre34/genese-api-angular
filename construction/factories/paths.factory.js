"use strict";
exports.__esModule = true;
var open_api_service_1 = require("../services/open-api.service");
var path_item_factory_1 = require("./path-item.factory");
var PathsFactory = /** @class */ (function () {
    function PathsFactory() {
        this.openApiService = open_api_service_1.OpenApiService.getInstance();
    }
    PathsFactory.prototype.init = function (target) {
        var _a;
        if ((_a = target) === null || _a === void 0 ? void 0 : _a.paths) {
            this.openApiService.openApi.paths = {};
            for (var _i = 0, _b = Object.keys(target.paths); _i < _b.length; _i++) {
                var path = _b[_i];
                this.openApiService.next(target.paths[path], path_item_factory_1.PathItemFactory, path);
            }
        }
    };
    return PathsFactory;
}());
exports.PathsFactory = PathsFactory;
