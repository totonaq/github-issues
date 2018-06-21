const initialState = {
	isTooltipBelow: false
}

const tooltip = (state = initialState, action) => {
	switch (action.type) {
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