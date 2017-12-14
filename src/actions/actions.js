import * as APIUtil from '../util/apiUtil';

export const RECEIVE_ALL_JOKES = 'RECEIVE_ALL_JOKES';
export const RECEIVE_JOKE = 'RECEIVE_JOKE';
export const RECEIVE_JOKE_CATEGORIES = 'RECEIVE_JOKE_CATEGORIES';
export const RECEIVE_FILTERED_JOKES = 'RECEIVE_FILTERED_JOKES';
export const FILTER_JOKES = 'FILTER_JOKES';
export const RECEIVE_SEARCH_MATCHES = 'RECEIVE_SEARCH_MATCHES';
export const UPDATE_JOKE_FETCH_STATUS = 'UPDATE_JOKE_FETCH_STATUS';
export const UPDATE_CATEGORY_FETCH_STATUS = 'UPDATE_CATEGORY_FETCH_STATUS';

export const receiveAllJokes = jokes => ({
  type: RECEIVE_ALL_JOKES,
  jokes
})

export const receiveJoke = joke => ({
  type: RECEIVE_JOKE,
  jokes: joke
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

export const fetchJokes = options => (dispatch, getState) => {
  if (getState().jokes.store.length) {
    return dispatch(receiveAllJokes())
  }
  return APIUtil.fetchJokes(options)
  .then(response => response.json())
  .then(jokes => (
    dispatch(receiveAllJokes(jokes.value))
  ))
}

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

export const fetchSpecificJoke = jokeID => (dispatch, getState) => {
  if (!getState().jokes.store.length) {
    return dispatch(fetchJokes())
      .then(() => (dispatch(fetchSpecificJoke(jokeID))))
  }

  let jokes = getState().jokes.store;
  jokeID -= 1;
  if (typeof jokeID !== "number" || jokeID < 0 || jokeID >= jokes.length) {
    return dispatch(receiveJoke());
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
}

export const filterJokesByCategory = (categoryID) => (dispatch, getState) => {
  let categories, jokes;
  if (!getState().categories.store.length || !getState().jokes.store.length) {
    return dispatch(fetchJokeCategories())
      .then(res => (dispatch(fetchJokes())))
      .then(res => (dispatch(filterJokesByCategory(categoryID))))
  }

  categories = getState().categories.store;
  jokes = getState().jokes.store;
  categoryID -= 1;
  if (typeof categoryID !== "number" || categoryID < 0 || categoryID >= jokes.length) {
    return jokes;
  }
  let selectedCategory = categories[categoryID];
  let filteredJokes = [];

  jokes.forEach(joke => {
    joke.categories.some(category => {
      let isMatch = category === selectedCategory;
      if (isMatch) {
        filteredJokes.push(joke);
      }
      return isMatch;
    })
  })

  return dispatch(receiveFilteredJokes(filteredJokes));
}

export const searchJokes = (query) => (dispatch, getState) => {
  const jokes = getState().jokes.filteredJokes;
  if (!query.length) {return dispatch(receiveSearchMatches(jokes))};

  query = query.toLowerCase();
  const searchResults = jokes.filter(joke => (joke.joke.toLowerCase().indexOf(query) > -1))
  return dispatch(receiveSearchMatches(searchResults))
}
