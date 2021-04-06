
export default class GotService {
	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.getResource('/characters?page=5&pageSize=10');
		return res.map(this._transformCharacter.bind(this));
	}

	getCharacter = async (id) => {
		const character = await this.getResource(`/characters/${id}`);
		return this._transformCharacter(character);
	}

	getAllHouses = async () => {
		const res = await this.getResource('/houses');
		return res.map(this._transformHouse.bind(this));
	}

	getHouse = async (id) => {
		const house = await this.getResource(`/houses/${id}`);
		return this._transformHouse(house);
	}
	getAllBooks = async () => {
		const res = await this.getResource('/books');
		return res.map(this._transformBook.bind(this));
	}

	getBook = async (id) => {
		const book = await this.getResource(`/books/${id}`);
		return this._transformBook(book);
	}

	_transformCharacter({ url, name, gender, born, died, culture }) {
		const id = this._getIdFromUrl(url);

		return { id, name, gender, born, died, culture };
	}

	_transformHouse({ url, name, region, words, titles, overlord, ancestralWeapons }) {
		const id = this._getIdFromUrl(url);

		return { id, name, region, words, titles, overlord, ancestralWeapons };
	}

	_transformBook({ url, name, numberOfPages, publiser, released }) {
		const id = this._getIdFromUrl(url);

		return { id, name, numberOfPages, publiser, released };
	}

	_getIdFromUrl(url) {
		const index = url.split('').reverse().join('').indexOf('/');
		const id = +url.slice(url.length - index);

		return id;
	}
}