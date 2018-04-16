import React, { Component } from 'react';
import { handleResponse } from './helpers';
import { API_URL } from './config';
import SearchField from './components/searchField/SearchField';
import Result from './components/result/Result';
import Loading from './components/Loading';

class Issues extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      listOfRepos: [],
      listOfIssues: null,
      itemsPerPage: 30,
      //set focus on the SearchButton by
      //clicking 'Enter' on the ItemsPerPage field
      currentPage: 1,
      numberOfPages: 0,
      showLoadingIcon: false
    };

    this.username = '';

    this.onValueChange = this.onValueChange.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onchangeItemsNumber = this.onchangeItemsNumber.bind(this);
    this.onPageClick = this.onPageClick.bind(this);
  }

  onValueChange(value) {
    this.setState({ value }, () => this.fetchAutocompleteData());
  }

  fetchAutocompleteData() {
    let indexOfSlash = this.state.value.indexOf('/');

    if (indexOfSlash !== -1) {
      
      let username = this.state.value.substring(0, indexOfSlash);
      
      if (this.username !== username) {
        this.username = username;
        
        fetch(`${API_URL}/users/${this.username}/repos`)
        .then(handleResponse)
        .then(response => {

          if (response.length > 0) {
            this.setState({ listOfRepos: response });
          }

        })
        .catch(error => {
          console.log('response failed', error);
        });

      }

    } else {
      this.username = '';
      this.setState({
        listOfRepos: []
      });
    }
  }

  onSearchButtonClick(e) {
    e.preventDefault();

    if (this.state.value === '') {
      return;
    }

    this.setState({ showLoadingIcon: true });

    this.getNumberOfIssues();
    
  }

  getNumberOfIssues() {

    fetch(`${API_URL}/repos/${this.state.value}`)
    .then(handleResponse)
    .then(response => {

      let numberOfIssues = response.open_issues_count;
      let itemsPerPage = this.state.itemsPerPage;

      if (itemsPerPage === 0) {
        itemsPerPage = 30;
      }
      
      this.setState({
        itemsPerPage,
        currentPage: 1,
        numberOfPages: Math.ceil(numberOfIssues / itemsPerPage)
      }, () => {
        return this.fetchIssuesData(numberOfIssues);
      });
      
    })
    .catch(error => {

      this.setState({
        showLoadingIcon: false,
        listOfIssues: 'Not Found'
      });

      console.log('request failed', error);

    });
  }

  fetchIssuesData (numberOfIssues) {

    let {value, currentPage, itemsPerPage} = this.state;

    fetch(`${API_URL}/repos/${value}/issues?page=${currentPage}&per_page=${itemsPerPage}`)
    .then(handleResponse)
    .then(response => {

      this.setState({
        listOfIssues: response,
        showLoadingIcon: false
      });

    })
    .catch(error => {

      this.setState({
        showLoadingIcon: false,
      });
      console.log('request failed', error);

    });

  }

  onchangeItemsNumber(e) {
  
    let value = Math.min(e.target.value, 100);
    this.setState({ itemsPerPage: value });

  }

  onPageClick(e, btn) {

    e.preventDefault();

    let num;

    if (btn === 'numeric') {
      num = e.target.getAttribute('href') - this.state.currentPage;
    } else if (btn === 'prev') {
      num = -1;
    } else if (btn === 'next') {
      num = 1;
    }

    this.setState( prevState => {
      return {
        showLoadingIcon: true,
        currentPage: +prevState.currentPage + num
      };
    }, () => {
      this.fetchIssuesData();
    });

  }

  render() {
   
    return (

      <div className="Issues">
        <h1 className="Issues-heading">Поиск GitHub issues в заданном репозитории</h1>
        <SearchField
          value={this.state.value}
          repos={this.state.listOfRepos}
          itemsPerPage={this.state.itemsPerPage}

          onSearchButtonClick={this.onSearchButtonClick}
          onValueChange={this.onValueChange}
          onchangeItemsNumber={this.onchangeItemsNumber}
          onItemsPerPageKeyDown={this.onItemsPerPageKeyDown}
        />

        {this.state.showLoadingIcon ? 

          <Loading /> :
         
          <Result
            listOfIssues={this.state.listOfIssues}
            currentPage={this.state.currentPage}
            numberOfPages={this.state.numberOfPages}
            onPageClick={this.onPageClick}
          />
           
        }

      </div>

    );
  }
}

export default Issues;
