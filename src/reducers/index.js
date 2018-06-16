import { combineReducers } from 'redux';
import values from './values';
import isParamWrong from './isParamWrong';
import tooltip from './tooltip';
import autocomplete from './autocomplete';
import responsive from './responsive';
import fetchRepos from './fetchRepos';
import fetchUserData from './fetchUserData';
import {fetchIssuesByRepo, selectedIssue, fetchSingleIssue, getSingleIssueId} from './fetchIssues';

const IssuesApp = combineReducers({
  values,
  isParamWrong,
  tooltip,
  autocomplete,
  responsive,
  fetchRepos,
  fetchUserData,
  fetchIssuesByRepo,
  selectedIssue,
  fetchSingleIssue,
  getSingleIssueId
})

export default IssuesApp