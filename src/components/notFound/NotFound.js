import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from './not_found.png';
import './NotFound.css';

class NotFound extends Component {

	constructor() {
		super();
		this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
	}

	onBackButtonEvent(e) {
    e.preventDefault();
    window.location.reload();
  }

  componentDidMount() {
    window.addEventListener('popstate', this.onBackButtonEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onBackButtonEvent);
  }

	render() {

		return (
			<div className='NotFound'>
				<img src={notFoundImage} alt='not found' className='NotFound-img' />
				<p className='NotFound-404'>404</p>
				<h2 className='NotFound-text'>Страница не найдена</h2>
				<Link className='NotFound-link' to='/' >На главную</Link>
			</div>
		)
	}
	
}

export default NotFound