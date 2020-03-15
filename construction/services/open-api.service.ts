import { TConstructor } from '../models/tconstructor';
import { OpenApi } from '../models/open-api/open-api';

const appRootPath = require('app-root-path');

export class OpenApiService {

    private appRoot = appRootPath.toString();
    private static instance?: OpenApiService;
    public openApi?: OpenApi = {};
    private readonly openApiJsonFile?: OpenApi = {};

    private constructor() {
        this.openApiJsonFile = require(this.appRoot + '/genese-api.json');
    }



    static getInstance() {
        if (!OpenApiService.instance) {
            OpenApiService.instance = new OpenApiService();
        }
        return OpenApiService.instance;
    }



    getOpenApiJsonFile() {
        return this.openApiJsonFile;
    }



    next<T>(target: object, propertyClass: TConstructor<T>, options?: any): OpenApiService {
        if (target && propertyClass) {
            const nextPropertyClassObject = new propertyClass();
            if (options) {
                nextPropertyClassObject['init'](target, options);
            } else {
                nextPropertyClassObject['init'](target);
            }
        }
        return this;
    }
}
