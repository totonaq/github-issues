import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { parse } from 'qs';
import { validatePageNumber, validateItemsPerPage } from './../../helpers';

const PrevPage = ({ match, history, location }) => {

	const { name, repo } = match.params;

	let { page, per_page } = parse(location.search.substr(1));

	page = validatePageNumber(page);
	per_page = validateItemsPerPage(per_page);

	if ( page === 1 ) {
		return(
			<span className='Page PrevPage disabled'>
				Previous
			</span>
		)
	} else {
		return(
			<Link
				className='Page PrevPage'
				to={`/repos/${name}/${repo}/issues?page=${--page}&per_page=${per_page}`}
				>
				Previous
			</Link>
		)
	}
}

PrevPage.propTypes = {
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default withRouter(PrevPage)