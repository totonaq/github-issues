const fetchIssues = (state = {}, action) => {
	switch (action.type) {
		case 'REQUEST_ISSUES':
			return {
				...state,
				listOfIssues: [],
				isLoading: true
				
			}
		case 'RECEIVE_ISSUES':
			return {
				...state,
				isLoading: false,
				
				listOfIssues: action.listOfIssues,
				numberOfPages: action.numberOfPages
			}
		case 'REQUEST_ISSUES_FAILURE':
			return {
				...state,
				isLoading: false,
			
				listOfIssues: [],
			}
		case 'REQUEST_SINGLE_ISSUE':
			return {
				...state,
				isLoading: true,
			
			}
		case 'RECEIVE_SINGLE_ISSUE':
			return {
				...state,
				isLoading: false,
			
				issue: action.issue,
				comments: action.comments
			}
		case 'REQUEST_SINGLE_ISSUE_FAILURE':
			return {
				...state,
				isLoading: false,
				
				issue: {},
				comments: []
			}
		default:
			return state
	}
}

export const selectedIssue = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_ISSUE':
      return action.selectedIssue
    default:
      return state
  }
}

export const getSingleIssueId = (state = '', action) => {
	switch (action.type) {
    case 'GET_SINGLE_ISSUE_ID':
      return action.singleIssueId
    default:
      return state
  }
}

export const fetchIssuesByRepo = (state = {}, action) => {
	switch (action.type) {
		case 'REQUEST_ISSUES':
		case 'RECEIVE_ISSUES':
		case 'REQUEST_ISSUES_FAILURE':
			return {
				...state,
				[action.selectedIssue]: fetchIssues(state[action.selectedIssue], action)
			}
		default:
			return state
	}
}

export const fetchSingleIssue = (state = {}, action) => {
	switch (action.type) {
		case 'REQUEST_SINGLE_ISSUE':
		case 'RECEIVE_SINGLE_ISSUE':
		case 'REQUEST_SINGLE_ISSUE_FAILURE':
			return {
				...state,
				[action.singleIssueId]: fetchIssues(state[action.singleIssueId], action)
			}
		default:
			return state
	}
}