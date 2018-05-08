import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from './not_found.png';
import './NotFound.css';

const NotFound = () => {
	return (
		<div className='NotFound'>
			
			<img src={notFoundImage} alt='not found' className='NotFound-img' />
			<p className='NotFound-404'>404</p>
			<h2 className='NotFound-text'>Страница не найдена</h2>
			<Link className='NotFound-link' to='/' >На главную</Link>
		</div>
	)
}

export default NotFound