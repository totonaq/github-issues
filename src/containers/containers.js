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
	getIssuesIfNeeded,
	fetchSingleIssueIfNeeded,
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
	})
	
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
	{ onchangeItemsNumber }
	
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
	state => {
		const {fetchIssuesByRepo, selectedIssue} = state;
		const {isLoading, listOfIssues} = fetchIssuesByRepo[selectedIssue] || {isLoading: true, listOfIssues: []}
		return {
				isLoading,
				issuesLength: listOfIssues.length
			}
	},
	{ getIssuesIfNeeded }
)(Result))

export const ListBlock = connect(
	state => ({
		listOfIssues: state.fetchIssuesByRepo[state.selectedIssue].listOfIssues
	})
)(List)

export const ListItemBlock = connect(
	state => ({
		listOfIssues: state.fetchIssuesByRepo[state.selectedIssue].listOfIssues
	}),
	{
		fetchOnMouseOver,
		onTooltipMouseOut
	}
)(ListItem)



export const PaginationBlock = connect(
	state => ({
		windowWidth: state.responsive.windowWidth,
		numberOfPages: state.fetchIssuesByRepo[state.selectedIssue].numberOfPages || 0
	}),
	{ getWindowWidth }
)(Pagination)



export const DetailsBlock = withRouter(connect(
	state => {
		const {fetchSingleIssue, getSingleIssueId} = state;
		const {
			isLoading,
			issue,
			comments
		} = fetchSingleIssue[getSingleIssueId] || 
		{isLoading: true, issue: {user: {}}, comments: []}

		return {
			issue,
			isLoading,
			comments
		}
	},
	{
		fetchSingleIssueIfNeeded,
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