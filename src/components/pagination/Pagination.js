import React, {Component} from 'react';
import Page from './Page';
import PrevPage from './PrevPage';
import NextPage from './NextPage';
import './Pagination.css';
import PropTypes from 'prop-types';

class Pagination extends Component {

	constructor(props) {
		super(props);

		this.state = {
			windowWidth: 0
		};

		this.getWindowWidth = this.getWindowWidth.bind(this);

	}

	componentDidMount() {
    this.getWindowWidth();
    window.addEventListener('resize', this.getWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowWidth);
  }

  getWindowWidth() {
    this.setState({ windowWidth: document.documentElement.clientWidth });
  }

	render() {
		let pages = [];

		let start, limit;

		if (this.state.windowWidth <= 570) {
			
			// maximum three pages 

			start = Math.max(1, this.props.currentPage - 1);
			limit = Math.min(start + 2, this.props.numberOfPages);

		} else {

			// maximum ten pages with the active page in the middle

			start = Math.min(Math.max(this.props.currentPage - 5, 1), 
	      Math.max(this.props.numberOfPages - 9, 1));
	    limit = Math.min(start + 9, this.props.numberOfPages);

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

	          <NextPage numberOfPages={this.props.numberOfPages} />

	       	</div>
	      }

	      <p className='Pagination-count-of-pages'>
       		Страница {this.props.currentPage} из {this.props.numberOfPages}
       	</p>
	    </div>
		)
	}
}

Pagination.defaultProps = {
	currentPage: 1,
	numberOfPages: 1
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	numberOfPages: PropTypes.number.isRequired,
}

export default Pagination