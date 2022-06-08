// Funções do conteúdo de overlay

const overlayContent = document.getElementById('overlay-content');
function openNav(movie) {
  const id = movie.id;
  fetch(baseUrl + '/movie/'+id+'/videos?'+apiKey)
  .then(response => response.json())
  .then(videoData => {
    if(videoData) {
      document.getElementById("myNav").style.width = "100%";
      if(videoData.results.length > 0){
        let embed = [];
        let dots = [];
        videoData.results.forEach((video, idx) => {
          const {name, key, site} = video
          if(site == 'YouTube'){    
            embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           `)
            dots.push(`
              <span class="dot">${idx + 1}</span>
            `)
          }
        });
        
        const content = `
        <h1 class="no-results">${movie.original_title}</h1>
        <br/>
        ${embed.join('')}
        <br/>
        <div class="dots">${dots.join('')}</div>  
        `
        overlayContent.innerHTML = content;
        activeSlide=0;
        showVideos();
      } else {
        overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`
      }
    }
  });
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

let activeSlide = 0;
let totalVideos = 0;

function showVideos() {
  let embedClasses = document.querySelectorAll('.embed');
  let dots = document.querySelectorAll('.dot');

  totalVideos = embedClasses.length; 
  embedClasses.forEach((embedTag, idx) => {
    if(activeSlide == idx) {
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    } else {
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  });

  dots.forEach((dot, index) => {
    if(activeSlide == index){
      dot.classList.add('active');
    } else {
      dot.classList.remove('active')
    }
  });
}

const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

leftArrow.addEventListener('click', () => {
  if(activeSlide > 0){
    activeSlide--;
  } else {
    activeSlide = totalVideos -1;
  }
  showVideos();
});

rightArrow.addEventListener('click', () => {
  if(activeSlide < (totalVideos -1)){
    activeSlide++;
  } else {
    activeSlide = 0;
  }
  showVideos();
});







