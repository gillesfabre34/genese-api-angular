import { Property } from '../models/property';
import { Schema } from '../models/open-api/schema';
import { Content } from '../models/open-api/content';
import { FileService } from '../services/file.service';
import { ClassService } from '../services/class.service';
import { Method } from '../models/method';
import { Tools } from '../services/tools';
import { MediaType } from '../models/open-api/media-type';
import { Reference } from '../models/open-api/reference';
import { RootSchema } from '../models/open-api/root-schema';
import { ClassServiceFactory } from './class-service.factory';
import { PartFile } from '../models/part-file.enum';
import { GeneseRequestServiceFactory } from './genese-request-service.factory';


export class GetRequestFactory {

	private classService = new ClassService();
	private className = '';
	private classNameService = '';
	private content = '';
	private fileService: FileService = new FileService();
	private method?: Method = new Method();
	private observableType = '';
	private route = '';


	constructor() {
	}



	public create(route: string, content: Content) {
		// console.log('GET REQUEST FACTORY create content', content);
		this.route = route;
		this.setFileName();
		this.setClassName();
		this.addImports();
		this.addDeclaration();
		this.addConstructor();
		this.classService.setClassDeclarationPart(this.classNameService, '@Injectable()');
		for (const mediaType of Object.keys(content)) {
			this.addMediaTypes(content[mediaType]);
		}
		this.fileService.createFile('/genese/genese-api/services/', `${this.classService.fileName}.service.ts`, this.classService.getContent());
		this.addMethodToGeneseRequestService();
	}



	addImports(): void {
		this.classService.addImport('Observable', 'rxjs');
		this.classService.addImport('HttpClient', '@angular/common/http');
		this.classService.addImport('Injectable', '@angular/core');
		this.classService.addImport('GeneseEnvironmentService, GeneseService', 'genese-angular');
	}



	addDeclaration(): void {
		this.classService.setClassDeclarationPart(this.classNameService, '@Injectable()');
	}



	addConstructor(): void {
		this.classService.addParamToConstructor(`private http: HttpClient,`);
		this.classService.addParamToConstructor(`private geneseEnvironmentService: GeneseEnvironmentService,`);
		this.classService.addParamToConstructor(`private geneseService: GeneseService,`);
	}



	addMethod(geneseMethod: string, dtoName: string): void {
		this.method.name = `${geneseMethod}${this.className}`;
		this.method.setDeclaration(this.method.name, '', `Observable<${this.observableType}>`);
		this.classService.addMethod(this.method);
		const returnLine = `return this.geneseService.getGeneseInstance(${dtoName}).${geneseMethod}Custom('${this.route}') as any;`;
		this.classService.addLineToMethod(this.method.name, returnLine);
		this.classService.addImport(dtoName, `../dtos/${this.fileService.formatFileName(dtoName)}.dto`);
	}



	setFileName() {
		let cleanedPath = this.route.charAt(0) === '/' ? this.route.slice(1) : this.route;
		cleanedPath = cleanedPath.replace('{', '');
		cleanedPath = cleanedPath.replace('}', '');
		const fileName = cleanedPath.replace(/\//g, '-');
		this.classService.fileName = fileName.replace('_', '-');
	}



	setClassName() {
		let cleanedPath = this.route.charAt(0) === '/' ? this.route.slice(1) : this.route;
		cleanedPath = cleanedPath.replace('{', '');
		cleanedPath = cleanedPath.replace('}', '');
		const splittedFileName = cleanedPath.split('/');
		let className = Tools.capitalize(splittedFileName[0]);
		this.className = className;
		for (let i = 1; i < splittedFileName.length; i++) {
			className += Tools.capitalize(splittedFileName[i]);
		}
		this.classNameService = `${className}Service`;
	}



	addMediaTypes(mediaType: MediaType): void {
		if (mediaType.schema) {
			this.getReferenceOrSchema(mediaType.schema);
		}
	}



	getReferenceOrSchema(schema: Reference | RootSchema): void {
		if (schema['$ref']) {
			this.getReference(schema['$ref'] as string);
		} else if (schema['type']) {
			this.getRootSchema(schema as RootSchema);
		}
	}



	getReference(referenceSchema: string): void {
		this.observableType = this.getDtoName(referenceSchema);
		this.addMethod('get', this.getDtoName(referenceSchema));
	}



	getRootSchema(rootSchema: RootSchema): void {
		switch (rootSchema.type) {
			case 'array':
				if (rootSchema.items) {
					if (rootSchema.items.$ref) {
						this.observableType = this.getDtoName(`${this.getDtoName(rootSchema.items.$ref)}[]`);
						this.addMethod('get', this.getDtoName(rootSchema.items.$ref));
					}
				}
				break;
			default: {}
		}
	}



	getDtoName(referenceSchema: string): string {
		const splittedReferenceSchema = referenceSchema.split('/');
		return splittedReferenceSchema[splittedReferenceSchema.length - 1];
	}



	addMethodToGeneseRequestService() {
		const geneseRequestService = GeneseRequestServiceFactory.getInstance().classService;
		geneseRequestService.addImport(this.observableType, `../dtos/${this.observableType}`);
		geneseRequestService.addLineToMethod('init', `this.${this.method.name} = this.${Tools.unCapitalize(this.classNameService)}.${this.method.name};`);
		geneseRequestService.addProperty(`public ${this.method.name}: () => Observable<${this.observableType}>;`);
		console.log('ZZZZZZZZZZZZ geneseRequestService.getContent()', geneseRequestService.getContent());
		// this.fileService.removeFile(`/genese/genese-api/services/genese-request.service.ts`);
		this.fileService.createFile(`/genese/genese-api/services/`, `genese-request.service.ts`, geneseRequestService.getContent());
	}


	// ----------------------------------------------------------------------------
	//							TODO Methods to remove ?
	// ----------------------------------------------------------------------------



	private createDtoByMediaType(mediaType: string) {
		switch (mediaType) {
			case 'application/json':
				break;
			default:
		}

	}



	getContent() {
		return this.content;
	}





	addDefaultValue(property: Property): void {
		switch (property.type) {
			case 'array':
				this.addContentForArrays(property);
				break;
			case 'boolean':
				this.content += 'false';
				break;
			case 'integer':
			case 'number':
				this.content += '0';
				break;
			case 'string':
				this.content += '\'\'';
				break;
			default: {
				if (property['$ref']) {
					this.addNestedSchema(property['$ref']);
				}
			}
		}
	}



	addNestedSchema(path: string): string {
		const pathSplitted = path.split('/');
		const schema = pathSplitted ? pathSplitted[pathSplitted.length - 1] : '';
		if (schema) {
			this.content += 'new ' + schema + '()'
		}
		const lineImport = 'import { ' + schema + ' } from \'./' + schema.toLowerCase() + '.dto\';\r\n';
		return this.content = lineImport + this.content;
	}



	addContentForArrays(property: Property): void {
		this.content += '[';
		if (property && property.items) {
			this.addDefaultValue(property.items);
		}
		this.content += ']';
	}
}
