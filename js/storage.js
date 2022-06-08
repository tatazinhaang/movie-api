checkInput.addEventListener('change', checkboxStatus);
console.log(checkInput)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchValue = search.value;
  selectedGenre = [];
  if(searchValue) {
    getMovies(searchUrl + '&query=' + searchValue)
  } else {
    getMovies(apiUrl);
  }
});

function checkboxStatus() {
  const isChecked = checkInput.checked;
  cleanAllMovies();
  if(isChecked) {
    const movies = LocalStorage.getFavoriteMovies() || [];
    movies.forEach(movie => showMovies(movie));
  } else {
    getMovies(apiUrl);
  }
}

const localStorageKey = 'favoriteMovies';

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

function saveLocalStorage(movie) {
  const movies = getFavoriteMovies() || [];
  movies.push(movie);
  const moviesJSON = JSON.stringify(movies);
  localStorage.setItem(localStorage, moviesJSON);
}

function checkFavorite(id) {
  const movies = getFavoriteMovies() || [];
  return movies.find(movie => movie.id == id);
}

function removeFromLocalStorage(id) {
  const movies = getFavoriteMovies() || [];
  const findMovie = movies.find(movie => movie.id != findMovie.id);
  localStorage.setItem(localStorage, JSON.stringify(movies));
}

const LocalStorage = {
  getFavoriteMovies,
  saveLocalStorage,
  checkFavorite,
  removeFromLocalStorage
}

