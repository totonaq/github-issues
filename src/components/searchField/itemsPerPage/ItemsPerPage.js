import React from 'react';
import './ItemsPerPage.css';
import PropTypes from 'prop-types';

const ItemsPerPage = ({ number, onchange, onkeydown }) => {

	return(
		<div className='ItemsPerPage'>
			<label className='ItemsPerPage__label' htmlFor='number'>Количество объектов на странице</label>
			<input
				id='number'
				className='ItemsPerPage__input'
				type='text'
				value={number}
				onChange={onchange}
				onKeyDown={onkeydown}
			/>
		</div>
	)
}

ItemsPerPage.propTypes = {
	number: PropTypes.number.isRequired,
	onchange: PropTypes.func.isRequired,
	onkeydown: PropTypes.func.isRequired
}

export default ItemsPerPage