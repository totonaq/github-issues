import React from 'react';
import PropTypes from 'prop-types';

const NoIssues = ({ message }) => {
	return(
		<p className='NoIssues'>
			{message}
		</p>
	)
}

NoIssues.propTypes = {
	message: PropTypes.string.isRequired
}

export default NoIssues