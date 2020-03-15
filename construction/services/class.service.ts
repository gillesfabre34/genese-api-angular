import { PartFile } from '../models/part-file.enum';
import { Method } from '../models/method';
import { Tools } from './tools';

export class ClassService {

	public classDeclarationPart = '';
	public className = '';
	public constructorInstructions = '';
	public constructorParams = '';
	public constructorPart = '';
	public content = '';
	public endOfFilePart = '\r\n}\r\n';
	public fileName = '';
	public importsPart = '';
	public methods: Method[] = [];
	public methodsPart = '';
	public propertiesPart = '\r\n\t';


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
		this.propertiesPart = `${this.propertiesPart}${line}\r\n\t`;
	}



	// ----------------------------------------------------------------------------
	//							Constructor generation
	// ----------------------------------------------------------------------------


	setConstructorPart(): void {
		this.constructorPart = `\r\n\tconstructor(\r\n\t\t${this.constructorParams}) {\r\n\t\t${this.constructorInstructions}}\r\n`;
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
		const firstLine: string = decorator ? `\r\n${decorator}\r\n` : '\r\n';
		this.classDeclarationPart = `${firstLine}export class ${className} {\r\n\r\n`;
	}



	getContent(): string {
		this.content = `${this.importsPart}${this.classDeclarationPart}${this.propertiesPart}` +
			`${this.constructorPart}${this.methodsPart}${this.endOfFilePart}`;
		return this.content;
	}
}
