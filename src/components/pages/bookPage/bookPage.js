import React, { Component } from 'react'
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';
import ItemDetails, { Field } from '../../itemDetails';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BookPage extends Component {

	gotService = new GotService();


	state = {
		selectedBook: 1,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	onItemSelected = (id) => {
		this.setState({
			selectedBook: id
		})
	}

	render() {
		const { error } = this.state;

		if (error) {
			return <ErrorMessage />
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllBooks}
				renderItem={({ name }) => `${name}`} />
		);

		const bookDetails = (
			<ItemDetails
				getDetails={this.gotService.getBook}
				itemId={this.state.selectedBook}
			>
				<Field field='numberOfPages' label="Number Of Pages" />
				<Field field='publiser' label="Publisher" />
				<Field field='released' label="Released" />
			</ItemDetails>
		);

		return (
			<RowBlock left={itemList} right={bookDetails} />
		);
	}
}