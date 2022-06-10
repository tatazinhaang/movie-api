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

function favoriteStorage(event, movie) {
  const favoriteState = {
    favorited: 'imagens/heart-fill.svg',
    notFavorited: 'imagens/heart.svg'
  }
  if(event.target.src.includes(favoriteState.notFavorited)) {
    event.target.src = favoriteState.favorited;
    LocalStorage.saveLocalStorage(movie)
  } else {
    event.target.src = favoriteState.notFavorited;
    LocalStorage.removeFromLocalStorage(movie.id);
  }
}

const LocalStorage = {
  getFavoriteMovies,
  saveLocalStorage,
  checkFavorite,
  removeFromLocalStorage,
  favoriteStorage
}

