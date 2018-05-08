import React, { Component } from 'react';
import SearchField from './components/searchField/SearchField';
import Result from './components/result/Result';
import NotFound from './components/NotFound';
import Details from './components/Details';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './Issues.css';

class Issues extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      repo: '',
      itemsPerPage: 30,
    };

    this.setUsernameValue = this.setUsernameValue.bind(this);
    this.setItemsPerPage = this.setItemsPerPage.bind(this);
    this.setRepoValue = this.setRepoValue.bind(this);

  }

  setUsernameValue(username) {
    this.setState({ username });
  }

  setRepoValue(repo) {
    this.setState({ repo });
  }

  setItemsPerPage(itemsPerPage) {
    this.setState({ itemsPerPage });
  }

  render() {


    const search = <div className="Issues-search">
                    <h1 className="Issues-search-heading">Поиск GitHub issues в заданном репозитории</h1>
                    <SearchField
                      setUsernameValue={this.setUsernameValue}
                      setRepoValue={this.setRepoValue}
                      setItemsPerPage={this.setItemsPerPage}
                      username={this.state.username}
                      repo={this.state.repo}
                      itemsPerPage={this.state.itemsPerPage}
                    />
                  </div>

    const result =  <Result 
                      setUsernameValue={this.setUsernameValue}
                      setRepoValue={this.setRepoValue}
                      setItemsPerPage={this.setItemsPerPage}
                    />

    return (

      <BrowserRouter>
        
        <div className='Issues'>
         
          <Switch>
            <Route
              exact
              path={'/'}
              render={(props) => {
                return (
                  <div className='Issues-wrap'>
                    {search}
                  </div>
                )
              }}

            />
            <Route
              exact
              path={'/repos/:name/:repo/issues'}
              render={(props) => {
                return (
                  <div className='Issues-wrap'>
                    {search}
                    {result}
                  </div>
                )
              }}
              
            />

            <Route
              exact
              path={'/repos/:name/:repo/issues/:number'}
              // render={(props) => {
              //   return (
              //     <Details 
              //       name={this.props.name}
              //       repo={this.props.repo}
              //     />
              //   )
              // }}
              component={Details}
            />

            <Route
              render={(props) => {
                return (
                  <NotFound />
                )
              }}

            />
          </Switch>

        </div>

      </BrowserRouter>

    );
  }
}

export default Issues;