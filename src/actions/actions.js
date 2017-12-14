import * as APIUtil from '../util/apiUtil';

export const RECEIVE_ALL_JOKES = 'RECEIVE_ALL_JOKES';
export const RECEIVE_JOKE = 'RECEIVE_JOKE';
export const RECEIVE_JOKE_CATEGORIES = 'RECEIVE_JOKE_CATEGORIES';
export const RECEIVE_FILTERED_JOKES = 'RECEIVE_FILTERED_JOKES';
export const FILTER_JOKES = 'FILTER_JOKES';
export const RECEIVE_SEARCH_MATCHES = 'RECEIVE_SEARCH_MATCHES';
// export const LOG_IN = 'LOG_IN';

// export const authenticateUser = status => ({
//   type: LOG_IN,
//   status
// })

export const receiveAllJokes = jokes => ({
  type: RECEIVE_ALL_JOKES,
  jokes
})

export const receiveJoke = joke => ({
  type: RECEIVE_JOKE,
  jokes: [joke]
})

export const receiveJokeCategories = categories => ({
  type: RECEIVE_JOKE_CATEGORIES,
  categories
})

export const receiveFilteredJokes = jokes => ({
  type: RECEIVE_FILTERED_JOKES,
  jokes
})

export const receiveSearchMatches = jokes => ({
  type: RECEIVE_SEARCH_MATCHES,
  jokes
})

// export const filterJokes = query => ({
//   type: FILTER_JOKES,
//   query
// })

// export const logIn = status => dispatch => (
//   dispatch(authenticateUser(status))
// )

// export const initialize = () => dispatch => (
//    dispatch(fetchJokes())
//     .then(() => (
//       dispatch(fetchRandomJoke())
//     ))
// )

export const filterJokes = (query, categories, jokes) => dispatch => (
  dispatch(filterJokesByCategory(jokes, categories))
    .then(filteredJokes => (
      dispatch(searchJokes(query, filteredJokes))
    ))
    .then(displayJokes => (
      dispatch(receiveFilteredJokes(displayJokes))
    ))
)

export const filterJokesByCategory = (categoryID) => (dispatch, getState) => {
  let categories, jokes;
  if (!getState().categories.store.length || !getState().jokes.store.length) {
    return dispatch(fetchJokeCategories())
      .then(res => (dispatch(fetchJokes())))
      .then(res => (dispatch(filterJokesByCategory(categoryID))))
  }

  console.log("OUT OF INITIAL FETCH")
  categories = getState().categories.store;
  jokes = getState().jokes.store;
  console.log(categoryID);
  categoryID -= 1;
  if (typeof categoryID !== "number" || categoryID < 0 || categoryID >= jokes.length) {
    return jokes;
  }
  let selectedCategory = categories[categoryID];
  console.log(selectedCategory, categoryID)
  let filteredJokes = [];
  // if (!categories || !categories.length) { return jokes };
  // let filteredJokes = [];
  jokes.forEach(joke => {
    joke.categories.some(category => {
      let isMatch = category === selectedCategory;
      if (isMatch) {
        filteredJokes.push(joke);
      }
      return isMatch;
    })
  })

  console.log(filteredJokes);
  return dispatch(receiveFilteredJokes(filteredJokes));
    // return jokes.filter(joke => (joke.))
}

export const searchJokes = (query, jokes) => dispatch => {
  let searchResults = jokes.filter(joke => (joke.joke.indexOf(query) > -1))
  return searchResults;
  // console.log(getState());
  // if (!getState().jokes.store.length) {
  //   return dispatch(fetchJokes())
  //     .then(dispatch(searchJokes(query)))
  // }
  //
  // let jokeStore = getState().jokes.store;
  //
};

export const fetchJokes = options => (dispatch, getState) => {
  console.log(getState());
  if (getState().jokes.store.length) {
    console.log("using store!")
    return dispatch(receiveAllJokes())
  }
  return APIUtil.fetchJokes(options)
  .then(response => response.json())
  .then(jokes => (
    dispatch(receiveAllJokes(jokes.value))
  ))
};

export const fetchRandomJoke = options => (dispatch, getState) => {
  if (getState().jokes.store.length) {
    const jokeStore = getState().jokes.store;
    let randomJoke = jokeStore[Math.floor(Math.random() * jokeStore.length)]
    return dispatch(receiveJoke(randomJoke))
  } else {
    return dispatch(fetchJokes())
    .then(() => dispatch(fetchRandomJoke()));
  }
};

export const getSpecificJoke = jokeID => (dispatch, getState) => {
  console.log("GET SPECIFIC JOKE", jokeID)
  if (!getState().jokes.store.length) {
    return dispatch(fetchJokes())
      .then(() => (dispatch(getSpecificJoke(jokeID))))
  }

  let jokes = getState().jokes.store;
  jokeID -= 1;
  if (typeof jokeID !== "number" || jokeID < 0 || jokeID >= jokes.length) {
    return dispatch(receiveJoke([]));
  }

  return dispatch(receiveJoke(jokes[jokeID]));
}

export const fetchJokeCategories = () => (dispatch, getState) => {
  if (getState().categories.store.length) {
    return dispatch(receiveJokeCategories())
  }

  return APIUtil.fetchJokeCategories()
  .then(response => response.json())
  .then(categories => (
    dispatch(receiveJokeCategories(categories.value))
  ))
};
