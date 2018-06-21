import { handleResponse, filterRepos } from './../helpers';
import { API_URL } from './../config';


/*
 * SEARCH FIELDS ACTIONS
 *
 */


const requestRepos = () => ({
	type: 'REQUEST_REPOS'
})

const receiveRepos = listOfRepos => ({
	type: 'RECEIVE_REPOS',
	listOfRepos
})

const setUsername = username => ({
	type: 'SET_USERNAME',
	username
})

const setRepo = repo => ({
	type: 'SET_REPO',
	repo
})

const setItemsPerPage = itemsPerPage => ({
	type: 'SET_ITEMSPERPAGE',
	itemsPerPage
})


let time;


const fetchRepos = username => dispatch => {
	dispatch(requestRepos());

	if (!username) {
		return;
	}

	// no fetching issues unless 500ms have passed
	// since the last symbol of the repo input was typed
	clearTimeout(time);
	time = setTimeout(() => fetchData(), 500);

	const fetchData = () => {

		fetch(`${API_URL}/users/${username}/repos`)
		  .then(handleResponse)
		  .then(
		  	response => {
		  		
			    if (response.length > 0) {
			      dispatch(receiveRepos(response));
			    }

		  	},
		  	error => {
		  		console.log('request failed', error);
		  	}
		  )

	}
}

export const onValueChange = e => (dispatch, getState) => {

	const { username } = getState().values;
	
	const value = e.target.value;
	
	const { listOfRepos } = getState().fetchRepos;

	if (e.target.name === 'username') {

		dispatch(setUsername(value))
		dispatch(setRepo(''))
		dispatch(setAutocompleteVisibility(false));

		dispatch(fetchRepos(value));

	} else if (e.target.name === 'repo') {

		dispatch(setRepo(value))
		dispatch(setAutocompleteVisibility(true));

		if (listOfRepos.length === 0) {
			dispatch(fetchRepos(username));
		}
	
	}
}

export const setAutocompleteVisibility = isAutoCompleteVisible => ({
	type: 'SET_AUTOCOMPLETE_VISIBILITY',
	activeHint: -1,
	isAutoCompleteVisible
})

export const onchangeItemsNumber = e => dispatch => {
	const itemsPerPage = Math.min(e.target.value, 100);
	dispatch(setItemsPerPage(itemsPerPage));	
}

export const onRepoInputKeydown = e => (dispatch, getState) => {
	const { listOfRepos } = getState().fetchRepos;
	const { activeHint } = getState().autocomplete;

	const { repo } = getState().values;

	if (filterRepos(repo, listOfRepos).length > 0) {

		let active = -1;

		switch (e.key) {
	    case "ArrowDown":
	    	active = Math.min(activeHint + 1, 
	    		filterRepos(repo, listOfRepos).length - 1);

	      break;

	    case "ArrowUp":

	    	active = Math.max(activeHint - 1, 0);

	      break;

	    case "Enter":
	    	
	    	if (activeHint > -1) {
	    		
	    		dispatch(setInputFocus(false));
	    		dispatch(setRepo(filterRepos(repo, listOfRepos)[activeHint].name));
	    		dispatch(setAutocompleteVisibility(false));
	    		active = -1;
	    	}
	    	break;

	    default:
	      
	 	}

	 	dispatch({
	 		type: 'SET_ACTIVE_HINT',
			activeHint: active
	 	})
	}
}

export const setInputFocus = isInputFocused => dispatch => {
	dispatch({
		type: 'SET_INPUT_FOCUS',
		isInputFocused
	})
}



/*
 * TOOLTIP ACTIONS
 *
 */

const requestUserInfo = () => ({
	type: 'REQUEST_USER_INFO',
})

const receiveUserInfo = userData => ({
	type: 'RECEIVE_USER_INFO',
	userData
})

let isMouseOver = false;

export const fetchOnMouseOver = e => dispatch => {

	dispatch(requestUserInfo())
	dispatch(getTooltipPosition(e));

  isMouseOver = true;

  const target = e.target;

  fetch(`${API_URL}/users/${target.dataset.user}`)
  .then(handleResponse)
  .then(
  	response => {

  		dispatch(receiveUserInfo(response))

	  	if (isMouseOver) dispatch(onTooltipMouseOver());

	  	// this condition prevents showing a tooltip if
			// data fetching has completed after the mouse had left
			// the target element
	 
	  },
	  error => {
	  	console.log('request failed', error);
	  }
  )
}

