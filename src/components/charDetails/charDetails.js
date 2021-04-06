import React, { Component } from 'react';
import './charDetails.scss';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


export default class CharDetails extends Component {

	gotService = new GotService();

	state = {
		loading: true,
		char: null,
		error: false
	};

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false,

		})
	}

	componentDidMount() {
		this.updateChar();
	}

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	}

	componentDidUpdate(prevProps) {
		if (this.props.charId !== prevProps.charId) {
			this.setState({
				loading: true
			})
			this.updateChar();
		}
	}

	updateChar() {
		const { charId } = this.props;

		if (!charId) {
			return;
		}

		this.gotService.getCharacter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError);
	}

	render() {

		const { char, loading, error } = this.state;

		if (error) {
			return <ErrorMessage />
		}
		if (!char) {
			return <span className='select-error'>Please select a character</span>
		}

		if (loading) {
			return (
				<div className="char-details rounded">
					<Spinner />
				</div>
			);
		}

		const { name, gender, born, died, culture } = char;

		return (
			<div className="char-details rounded">
				<h4>{name || 'unknown '}</h4>
				<ul className="list-group list-group-flush">
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Gender</span>
						<span>{gender || 'unknown '}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Born</span>
						<span>{born || 'unknown '}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Died</span>
						<span>{died || 'unknown '}</span>
					</li>
					<li className="list-group-item d-flex justify-content-between">
						<span className="term">Culture</span>
						<span>{culture || 'unknown '}</span>
					</li>
				</ul>
			</div>
		);
	}
}