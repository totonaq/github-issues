import { combineReducers } from 'redux';
import values from './values';
import tooltip from './tooltip';
import autocomplete from './autocomplete';
import responsive from './responsive';
import fetchRepos from './fetchRepos';
import fetchUserData from './fetchUserData';
import fetchIssues from './fetchIssues';

const IssuesApp = combineReducers({
  values, tooltip, autocomplete, responsive, fetchRepos, fetchUserData, fetchIssues
})

export default IssuesApp