"use strict";
exports.__esModule = true;
var open_api_factory_1 = require("./factories/open-api.factory");
var genese_request_service_factory_1 = require("./factories/genese-request-service.factory");
var fse = require('fs-extra');
var appRootPath = require('app-root-path');
var Construction = /** @class */ (function () {
    function Construction() {
        this.appRoot = appRootPath.toString();
        this.createOpenApi = new open_api_factory_1.OpenApiFactory();
        this.geneseRequestServiceFactory = genese_request_service_factory_1.GeneseRequestServiceFactory.getInstance();
    }
    Construction.prototype.startConstruction = function () {
        this.createFolders();
        this.geneseRequestServiceFactory.init();
        this.createOpenApi.init();
    };
    Construction.prototype.createFolders = function () {
        fse.removeSync(this.appRoot + '/genese');
        fse.mkdirsSync(this.appRoot + '/genese/genese-api/dtos');
        fse.mkdirsSync(this.appRoot + '/genese/genese-api/services');
    };
    return Construction;
}());
exports.Construction = Construction;
