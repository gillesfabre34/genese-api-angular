import { Paths } from './paths';
import { ExternalDocs } from './external-docs';
import { Security } from './security';
import { Tag } from './tag';
import { Server } from './server';
import { Components } from './components';

export class OpenApi {
	components?: Components;
	externalDocs?: ExternalDocs;
	info?: object;
	openapi?: string;
	paths?: Paths;
	security?: Security[];
	servers?: Server[];
	tags?: Tag[];
}
