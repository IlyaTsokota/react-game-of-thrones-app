import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../errorMessage';
import { BookPage, HousePage, CharacterPage, BooksItem, MainPage } from '../pages';
import GotService from '../../services/gotService';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './app.css';

export default class App extends Component {
	gotService = new GotService();

	state = {
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	render() {

		if (this.state.error) {
			return <ErrorMessage />
		}

		return (
			<Router>
				<div className="app">
					<Container>
						<Header />
					</Container>
					<Container>

						<Route path='/' exact component={MainPage} />
						<Route path='/characters' component={CharacterPage} />
						<Route path='/houses' exact component={HousePage} />
						<Route path='/books' exact component={BookPage} />
						<Route path='/books/:id' render={
							({ match }) => {
								const { id } = match.params;
								return <BooksItem itemId={id} />;
							}
						} />

					</Container>
				</div>
			</Router>
		);
	}
};

