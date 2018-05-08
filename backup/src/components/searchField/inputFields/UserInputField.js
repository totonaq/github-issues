import React from 'react';
import './InputField.css';
import PropTypes from 'prop-types';

const UserInputField = ({ value, onchange, onInputFocus, onInputBlur, hideAutocomplete }) => {

	return(
		<input
			name='username'
			className='InputField'
			type='text'
			value={value}
			placeholder='имя'
			autoComplete='off'
			onChange={onchange}
			onFocus={() => {onInputFocus(); hideAutocomplete()}}
			onBlur={onInputBlur}
			
		/>
	)
}

UserInputField.propTypes = {
	value: PropTypes.string.isRequired,
	onchange: PropTypes.func.isRequired,
	onInputFocus: PropTypes.func.isRequired,
	onInputBlur: PropTypes.func.isRequired,
	hideAutocomplete: PropTypes.func.isRequired,
	
}

export default UserInputField