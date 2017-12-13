import { connect } from 'react-redux'
import {
  fetchRandomJoke,
  fetchJokes,
  searchJokes
} from '../actions/actions'
import { push } from 'react-router-redux'
import { JokeIndex } from './joke-index'

const mapStateToProps = state => {
  return {
    jokes: state.jokes,
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRandomJoke: options => dispatch(fetchRandomJoke(options)),
    fetchJokes: options => dispatch(fetchJokes(options)),
    searchJokes: query => dispatch(searchJokes(query)),
    push: (newURL) => dispatch(push(newURL))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JokeIndex)
