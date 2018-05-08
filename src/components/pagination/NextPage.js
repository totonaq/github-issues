import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { parse } from 'qs';
import { validatePageNumber, validateItemsPerPage } from './../../helpers';

const NextPage = ({ match, history, location, numberOfPages }) => {

	const { name, repo } = match.params;
	
	let { page, per_page } = parse(location.search.substr(1));

	page = validatePageNumber(page);
	per_page = validateItemsPerPage(per_page);

	const getNextPage = () => {
		history.push(`/repos/${name}/${repo}/issues?page=${++page}&per_page=${per_page}`);
	};

	return(
		<button
			className='Page NextPage'
			onClick={getNextPage}
			disabled={page === numberOfPages}
		>
			Next
		</button>
	)
	
}

NextPage.defaultProps = {
	numberOfPages: 1
}

NextPage.propTypes = {
	history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  numberOfPages: PropTypes.number.isRequired,
}

export default withRouter(NextPage)