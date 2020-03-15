export class Tools {



	static capitalize(word: string): string {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}


	static unCapitalize(word: string): string {
		return word.charAt(0).toLowerCase() + word.slice(1);
	}

}
