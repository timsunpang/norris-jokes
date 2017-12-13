import React, { Component } from 'react';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    }
    // this.jokesDisplay = this.jokesDisplay.bind(this);
  }

  // componentDidMount() {
  //   fetch('https://api.icndb.com/jokes?escape=javascript')
  //     .then(response => response.json())
  //     .then(results => {
  //       console.log(results)
  //       this.setState({ jokes: results.value })})
  //     .catch(err => console.log(err))
  // }
  //
  // jokesDisplay() {
  //   if (this.state.jokes) {
  //     return this.state.jokes.map(joke => (
  //         <li key={joke.id}>
  //           {joke.joke}
  //           {joke.categories.length ? <span> Tags: {joke.categories.join(', ')}</span> : null}
  //         </li>
  //       )
  //     )
  //   }
  // }
  //
  // jokeCount() {
  //   return <h2>Count: {this.state.jokes.length}</h2>;
  // }

  render() {
    return (
      <div>
        Jokelist
      </div>
    );
  }
}

export default JokeList;
