import React, { Component } from 'react';
import { ListItemBlock } from './../../containers/containers';
import './List.css';
import PropTypes from 'prop-types';

class List extends Component {

	getRef(node) {
		this.ul = node;
	}

	onListMouseOver(e) {

		if (e.target.closest('li')) {

			const siblings = [].slice.call(this.ul.children, 0);

			siblings.forEach(item => {
				item.classList.remove('gray');
			});
		
			e.target.closest('li').classList.add('gray');

		}

	}

	render() {
	
		return(

			<div>
			
				<ul
					className='List'
					ref={this.getRef.bind(this)}
					onMouseOver={(e) => this.onListMouseOver(e)}>

					{this.props.listOfIssues.map(issue => {
						return(
							<ListItemBlock
								key={issue.id}
								data={issue}
							/>
						)})
					}
				</ul>

			</div>
		)
	}
}

List.defaultProps = {
	onmouseover: () => {},
	onmouseout: () => {},
	listOfIssues: []
}

List.propTypes = {
	onmouseover: PropTypes.func.isRequired,
	onmouseout: PropTypes.func.isRequired,
	listOfIssues: PropTypes.array.isRequired
}

export default List
