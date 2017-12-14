import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { fetchJokes } from '../actions/actions';
import JokeList from './joke-list';

const mapStateToProps = (state) => {
  return {
    jokes: state.jokes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchJokes: (options) => dispatch(fetchJokes(options)),
  push: (newURL) => dispatch(push(newURL))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JokeList);
