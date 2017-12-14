import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { filterJokesByCategory } from '../actions/actions'
import FilteredJokeList from './filtered-joke-list'

const mapStateToProps = state => {
  return {
    categories: state.categories,
    jokes: state.jokes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filterJokesByCategory: categoryID => dispatch(filterJokesByCategory(categoryID)),
    push: (newURL) => dispatch(push(newURL))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilteredJokeList)
