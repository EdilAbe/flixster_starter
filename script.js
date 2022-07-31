const API_KEY = "4bbb7e45de73a2addf2cd9b4eabc0ac5";
BASE_API_URL = "https://api.themoviedb.org/3";

//DOM selectors
const loadMoreBtn = document.querySelector("#load-more-movies-btn");
//const formEl = document.querySelector("form");
const closeSearchBtn = document.querySelector("#close-search-btn");
const searchBtn = document.querySelector("#searchButton");
const moviesGrid = document.querySelector("#movie-grid");
const moviesCard = document.querySelector("#movie-card");
//const resultsEl = document.querySelector("#searchResults");
const popup = document.querySelector("#popup");
const popupContainer = document.querySelector("#popup-container");

//parameters

let page = 1;
let searchTerm = "";
let latestApiCall = "";
let searched = false;

//functions
async function callAPI(apiRequestURL) {
  console.log("called URL:", apiRequestURL);

  let response = await fetch(apiRequestURL);
  let responseData = await response.json();
  return responseData;
}

async function getResults(apiRequestURL) {
  latestApiCall = apiRequestURL;
  console.log("latest call", latestApiCall);

  results = await callAPI(apiRequestURL);
  return results;
}

function displayMovies(responseData) {
  responseData.results.forEach((item) => {
    moviesCard.innerHTML += `
             <span class="movie-card-each">
             <img id="movie-poster" src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt = ${item.title} class = "movie-poster">
             <div class="movie-title">${item.title}</div>
             <div class="movie-date">${item.release_date}</div>
             <span div="movie-votes" id = ${item.id}>⭐${item.vote_average}</span>
        </span>
         `;
  });
}

async function nowPlayingMovies() {
  movieResults = await getResults(
    BASE_API_URL + "/movie/now_playing?api_key=" + API_KEY
  );
  displayMovies(movieResults);
}

function clearSearch() {
  moviesGrid.innerHTML = ``;
  loadMore = false;
  nowPlayingMovies();
}

//event listeners

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  page = 1;
  // moviesGrid.innerHTML = "";

  searchTerm = document.getElementById("search-input").value;

  let resp = await fetch(
    BASE_API_URL +
      "/search/movie?api_key=" +
      API_KEY +
      "&query=" +
      searchTerm +
      "&page=" +
      page
  );
  let result = await resp.json();
  //  searched = True;
  console.log(" searchTerm: ", searchTerm);

  console.log("result : ", result);

  displayMovies(result);
  // closeSearchBtn.classList.remove("hidden");
});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  results = await getResults(
    BASE_API_URL + "/movie/now_playing?api_key=" + API_KEY + "&page=" + page
  );

  displayMovies(results);
});

closeSearchBtn.addEventListener("click", () => {
  moviesGrid.innerHTML = "";
  page = 1;
  nowPlayingMovies();
  closeSearchBtn.classList.add("hidden");
});

popupContainer.addEventListener("click", () => {
  popupContainer.classList.add("hidden");
  popup.classList.add("hidden");
});

window.onload = () => {
  page = 1;
  nowPlayingMovies();
};