let yOffsetOfTooltipTarget = 0;

const getTooltipPosition = e => dispatch => {

  const coords = e.target.getBoundingClientRect();

  const tooltipTriangleHeight = 8; // half width has the same value

  const tooltipTriangleOffsetLeft = 26;

  yOffsetOfTooltipTarget = coords.top;

  const top = coords.top + coords.height + window.pageYOffset + 
    tooltipTriangleHeight + 'px';

  const bottom = document.documentElement.clientHeight - 
    coords.top - window.pageYOffset + 
    tooltipTriangleHeight + 'px';

  const left = document.documentElement.clientWidth >= 768 ? 
    coords.width/2 + coords.left - tooltipTriangleHeight - 
    tooltipTriangleOffsetLeft + 'px' :
    20 + 'px';
   
  dispatch(setTooltipPosition(left, bottom, top))

}

let timeMouseOut = null;
let timeMouseOver = null;

export const onTooltipMouseOver = () => dispatch => {
 
  clearTimeout(timeMouseOut);

  timeMouseOver = setTimeout(() => {
  	dispatch(setTooltipVisibility(true))
    
  }, 50);

}

export const onTooltipMouseOut = () => dispatch => {

  isMouseOver = false;

  clearTimeout(timeMouseOver);

  timeMouseOut = setTimeout(() => {

  	dispatch(setTooltipVisibility(false))
  }, 50);

}

export const setTooltipPosition = (left, bottom, top) => ({
	type: 'SET_TOOLTIP_POSITION',
	left,
	bottom,
	top
})

export const setTooltipRelativePosition = height => dispatch => {

  const isTooltipBelow = height >= 
    yOffsetOfTooltipTarget ? true : false;

  dispatch(setRelativePosition(isTooltipBelow))

}

export const setTooltipVisibility = isTooltipVisible => ({
	type: 'SET_TOOLTIP_VISIBILITY',
	isTooltipVisible
})

export const setRelativePosition = isTooltipBelow => ({
	type: 'SET_RELATIVE_POSITION',
	isTooltipBelow
})



/*
 * RESULT PAGE ACTIONS
 *
 */

const isParamWrong = isParamWrong => ({
	type: 'IS_PARAM_WRONG',
	isParamWrong
})

const refreshInputs = (username, repo, itemsPerPage) => dispatch => {
	dispatch(setUsername(username))
	dispatch(setRepo(repo))
	dispatch(setItemsPerPage(itemsPerPage))
}

const selectIssue = selectedIssue => ({
	type: 'SELECT_ISSUE',
	selectedIssue
})

const requestIssues = selectedIssue => ({
	type: 'REQUEST_ISSUES',
	selectedIssue
})

const receiveIssues = (listOfIssues, numberOfPages, selectedIssue) => ({
	type: 'RECEIVE_ISSUES',
	selectedIssue,
	listOfIssues,
	numberOfPages
})

const requestIssuesFailure = selectedIssue => ({
	type: 'REQUEST_ISSUES_FAILURE',
	selectedIssue
})


const shouldFetchIssues = (state, selectedIssue) => {
	const issues = state.fetchIssuesByRepo[selectedIssue];
	
	if (!issues) {
		return true
	} else if (state.isLoading) {
		return false
	}
}

export const getIssuesIfNeeded = (name, repo, page, per_page) => (dispatch, getState) => {
	const selectedIssue = name + repo + page + per_page;

	//in case of page reload
	dispatch(refreshInputs(name, repo, per_page))
	
	dispatch(selectIssue(selectedIssue))
	
		if (shouldFetchIssues(getState(), selectedIssue)) {
			
			dispatch(getIssues(name, repo, page, per_page, selectedIssue))
		}
	
}


