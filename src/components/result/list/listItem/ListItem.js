import React, { Component } from 'react';
import exclamation from './exclamation.svg';
import { handleResponse } from './../../../../helpers';
import { API_URL } from './../../../../config';
import './ListItem.css';
import PropTypes from 'prop-types';

class ListItem extends Component {

	constructor(props) {
		super(props);

		this.fetchOnMouseOver = this.fetchOnMouseOver.bind(this);
	}

	getTooltipPosition(e) {

		let coords = e.target.getBoundingClientRect();

		let top, bottom, left;

		top = coords.top + coords.height + window.pageYOffset + 8 + 'px';

		bottom = document.documentElement.clientHeight - 
			coords.top - window.pageYOffset + 8 + 'px';

		left = document.documentElement.clientWidth >= 768 ? 
			coords.width/2 + coords.left - 8 - 26 + 'px' :
			20 + 'px';

		return {
			left,
			top,
			bottom,
			yOffset: coords.top
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
					
					<a
						className='ListItem-content__link'
						href={this.props.issueUrl}>{this.props.title}
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

export default ListItem

