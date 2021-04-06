import React, { Component } from 'react'
import ItemDetails, { Field } from '../itemDetails';
import GotService from '../../services/gotService';

export default class BooksItem extends Component {
	gotService = new GotService();

	state = {
		selectedBook: 1,
		error: false
	}

	render() {
		return (
			<ItemDetails
				getDetails={this.gotService.getBook}
				itemId={this.props.itemId}
				showPlaceholder={false}
			>
				<Field field='numberOfPages' label="Number Of Pages" />
				<Field field='publiser' label="Publisher" />
				<Field field='released' label="Released" />
			</ItemDetails>
		);
	}
}