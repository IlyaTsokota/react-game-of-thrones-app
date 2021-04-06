import React, { Component } from 'react'
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import ItemDetails, { Field } from '../itemDetails';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';
import { Col, Row } from 'reactstrap';
import RandomChar from '../randomChar';


export default class CharacterPage extends Component {

	gotService = new GotService();


	state = {
		isVisibleRandomChar: true,
		selectedChar: null,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	onToggleRandomChar = () => {
		this.setState(state => ({
			isVisibleRandomChar: !state.isVisibleRandomChar
		}));
	};

	onItemSelected = (id) => {
		this.setState({
			selectedChar: id
		})
	}

	render() {
		const { isVisibleRandomChar, error } = this.state;

		if (error) {
			return <ErrorMessage />
		}

		const randomChar = isVisibleRandomChar ? <RandomChar /> : null;

		const itemList = (
			<ItemList
				onItemSelected={this.onItemSelected}
				getData={this.gotService.getAllCharacters}
				renderItem={({ name, gender }) => `${name} (${gender})`} />
		);

		const charDetails = (
			<ItemDetails
				getDetails={this.gotService.getCharacter}
				itemId={this.state.selectedChar}
			>
				<Field field='gender' label="Gender" />
				<Field field='born' label="Born" />
				<Field field='died' label="Died" />
				<Field field='culture' label="Culture" />
			</ItemDetails>
		);

		return (
			<>
				<Row>
					<Col lg={{ size: 5, offset: 0 }}>
						{randomChar}
					</Col>
				</Row>
				<Row>
					<Col md='3'>
						<button className="btn btn-info mb-5" onClick={this.onToggleRandomChar}>Toggle random character</button>
					</Col>
				</Row>
				<RowBlock left={itemList} right={charDetails} />
			</>
		);
	}
}