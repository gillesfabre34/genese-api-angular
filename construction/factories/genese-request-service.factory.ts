import { FileService } from '../services/file.service';
import { Method } from '../models/method';
import { ClassService } from '../services/class.service';

export class GeneseRequestServiceFactory {

	public classCreatorService = new ClassService();
	private fileService: FileService = new FileService();

	constructor() {

	}



	init(): void {
		this.addImports();
		this.addDeclaration();
		this.addConstructor();
		this.addMethods();
		this.fileService.createFile(`/genese/genese-api/services/genese-request.service.ts`, this.classCreatorService.getContent());
	}



	addDeclaration(): void {
		this.classCreatorService.setClassDeclarationPart('GeneseRequestService', '@Injectable()');
	}



	addImports(): void {
		this.classCreatorService.addImport('Observable', 'rxjs');
		this.classCreatorService.addImport('HttpClient', '@angular/common/http');
		this.classCreatorService.addImport('Injectable', '@angular/core');
		this.classCreatorService.addImport('GeneseEnvironmentService', 'genese-angular');
	}



	addConstructor(): void {
		this.classCreatorService.addParamToConstructor(`private http: HttpClient,`);
		this.classCreatorService.addParamToConstructor(`private geneseEnvironmentService: GeneseEnvironmentService,`);
		this.classCreatorService.addInstructionToConstructor(`this.init();`);
	}



	addMethods(): void {
		let method: Method = new Method();
		method.setDeclaration('init');
		this.classCreatorService.addMethod(method);
	}


}
