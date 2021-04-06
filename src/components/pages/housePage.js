import React, { Component } from 'react'
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import ItemDetails, { Field } from '../itemDetails';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousePage extends Component {

	gotService = new GotService();


	state = {
		selectedHouse: null,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	onItemSelected = (id) => {
		this.setState({
			selectedHouse: id
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
				getData={this.gotService.getAllHouses}
				renderItem={({ name }) => `${name}`} />
		);

		const houseDetails = (
			<ItemDetails
				getDetails={this.gotService.getHouse}
				itemId={this.state.selectedHouse}
			>
				<Field field='numberOfPages' label="Number Of Pages" />
				<Field field='publiser' label="Publisher" />
				<Field field='released' label="Released" />
			</ItemDetails>
		);

		return (
			<RowBlock left={itemList} right={houseDetails} />
		);
	}
}