import React from 'react';
import './SearchButton.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const SearchButton = ({ username, repo, itemsPerPage, history }) => {

	const onSearchButtonClick = e => {
		e.preventDefault();
		if (!username || !repo) return;

		let per_page = itemsPerPage;

		if (per_page === 0) {
			per_page = 30;
    }
    
		history.push(`/repos/${username}/${repo}/issues?page=1&per_page=${per_page}`);
	}

	return(
		<button
			type='submit'
			className='SearchButton'
			onClick={onSearchButtonClick}
			>
			Поиск
		</button>
	)
	
}

SearchButton.propTypes = {
	username: PropTypes.string.isRequired,
	repo: PropTypes.string.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	history: PropTypes.object.isRequired
}

export default withRouter(SearchButton)
