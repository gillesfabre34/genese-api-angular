const fse = require('fs-extra');
const appRootPath = require('app-root-path');

export class FileService {

	private appRoot = appRootPath.toString();

	constructor() {
	}



	createFile(path, data): void {
		let pathFolder = this.appRoot + path;
		if (path.includes('/')) {
			const splittedPath = path.split('/');
			pathFolder = this.appRoot + path.slice(0, path.length - splittedPath[splittedPath.length - 1].length);
			fse.mkdirpSync(pathFolder);
		}
			fse.writeFileSync(this.appRoot + path, data);
	}



	readFile(path: string): Promise<string> {
		return fse.readFile(this.appRoot + path, 'utf-8');
	}



	removeFile(path: string): string {
		return fse.removeSync(this.appRoot + path);
	}
}
