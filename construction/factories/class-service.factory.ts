import { ClassService } from '../services/class.service';
import { FileService } from '../services/file.service';
import { Method } from '../models/method';

export class ClassServiceFactory {

	private classService?: ClassService = new ClassService();
	public contentFile ?= '';
	private fileService?: FileService = new FileService();
	private partOfContentFile ?= '';



	constructor() {
	}



	// ----------------------------------------------------------------------------
	//					New ClassService from existing file
	// ----------------------------------------------------------------------------




	createClassServiceFromFile(path: string): Promise<ClassService> {
		 return this.fileService.readFile(path).then(contentFile => {
			 this.contentFile = contentFile;
			 this.partOfContentFile = this.contentFile;
			 this.addImports()
				 .addDeclaration()
				 .addProperties()
				 .addConstructor()
				 .addMethods();
			 return this.classService;
		});
	}



	addImports(): ClassServiceFactory {
		const beforeExportClass = this.partOfContentFile.slice(0, this.partOfContentFile.indexOf('export class'));
		this.classService.importsPart = beforeExportClass.slice(0, beforeExportClass.lastIndexOf('@'));
		this.partOfContentFile = this.partOfContentFile.slice(beforeExportClass.lastIndexOf('@'));
		return this;
	}



	addDeclaration(): ClassServiceFactory {
		this.classService.classDeclarationPart = `${this.partOfContentFile.slice(0, this.partOfContentFile.indexOf('{') + 1)}\r\n`;
		this.partOfContentFile = this.partOfContentFile.slice(this.partOfContentFile.indexOf('{') + 1);
		return this;
	}



	addProperties(): ClassServiceFactory {
		this.classService.propertiesPart = `${this.partOfContentFile.slice(0, this.partOfContentFile.indexOf('constructor') - 3)}`;
		this.partOfContentFile = this.partOfContentFile.slice(this.partOfContentFile.indexOf('constructor') - 3);
		return this;
	}



	addConstructor(): ClassServiceFactory {
		this.classService.constructorPart = `${this.partOfContentFile.slice(0, this.partOfContentFile.indexOf('}') + 1)}\r\n`;
		this.partOfContentFile = this.partOfContentFile.slice(this.partOfContentFile.indexOf('}'));
		return this;
	}



	addMethods(): ClassServiceFactory {
		this.partOfContentFile = this.partOfContentFile.slice(1, this.partOfContentFile.lastIndexOf('}'));
		while (this.partOfContentFile.indexOf('{') > 0) {
			this.addLastMethod(this.partOfContentFile);
		}
		this.partOfContentFile.lastIndexOf('}');
		this.classService.setMethodsPart();
		return this;
	}



	addLastMethod(text: string): void {
		let method: Method = new Method();
		const textBeforeLastBracket = text.slice(0, text.lastIndexOf('}'));
		let numberOfRightBrackets = 1;
		let charIndex = this.partOfContentFile.length;
		while (numberOfRightBrackets > 0 && charIndex > 0) {
			if (textBeforeLastBracket.charAt(charIndex) === '}') {
				numberOfRightBrackets ++;
			}
			if (textBeforeLastBracket.charAt(charIndex) === '{') {
				numberOfRightBrackets --;
			}
			charIndex --;
		}
		method.body = textBeforeLastBracket.slice(charIndex + 2);
		const textBeforeFirstBracketLastMethod = textBeforeLastBracket.slice(0, charIndex + 2);
		method.declaration = textBeforeFirstBracketLastMethod.slice(textBeforeFirstBracketLastMethod.lastIndexOf('\t') + 1);
		method.setNameParamsType(method.declaration);
		this.partOfContentFile = textBeforeFirstBracketLastMethod.slice(0, textBeforeFirstBracketLastMethod.lastIndexOf('\t'));
		this.classService.addMethod(method);
	}
}
