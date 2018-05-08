import React, { Component } from 'react';
import search from './search.svg';
import UserInputField from './inputFields/UserInputField';
import RepoInputField from './inputFields/RepoInputField';
import Autocomplete from './autocomplete/Autocomplete';
import SearchButton from './searchButton/SearchButton';
import ItemsPerPage from './itemsPerPage/ItemsPerPage';
import PropTypes from 'prop-types';
import { API_URL } from './../../config';
import { handleResponse } from './../../helpers';
import { withRouter } from 'react-router-dom';

import './SearchField.css';

class SearchField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			listOfRepos: [],
      currentPage: 1,
			activeHint: -1,
			isAutoCompleteVisible: false,
			isInputFocused: false
		};

		this.onValueChange = this.onValueChange.bind(this);
		this.onAutocompleteKeyDown = this.onAutocompleteKeyDown.bind(this);
		this.chooseRepo = this.chooseRepo.bind(this);
		this.hideAutocomplete = this.hideAutocomplete.bind(this);
		this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
		this.onchangeItemsNumber = this.onchangeItemsNumber.bind(this);
		this.showAutocomplete = this.showAutocomplete.bind(this);
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		
		this.time = null
	}

	// componentDidMount() {
	// 	let { username } = this.props;

		
	// 	this.getListOfRepos(username);
		

	  
	// }

	componentWillReceiveProps(nextProp) {
		if (this.props.username !== nextProp.username || 
			this.props.repo !== nextProp.repo) {

			let { username } = nextProp;

			this.setState({ listOfRepos: [] });

			// no fetching issues unless 300ms have passed
			// since the last symbol of the repo input was typed

			clearTimeout(this.time)

	    this.time = setTimeout(() => this.getListOfRepos(username), 300);


	    
		}
	}

  onValueChange(e) {
		let value = e.target.value;

		if (e.target.name === 'username') {
			this.props.setUsernameValue(value);
			this.props.setRepoValue('');
			this.hideAutocomplete();
		} else if (e.target.name === 'repo') {
			this.props.setRepoValue(value);
			this.showAutocomplete();
		}

  }

  getListOfRepos(username) {

  	if (!username) {
  		this.setState({ listOfRepos: [] });
  		return
  	};
        
    fetch(`${API_URL}/users/${username}/repos`)
    .then(handleResponse)
    .then(response => {

      if (response.length > 0) {
        this.setState({ listOfRepos: response });
      }

    })
    .catch(error => {
      console.log('response failed', error);
      //this.setState({ listOfRepos: [] });
    });

  }

  onchangeItemsNumber(e) {
  	let itemsPerPage = Math.min(e.target.value, 100);
  	this.props.setItemsPerPage(itemsPerPage);
  }

  showAutocomplete() {
  	this.setState({ 
			isAutoCompleteVisible: true,
			activeHint: -1
		});
  }

  hideAutocomplete() {
    this.setState({ isAutoCompleteVisible: false });
  }

	onAutocompleteKeyDown(e) {
		if (this.filterRepos(this.state.listOfRepos).length > 0) {

			switch (e.key) {
		    case "ArrowDown":
		    	
		    	this.setState(prevState => {
		    		return {activeHint: Math.min(prevState.activeHint + 1, 
		    			this.filterRepos(this.state.listOfRepos).length - 1)};
		    	});

		      break;

		    case "ArrowUp":
		    	this.setState(prevState => {
		    		return {activeHint: Math.max(prevState.activeHint - 1, 0)};
		    	});
		   
		      break;

		    case "Enter":
		    	
		    	if (this.state.activeHint > -1) {
		    		e.preventDefault()
		    		this.chooseRepo(this.state.activeHint);
		    		this.setState({ activeHint: -1 });
		    		this.onInputBlur();
		    		this.hideAutocomplete();
		    	}
		    	break;

		    default:
		      
		 	}
		}
	}


	filterRepos(repos) {
		let val = this.props.repo;

		return repos.filter(repo => {

			return val.toUpperCase() ===
				repo.name.slice(0, val.length).toUpperCase();

		});

	}

	chooseRepo(id) {
		
		let repo = this.filterRepos(this.state.listOfRepos)[id].name;
		this.props.setRepoValue(repo);

		this.props.history.push(`/repos/${this.props.username}/${repo}/issues?page=1&per_page=${this.props.itemsPerPage}`);

	}

	onSearchButtonClick(e) {
		e.preventDefault();
		if (!this.props.username || !this.props.repo) return;

		let per_page = this.props.itemsPerPage;

		if (per_page === 0) {
			per_page = 30;
      this.props.setItemsPerPage(per_page);
    }

		this.props.history.push(`/repos/${this.props.username}/${this.props.repo}/issues?page=1&per_page=${per_page}`);
	}

	onInputFocus() {
		this.setState({ isInputFocused: true });
	}

	onInputBlur() {
		this.setState({ isInputFocused: false });
	}

	render() {

		//console.log(this.state.listOfRepos)
		
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
					<div className={`inputField-wrap${this.state.isInputFocused ? ' focus' : ''}`}>
						<UserInputField
							value={this.props.username}
							onchange={this.onValueChange}
							onInputFocus={this.onInputFocus}
							onInputBlur={this.onInputBlur}
							hideAutocomplete={this.hideAutocomplete}
						/>

						<RepoInputField
							value={this.props.repo}
							onchange={this.onValueChange}
							onkeydown={this.onAutocompleteKeyDown}
							listOfRepos={this.state.listOfRepos}
							showAutocomplete={this.showAutocomplete}
							onInputFocus={this.onInputFocus}
							onInputBlur={this.onInputBlur}
						/>
					</div>
					{(this.state.isAutoCompleteVisible &&
						this.filterRepos(this.state.listOfRepos).length > 0) &&

						<Autocomplete
							repos={this.filterRepos(this.state.listOfRepos)}
							chooseRepo={this.chooseRepo}
							hideAutocomplete={this.hideAutocomplete}
							activeHint={this.state.activeHint}
						/>

					}

					<SearchButton
						onSearchButtonClick={this.onSearchButtonClick}
					/>

					<ItemsPerPage
	          number={this.props.itemsPerPage}
	          onchange={this.onchangeItemsNumber}
	        />
					
				</div>
				
			</form>
		)
	}
}

SearchField.propTypes = {
	username: PropTypes.string.isRequired,
	repo: PropTypes.string.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	setUsernameValue: PropTypes.func.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
  setRepoValue: PropTypes.func.isRequired
}

export default withRouter(SearchField)