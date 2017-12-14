import { connect } from 'react-redux';

import { fetchJokes } from '../actions/actions';
import JokeList from './joke-list';

const mapStateToProps = (state) => {
  return {
    jokes: state.jokes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchJokes: (options) => dispatch(fetchJokes(options))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JokeList);
