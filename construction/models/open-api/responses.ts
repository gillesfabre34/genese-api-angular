import { Reference } from './reference';
import { Response } from './response';

export class Responses {
	// default?: Response | Reference;
	// [key: string]: Response;
	[key: string]: Response | Reference;
}
