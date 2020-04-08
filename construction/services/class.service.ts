import { PartFile } from '../models/part-file.enum';
import { Method } from '../models/method';
import { Tools } from './tools';

export class ClassService {

	public classDeclarationPart = '';
	public constructorInstructions = '';
	public constructorParams = '';
	public constructorPart = '';
	public content = '';
	public endOfFilePart = '\r\n}';
	public importsPart = '';
	public methods: Method[] = [];
	public methodsPart = '';
	public propertiesPart = '\r\n';


	constructor() {
	}



	addLine(partClass: PartFile, text: string): void {
		this[partClass] += text;
	}




	addImport(name: string, from: string): void {
		const line = `import { ${name} } from '${from}';\r\n`;
		this.addLine(PartFile.IMPORTS, line);
	}



	// ----------------------------------------------------------------------------
	//							Properties generation
	// ----------------------------------------------------------------------------




	addProperty(line = ''): void {
		this.propertiesPart = this.propertiesPart ? `${this.propertiesPart}${line}\r\n\t` : `${line}\r\n\t`;
	}



	// ----------------------------------------------------------------------------
	//							Constructor generation
	// ----------------------------------------------------------------------------


	setConstructorPart(): void {
		this.constructorPart = `\tconstructor(\r\n\t\t${this.constructorParams}) {\r\n\t\t${this.constructorInstructions}}\r\n`;
	}



	addInstructionToConstructor(line = ''): void {
		this.constructorInstructions = `${this.constructorInstructions}${line}\r\n\t`;
		this.setConstructorPart();
	}



	addParamToConstructor(param = ''): void {
		this.constructorParams = `${this.constructorParams}${param}\r\n\t\t`;
		this.setConstructorPart();
	}



	// ----------------------------------------------------------------------------
	//							 Methods generation
	// ----------------------------------------------------------------------------



	setMethodsPart(): void {
		this.methodsPart = '';
		for (const method of this.methods) {
			this.methodsPart += `\r\n\r\n\r\n\t${method.stringify()}`;
		}
	}



	addMethod(method: Method): void {
		this.methods.push(method);
		this.setMethodsPart();
	}



	addLineToMethod(methodName: string, line: string) {
		let method: Method = this.methods.find(e => e.name === methodName);
		if (method) {
			method.body = method.body ? `${method.body}\t${line}` : `\t\t${line}`;
		}
		this.setMethodsPart();
	}




	// ----------------------------------------------------------------------------
	//							Other methods
	// ----------------------------------------------------------------------------




	setClassDeclarationPart(className: string, decorator?: string): void {
		const firstLine: string = decorator ? `${decorator}\r\n` : '\r\n';
		this.classDeclarationPart = `${firstLine}export class ${className} {\r\n\r\n`;
	}



	getContent(): string {

		this.content = `${this.importsPart}\r\n${this.classDeclarationPart}\r\n${this.propertiesPart}\r\n` +
			`${this.constructorPart}\r\n${this.methodsPart}\r\n${this.endOfFilePart}\r\n`;
		return this.content;
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