import { ClassService } from './class.service';

const fse = require('fs-extra');
const appRootPath = require('app-root-path');

export class FileService {

	private appRoot = appRootPath.toString();

	constructor() {
	}



	createFile(path, data): void {
		// console.log('createFile path', path);
		// console.log('createFile this.appRoot', this.appRoot);
		// console.log('createFile', this.appRoot + path);
		let pathFolder = this.appRoot + path;
		if (path.includes('/')) {
			const splittedPath = path.split('/');
			pathFolder = this.appRoot + path.slice(0, path.length - splittedPath[splittedPath.length - 1].length);
			fse.mkdirpSync(pathFolder);
		}
		fse.writeFileSync(this.appRoot + path, data);
	}



	readFile(path: string): string {
		return fse.readFileSync(this.appRoot + path, 'utf-8');
	}



	removeFile(path: string): string {
		return fse.removeSync(this.appRoot + path);
	}
}
