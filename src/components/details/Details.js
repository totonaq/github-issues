import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Loading from './../loading/Loading';
import Comment from './../comment/Comment';
import exclamation from './exclamation-white.svg';
import 'github-syntax-light/lib/github-light.css';
import './Details.css';
import PropTypes from 'prop-types';

class Details extends Component {

	componentWillMount() {
		const { name, repo, number } = this.props.match.params;
		this.props.fetchSingleIssue(name, repo, number);
	}

	componentWillReceiveProps(nextProps) {
   
    if (this.props.location.pathname !== nextProps.location.pathname || 
    	this.props.location.search !== nextProps.location.search
    	) {

    	const { name, repo, number } = nextProps.match.params;
    	this.props.fetchSingleIssue(name, repo, number);

    }
  }

	render() {

		const { 
			isLoading, 
			comments, 
			fetchOnMouseOver, 
			onTooltipMouseOut, 
			history, 
			issue } = this.props;

		const { 
			title, 
			number, 
			created_at, 
			comments: commentsNumber, 
			html_url: issueUrl, 
			user } = issue;

		const { login, html_url: authorUrl } = user;
		

		if (isLoading) {
			return (
				<div className='loading-wrap'>
					<Loading />
				</div>
			)
		} else {

			return (
				<div className='Details'>
					<button className='back-button' onClick={() => history.goBack()}>Назад</button>
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
								onMouseOver={fetchOnMouseOver}
								onMouseOut={onTooltipMouseOut}
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
							data={issue}
							onmouseover={fetchOnMouseOver}
							onmouseout={onTooltipMouseOut}
						/>
					</div>
					
					{comments && 
						comments.map((comment) => {
							return (
								<Comment
									key={comment.id}
									data={comment}
									onmouseover={fetchOnMouseOver}
									onmouseout={onTooltipMouseOut}
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
	issue: { user: {} },
	isLoading: false,
	comments: [],
	fetchOnMouseOver: () => {},
	onTooltipMouseOut: () => {},
}

Details.propTypes = {
	issue: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	comments: PropTypes.array.isRequired,
	fetchOnMouseOver: PropTypes.func.isRequired,
	onTooltipMouseOut: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
}

export default withRouter(Details)