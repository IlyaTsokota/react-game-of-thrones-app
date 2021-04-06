import React, { Component } from 'react'
import ItemList from '../../itemList';
import ErrorMessage from '../../errorMessage';
import ItemDetails, { Field } from '../../itemDetails';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';


export default class CharacterPage extends Component {

	gotService = new GotService();


	state = {
		selectedChar: 130,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	onItemSelected = (id) => {
		this.setState({
			selectedChar: id
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
				getData={this.gotService.getAllCharacters}
				renderItem={({ name, gender }) => `${name} (${gender})`} />
		);

		const charDetails = (
			<ItemDetails
				getDetails={this.gotService.getCharacter}
				itemId={this.state.selectedChar} >
				<Field field='gender' label="Gender" />
				<Field field='born' label="Born" />
				<Field field='died' label="Died" />
				<Field field='culture' label="Culture" />
			</ItemDetails>
		);

		return (
			<RowBlock left={itemList} right={charDetails} />
		);
	}
}