import React, {Component} from 'react';
import './Autocomplete.css';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Autocomplete extends Component {

	componentDidMount() {
		document.addEventListener('click', this.hideAutocomplete);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.hideAutocomplete);
	}

	hideAutocomplete = (e) => {
		if (e.target.name !== 'repo') {
			this.props.setAutocompleteVisibility(false);
		}
	}

	render() {

		const { activeHint, itemsPerPage, repos } = this.props;
		

		return (
			<div className='Autocomplete'>
				<ul className='Autocomplete-list'>
					{
						repos.map((repo, index) => {
							return (
								<li 
									key={repo.id}
									className={activeHint === index ?
											'Autocomplete-list__item active' :
											'Autocomplete-list__item'}>
									<Link
										to={`/repos/${repo.full_name}/issues?page=1&per_page=${itemsPerPage}`}
										onClick={this.hideAutocomplete}
										>
										{repo.full_name}
									</Link>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

Autocomplete.propTypes = {
	activeHint: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	repos: PropTypes.array.isRequired,
	setAutocompleteVisibility: PropTypes.func.isRequired
}

export default Autocomplete;