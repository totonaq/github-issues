const responsive = (state = 0, action) => {
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