const getIssues = (name, repo, page, per_page, selectedIssue) => dispatch => {

	dispatch(requestIssues(selectedIssue));

	dispatch(isParamWrong(false))

  fetch(`${API_URL}/repos/${name}/${repo}`)
  .then(handleResponse)
  .then(
  	response => {

	    const numberOfIssues = response.open_issues_count;
	    const numberOfPages = Math.ceil(numberOfIssues / per_page);

	    dispatch(getList(name, repo, page, per_page, numberOfPages, selectedIssue));
	    
	  },
	  error => {

	  	dispatch(requestIssuesFailure(selectedIssue));
	  	dispatch(isParamWrong(true))
	    console.log('request failed', error);
	  }
  )
}

const getList = (name, repo, page, per_page, numberOfPages, selectedIssue) => dispatch => {

  fetch(`${API_URL}/repos/${name}/${repo}/issues?page=${page}&per_page=${per_page}`)
  .then(handleResponse)
  .then(
  	response => {
  		dispatch(receiveIssues(response, numberOfPages, selectedIssue))

	  },
	  error => {
	  	dispatch(requestIssuesFailure(selectedIssue));
	  	dispatch(isParamWrong(true))
	    console.log('request failed', error);
	  }
	)
}


/*
 * DETAIL PAGE ACTIONS
 *
 */

const getSingleIssueId = singleIssueId => ({ // export ???
	type: 'GET_SINGLE_ISSUE_ID',
	singleIssueId
})

const requestSingleIssue = singleIssueId => ({
	type: 'REQUEST_SINGLE_ISSUE',
	singleIssueId
})

const receiveSingleIssue = (issue, comments, singleIssueId) => ({
	type: 'RECEIVE_SINGLE_ISSUE',
	singleIssueId,
	issue,
	comments
})

const requestSingleIssueFailure = singleIssueId => ({
	type: 'REQUEST_SINGLE_ISSUE_FAILURE',
	singleIssueId
})

const shouldFetchSingleIssue = (state, singleIssue) => {
	const issue = state.fetchSingleIssue[singleIssue];
	if (!issue) {

		return true
	} else if (state.isLoading) {
		return false
	}
}

export const fetchSingleIssueIfNeeded = (name, repo, number) => (dispatch, getState) => {
	const singleIssueId = name + repo + number;

	dispatch(getSingleIssueId(singleIssueId))

	if (shouldFetchSingleIssue(getState(), singleIssueId)) {

		dispatch(fetchSingleIssue(name, repo, number, singleIssueId))
	}
}


const fetchSingleIssue = (name, repo, number, singleIssueId) => dispatch => {
	dispatch(requestSingleIssue(singleIssueId))
	dispatch(isParamWrong(false))
	if (number !== String(parseInt(number, 10))) {
		
		dispatch(isParamWrong(true))
		return
		
	}

  fetch(`${API_URL}/repos/${name}/${repo}/issues/${number}`, {
  	headers: {
      'Accept': 'application/vnd.github.v3.html+json',
    }

  })
  .then(handleResponse)
  .then(
  	response => {
 			
 			dispatch(isParamWrong(false))
	    if (response.comments) {
	    	dispatch(fetchComments(name, repo, number, response, singleIssueId));
	    } else {
	    	dispatch(receiveSingleIssue(response, [], singleIssueId))
	    }
	   
	  },
	  error => {
	  	dispatch(requestSingleIssueFailure(singleIssueId));
	  	dispatch(isParamWrong(true))
	  	console.log('request failed', error);
	  }
	)
}

const fetchComments = (name, repo, number, issue, singleIssueId) => dispatch => {
	fetch(`${API_URL}/repos/${name}/${repo}/issues/${number}/comments`, {
  	headers: {
      'Accept': 'application/vnd.github.v3.html+json',
    }
  })
  .then(handleResponse)
  .then(
  	response => {
  	
  		dispatch(receiveSingleIssue(issue, response, singleIssueId))
	  },
	  error => {
	  	dispatch(requestSingleIssueFailure(singleIssueId))
	  	dispatch(isParamWrong(true))
	  	console.log('request failed', error);
	  }
	)
}

export const getWindowWidth = () => ({
	type: 'GET_WINDOW_WIDTH',
	windowWidth: document.documentElement.clientWidth
})