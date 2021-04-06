import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


export default class App extends Component {

	constructor() {
		super();
	}

	state = {
		isVisibleRandomChar: true
	}

	onToggleRandomChar = () => {
		const { isVisibleRandomChar } = this.state;
		this.setState({
			isVisibleRandomChar: !isVisibleRandomChar
		});
	}

	render() {
		const { isVisibleRandomChar } = this.state;
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
					<Row>
						<Col md='6'>
							<ItemList />
						</Col>
						<Col md='6'>
							<CharDetails />
						</Col>
					</Row>
				</Container>
			</>
		);
	}


};

