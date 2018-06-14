const fetchUserData = (state = {userData: {}}, action) => {
	switch (action.type) {
		case 'REQUEST_USER_INFO':
			return {
				...state,
				userData: {}
			}
		case 'RECEIVE_USER_INFO':
			return {
				...state,
				userData: action.userData
			}
		default:
			return state
	}
}

export default fetchUserData;