import React, { Component } from 'react';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.fetchJokes = this.props.fetchJokes.bind(this);
    this.listJokes = this.listJokes.bind(this);
    this.push = this.props.push.bind(this);
  }

  componentDidMount() {
    this.fetchJokes();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.fetchJokes();
    }
  }

  listJokes() {
    if (this.props.jokes.jokes.length) {
      return this.props.jokes.jokes.map((joke, idx) => (
        <div className="joke-item" key={idx} onClick={()=>{this.push('/joke/' + (idx + 1))}}>{joke.joke}</div>
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

export default JokeList;
