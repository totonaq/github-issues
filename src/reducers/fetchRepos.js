const fetchRepos = (state = {listOfRepos: []}, action) => {
	switch (action.type) {
		case 'REQUEST_REPOS':
			return {
				...state,
				listOfRepos: []
			}
		case 'RECEIVE_REPOS':
			return {
				...state,
				listOfRepos: action.listOfRepos
			}
		case 'REQUEST_REPOS_FAILURE':
			return {
				...state,
				listOfRepos: []
			}
		default:
			return state
	}
}

export default fetchRepos;