import React, { Component } from 'react';
import './SearchButton.css';
import PropTypes from 'prop-types';

class SearchButton extends Component {

	shouldComponentUpdate() {
		return this.props.searchBtnFocus;
	}

	componentDidUpdate() {
		this.button.focus();
	}

	getRef(node) {
		this.button = node;
	}

	render() {
		
		return(
			<button
				ref={this.getRef.bind(this)}
				type='submit'
				className='SearchButton'
				onClick={this.props.onclick}>
				Поиск
			</button>
		)
	}
	
}

SearchButton.propTypes = {
	onclick: PropTypes.func.isRequired,
	searchBtnFocus: PropTypes.bool.isRequired
}

export default SearchButton