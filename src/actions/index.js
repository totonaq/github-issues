import { handleResponse, filterRepos } from './../helpers';
import { API_URL } from './../config';

/*
 * SEARCH FIELDS ACTIONS
 *
 */

export const onValueChange = e => (dispatch, getState) => {

	const { username } = getState().values;
	
	const value = e.target.value;
	
	const { listOfRepos } = getState().autocomplete;

	if (e.target.name === 'username') {

		dispatch(setUsername(value))
		dispatch(setRepo(''))
		dispatch(setAutocompleteVisibility(false));

		dispatch(fetchData(value));

	} else if (e.target.name === 'repo') {

		dispatch(setRepo(value))
		dispatch(setAutocompleteVisibility(true));

		if (listOfRepos.length === 0) {
			dispatch(fetchData(username));
		}
	
	}
}

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

const fetchData = value => dispatch => {
  
	dispatch(setListOfRepos([]))

	// no fetching issues unless 500ms have passed
	// since the last symbol of the repo input was typed

	clearTimeout(time);
	
  time = setTimeout(() => dispatch(getListOfRepos(value)), 500);

}

const getListOfRepos = username => dispatch => {
	
	if (!username) {
		dispatch(setListOfRepos([]))
		return;
	}
      
  fetch(`${API_URL}/users/${username}/repos`)
  .then(handleResponse)
  .then(response => {
  	
    if (response.length > 0) {
      dispatch(setListOfRepos(response));
    }

  })
  .catch(error => {
    dispatch(setListOfRepos([]))
		
  });

}

export const setAutocompleteVisibility = isAutoCompleteVisible => ({
	type: 'SET_AUTOCOMPLETE_VISIBILITY',
	activeHint: -1,
	isAutoCompleteVisible
})

export const setListOfRepos = listOfRepos => ({
	type: 'SET_LIST_OF_REPOS',
	listOfRepos
})

export const onchangeItemsNumber = e => dispatch => {
	const itemsPerPage = Math.min(e.target.value, 100);
	dispatch(setItemsPerPage(itemsPerPage));	
}

export const onRepoInputKeydown = e => (dispatch, getState) => {
	const { activeHint, listOfRepos } = getState().autocomplete;
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

let isMouseOver = false;

export const fetchOnMouseOver = e => dispatch => {

  isMouseOver = true;

  dispatch(getTooltipPosition(e));
  
  const target = e.target;

  fetch(`${API_URL}/users/${target.dataset.user}`)
  .then(handleResponse)
  .then(response => {

  	dispatch(fetchUserData(response))

  	if (isMouseOver) dispatch(onTooltipMouseOver());

  	// this condition prevents showing a tooltip if
		// data fetching has completed after a mouse had left
		// the target element
 
   
  })
  .catch(error => {
    console.log('request failed', error);
  });
  
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

export const fetchUserData = userData => ({
	type: 'FETCH_TOOLTIP_USERDATA',
	userData
})

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

  	dispatch(fetchUserData({}))
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

export const getIssues = (name, repo, page, per_page) => dispatch => {

	dispatch(checkParams(false))
	dispatch(setUsername(name))
	dispatch(setRepo(repo))
	dispatch(setItemsPerPage(per_page))
	dispatch(showLoadingIcon(true))

  fetch(`${API_URL}/repos/${name}/${repo}`)
  .then(handleResponse)
  .then(response => {

    const numberOfIssues = response.open_issues_count;
    const numberOfPages = Math.ceil(numberOfIssues / per_page);

    dispatch(setNumberOfPages(numberOfPages))
    dispatch(getList(name, repo, page, per_page));
    
  })
  .catch(error => {

  	dispatch(showLoadingIcon(false))
  	dispatch(getListOfIssues([]))
    dispatch(checkParams(true))
		dispatch(setUsername(''))
		dispatch(setRepo(''))

    console.log('request failed', error);

  });
}

const setNumberOfPages = numberOfPages => ({
	type: 'SET_NUMBER_OF_PAGES',
	numberOfPages
})

const getList = (name, repo, page, per_page) => dispatch => {

  fetch(`${API_URL}/repos/${name}/${repo}/issues?page=${page}&per_page=${per_page}`)
  .then(handleResponse)
  .then(response => {

  	dispatch(getListOfIssues(response))
  	dispatch(showLoadingIcon(false))

  })
  .catch(error => {

  	dispatch(checkParams(true))
  	dispatch(showLoadingIcon(false))
  
    console.log('request failed', error);

  });

}

export const checkParams = isParamWrong => ({
	type: 'IS_PARAM_WRONG',
	isParamWrong
})

const showLoadingIcon = isLoading => ({
	type: 'SHOW_LOADING_ICON',
	isLoading
})

const getListOfIssues = listOfIssues => ({
	type: 'GET_LIST_OF_ISSUES',
	listOfIssues
})



/*
 * DETAIL PAGE ACTIONS
 *
 */

export const fetchSingleIssue = (name, repo, number) => dispatch => {

	dispatch(showLoadingIcon(true))

  fetch(`${API_URL}/repos/${name}/${repo}/issues/${number}`, {
  	headers: {
      'Accept': 'application/vnd.github.v3.html+json',
    }

  })
  .then(handleResponse)
  .then((issue) => {
  	
   	if (number !== String(parseInt(number, 10))) throw new Error();

   	dispatch(checkParams(false))
   	dispatch(showLoadingIcon(false))
   	dispatch(getSingleIssue(issue))

    if (issue.comments) {
    	dispatch(fetchComments(name, repo, number));
    }
   
  })
  .catch((error) => {
   	console.log('request failed', error);
   
   	dispatch(checkParams(true))
   	dispatch(showLoadingIcon(false))
  
  });

}

const fetchComments = (name, repo, number) => dispatch => {
	fetch(`${API_URL}/repos/${name}/${repo}/issues/${number}/comments`, {
  	headers: {
      'Accept': 'application/vnd.github.v3.html+json',
    }
  })
  .then(handleResponse)
  .then((comments) => {

  	dispatch(getComments(comments))
 
  })
  .catch((error) => {
   	console.log('request failed', error);
   
   	dispatch(checkParams(true))
   	dispatch(showLoadingIcon(false))
   
  });
}

const getSingleIssue = issue => ({
	type: 'GET_SINGLE_ISSUE',
	issue
})

const getComments = comments => ({
	type: 'GET_COMMENTS',
	comments
})



export const getWindowWidth = () => ({
	type: 'GET_WINDOW_WIDTH',
	windowWidth: document.documentElement.clientWidth
})