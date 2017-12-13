import { connect } from 'react-redux'
import { fetchJokeCategories } from '../actions/actions'
import { push } from 'react-router-redux'
import FilterWindow from './filter-window'

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchJokeCategories: options => dispatch(fetchJokeCategories(options)),
    toggleFilterWindow: () => ownProps.toggleFilterWindow(),
    push: (newURL) => dispatch(push(newURL))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterWindow)
