import { connect } from 'react-redux';
import {

	onchangeItemsNumber,
	setAutocompleteVisibility,
	onRepoInputKeydown,
	onValueChange,
	setInputFocus,

	setTooltipRelativePosition,
	fetchOnMouseOver,
	onTooltipMouseOver,
	onTooltipMouseOut,
	getIssues,
	refreshInputs,
	fetchSingleIssue,
	getWindowWidth

} from './../actions/'

import SearchField from './../components/searchField/SearchField';
import UserInputField from './../components/inputFields/UserInputField';
import RepoInputField from './../components/inputFields/RepoInputField';
import ItemsPerPage from './../components/itemsPerPage/ItemsPerPage';
import Autocomplete from './../components/autocomplete/Autocomplete';
import SearchButton from './../components/searchButton/SearchButton';

import Result from './../components/result/Result';
import List from './../components/list/List';
import ListItem from './../components/listItem/ListItem';

import Pagination from './../components/pagination/Pagination';

import Details from './../components/details/Details';

import AuthorTooltip from './../components/authorTooltip/AuthorTooltip';

import { withRouter } from 'react-router-dom';
import { filterRepos } from './../helpers';

export const SearchFieldBlock = withRouter(connect(
	state => ({
		isInputFocused: state.values.isInputFocused,
		isAutoCompleteVisible: state.autocomplete.isAutoCompleteVisible,
		reposLength: filterRepos(state.values.repo, state.fetchRepos.listOfRepos).length,
	}),
	{ refreshInputs }
	
)(SearchField))

export const UserInputFieldBlock = connect(
	state => ({
		value: state.values.username
	}),
	{
		onValueChange,
		setInputFocus,
		setAutocompleteVisibility
	}
	
)(UserInputField);

export const RepoInputFieldBlock = connect(
	state => ({
		value: state.values.repo,
		reposLength: state.fetchRepos.listOfRepos.length
	}),
	{	
		onValueChange,
		setInputFocus,
		setAutocompleteVisibility,
		onRepoInputKeydown
	}
	
)(RepoInputField)

export const ItemsPerPageBlock = connect(
	state => ({
		number: state.values.itemsPerPage
	}),
	{onchangeItemsNumber}
	
)(ItemsPerPage)

export const AutocompleteBlock = connect(
	state => ({
		repos: filterRepos(state.values.repo, state.fetchRepos.listOfRepos),
		activeHint: state.autocomplete.activeHint,
		itemsPerPage: state.values.itemsPerPage
	}),
	{ setAutocompleteVisibility }
)(Autocomplete)

export const SearchButtonBlock = connect(
	state => ({
		username: state.values.username,
		repo: state.values.repo,
		itemsPerPage: state.values.itemsPerPage,
	})
)(SearchButton)



export const ResultBlock = withRouter(connect(
	state => ({
		isLoading: state.fetchIssues.isLoading,
		issuesLength: state.fetchIssues.listOfIssues.length
	}),
	{ getIssues }
)(Result))

export const ListBlock = connect(
	state => ({
		listOfIssues: state.fetchIssues.listOfIssues
	})
)(List)

export const ListItemBlock = connect(
	state => ({
		listOfIssues: state.fetchIssues.listOfIssues
	}),
	{
		fetchOnMouseOver,
		onTooltipMouseOut
	}
)(ListItem)



export const PaginationBlock = connect(
	state => ({
		windowWidth: state.responsive.windowWidth,
		numberOfPages: state.fetchIssues.numberOfPages
	}),
	{ getWindowWidth }
)(Pagination)



export const DetailsBlock = withRouter(connect(
	state => ({
		issue: state.fetchIssues.issue,
		isLoading: state.fetchIssues.isLoading,
		comments: state.fetchIssues.comments
	}),
	{
		fetchSingleIssue,
		fetchOnMouseOver,
		onTooltipMouseOut
	}
)(Details))



export const Tooltip = connect(
	state => ({
		data: state.fetchUserData.userData,
		left: state.tooltip.left,
		bottom: state.tooltip.bottom,
		top: state.tooltip.top,
		isTooltipBelow: state.tooltip.isTooltipBelow
	}),
	{
		setTooltipRelativePosition,
		onTooltipMouseOver,
		onTooltipMouseOut
	}
)(AuthorTooltip)