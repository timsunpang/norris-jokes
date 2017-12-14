export const fetchJokes = (options = {}) => {
  let optionStr = '';

  if (options['firstName']) {
    optionStr += '&firstName=' + options['firstName'];
  }
  if (options['lastName']) {
    optionStr += '&lastName=' + options['lastName'];
  }
  if (options['categories']) {
    let categories = options['categories'].join(',')
    optionStr += `&limitTo=[${categories}]`;
  }

  return fetch('https://api.icndb.com/jokes?escape=javascript' + optionStr);
}

export const fetchJokeCategories = () => {
  return fetch('https://api.icndb.com/categories');
}

export const fetchRandomJoke = (options = {}) => {
  let optionStr = '';

  if (options['firstName']) {
    optionStr += '&firstName=' + options['firstName'];
  }
  if (options['lastName']) {
    optionStr += '&lastName=' + options['lastName'];
  }
  if (options['categories']) {
    let categories = options['categories'].join(',')
    optionStr += `&limitTo=[${categories}]`;
  }

  return fetch('https://api.icndb.com/jokes/random');
}
