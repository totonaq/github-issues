const autocomplete = (state = {}, action) => {
	switch (action.type) {
		case 'SET_LIST_OF_REPOS':
			return {
				...state,
				listOfRepos: action.listOfRepos
			}
		case 'SET_AUTOCOMPLETE_VISIBILITY':
			return {
				...state,
				isAutoCompleteVisible: action.isAutoCompleteVisible
			}
		case 'SET_ACTIVE_HINT':
			return {
				...state,
				activeHint: action.activeHint
			}
		default:
			return state
	}
}

export default autocomplete