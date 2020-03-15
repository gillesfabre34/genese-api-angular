"use strict";
exports.__esModule = true;
var open_api_service_1 = require("../services/open-api.service");
var components_factory_1 = require("./components.factory");
var paths_factory_1 = require("./paths.factory");
var OpenApiFactory = /** @class */ (function () {
    function OpenApiFactory() {
        this.openApiService = open_api_service_1.OpenApiService.getInstance();
    }
    OpenApiFactory.prototype.init = function () {
        this.openApiService.openApi = { openapi: this.openApiService.getOpenApiJsonFile().openapi };
        this.openApiService.next(this.openApiService.getOpenApiJsonFile(), components_factory_1.ComponentsFactory);
        this.openApiService.next(this.openApiService.getOpenApiJsonFile(), paths_factory_1.PathsFactory);
        // console.log('OPENAPI init this.openApiService.getOpenApi', this.openApiService.openApi);
    };
    return OpenApiFactory;
}());
exports.OpenApiFactory = OpenApiFactory;
