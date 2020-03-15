import { Property } from '../models/property';
import { Schema } from '../models/open-api/schema';
import { FileService } from '../services/file.service';

export class DtoFileFactory {

	private content = '';
	private fileService: FileService = new FileService();

	constructor() {
	}


	create(dtoName: string, schema: Schema) {
		const fileName = `${this.fileService.formatFileName(dtoName)}.dto.ts`;
		// const fileName = `${dtoName.charAt(0).toLowerCase()}${dtoName.slice(1)}.dto.ts`;
		const path = `/genese/genese-api/dtos/`;
		this.setContent(dtoName, schema);
		this.fileService.createFile(path, fileName, this.content);
	}



	setContent(dtoName: string, schema: Schema): void {
		this.content = '\r\nexport class ' + dtoName + ' {\r\n\r\n';
		if (schema.properties) {
			for (let propertyName of Object.keys(schema.properties)) {
				this.addLineProperty(propertyName, schema.properties[propertyName]);
			}
		} else if (schema.enum) {

		}
		this.content += '\r\n}';
	}



	addLineProperty(propertyName: string, property: Property): void {
		this.content += '\tpublic ' + propertyName + ' ?= ';
		this.addDefaultValue(property);
		this.content += ';\r\n';
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
				} else {
					this.content += '\'\'';
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
