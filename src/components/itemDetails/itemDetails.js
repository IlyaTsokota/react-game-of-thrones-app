import React, { Component } from 'react';
import './itemDetails.scss';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const Field = ({ item, field, label }) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{item[field] || 'unknown '}</span>
		</li>
	);
};

export { Field };

export default class ItemDetails extends Component {


	state = {
		loading: true,
		item: null,
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
		this.updateItem();
	}

	onItemLoaded = (item) => {
		this.setState({ item, loading: false });
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.setState({
				loading: true
			})
			this.updateItem();
		}
	}

	updateItem() {
		const { itemId } = this.props;

		if (!itemId) {
			return;
		}

		const { getDetails } = this.props;

		getDetails(itemId)
			.then(this.onItemLoaded)
			.catch(this.onError);
	}

	render() {

		const { item, loading, error } = this.state;

		if (error) {
			return <ErrorMessage />
		}
		if (!item) {
			return <span className='select-error'>Please select a character</span>
		}

		if (loading) {
			return (
				<div className="char-details rounded">
					<Spinner />
				</div>
			);
		}

		const { name } = item;

		return (
			<div className="char-details rounded">
				<h4>{name || 'unknown '}</h4>
				<ul className="list-group list-group-flush">
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child, { item });
						})
					}
				</ul>
			</div>
		);

	}
}