const overlayContent = document.getElementById('overlay-content');

// Função para abrir overlay ao clicar no botão
function openNav(movie) {
    const id = movie.id;
    fetch(baseUrl + '/movie/'+id+'/videos?' +apiKey)
    .then(response => response.json())
    .then(videoData => {
        console.log(videoData);
        if(videoData) {
            document.getElementById('myNav').style.width='100%';
            if(videoData.results.length > 0) {
                let embed = [];
                let dots = [];
                videoData.results.map((video, index) => {
                    const {name, key, site} = video;

                    if(site === 'Youtube') {
                        embed.push(` <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);

                        dots.push(`<span class="dot">${index + 1}</span>`);
                    }
                });
                const content = `
                    <h1 class="no-results">${movie.original_title}</h1>
                    ${embed.join('')}
                    <div class="dots">${dots.join('')}</div>
                `
                overlayContent.innerHTML = content;
                activeSlide = 0;
                showVideos();
            }
        }
    });
}

// Função para fechar overlay ao clicar no 'X'
function closeNav() {
    document.getElementById('myNav').style.width = '0%';
}

let activeSlide = 0;
let totalVideos = 0;

// Função para mostrar videos ao clicar no botão
function showVideos() {
    const embedClasses = document.querySelectorAll('.embed');
    const dots = document.querySelectorAll('.dots');

    totalVideos = embedClasses.length;
    embedClasses.forEach((embedTag, index) => {
        if(activeSlide === index) {
            embedTag.classList.add('show');
            embedTag.classList.remove('hide');
        } else {
            embedTag.classList.add('hide');
            embedTag.classList.remove('show');
        }
    });

    dots.forEach((dot, index) => {
        if(activeSlide === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active')
        }
    });
}

const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

leftArrow.addEventListener('click', () => {
    if(activeSlide > 0) {
        activeSlide--;
    } else {
        activeSlide = totalVideos -1;
    }
    showVideos()
});

rightArrow.addEventListener('click', () => {
    if(activeSlide < (totalVideos - 1)) {
        activeSlide++;
    } else {
        activeSlide = 0;
    }
    showVideos()
});
