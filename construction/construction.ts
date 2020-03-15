import { OpenApiFactory } from './factories/open-api.factory';
import { GeneseRequestServiceFactory } from './factories/genese-request-service.factory';

const fse = require('fs-extra');
const appRootPath = require('app-root-path');

export class Construction {

	private appRoot = appRootPath.toString();
	private createOpenApi = new OpenApiFactory();
	private geneseRequestServiceFactory: GeneseRequestServiceFactory = GeneseRequestServiceFactory.getInstance();


	constructor() {
	}



	startConstruction(): void {
		this.createFolders();
		this.geneseRequestServiceFactory.init();
		this.createOpenApi.init();
	}



	createFolders(): void {
		fse.removeSync(this.appRoot + '/genese');
		fse.mkdirsSync(this.appRoot + '/genese/genese-api/dtos');
		fse.mkdirsSync(this.appRoot + '/genese/genese-api/services');
	}

}

