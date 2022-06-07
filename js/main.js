const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=1cf50e6248dc270629e802686245c2c8';
const apiUrl = baseUrl + '/discover/movie?sort_by=popularity.desc&'+ apiKey;
const imagePath = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = baseUrl + '/search/movie?'+ apiKey;

const movieGenres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = '';
let totalPages = 100;

let selectedGenre = [];
setMoviesGenre();

function setMoviesGenre() {
    tagsEl.innerHTML = '';
    movieGenres.map(genre => {
        const tags = document.createElement('div');
        tags.classList.add('tag');
        tags.id = genre.id;
        tags.innerText = genre.name;
        tags.addEventListener('click', () => {
            if(selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if(selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, index) => {
                        if(id == genre.id) {
                            selectedGenre.splice(index, 1);
                        }
                    });
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre);
            getMovies(apiUrl + '&with_genres=' + encodeURI(selectedGenre.join(',')));
            highlightSelection()
        });
        tagsEl.append(tags);
    });
}

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight');
  });

  clearBtn() 
  if(selectedGenre.length !== 0) {
    selectedGenre.forEach(id => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add('highlight');
    });
  }
}

function clearBtn() {
  const clearBtn = document.getElementById('clear');
  if(clearBtn) {
    clearBtn.classList.add('highlight');
  } else {
    const clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear Tags';
    clear.addEventListener('click', () => {
        selectedGenre = [];
        setMoviesGenre();
        getMovies(apiUrl);
    });
    tagsEl.append(clear);
  }
}

getMovies(apiUrl);

function getMovies(url) {
    lastUrl = url;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        if(data.results.length !== 0) {
          showMovies(data.results);
          currentPage = data.page;
          nextPage = currentPage + 1;
          prevPage = currentPage - 1;
          totalPages = data.total_pages;
          
          current.innerText = currentPage;

          if(currentPage <= 1) {
            prev.classList.add('disabled');
            next.classList.remove('disabled');
          } else if(currentPage >= totalPages) {
            prev.classList.remove('disabled');
            next.classList.add('disabled');
          } else {
            prev.classList.remove('disabled');
            next.classList.remove('disabled');
          }
          tagsEl.scrollIntoView({behavior : 'smooth'});
        } else {
          main.innerHTML = `<h1 class="no-results"> No Results Found</h1>`
        }
    });

}

function showMovies(data) {
  main.innerHTML = '';
  data.forEach(movie => {
    const {title, poster_path, vote_average, overview, id} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
          <img src="${poster_path? imagePath+poster_path: "http://via.placeholder.com/1080x1580"}" alt="${title}">

          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>

          <div class="overview">
            <h3>Overview</h3>
            ${overview}
            <div class="favorite" id="${id}"></div>
          </div>

    `
    main.appendChild(movieEl);

    document.getElementById(id).addEventListener('click', () => {
      openNav(movie);
    });
  });
}

function getColor(vote) {
  if(vote >= 8) {
    return 'green';
  } else if(vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

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

// Funções de paginação
prev.addEventListener('click', () => {
  if(prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener('click', () => {
  if(nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  const urlPage = lastUrl.split('?');
  const querys = urlPage[1].split('&');
  const key = querys[querys.length - 1].split('=');

  if(key[0] != 'page') {
    let url = lastUrl + '&page=' + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join('=');
    querys[querys.length -1] = a;
    let b = querys.join('&');
    let url = urlPage[0] +'?'+ b
    
    getMovies(url);
  }
}



  