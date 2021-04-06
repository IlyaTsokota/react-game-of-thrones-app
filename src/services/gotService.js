
export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	async getResource(url) {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	async getAllCharacters() {
		const res = await this.getResource('/characters?page=5&pageSize=10');
		return res.map(this._transformCharacter);
	}

	async getCharacter(id) {
		const character = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(character);
	}

	async getAllHouses() {
		const res = await this.getResource('/houses');
		return res.map(this._transformHouse);
	}

	async getHouse(id) {
		const house = await this.getResource(`/houses/${id}`);
		return this._transformHouse(house);
	}
	async getAllBooks() {
		const res = await this.getResource('/books');
		return res.map(this._transformBook);
	}

	async getBook(id) {
		const book = await this.getResource(`/books/${id}`);
		return this._transformBook(book);
	}

	_transformCharacter({ name, gender, born, died, culture }) {
		return { name, gender, born, died, culture };
	}

	_transformHouse({ name, region, words, titles, overlord, ancestralWeapons }) {
		return { name, region, words, titles, overlord, ancestralWeapons };
	}

	_transformBook({ name, numberOfPages, publiser, released }) {
		return { name, numberOfPages, publiser, released };
	}
}