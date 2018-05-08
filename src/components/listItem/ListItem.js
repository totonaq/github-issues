import React from 'react';
import exclamation from './exclamation.svg';
import './ListItem.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ListItem = (props) => {

	const { user: {login}, title, number, created_at } = props.data;

	const onclick = (e) => {
		const { name, repo } = props.match.params;
		e.preventDefault();
		props.history.push(`/repos/${name}/${repo}/issues/${number}`);
	}
		
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
					onClick={onclick}
				>
					{title}
				</a>
				

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
						onMouseOver={props.onmouseover}
						onMouseOut={props.onmouseout}
					>
						{login}
					</span>

				</div>
				
			</div>
			
		</li>
	
	)
	
}

ListItem.defaultProps = {
	data: { user: ''},
	onmouseover: () => {},
	onmouseout: () => {},
}

ListItem.propTypes = {
	data: PropTypes.object.isRequired,
	onmouseout: PropTypes.func.isRequired,
	onmouseover: PropTypes.func.isRequired
}

export default withRouter(ListItem)