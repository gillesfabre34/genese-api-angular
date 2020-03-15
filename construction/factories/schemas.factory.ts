import { InitFactoriesInterface } from './init-factories.interface';
import { OpenApiService } from '../services/open-api.service';
import { DtoFileFactory } from './dto-file.factory';


export class SchemasFactory implements InitFactoriesInterface {

	private openApiService: OpenApiService = OpenApiService.getInstance();


	constructor() {
	}



	init(target: any): void {
		// console.log('SCHEMAS init target', target);
		if (target?.schemas) {
			this.openApiService.openApi.components.schemas = {};
			for (const dtoName of Object.keys(target.schemas)) {
				const dtoFileFactory = new DtoFileFactory();
				dtoFileFactory.create(dtoName, target.schemas[dtoName]);
				this.openApiService.openApi.components.schemas[dtoName] = target.schemas[dtoName];
			}
		}
	}



}
