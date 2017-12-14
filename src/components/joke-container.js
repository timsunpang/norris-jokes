import { connect } from 'react-redux';

import { getSpecificJoke, fetchRandomJoke } from '../actions/actions';
import Joke from './joke';

const mapStateToProps = (state) => {
  return {
    jokes: state.jokes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getSpecificJoke: (jokeID) => dispatch(getSpecificJoke(jokeID)),
  fetchRandomJoke: () => dispatch(fetchRandomJoke())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Joke);
