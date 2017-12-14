import React, { Component } from 'react';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.listJokes = this.listJokes.bind(this);
    this.getSpecificJoke = this.props.getSpecificJoke.bind(this);
    this.fetchRandomJoke = this.props.fetchRandomJoke.bind(this);
    this.determineAction = this.determineAction.bind(this);
  }

  componentDidMount() {
    this.determineAction(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
  	if (this.props.location.key !== nextProps.location.key) {
      this.determineAction(nextProps.location.pathname);
    }
  }

  determineAction(pathname) {
  	if (pathname === "/joke/random") {
  		this.fetchRandomJoke();
  	} else {
    	this.getSpecificJoke(this.props.match.params.jokeID);
    }
  }

  listJokes() {
    if (this.props.jokes.jokes.length) {
      return this.props.jokes.jokes.map((joke, jokeIdx) => (
        <div className="joke-item" key={jokeIdx}>
          {joke.joke}
          <div className="joke-item-categories">
            { "Categories: "}
            {
              (joke.categories.length ?
                joke.categories.map((category, categoryIdx) => (
                  <span className="joke-item-category" key={categoryIdx}>{category}</span>
                ))
                : "None")
              }
            </div>
          </div>
        ))
    } else {
      return (
        <div className="no-jokes-error">
          No jokes were found.
        </div>
      )
    }
  }

  render() {
    return (
        <div className="jokes-list-container">
          {this.listJokes()}
        </div>
    );
  }
}

export default Joke;
