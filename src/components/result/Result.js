import React from 'react';
import List from './list/List';
import Pagination from './pagination/Pagination';
import NotFound from './notFound/NotFound';
import './Result.css';
import PropTypes from 'prop-types';

const Result = (props) => {
	let messages = [
		'В данном репозитории не найдено issues',
		'По вашему запросу ничего не найдено. Проверьте правильность введенных данных.'
	];
	
	return(
		<div className='Result'>

			{ Array.isArray(props.listOfIssues) && 
				props.listOfIssues.length > 0 &&

				<div className='list-wrap'>
					<List listOfIssues={props.listOfIssues} />

					<Pagination 
						dataLength={props.listOfIssues.length}
						currentPage={props.currentPage}
						numberOfPages={props.numberOfPages}
						onPageClick={(e, btn) => props.onPageClick(e, btn)}
					/>
				</div>

			}

			{ // if no issues were found in particular repo

				Array.isArray(props.listOfIssues) && 
				props.listOfIssues.length === 0 && 

				<NotFound message={messages[0]} />

			}

			{ // if wrong request were done

				props.listOfIssues === 'Not Found' && 

				<NotFound message={messages[1]} />

			}

		</div>
	)
	
}

Result.propTypes = {
	listOfIssues: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string
	]),
  currentPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired
}

export default Result