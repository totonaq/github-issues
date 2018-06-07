const issues = (state = {}, action) => {
	switch (action.type) {
		case 'SHOW_LOADING_ICON':
			return {
				...state,
				isLoading: action.isLoading
			}
		case 'SET_NUMBER_OF_PAGES':
			return {
				...state,
				numberOfPages: action.numberOfPages
			}
		case 'GET_LIST_OF_ISSUES':
			return {
				...state,
				listOfIssues: action.listOfIssues
			}
		case 'GET_SINGLE_ISSUE':
			return {
				...state,
				issue: action.issue
			}
		case 'GET_COMMENTS':
			return {
				...state,
				comments: action.comments
			}
		default:
			return state
	}
}

export default issues