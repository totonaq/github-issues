import React from 'react';
import './InputField.css';
import PropTypes from 'prop-types';

const UserInputField = (props) => {

	const { 
		value, 
		onValueChange, 
		setInputFocus, 
		setAutocompleteVisibility } = props;

	const onfocus = () => {
		setInputFocus(true); 
		setAutocompleteVisibility(false)
	}

	const onblur = () => {
		setInputFocus(false)
	}

	return(
		<input
			name='username'
			className='InputField'
			type='text'
			value={value}
			placeholder='имя'
			autoComplete='off'
			onChange={onValueChange}
			onFocus={onfocus}
			onBlur={onblur}
			
		/>
	)
}

UserInputField.propTypes = {
	value: PropTypes.string.isRequired,
	onValueChange: PropTypes.func.isRequired,
	setInputFocus: PropTypes.func.isRequired,
	setAutocompleteVisibility: PropTypes.func.isRequired,
	
}

export default UserInputField