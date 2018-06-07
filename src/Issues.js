import React from 'react';

import Home from './components/home/Home';
import ListOfIssues from './components/listOfIssues/ListOfIssues';
import DetailsPage from './components/detailsPage/DetailsPage';
import NotFound from './components/notFound/NotFound';

import { HashRouter, Switch, Route } from 'react-router-dom';
import './Issues.css';

const Issues = (props) => {
  
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/repos/:name/:repo/issues' component={ListOfIssues} />
        <Route exact path='/repos/:name/:repo/issues/:number' component={DetailsPage} />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
    
  )
}

export default Issues;