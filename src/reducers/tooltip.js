const tooltip = (state = {}, action) => {
	switch (action.type) {
		case 'FETCH_TOOLTIP_USERDATA':
			return {
				...state,
				userData: action.userData
			}
		case 'SET_TOOLTIP_VISIBILITY':
			return {
				...state,
				isTooltipVisible: action.isTooltipVisible
			}
		case 'SET_TOOLTIP_POSITION':
			return {
				...state,
				left: action.left,
				bottom: action.bottom,
				top: action.top
			}
		case 'SET_RELATIVE_POSITION':
			return {
				...state,
				isTooltipBelow: action.isTooltipBelow
			}
		default:
			return state
	}
}

export default tooltip