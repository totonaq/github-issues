import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ value, currentpage, onclick }) => {
	return(
		<a
			className={value === currentpage ? 'Page current' : 'Page'}
			href={value}
			onClick={(e, btn) => onclick(e, 'numeric')}>
			{value}
		</a>
	)
}

Page.propTypes = {
	value: PropTypes.number.isRequired,
	onclick: PropTypes.func.isRequired,
  currentpage: PropTypes.number.isRequired,
}

export default Page