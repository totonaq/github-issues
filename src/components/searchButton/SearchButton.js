import React from 'react';
import './SearchButton.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const SearchButton = ({ onSearchButtonClick }) => {

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

SearchButton.defaultProps = {
	onSearchButtonClick: () => {}
}

SearchButton.propTypes = {
	onSearchButtonClick: PropTypes.func.isRequired,
}

export default withRouter(SearchButton)
