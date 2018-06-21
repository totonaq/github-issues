const initialState = {
	windowWidth: 0
}

const responsive = (state = initialState, action) => {
	switch(action.type) {
		case 'GET_WINDOW_WIDTH':
			return {
				windowWidth: action.windowWidth
			}
		default:
			return state
	}
}

export default responsive