const responsive = (state = {}, action) => {
	switch(action.type) {
		case 'GET_WINDOW_WIDTH':
			return {
				...state,
				windowWidth: action.windowWidth
			}
		default:
			return state
	}
}

export default responsive