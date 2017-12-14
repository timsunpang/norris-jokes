import React, { Component } from 'react';
import _ from 'lodash';
import FilterWindowContainer from './filter-window-container';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import JokeListContainer from './joke-list-container';
import FilteredJokeListContainer from './filtered-joke-list-container';
import JokeContainer from './joke-container';

export const history = createHistory()

export class JokeIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterWindowOpen: false
    }
    this.fetchRandomJoke = this.props.fetchRandomJoke.bind(this);
    this.fetchJokes = this.props.fetchJokes.bind(this);
    // Add debounce to prevent overloading redux with search functionality
    this.searchJokes = _.debounce(this.props.searchJokes.bind(this), 200);
    this.search = this.search.bind(this);
    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.push = this.props.push.bind(this);
  }

  search(e) {
    if (this.searchInput.value.length) {
      this.searchJokes(this.searchInput.value);
    }
  }

  toggleFilterWindow() {
    this.setState({
      filterWindowOpen: !this.state.filterWindowOpen
    })
  }

  render() {
    let renderFilterWindow = this.state.filterWindowOpen ? (<FilterWindowContainer toggleFilterWindow={this.toggleFilterWindow}/>) : null
    let filterWindowToggleDisplay = this.state.filterWindowOpen ?
      <i className="fa fa-caret-up fa-lg arrow-up" aria-hidden="true" onClick={this.toggleFilterWindow}></i> :
      <i className="fa fa-caret-down fa-lg arrow-down" aria-hidden="true" onClick={this.toggleFilterWindow}></i>

    return (
      <div>
        <div className="splash-layer">
          <div className="splash-container" onClick={()=>{this.push("/")}}>
            <img className="splash-img" src="/norris-logo.jpg"></img>
            <h1>Norris Jokes</h1>
          </div>
        </div>
        <div className="header">
          <div className="search-bar-container">
              <input ref={(input) => {this.searchInput = input}} onChange={this.search} className="search-bar" type="text" placeholder="search"/>
              <div className="button-container">
                <button onClick={() => {this.push("/joke/random")}}>Random</button>
                <button onClick={() => {this.push("/all")}}>All</button>
              </div>
              {filterWindowToggleDisplay}
              {renderFilterWindow}
          </div>
        </div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to='/joke/random' />
            )}/>
            <Route exact path="/category/:categoryID(\d+)" component={FilteredJokeListContainer}/>
            <Route exact path="/all" component={JokeListContainer}/>
            <Route exact path="/joke/random" component={JokeContainer}/>
            <Route exact path="/joke/:jokeID(\d+)" component={JokeContainer}/>
            <Route exact path="*" render={() => (
              <Redirect to='/joke/random' />
            )}/>
          </Switch>
        </ConnectedRouter>
        <div className="footer">
        </div>
    </div>
    );
  }
}
