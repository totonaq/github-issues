import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from './../config';
import { handleResponse } from './../helpers';
import Loading from './Loading';
import NotFound from './NotFound';
import Comment from './Comment';
import exclamation from './exclamation-white.svg';
import 'github-syntax-light/lib/github-light.css';
import './Details.css';

class Details extends Component {

	constructor() {
		super()

		this.state = {
			title: '',
			body: '',
			number: 0,
			author: '',
			authorUrl: '',
			avatar: null,
			created: null,
			commentsNumber: null,
			url: '',
			showLoadingIcon: false,
			isNotFound: false,
			comments: []
		}
	}

	componentDidMount() {
		this.fetchIssue();
	}

	fetchIssue() {

		this.setState({ showLoadingIcon: true });

		const { name, repo, number } = this.props.match.params;

		console.log(number);

    fetch(`${API_URL}/repos/${name}/${repo}/issues/${number}`, {
    	headers: {
        'Accept': 'application/vnd.github.v3.html+json',
      }
    })
    .then(handleResponse)
    .then((issue) => {
     
      this.setState({
        title: issue.title,
        body: issue.body_html,
        number: issue.number,
        avatar: issue.user.avatar_url,
        author: issue.user.login,
        authorUrl: issue.user.html_url,
        created: issue.created_at,
        commentsNumber: issue.comments,
        url: issue.html_url,
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

      console.log(comments);
     
    })
    .catch((error) => {
     	console.log('request failed', error);
      // this.setState({
      //   isNotFound: true,
      //   showLoadingIcon: false
      // });
    });
	}

	render() {
		const { title, body, number, author, authorUrl, avatar, created, commentsNumber, url, showLoadingIcon, isNotFound, comments} = this.state;

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
							<a href={authorUrl} className='Details-descr-info-author'>{author}</a>
							<span className='Details-descr-info-opened'> открыл issue {new Date(created).toLocaleString()}</span>
							{commentsNumber && 
								<span className='Details-descr-info-comments'>, комментарии: {commentsNumber}</span>
							}
						</div>
						
					</div>

					<div>
						<Comment 
							authorUrl={authorUrl}
							avatar={avatar}
							author={author}
							created={created}
							body={body}
						/>
					</div>

					
					{comments && 
						comments.map((comment, index) => {
							return (
								<Comment
									key={index}
									authorUrl={comment.user.html_url}
									avatar={comment.user.avatar_url}
									author={comment.user.login}
									created={comment.created_at}
									body={comment.body_html}
								/>
							)
						})
					}

					<p className='Details-moreInfo'>
						<a className='Details-moreInfo-link' href={url} >Подробнее на GitHub</a>
					</p>

				</div>

			)
		}
	}
	
}

export default withRouter(Details)