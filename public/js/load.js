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
    fetch(theurl)
    .then(response => response.json())
    .then(result => {
        console.log(result.results);
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
const mainArea = document.querySelector(".main-area");

let movie = document.createElement("div");
movie.setAttribute("class", "movie");

let movieHeader = document.createElement("div"); 
movieHeader.setAttribute("class", "movieHeader");

let movieTitle = document.createElement("div");
movieTitle.setAttribute("class", "movieTitle");

let h3 = document.createElement("h3");
let text = document.createTextNode("Movie");
h3.appendChild(text);

movieTitle.appendChild(h3);
movieHeader.appendChild(movieTitle);
movie.appendChild(movieHeader);


mainArea.appendChild(movie);