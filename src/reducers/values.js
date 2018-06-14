const values = (state = {}, action) => {
	switch (action.type) {
		case 'SET_USERNAME':
			return {
				...state,
				username: action.username
			}
		case 'SET_REPO':
			return {
				...state,
				repo: action.repo
			}
		case 'SET_ITEMSPERPAGE':
			return {
				...state,
				itemsPerPage: action.itemsPerPage
			}
		case 'SET_INPUT_FOCUS':
			return {
				...state,
				isInputFocused: action.isInputFocused
			}
		default:
			return state
	}
}

export default values