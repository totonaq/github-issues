import React from 'react';
import PropTypes from 'prop-types';

const NextPage = ({ onclick, currentpage, numberOfPages }) => {
	if (currentpage === numberOfPages) {
		return(
			<span className='Page NextPage disabled'>
				Next
			</span>
		)
	} else {
		return(
			<a className='Page NextPage' href='' onClick={e => onclick(e, 'next')} >
				Next
			</a>
		)
	}
	
}

NextPage.propTypes = {
	onclick: PropTypes.func.isRequired,
  currentpage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired
}

export default NextPage