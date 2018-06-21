import React from 'react';
import PropTypes from 'prop-types';

const Comment = (props) => {

	const { onmouseover, onmouseout, data } = props;

	const { 
		body_html, 
		created_at, 
		user }  = data 

	const {login, html_url, avatar_url} = user || {login: '', 
			html_url: '', 
			avatar_url: ''}; 

	return (

		<div className='Details-body'>

			<div className='Details-body-avatar'>
				<a
					className='Details-body-avatar-link'
					data-user={login}
					href={html_url}
					onMouseOver={onmouseover}
					onMouseOut={onmouseout}
				>
					<img
						
						className='Details-body-avatar-link-img'
						width='44'
						height='44'
						src={avatar_url}
						alt='avatar' />
				</a>
			</div>

			<div className='Details-body-content'>
				<div className='Details-body-content-header'>

					<a
						data-user={login}
						href={html_url}
						className='Details-descr-content-header-author'
						onMouseOver={onmouseover}
						onMouseOut={onmouseout}
						>
						{login}
					</a>

					<span className='Details-descr-content-header-opened'
					> прокомментировал {new Date(created_at).toLocaleString()}</span>
				</div>
				<div className='Details-body-content-text'>
					{ body_html ? 
						<div
							className='Details-body-content-text-par'
							dangerouslySetInnerHTML={{__html: body_html}}>
						</div>
						:
						<div
							className='Details-body-content-text-par_no-descr'
							>
							Нет описания.
						</div>
					}
				</div>
			</div>

		</div>

	)
}

Comment.propTypes = {
	data: PropTypes.object.isRequired,
	onmouseover: PropTypes.func.isRequired,
	onmouseout: PropTypes.func.isRequired,
}

export default Comment