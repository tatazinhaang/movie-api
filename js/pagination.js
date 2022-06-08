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