import React, { Component } from 'react'

// const FilteredJokeList = (props) => (
//   <div>
//     {props}
//     FilteredJokes
//   </div>
// )


class FilteredJokeList extends Component {
  constructor(props) {
    super(props);
    this.filterJokesByCategory = this.props.filterJokesByCategory.bind(this);
    // this.props.history.listen((location, action) => {
    //   console.log(location, action)
    // })
  }


  // shouldComponentUpdate() {
  //   console.log("PROPS: ", this.props)
  // }
  componentDidMount() {
    this.filterJokesByCategory(this.props.match.params.categoryID);
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('component will receive props')
    if (nextProps.match.params.categoryID !== this.props.match.params.categoryID) {
      this.filterJokesByCategory(nextProps.match.params.categoryID)
    }
  }

  render() {
    // this.filterJokesByCategory(this.props.match.params.categoryID);

    return (
      <div>
        FilteredJokes Category {this.props.match.params.categoryID ? this.props.match.params.categoryID: ''}
      </div>
    )
  }
}

export default FilteredJokeList;
