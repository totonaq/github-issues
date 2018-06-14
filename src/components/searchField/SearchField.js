import React, { Component } from 'react';
import search from './search.svg';
import PropTypes from 'prop-types';

import { UserInputFieldBlock, 
				 RepoInputFieldBlock,
				 ItemsPerPageBlock,
				 AutocompleteBlock,
				 SearchButtonBlock } from './../../containers/containers';

import { validateItemsPerPage } from './../../helpers';
import { parse } from 'qs';

import './SearchField.css';

class SearchField extends Component {

	componentDidMount() {

		const {
			refreshInputs, 
			match, 
			location } = this.props

		const { name, repo } = match.params
		let { per_page } = parse(location.search.substr(1));

		per_page = validateItemsPerPage(per_page);

		// in case of page reload
		refreshInputs(name, repo, per_page);
	}
	
	render() {
		const { isInputFocused, isAutoCompleteVisible, reposLength } = this.props
		
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