import React from 'react';
import PropTypes from 'prop-types';

const PrevPage = ({ onclick, currentpage }) => {
	if (currentpage === 1) {
		return(
			<span className='Page PrevPage disabled'>
				Previous
			</span>
		)
	} else {
		return(
			<a className='Page PrevPage' href='' onClick={e => onclick(e, 'prev')}>
				Previous
			</a>
		)
	}
	
}

PrevPage.propTypes = {
	onclick: PropTypes.func.isRequired,
  currentpage: PropTypes.number.isRequired
}

export default PrevPage