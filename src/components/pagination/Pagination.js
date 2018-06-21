import React, {Component} from 'react';
import Page from './Page';
import PrevPage from './PrevPage';
import NextPage from './NextPage';
import './Pagination.css';
import PropTypes from 'prop-types';

class Pagination extends Component {

	componentDidMount() {
    this.props.getWindowWidth();
    window.addEventListener('resize', this.props.getWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.getWindowWidth);
  }

	render() {

		const { windowWidth, currentPage, numberOfPages } = this.props

		const pages = [];

		let start, limit;

		if (windowWidth <= 570) {
			
			// maximum three pages 

			start = Math.max(1, currentPage - 1);
			limit = Math.min(start + 2, numberOfPages);

		} else {

			// maximum ten pages with the active page in the middle

			start = Math.min(Math.max(currentPage - 5, 1), 
	      Math.max(numberOfPages - 9, 1));
	    limit = Math.min(start + 9, numberOfPages);

		}
   
    for (let i = start; i <= limit; i++) {
      pages.push(
        <Page
          key={i}
          value={i}
        />
      )
    }
    
		return (
			<div className='Pagination'>
				{pages.length > 1 && 
	        <div>

	          <PrevPage />

	          {pages}

	          <NextPage numberOfPages={numberOfPages} />

	       	</div>
	      }

	      <p className='Pagination-count-of-pages'>
       		Страница {currentPage} из {numberOfPages}
       	</p>
	    </div>
		)
	}
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	numberOfPages: PropTypes.number.isRequired,
	windowWidth: PropTypes.number.isRequired,
	getWindowWidth: PropTypes.func.isRequired,
}

export default Pagination