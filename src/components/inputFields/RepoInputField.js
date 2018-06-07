import React from 'react';
import './InputField.css';
import PropTypes from 'prop-types';

const RepoInputField = (props) => {

	const { value, 
					reposLength, 
					onValueChange, 
					onRepoInputKeydown, 
					setAutocompleteVisibility, 
					setInputFocus } = props;

	return(
		<input
			name='repo'
			className='InputField'
			type='text'
			value={value}
			autoComplete='off'
			disabled={(!reposLength > 0 && !value)}
			placeholder='репозиторий'
			onChange={onValueChange}
			onKeyDown={onRepoInputKeydown}
			onFocus={() => { setAutocompleteVisibility(true); setInputFocus(true) }}
			onBlur={() => { setInputFocus(false) }}
			
		/>
	)
}

RepoInputField.defaultProps = {
	value: '',
	reposLength: 0,
	onValueChange: () => {},
	onRepoInputKeydown: () => {},
	setInputFocus: () => {},
	setAutocompleteVisibility: () => {}
}

RepoInputField.propTypes = {
	value: PropTypes.string.isRequired,
	reposLength: PropTypes.number.isRequired,
	onValueChange: PropTypes.func.isRequired,
	onRepoInputKeydown: PropTypes.func.isRequired,
	setInputFocus: PropTypes.func.isRequired,
	setAutocompleteVisibility: PropTypes.func.isRequired
}

export default RepoInputField