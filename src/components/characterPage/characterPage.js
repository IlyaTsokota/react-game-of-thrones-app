import React, { Component } from 'react'
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';


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

	onCharSelected = (id) => {
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
				onCharSelected={this.onCharSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={({ name, gender }) => `${name} (${gender})`} />
		);

		const charDetails = (
			<CharDetails charId={this.state.selectedChar} />
		);

		return (
			<RowBlock left={itemList} right={charDetails} />
		);
	}
}