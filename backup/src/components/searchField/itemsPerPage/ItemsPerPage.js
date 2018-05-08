import React from 'react';
import './ItemsPerPage.css';
import PropTypes from 'prop-types';

const ItemsPerPage = ({ number, onchange }) => {

	const onItemsPerPageKeyDown = (e) => {
    let fromCodePoint;

    if (!String.fromCodePoint) {
      fromCodePoint = String.fromCharCode;
    } else {
      fromCodePoint = String.fromCodePoint;
    }

    if (isNaN(fromCodePoint(e.keyCode)) && 
        e.key !== "Backspace" && 
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Enter" 
      ) {
      
      e.preventDefault();

    }
  };

	return(
		<div className='ItemsPerPage'>
			<label className='ItemsPerPage__label' htmlFor='number'>Количество объектов на странице</label>
			<input
				id='number'
				className='ItemsPerPage__input'
				type='text'
				name='perPage'
				value={number}
				onChange={onchange}
				onKeyDown={onItemsPerPageKeyDown}
			/>
		</div>
	)
}

ItemsPerPage.propTypes = {
	number: PropTypes.number.isRequired,
	onchange: PropTypes.func.isRequired,
}

export default ItemsPerPage