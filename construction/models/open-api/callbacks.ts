import { Callback } from './callback';
import { Reference } from './reference';

export class Callbacks {
	[key: string]: Callback | Reference;
}
