import React from 'react';
import './InputField.css';
import PropTypes from 'prop-types';

const InputField = ({ value, onchange, onkeydown }) => {

	return(
		<input
			className='InputField'
			type='text'
			value={value}
			onChange={onchange}
			placeholder='имя/репозиторий'
			onKeyDown={onkeydown}
		/>
	)
}

InputField.propTypes = {
	value: PropTypes.string.isRequired,
	onchange: PropTypes.func.isRequired,
	onkeydown: PropTypes.func.isRequired
}

export default InputField