import React from 'react';
import { ResultBlock, SearchFieldBlock } from './../../containers/containers';
import ResultPage from './../resultPage/ResultPage'

const ListOfIssues = () => {

	return (
		<ResultPage>
			<SearchFieldBlock />
			<ResultBlock />
		</ResultPage>
	)
	
}

export default ListOfIssues