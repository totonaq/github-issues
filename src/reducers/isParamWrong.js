const isParamWrong = (state = false, action) => {
	switch (action.type) {
		case 'IS_PARAM_WRONG': 
			return action.isParamWrong
		default:
			return state
	}
}

export default isParamWrong