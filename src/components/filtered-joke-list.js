import React, { Component } from 'react'

class FilteredJokeList extends Component {
  constructor(props) {
    super(props);
    this.filterJokesByCategory = this.props.filterJokesByCategory.bind(this);
    this.listJokes = this.listJokes.bind(this);
    this.push = this.props.push.bind(this);
  }

  componentDidMount() {
    this.filterJokesByCategory(this.props.match.params.categoryID);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.filterJokesByCategory(nextProps.match.params.categoryID)
    }
  }

  listJokes() {
    return this.props.jokes.jokes.map((joke, idx) => (
       <div className="joke-item" key={idx} onClick={()=>{this.push('/joke/' + (idx + 1))}}>{joke.joke}</div>
    ))
  }

  render() {
    return (
      <div className="jokes-list-container">
        {this.listJokes()}
      </div>
    )
  }
}

export default FilteredJokeList;
