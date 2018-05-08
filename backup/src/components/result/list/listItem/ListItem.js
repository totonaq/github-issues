import React, { Component } from 'react';
import exclamation from './exclamation.svg';
import { handleResponse } from './../../../../helpers';
import { API_URL } from './../../../../config';
import './ListItem.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ListItem extends Component {

	constructor(props) {
		super(props);

		this.fetchOnMouseOver = this.fetchOnMouseOver.bind(this);
		this.onclick = this.onclick.bind(this);
	}

	getTooltipPosition(e) {

		let coords = e.target.getBoundingClientRect();

		let tooltipTriangleHeight = 8; // the half width has the same value

		let tooltipTriangleOffsetLeft = 26;

		let yOffset, top, bottom, left;

		yOffset = coords.top;

		top = yOffset + coords.height + window.pageYOffset + 
			tooltipTriangleHeight + 'px';

		bottom = document.documentElement.clientHeight - 
			coords.top - window.pageYOffset + 
			tooltipTriangleHeight + 'px';

		left = document.documentElement.clientWidth >= 768 ? 
			coords.width/2 + coords.left - tooltipTriangleHeight - 
			tooltipTriangleOffsetLeft + 'px' :
			20 + 'px';

		return {
			yOffset,
			top,
			bottom,
			left
		};
	}

	fetchOnMouseOver(e) {

		this.props.getTooltipPosition(this.getTooltipPosition(e));

		fetch(`${API_URL}/users/${this.props.user}`)
		.then(handleResponse)
    .then(response => {
    	
    	this.props.getUserData({
    		userName: response.name,
    		location: response.location,
    		bio: response.bio,
    		company: response.company
    	});
		
	  })
	  .catch(error => {
      console.log('request failed', error);
    });

		this.props.onmouseover(e.target);
	}

	onclick(e) {
		const { name, repo } = this.props.match.params;
		e.preventDefault();
		this.props.history.push(`/repos/${name}/${repo}/issues/${this.props.number}`);
	}

	render() {
		
		return(
			
			<li className='ListItem'>
				<div className='ListItem-icon'>
					<img
						className='ListItem-icon__img'
						src={exclamation}
						alt='exc'
					/>
				</div>

				<div className='ListItem-content'>
					<a href=''
						className='ListItem-content__link'
						onClick={this.onclick}
					>
						{this.props.title}
					</a>
					

					<div className='ListItem-content-data'>
						<span className='ListItem-content-data_number'>
							{'#' + this.props.number}
						</span>
						<span className='ListItem-content-data_opened'>
							{' открыт ' + new Date(this.props.date).toLocaleString() + ' пользователем '}
						</span>
						<span
							data-id={this.props.id}
							className='ListItem-content-data_author'
							onMouseOver={this.fetchOnMouseOver}
							onMouseOut={this.props.onmouseout}
						>
							{this.props.user}
						</span>

					</div>
					
				</div>
				
			</li>
		
		)
	}
}

ListItem.propTypes = {
	id: PropTypes.number.isRequired,
	user: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	issueUrl: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	getTooltipPosition: PropTypes.func.isRequired,
	getUserData: PropTypes.func.isRequired,
	onmouseout: PropTypes.func.isRequired,
	onmouseover: PropTypes.func.isRequired
}

export default withRouter(ListItem)