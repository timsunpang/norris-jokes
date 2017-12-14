import React, { Component } from 'react';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.fetchJokes = this.props.fetchJokes.bind(this);
    this.listJokes = this.listJokes.bind(this);
    this.props.history.listen((location, action) => {
      if (location.pathname === "/all") {
        this.props.fetchJokes();
      }
    })
  }

  listJokes() {
    return this.props.jokes.jokes.map((joke, idx) => (
       <div className="joke-item" key={idx}>{joke.joke}</div>
    ))
  }

  render() {
    return (
        <div className="jokes-list-container">
          {this.listJokes()}
        </div>
    );
  }
}

export default JokeList;
