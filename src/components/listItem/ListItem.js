import React from 'react';
import exclamation from './exclamation.svg';
import './ListItem.css';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const ListItem = (props) => {

	const { fetchOnMouseOver, onTooltipMouseOut, data } = props;

	const { user: {login}, title, number, created_at } = data;

	const { name, repo } = props.match.params;

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
				<Link
					className='ListItem-content__link'
					to={`/repos/${name}/${repo}/issues/${number}`}
				>
					{title}
				</Link>
				

				<div className='ListItem-content-data'>
					<span className='ListItem-content-data_number'>
						{'#' + number}
					</span>
					<span className='ListItem-content-data_opened'>
						{' открыт ' + new Date(created_at).toLocaleString() + ' пользователем '}
					</span>
					<span
						data-user={login}
						className='ListItem-content-data_author'
						onMouseOver={fetchOnMouseOver}
						onMouseOut={onTooltipMouseOut}
					>
						{login}
					</span>

				</div>
				
			</div>
			
		</li>
	
	)
	
}

ListItem.propTypes = {
	data: PropTypes.object.isRequired,
	fetchOnMouseOver: PropTypes.func.isRequired,
	onTooltipMouseOut: PropTypes.func.isRequired
}

export default withRouter(ListItem)