import React from 'react';
import './InputField.css';
import PropTypes from 'prop-types';

const RepoInputField = (props) => {

	return(
		<input
			name='repo'
			className='InputField'
			type='text'
			value={props.value}
			autoComplete='off'
			disabled={(!props.listOfRepos.length > 0 && !props.value)}
			placeholder='репозиторий'
			onChange={props.onchange}
			onKeyDown={props.onkeydown}
			onFocus={() => {props.showAutocomplete(); props.onInputFocus()}}
			onBlur={() => { props.onInputBlur()}}
			
		/>
	)
}

RepoInputField.propTypes = {
	value: PropTypes.string.isRequired,
	onchange: PropTypes.func.isRequired,
	onkeydown: PropTypes.func.isRequired,
	listOfRepos: PropTypes.array.isRequired,
	showAutocomplete: PropTypes.func.isRequired,
	onInputFocus: PropTypes.func.isRequired,
	onInputBlur: PropTypes.func.isRequired,
}

export default RepoInputField