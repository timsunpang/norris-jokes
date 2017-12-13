import React, { Component } from 'react';

class FilterWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryIdx: null
    }
    console.log(this.props)
    this.toggleFilterWindow = this.props.toggleFilterWindow.bind(this);
    this.fetchJokeCategories = this.props.fetchJokeCategories.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.push = this.props.push.bind(this);
  }

  componentDidMount() {
    this.fetchJokeCategories();
  }

  renderCategories() {
    console.log(this.props)
    return this.props.categories.store.map((category, idx) => (
      <div
        className={
          'category ' + (idx % 2 === 0 ? 'even': 'odd')
          + (idx === this.state.selectedCategoryIdx ? ' selected' : '')
        }
        key={idx}
        onClick={() => this.selectCategory(category, idx)}
      >
        {category}
      </div>
    ))
  }

  selectCategory(category, idx) {
    console.log(category)
    if (idx !== this.state.selectedCategoryIdx) {
      this.setState({
        selectedCategoryIdx: idx
      })
      this.push('/category/' + (idx + 1));
    }
  }

  render() {
    return (
      <div>
        <div className="filter-window">
          <div className="category-header">CATEGORIES</div>
          {this.renderCategories()}
        </div>
        <div className="filter-window-wrapper" onClick={this.toggleFilterWindow}></div>
      </div>
    )
  }
}

export default FilterWindow;
