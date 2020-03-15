const fse = require('fs-extra');
const appRootPath = require('app-root-path');

export class FileService {

	private appRoot = appRootPath.toString();

	constructor() {
	}



	createFile(folder, name, data): void {
		console.log('createFile folder', folder);
		console.log('createFile name', name);
		let pathFolder = this.appRoot + folder;
		fse.mkdirpSync(pathFolder);
		fse.writeFileSync(pathFolder + name, data);
	}

	// createFile(path, data): void {
	// 	console.log('createFile path', path);
	// 	let pathFolder = this.appRoot + path;
	// 	if (path.includes('/')) {
	// 		const splittedPath = path.split('/');
	// 		pathFolder = this.appRoot + path.slice(0, path.length - splittedPath[splittedPath.length - 1].length);
	// 		fse.mkdirpSync(pathFolder);
	// 	}
	// 	fse.writeFileSync(this.appRoot + path, data);
	// }



	readFile(path: string): Promise<string> {
		return fse.readFile(this.appRoot + path, 'utf-8');
	}



	removeFile(path: string): string {
		return fse.removeSync(this.appRoot + path);
	}



	formatFileName(className: string): string {
		let fileName = className.charAt(0).toLowerCase();
		for (let i = 1; i < className.length; i++) {
			if (className.charAt(i).toLowerCase() !== className.charAt(i)) {
				fileName += `-${className.charAt(i).toLowerCase()}`;
			} else {
				fileName += className.charAt(i);
			}
		}
		fileName = fileName.replace('_', '-');
		return fileName;
	}
}
