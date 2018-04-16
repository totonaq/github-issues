import React, { Component } from 'react';
import search from './search.svg';
import InputField from './inputField/InputField';
import Autocomplete from './autocomplete/Autocomplete';
import SearchButton from './searchButton/SearchButton';
import ItemsPerPage from './itemsPerPage/ItemsPerPage';
import PropTypes from 'prop-types';

import './SearchField.css';

class SearchField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeHint: -1,
			searchBtnFocus: false,
			isAutoCompleteVisible: false
		};

		this.onValueChange = this.onValueChange.bind(this);
		this.onAutocompleteKeyDown = this.onAutocompleteKeyDown.bind(this);
		this.chooseRepo = this.chooseRepo.bind(this);
		this.hideAutocomplete = this.hideAutocomplete.bind(this);
		this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
		this.onItemsPerPageKeyDown = this.onItemsPerPageKeyDown.bind(this);
		
	}

	onValueChange(e) {
		this.props.onValueChange(e.target.value);
		this.setState({ 
			isAutoCompleteVisible: true,
			activeHint: -1
		});
		
	}

	onAutocompleteKeyDown(e) {
		if (this.filterRepos(this.props.repos).length > 0) {

			switch (e.key) {
		    case "ArrowDown":
		    	
		    	this.setState(prevState => {
		    		return {activeHint: Math.min(prevState.activeHint + 1, 
		    			this.filterRepos(this.props.repos).length - 1)};
		    	});

		      break;

		    case "ArrowUp":
		    	this.setState(prevState => {
		    		return {activeHint: Math.max(prevState.activeHint - 1, 0)};
		    	});
		   
		      break;

		    case "Enter":
		    	
		    	if (this.state.activeHint > -1) {
		    		e.preventDefault();
		    		this.chooseRepo(this.state.activeHint);
		    		this.setState({ activeHint: -1 });
		    		this.hideAutocomplete();
		    	}
		    	break;

		    default:
		      
		 	}
		}
	}

	filterRepos(repos) {
		let val = this.props.value;

		return repos.filter(repo => {

			return val.toUpperCase() ===
				repo.full_name.slice(0, val.length).toUpperCase();

		});

	}

	chooseRepo(id) {
		this.props.onValueChange(this.filterRepos(this.props.repos)[id].full_name);
	}

	hideAutocomplete() {
    this.setState({ isAutoCompleteVisible: false });
  }

	onSearchButtonClick(e) {
		this.setState({ searchBtnFocus: false });
		this.props.onSearchButtonClick(e);
	}

	onItemsPerPageKeyDown(e) {
    if (isNaN(String.fromCodePoint(e.keyCode)) && 
        e.key !== "Backspace" && 
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Enter" 
      ) {
      
      e.preventDefault();

    } else if (e.key === "Enter") {

      this.setState({ searchBtnFocus: true });
      
    }
  }

	render() {
		return (
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
					<InputField
						value={this.props.value}
						onchange={this.onValueChange}
						onkeydown={this.onAutocompleteKeyDown}
					/>

					{(this.state.isAutoCompleteVisible &&
						this.filterRepos(this.props.repos).length > 0) &&

						<Autocomplete
							repos={this.filterRepos(this.props.repos)}
							chooseRepo={this.chooseRepo}
							hideAutocomplete={this.hideAutocomplete}
							activeHint={this.state.activeHint}
						/>

					}

					<SearchButton
						onclick={this.onSearchButtonClick}
						searchBtnFocus={this.state.searchBtnFocus}
					/>

					<ItemsPerPage
	          number={this.props.itemsPerPage}
	          onchange={this.props.onchangeItemsNumber}
	          onkeydown={this.onItemsPerPageKeyDown}
	        />
					
				</div>
				
			</form>
		)
	}
}

SearchField.propTypes = {
	value: PropTypes.string.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	onchangeItemsNumber: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
	onSearchButtonClick: PropTypes.func.isRequired,
	onValueChange: PropTypes.func.isRequired
}

export default SearchField