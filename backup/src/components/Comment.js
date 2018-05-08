import React from 'react';

const Comment = ({ authorUrl, avatar, author, created, body }) => {
	return (

		<div className='Details-body'>

			<div className='Details-body-avatar'>
				<a href={authorUrl}>
					<img className='Details-body-avatar-img' width='44' height='44' src={avatar} alt='avatar' />
				</a>
			</div>

			<div className='Details-body-content'>
				<div className='Details-body-content-header'>
					<a href={authorUrl} className='Details-descr-content-header-author'>{author}</a>
					<span className='Details-descr-content-header-opened'> прокомментировал {new Date(created).toLocaleString()}</span>
				</div>
				<div className='Details-body-content-text'>
					{ body && <div className='Details-body-content-text-par' dangerouslySetInnerHTML={{__html: body}}></div>}
				</div>
			</div>

		</div>

	)
}

export default Comment