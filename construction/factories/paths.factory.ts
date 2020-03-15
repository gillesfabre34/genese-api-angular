import { InitFactoriesInterface } from './init-factories.interface';
import { Paths } from '../models/open-api/paths';
import { OpenApiService } from '../services/open-api.service';
import { PathItemFactory } from './path-item.factory';


export class PathsFactory implements InitFactoriesInterface {

	private openApiService: OpenApiService = OpenApiService.getInstance();


	constructor() {}



	init(target: Paths): any {
		if (target?.paths) {
			this.openApiService.openApi.paths = {};
			for (const path of Object.keys(target.paths)) {
				this.openApiService.next(target.paths[path], PathItemFactory, path);
			}
		}
	}

}
