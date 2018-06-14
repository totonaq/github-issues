const autocomplete = (state = {}, action) => {
	switch (action.type) {
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