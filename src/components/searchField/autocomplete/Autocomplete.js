import React, {Component} from 'react';
import './Autocomplete.css';
import PropTypes from 'prop-types';

class Autocomplete extends Component {

	constructor(props) {
		super(props);

		this.choose = this.choose.bind(this);
		this.hideAutocomplete = this.hideAutocomplete.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', this.hideAutocomplete);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.hideAutocomplete);
	}

	choose(e) {
		this.props.chooseRepo(e.target.dataset.index);
	}

	hideAutocomplete(e) {
		if (e.target.className !== 'search-form-field__input') {
			this.props.hideAutocomplete();
		}
	}

	render() {

		return (
			<div className='Autocomplete'>
				<ul className='Autocomplete-list'>
					{
						this.props.repos.map((repo, index) => {
							return <li
								key={repo.id}
								data-index={index}
								className={this.props.activeHint === index ?
									'Autocomplete-list__item active' :
									'Autocomplete-list__item'}
								onClick={this.choose}
								>
								{repo.full_name}
							</li>
						})
					}
				</ul>
			</div>
		)
	}
}

Autocomplete.propTypes = {
	activeHint: PropTypes.number.isRequired,
	repos: PropTypes.array.isRequired,
	chooseRepo: PropTypes.func.isRequired,
	hideAutocomplete: PropTypes.func.isRequired
}

export default Autocomplete;