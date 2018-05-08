/**
 * Fetch error helper
 *
 * @param {object} response
 */
export const handleResponse = (response) => {
	return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
}

/**
 * A polyfill of closest method for IE 
 *
 */


(function(e){ 
	e.closest = e.closest || function(tag){ 
		var node = this;

		while (node) { 
		  if (node.tagName === tag.toUpperCase()) return node; 
		  else node = node.parentElement; 
		} 
		return null; 
	};
})(Element.prototype);


/**
 * Validate params
 *
 */

export const validatePageNumber = (page) => {
	page = Number(page);

	if (isNaN(page) || page < 1) page = 1;

	return page;
};

export const validateItemsPerPage = (items) => {
	items = Number(items);

	if (isNaN(items) || items < 1 || items > 100) items = 30;
	
	return items;
};

/**
 * Fetch user data by mouseover
 *
 */

//  export const fetchOnMouseOver = (e) => {

// 	this.props.getTooltipPosition(this.getTooltipPosition(e));

// 	fetch(`${API_URL}/users/${this.props.user}`)
// 	.then(handleResponse)
//   .then(response => {
  	
//   	this.props.getUserData({
//   		userName: response.name,
//   		location: response.location,
//   		bio: response.bio,
//   		company: response.company
//   	});
	
//   })
//   .catch(error => {
//     console.log('request failed', error);
//   });

// 	this.props.onmouseover(e.target);
// }