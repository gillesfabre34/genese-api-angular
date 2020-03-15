import { FileService } from '../services/file.service';
import { Method } from '../models/method';
import { ClassService } from '../services/class.service';

export class GeneseRequestServiceFactory {

	public classService = new ClassService();
	private fileService: FileService = new FileService();

	constructor() {

	}



	init(): void {
		this.addImports();
		this.addDeclaration();
		this.addConstructor();
		this.addMethods();
		this.fileService.createFile(`/genese/genese-api/services/genese-request.service.ts`, this.classService.getContent());
	}



	addDeclaration(): void {
		this.classService.setClassDeclarationPart('GeneseRequestService', '@Injectable()');
	}



	addImports(): void {
		this.classService.addImport('Observable', 'rxjs');
		this.classService.addImport('HttpClient', '@angular/common/http');
		this.classService.addImport('Injectable', '@angular/core');
		this.classService.addImport('GeneseEnvironmentService', 'genese-angular');
	}



	addConstructor(): void {
		this.classService.addParamToConstructor(`private http: HttpClient,`);
		this.classService.addParamToConstructor(`private geneseEnvironmentService: GeneseEnvironmentService,`);
		this.classService.addInstructionToConstructor(`this.init();`);
	}



	addMethods(): void {
		let method: Method = new Method();
		method.setDeclaration('init');
		this.classService.addMethod(method);
	}


}
