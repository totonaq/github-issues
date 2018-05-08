import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from './../../config';
import { handleResponse } from './../../helpers';
import Loading from './../loading/Loading';
import NotFound from './../notFound/NotFound';
import Comment from './../comment/Comment';
import exclamation from './exclamation-white.svg';
import 'github-syntax-light/lib/github-light.css';
import './Details.css';
import PropTypes from 'prop-types';

class Details extends Component {

	constructor() {
		super();

		this.state = {
			issue: {user : ''},
			showLoadingIcon: false,
			isNotFound: false,
			comments: []
		};
	}

	componentDidMount() {
		this.fetchIssue();
	}

	fetchIssue() {

		this.setState({ showLoadingIcon: true });

		const { name, repo, number } = this.props.match.params;

    fetch(`${API_URL}/repos/${name}/${repo}/issues/${number}`, {
    	headers: {
        'Accept': 'application/vnd.github.v3.html+json',
      }


    })
    .then(handleResponse)
    .then((issue) => {

     	if (number !== String(parseInt(number, 10))) throw new Error();

      this.setState({
      	issue,
        showLoadingIcon: false,
        isNotFound: false
      });

      if (issue.comments) {
      	this.fetchComments(name, repo, number);
      }
     
    })
    .catch((error) => {
     	console.log('request failed', error);
      this.setState({
        isNotFound: true,
        showLoadingIcon: false
      });
    });

	}

	fetchComments(name, repo, number) {
		fetch(`${API_URL}/repos/${name}/${repo}/issues/${number}/comments`, {
    	headers: {
        'Accept': 'application/vnd.github.v3.html+json',
      }
    })
    .then(handleResponse)
    .then((comments) => {

    	this.setState({ comments });
     
    })
    .catch((error) => {
     	console.log('request failed', error);
      this.setState({
        isNotFound: true,
        showLoadingIcon: false
      });
    });
	}

	render() {

		const { title, number, created_at, comments: commentsNumber, html_url: issueUrl } = this.state.issue;
		const { login, html_url: authorUrl } = this.state.issue.user;
		const { showLoadingIcon, isNotFound, comments } = this.state;

		if (showLoadingIcon) {
			return (
				<div className='loading-wrap'>
					<Loading />
				</div>
			)
		} else if (isNotFound) {
			return <NotFound />
		} else {

			return (
				<div className='Details'>
					<button className='back-button' onClick={() => this.props.history.goBack()}>Назад</button>
					<div className='Details-header'>
						<h1 className='Details-header-heading'>{title}
							<span className='Details-header-number'> #{number}</span>
						</h1>
					</div>

					<div className='Details-descr'>

						<div className='Details-descr-state'>
							<img src={exclamation} width='14' height='16' alt='exc' className='Details-descr-state-img' />
							Open
						</div>

						<div className='Details-descr-info'>
							<a
								data-user={login}
								href={authorUrl}
								className='Details-descr-info-author'
								onMouseOver={this.props.onmouseover}
								onMouseOut={this.props.onmouseout}
							>
							{login}
							</a>

							<span className='Details-descr-info-opened'> открыл issue {new Date(created_at).toLocaleString()}</span>
							{commentsNumber && 
								<span className='Details-descr-info-comments'>, комментарии: {commentsNumber}</span>
							}
						</div>
						
					</div>

					<div>
						<Comment
							data={this.state.issue}
							onmouseover={this.props.onmouseover}
							onmouseout={this.props.onmouseout}
						/>
					</div>
					
					{comments && 
						comments.map((comment) => {
							return (
								<Comment
									key={comment.id}
									data={comment}
									onmouseover={this.props.onmouseover}
									onmouseout={this.props.onmouseout}
								/>
							)
						})
					}

					<p className='Details-moreInfo'>
						<a className='Details-moreInfo-link' href={issueUrl} >Подробнее на GitHub</a>
					</p>

				</div>

			)
		}
	}
	
}

Details.defaultProps = {
	onmouseover: () => {},
	onmouseout: () => {},
}

Details.propTypes = {
	onmouseover: PropTypes.func.isRequired,
	onmouseout: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
}

export default withRouter(Details)