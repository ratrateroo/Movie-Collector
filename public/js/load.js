let pageNumber = 1;
const URL =
"https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json";
document.addEventListener("DOMContentLoaded", () => {
//set up the IntersectionObserver to load more images if the footer is visible.
//URL - https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json
let options = {
  root: null,
  rootMargins: "0px",
  threshold: 0.5
};

const observer = new IntersectionObserver(handleIntersect, options);
observer.observe(document.querySelector(".all-rights-reserved"));
//an initial load of some data
//getData();
getMovies(pageNumber);
});

function getMovies(pageNumber) {
    let theurl = 'http://localhost:3000/load-movies/' + pageNumber;
    const mainArea = document.querySelector(".main-area");
    fetch(theurl)
    .then(response => response.json())
    
    .then(data => {
        console.log(data.results);

        data.results.forEach(item => {
        //movie header
        let movie = document.createElement("div");
        movie.setAttribute("class", "movie");
        
        let movieHeader = document.createElement("div"); 
        movieHeader.setAttribute("class", "movie__header");

        let movieTitle = document.createElement("div");
        movieTitle.setAttribute("class", "movie__title");

        let h3 = document.createElement("h3");
        let text = document.createTextNode("Movie");
        text.textContent = item.title;
        h3.appendChild(text);

        movieTitle.appendChild(h3);
        movieHeader.appendChild(movieTitle);
        movie.appendChild(movieHeader);

        //movie body

        let movieBody = document.createElement("div");
        movieBody.setAttribute("class", "movie__body");
        
        let moviePoster = document.createElement("div"); 
        moviePoster.setAttribute("class", "movie__poster");
        
        let movieLink = document.createElement("a"); 
        movieLink.setAttribute("href", "/movies/"+ item.id);

        let movieImage = document.createElement("img"); 
        movieImage.setAttribute("src", "http://image.tmdb.org/t/p/w500/" + item.poster_path);
        movieImage.setAttribute("alt",  item.title);

        movieLink.appendChild(movieImage);
        moviePoster.appendChild(movieLink);
        movieBody.appendChild(moviePoster);
        movie.appendChild(movieBody);

        //movie footer

        let movieFooter = document.createElement("div");
        movieFooter.setAttribute("class", "movie__footer");
        
        let movieReleaseDate = document.createElement("div"); 
        movieReleaseDate.setAttribute("class", "movie__release");
        
        let h4 = document.createElement("h4");
        let releaseDate = document.createTextNode(item.release_date);
        h4.appendChild(releaseDate);

        movieReleaseDate.appendChild(h4);
        movieFooter.appendChild(movieReleaseDate);
         
        movie.appendChild(movieFooter);
         

      

         
                    


        mainArea.appendChild(movie);

        })
    })
    .catch(err => console.log(err));
}


function handleIntersect(entries) {
if (entries[0].isIntersecting) {
  console.warn("something is intersecting with the viewport");
  pageNumber++;
  getMovies(pageNumber);
  //getData();
}
}
