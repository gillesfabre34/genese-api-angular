import { Schema } from './schema';
import { Reference } from './reference';

export class MediaType {
	encoding?: any[];
	example?: any;
	examples?: any[];
	schema?: Schema | Reference;
}
