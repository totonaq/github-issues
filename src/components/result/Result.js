import React, { Component } from 'react';
import { ListBlock } from './../../containers/containers';
import { PaginationBlock } from './../../containers/containers';
import NoIssues from './../noIssues/NoIssues';
import Loading from './../loading/Loading';
import PropTypes from 'prop-types';
import { validatePageNumber, validateItemsPerPage } from './../../helpers';
import { parse } from 'qs';
import './Result.css';

class Result extends Component {

	getParams(source) {
		const { name, repo } = source.match.params;

		let { page, per_page } = parse(source.location.search.substr(1));

		page = validatePageNumber(page);
		per_page = validateItemsPerPage(per_page);
		
		this.props.getIssuesIfNeeded(name, repo, page, per_page);
	}

	componentDidMount() {

		this.getParams(this.props)

	}

	componentWillReceiveProps(nextProps) {
   
    if (this.props.location.pathname !== nextProps.location.pathname || 
    	this.props.location.search !== nextProps.location.search
    	) {

    	this.getParams(nextProps)

    }
  }

	render() {

    const { isLoading, issuesLength, location } = this.props;

		let { page } = parse(location.search.substr(1));

		page = validatePageNumber(page);

		if (isLoading) {

			return <Loading />
			
		} else if (issuesLength === 0) {
			
			return <NoIssues />

		} else {

			return (
				<div className='Result'>

					<ListBlock />

					<PaginationBlock
						currentPage={page}
					/>

				</div>
			)

		}
	}
	
}

Result.propTypes = {
  location: PropTypes.object.isRequired,
	issuesLength: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getIssuesIfNeeded: PropTypes.func.isRequired
}

export default Result