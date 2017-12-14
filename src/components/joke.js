import React, { Component } from 'react';

class Joke extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.listJokes = this.listJokes.bind(this);
    this.getSpecificJoke = this.props.getSpecificJoke.bind(this);
    this.fetchRandomJoke = this.props.fetchRandomJoke.bind(this);
    // this.determineAction = this.determineAction.bind(this);
    // this.determineAction()
  // 	if (location.pathname === "/all") {
		// this.getSpecificJoke(this.props.match.params.jokeID);
	this.props.history.listen((location, action) => {
		console.log(location)
	  	if (location.pathname === "/joke/random") {
	  		this.fetchRandomJoke();
	  	} else {
	  		console.log("get specific")
	    	this.getSpecificJoke(this.props.match.params.jokeID);
	    }
    })
  }

  // componentWillReceiveProps(nextProps) {
  // 	console.log(this.props)
  // 	if (nextProps.location.pathname !== this.props.location.pathname) {
  // 		this.determineAction();
  // 	}
  // }

  // determineAction() {
  // 	if (this.props.location.pathname === "/joke/random") {
  // 		this.fetchRandomJoke();
  // 	} else {
  //   	this.getSpecificJoke(this.props.match.params.jokeID);
  //   }
  // }

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

export default Joke;
