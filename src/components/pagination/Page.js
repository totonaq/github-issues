import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { parse } from 'qs';
import { validatePageNumber, validateItemsPerPage } from './../../helpers';

const Page = ({ value, match, history, location }) => {

	const { name, repo } = match.params;
  let { page, per_page } = parse(location.search.substr(1));

  page = validatePageNumber(page);
	per_page = validateItemsPerPage(per_page);

	return(
		<Link
			className={value === page ? 'Page current' : 'Page'}
			to={`/repos/${name}/${repo}/issues?page=${value}&per_page=${per_page}`}>
			{value}
		</Link>
	)
}

Page.propTypes = {
	value: PropTypes.number.isRequired,
	history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(Page)