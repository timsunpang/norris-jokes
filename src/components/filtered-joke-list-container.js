import { connect } from 'react-redux'
import { filterJokesByCategory } from '../actions/actions'
import FilteredJokeList from './filtered-joke-list'

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    filterJokesByCategory: categoryID => dispatch(filterJokesByCategory(categoryID)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilteredJokeList)
