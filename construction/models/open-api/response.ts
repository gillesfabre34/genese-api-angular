import { Content } from './content';
import { Header } from './header';
import { Links } from './links';

export class Response {
	content?: Content;
	description?: string;
	headers?: Header;
	links?: Links;
}
