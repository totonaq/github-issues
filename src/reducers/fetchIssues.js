const fetchIssues = (state = {
	listOfIssues: [],
	issue: { 
		user: {}
	},
	comments: []
}, action) => {
	switch (action.type) {
		case 'REQUEST_ISSUES':
			return {
				...state,
				listOfIssues: [],
				isLoading: true,
				isParamWrong: false
			}
		case 'RECEIVE_ISSUES':
			return {
				...state,
				isLoading: false,
				isParamWrong: false,
				listOfIssues: action.listOfIssues,
				numberOfPages: action.numberOfPages
			}
		case 'REQUEST_ISSUES_FAILURE':
			return {
				...state,
				isLoading: false,
				isParamWrong: true,
				listOfIssues: [],
			}
		case 'REQUEST_SINGLE_ISSUE':
			return {
				...state,
				isLoading: true,
				isParamWrong: false,
				//issue: {},
				//comments: []
			}
		case 'RECEIVE_SINGLE_ISSUE':
			return {
				...state,
				isLoading: false,
				isParamWrong: false,
				issue: action.issue,
				comments: action.comments
			}
		case 'REQUEST_SINGLE_ISSUE_FAILURE':
			return {
				...state,
				isLoading: false,
				isParamWrong: true,
				issue: {},
				comments: []
			}
		default:
			return state
	}
}

export default fetchIssues;