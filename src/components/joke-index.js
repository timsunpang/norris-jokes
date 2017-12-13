import React, { Component } from 'react';
import _ from 'lodash';
import FilterWindowContainer from './filter-window-container';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
// import JokeList from './components/joke-list';
import JokeListContainer from './joke-list-container';
import FilteredJokeListContainer from './filtered-joke-list-container';
import Joke from './joke';

export const history = createHistory()

export class JokeIndex extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      filterWindowOpen: false
    }
    this.fetchRandomJoke = this.props.fetchRandomJoke.bind(this);
    this.fetchJokes = this.props.fetchJokes.bind(this);
    // this.searchJokes = this.props.searchJokes.bind(this);
    this.searchJokes = _.debounce(this.props.searchJokes.bind(this), 200);
    // Add debounce to prevent overloading redux with search functionality
    // this.search = _.debounce(this.search.bind(this), 200);
    this.search = this.search.bind(this);
    this.toggleFilterWindow = this.toggleFilterWindow.bind(this);
    this.push = this.props.push.bind(this);
  }

  componentDidMount() {
    console.log('mounted!')
    this.fetchJokes();
  }

  listJokes() {
    console.log(this.props.jokes)
    return this.props.jokes.jokes.map((joke, idx) => {
      // console.log(joke);
      // if (joke.visible) {
        return <div className="joke-item" key={idx}>{joke.joke}</div>
      // }
    })
  }

  search(e) {
    if (this.searchInput.value.length) {
      this.searchJokes(this.searchInput.value);
    } else {
      this.fetchJokes();
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
          <div className="splash-container">
            <img className="splash-img" src="/norris-logo.jpg"></img>
            <h1>Norris Jokes</h1>
          </div>
        </div>
        <div className="header">
          <div className="search-bar-container">
              <input ref={(input) => {this.searchInput = input}} onChange={this.search} className="search-bar" type="text" placeholder="search"/>
              <div className="button-container">
                <button onClick={() => {this.push("/random")}}>Random</button>
                <button onClick={() => {this.push("/all")}}>All</button>
              </div>
              {filterWindowToggleDisplay}
              {renderFilterWindow}
          </div>
        </div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Joke}/>
            <Route exact path="/category/:categoryID(\d+)" component={FilteredJokeListContainer}/>
            <Route exact path="/all" component={JokeListContainer}/>
            <Route exact path="/random" component={Joke}/>
          </Switch>
        </ConnectedRouter>
        <div className="jokes-list-container">
          {this.listJokes()}
        </div>
        <div className="footer">
        </div>
    </div>
    );
  }
}

// export default JokeIndex;