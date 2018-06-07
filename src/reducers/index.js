import { combineReducers } from 'redux';
import values from './values';
import tooltip from './tooltip';
import autocomplete from './autocomplete';
import issues from './issues';
import responsive from './responsive';

const IssuesApp = combineReducers({
  values, tooltip, autocomplete, issues, responsive
})

export default IssuesApp