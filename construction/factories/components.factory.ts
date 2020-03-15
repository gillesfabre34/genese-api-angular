import { InitFactoriesInterface } from './init-factories.interface';
import { OpenApiService } from '../services/open-api.service';
import { SchemasFactory } from './schemas.factory';


export class ComponentsFactory implements InitFactoriesInterface {

	private openApiService: OpenApiService = OpenApiService.getInstance();


	constructor() {
	}



	init(target: any): void {
		if (target?.components) {
			this.openApiService.openApi.components = {};
			this.openApiService.next(target.components, SchemasFactory);
		}
	}
}
