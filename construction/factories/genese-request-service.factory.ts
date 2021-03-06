import { FileService } from '../services/file.service';
import { ClassFile } from '../models/files/class-file.model';

export class GeneseRequestServiceFactory {

	public classFile = new ClassFile();
	private static instance?: GeneseRequestServiceFactory;

	private constructor() {

	}

	static getInstance() {
		if (!GeneseRequestServiceFactory.instance) {
			GeneseRequestServiceFactory.instance = new GeneseRequestServiceFactory();
		}
		return GeneseRequestServiceFactory.instance;
	}

	init(): void {
		this.addImports();
		this.addDeclaration();
		this.addConstructor();
	}



	addDeclaration(): void {
		this.classFile.setClassDeclaration('GeneseRequestService', '@Injectable()');
	}



	addImports(): void {
		this.classFile.addImport('Observable', 'rxjs');
		this.classFile.addImport('HttpClient', '@angular/common/http');
		this.classFile.addImport('Injectable', '@angular/core');
		this.classFile.addImport('GeneseService, RequestOptions', 'genese-angular');
	}



	addConstructor(): void {
		this.classFile.addParamToConstructor(`private http: HttpClient,`);
		this.classFile.addParamToConstructor(`private geneseService: GeneseService`);
	}


}
