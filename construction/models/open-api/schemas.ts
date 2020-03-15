import { Schema } from './schema';
import { Reference } from './reference';

export class Schemas {
	[key: string]: Schema | Reference;
}
