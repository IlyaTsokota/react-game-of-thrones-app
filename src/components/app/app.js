import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage';

import GotService from '../../services/gotService';



export default class App extends Component {

	gotService = new GotService();

	state = {
		isVisibleRandomChar: true,
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



	render() {
		const { isVisibleRandomChar, error } = this.state;

		if (error) {
			return <ErrorMessage />
		}

		const randomChar = isVisibleRandomChar ? <RandomChar /> : null;

		return (
			<>
				<Container>
					<Header />
				</Container>
				<Container>
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
					<CharacterPage />
					<BookPage />
					<HousePage />
				</Container>
			</>
		);
	}


};

