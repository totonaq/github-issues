import React from 'react';
import search from './search.svg';
import PropTypes from 'prop-types';

import { UserInputFieldBlock, 
				 RepoInputFieldBlock,
				 ItemsPerPageBlock,
				 AutocompleteBlock,
				 SearchButtonBlock } from './../../containers/containers';

import './SearchField.css';

const SearchField = ({ isInputFocused, isAutoCompleteVisible, reposLength }) => {

	return (
		<div>
    	<h1 className="Issues-search-heading">Поиск GitHub issues в заданном репозитории</h1>

			<form className='SearchField'>

				<label className='SearchField__label' htmlFor='inputField'>
					Введите имя пользователя и репозиторий
				</label>

				<div className='SearchField-content'>
					<img
						className='SearchField-content__img'
						src={search}
						alt='search'
					/>
					<div className={`inputField-wrap${isInputFocused ? ' focus' : ''}`}>
						<UserInputFieldBlock />
						<RepoInputFieldBlock />
						
					</div>
						{(isAutoCompleteVisible && reposLength > 0) &&

							<AutocompleteBlock/>

						}

					<SearchButtonBlock />

					<ItemsPerPageBlock />
					
				</div>
				
			</form>
		</div>
	)
	
}

SearchField.defaultProps = {
	isInputFocused: false,
	isAutoCompleteVisible: false,
	reposLength: 0
}

SearchField.propTypes = {
	isInputFocused: PropTypes.bool.isRequired,
	isAutoCompleteVisible: PropTypes.bool.isRequired,
	reposLength: PropTypes.number.isRequired,
}

export default SearchField