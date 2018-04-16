import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ message }) => {
	return(
		<p className='NotFound'>
			{message}
		</p>
	)
}

NotFound.propTypes = {
	message: PropTypes.string.isRequired
}

export default NotFound