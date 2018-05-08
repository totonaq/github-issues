import React, { Component } from 'react';
import SearchField from './components/searchField/SearchField';
import Result from './components/result/Result';
import NotFound from './components/notFound/NotFound';
import Details from './components/details/Details';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './Issues.css';
import AuthorTooltip from './components/authorTooltip/AuthorTooltip';
import { handleResponse } from './helpers';
import { API_URL } from './config';
import { withRouter } from 'react-router-dom';

class Issues extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      repo: '',
      itemsPerPage: 30,

      isTooltipVisible: false,
      isTooltipBelow: false,
      
      left: 0,
      top: 0,
      bottom: 0,

      userData: {},

      isNotFound: false

    };

    this.setUsernameValue = this.setUsernameValue.bind(this);
    this.setItemsPerPage = this.setItemsPerPage.bind(this);
    this.setRepoValue = this.setRepoValue.bind(this);

    this.setTooltipRelativePosition = this.setTooltipRelativePosition.bind(this);
    this.fetchOnMouseOver = this.fetchOnMouseOver.bind(this);
    this.getTooltipPosition = this.getTooltipPosition.bind(this);
   
    this.onTooltipMouseOut = this.onTooltipMouseOut.bind(this);
    this.onTooltipMouseOver = this.onTooltipMouseOver.bind(this);

    this.handleWrongParams = this.handleWrongParams.bind(this);
   
    this.yOffsetOfTooltipTarget = 0;

    this.timeMouseOut = null;
    this.timeMouseOver = null;

    this.isMouseOver = false;

  }

  handleWrongParams() {
    this.setState({ isNotFound: true });
  }

  setUsernameValue(username) {
    this.setState({ 
      username,
      isNotFound: false 
    });
  }

  setRepoValue(repo) {
    this.setState({ 
      repo,
      isNotFound: false 
    });
  }

  setItemsPerPage(itemsPerPage) {
    this.setState({ itemsPerPage });
  }

  setTooltipRelativePosition(height) {

    let isTooltipBelow = height >= 
      this.yOffsetOfTooltipTarget ? true : false;

    this.setState({ isTooltipBelow });
  }

  getTooltipPosition(e) {

    let coords = e.target.getBoundingClientRect();

    let tooltipTriangleHeight = 8; // half width has the same value

    let tooltipTriangleOffsetLeft = 26;

    let top, bottom, left;

    this.yOffsetOfTooltipTarget = coords.top;

    top = coords.top + coords.height + window.pageYOffset + 
      tooltipTriangleHeight + 'px';

    bottom = document.documentElement.clientHeight - 
      coords.top - window.pageYOffset + 
      tooltipTriangleHeight + 'px';

    left = document.documentElement.clientWidth >= 768 ? 
      coords.width/2 + coords.left - tooltipTriangleHeight - 
      tooltipTriangleOffsetLeft + 'px' :
      20 + 'px';

    this.setState({
      left,
      top,
      bottom
    });
  }

  fetchOnMouseOver(e) {

    this.isMouseOver = true;

    this.getTooltipPosition(e);
    
    let target = e.target;

    fetch(`${API_URL}/users/${target.dataset.user}`)
    .then(handleResponse)
    .then(response => {
      
      this.setState({
        userData: response
      }, () => {

        // this condition will prevent showing a tooltip if
        // data fetching has completed after a mouse leaves
        // the target element

        if (this.isMouseOver) this.onTooltipMouseOver();
        
      });
      
    })
    .catch(error => {
      console.log('request failed', error);
    });
    
  }

  onTooltipMouseOver(e) {
   
    clearTimeout(this.timeMouseOut);

    this.timeMouseOver = setTimeout(() => {
      this.setState({
        isTooltipVisible: true 
      });
    }, 50);
    
  }

  onTooltipMouseOut() {

    this.isMouseOver = false;
  
    clearTimeout(this.timeMouseOver);

    this.timeMouseOut = setTimeout(() => {
      this.setState({
        isTooltipVisible: false,
        userData: {}
      });
    }, 50);
  
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
                      onmouseover={this.fetchOnMouseOver}
                      onmouseout={this.onTooltipMouseOut}
                      handleWrongParams={this.handleWrongParams}
                    />

    return (

      <HashRouter>
        
        <div className='Issues'>

          <Switch>
            <Route
              
              exact
              path='/'
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
              path='/repos/:name/:repo/issues'
              render={(props) => {

                // in case of wrong params (name or repo) 
                if (this.state.isNotFound) {
                  return <NotFound />
                }

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
              path='/repos/:name/:repo/issues/:number'
              render={(props) => {

                if (this.state.isNotFound) {
                  return <NotFound />
                }

                return (
                  <Details 
                    onmouseover={this.fetchOnMouseOver}
                    onmouseout={this.onTooltipMouseOut}
                  />
                )
              }}
              
            />

            <Route
              path='*'
              render={(props) => {
                return (
                  <NotFound />
                )
              }}

            />
          </Switch>
          {this.state.isTooltipVisible && 
            <AuthorTooltip
              setTooltipRelativePosition={this.setTooltipRelativePosition}

              data={this.state.userData}
            
              left={this.state.left}
              top={this.state.top}
              bottom={this.state.bottom}

              isBelow={this.state.isTooltipBelow}
              onmouseover={this.onTooltipMouseOver}
              onmouseout={this.onTooltipMouseOut}
              
            /> 
          }

        </div>

      </HashRouter>

    );
  }
}

export default withRouter(Issues);