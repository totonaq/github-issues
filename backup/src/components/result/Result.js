import React, { Component } from 'react';
import List from './list/List';
import Pagination from './pagination/Pagination';
import NoIssues from './noIssues/NoIssues';
import Loading from './../Loading';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { API_URL } from './../../config';
import { handleResponse, validatePageNumber, validateItemsPerPage } from './../../helpers';
import { parse } from 'qs';
import './Result.css';

class Result extends Component {

	constructor(props) {
		super(props);

		this.state = {
			numberOfPages: 0,
			listOfIssues: [],
			showLoadingIcon: false
		};
	}

	componentDidMount() {

		const { name, repo} = this.props.match.params;

		let { page, per_page } = parse(this.props.location.search.substr(1));

		page = validatePageNumber(page);
		per_page = validateItemsPerPage(per_page);

		this.getNumberOfIssues(name, repo, page, per_page);
	}

	componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname || 
    	this.props.location.search !== nextProps.location.search
    	) {

    	const { name, repo} = nextProps.match.params;

    	let { page, per_page } = parse(nextProps.location.search.substr(1));

    	page = validatePageNumber(page);
			per_page = validateItemsPerPage(per_page);

      this.getNumberOfIssues(name, repo, page, per_page);
    }
  }

	getNumberOfIssues(name, repo, page, per_page) {

    this.props.setUsernameValue(name);
    this.props.setRepoValue(repo);
    this.props.setItemsPerPage(per_page);

    this.setState({ showLoadingIcon: true });

    fetch(`${API_URL}/repos/${name}/${repo}`)
    .then(handleResponse)
    .then(response => {

      let numberOfIssues = response.open_issues_count;

      this.setState({
        numberOfPages: Math.ceil(numberOfIssues / per_page)
      }, () => {
        return this.getListOfIssues(name, repo, page, per_page);
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

  getListOfIssues(name, repo, page, per_page) {

    fetch(`${API_URL}/repos/${name}/${repo}/issues?page=${page}&per_page=${per_page}`)
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

	render() {
		
		let { page } = parse(this.props.location.search.substr(1));

		page = validatePageNumber(page);

		let messages = [
			'В данном репозитории не найдено issues',
			'По вашему запросу ничего не найдено. Проверьте правильность введенных данных.'
		];

		if (this.state.showLoadingIcon) {

			return <Loading />
			
		} else if (this.state.listOfIssues.length === 0) {
			// if no issues are found in a particular repo
			return (
				<NoIssues className='NoIssues' message={messages[0]} />
			)

		} else if (this.state.listOfIssues === 'Not Found') {
			// if a wrong request is done
			return (
				<NoIssues className='NoIssues' message={messages[1]} />
			)

		} else {

			return (
				<div className='Result'>
					<List listOfIssues={this.state.listOfIssues} />

					<Pagination 
						currentPage={page}
						numberOfPages={this.state.numberOfPages}
					/>
				</div>
			)

		}
	}
	
}

Result.propTypes = {
	setUsernameValue: PropTypes.func.isRequired,
  setRepoValue: PropTypes.func.isRequired,
  setItemsPerPage: PropTypes.func.isRequired
}

export default withRouter(Result)