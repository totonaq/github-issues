import React, {Component} from 'react';
import './Autocomplete.css';
import PropTypes from 'prop-types';

class Autocomplete extends Component {

	constructor(props) {
		super(props);
		this.hideAutocomplete = this.hideAutocomplete.bind(this);
	}

	componentDidMount() {
		document.addEventListener('click', this.hideAutocomplete);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.hideAutocomplete);
	}

	hideAutocomplete(e) {
		if (e.target.className !== 'InputField') {
			this.props.hideAutocomplete();
		}
	}

	render() {

		const { activeHint, repos, chooseRepo } = this.props;

		return (
			<div className='Autocomplete'>
				<ul className='Autocomplete-list'>
					{
						repos.map((repo, index) => {
							return (
								<li
									key={repo.id}
									data-index={index}
									className={activeHint === index ?
										'Autocomplete-list__item active' :
										'Autocomplete-list__item'}
									onClick={e => chooseRepo(e.target.dataset.index)}
									>
									{repo.full_name}
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

Autocomplete.defaultProps = {
	activeHint: -1,
	repos: [],
	itemsPerPage: 30,
	chooseRepo: () => {},
	hideAutocomplete: () => {}
}

Autocomplete.propTypes = {
	activeHint: PropTypes.number.isRequired,
	repos: PropTypes.array.isRequired,
	chooseRepo: PropTypes.func.isRequired,
	hideAutocomplete: PropTypes.func.isRequired
}

export default Autocomplete;