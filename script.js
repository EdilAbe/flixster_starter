const apiKey = "4bbb7e45de73a2addf2cd9b4eabc0ac5";
const posterPath = "https://www.themoviedb.org/t/p/original"; 

//DOM selectors

const loadMoreMoviesBtn = document.querySelector("#load-more-movies-btn")
const searchEl = document.querySelector("#submit")
const clearSearchBtn = document.querySelector("#close-search-btn")
const movieGrid = document.querySelector(".movie-grid");
const movieTitle = document.querySelector(".movie-title");
const moviePoster = document.querySelector("#movie-poster");
const movieVotes = document.querySelector(".movie-votes");

//parameters

let page = 1
let search = false
let searchKey = ""
let showMore = false
nowPlaying = false

//functions

async function recommendedMovies() { 
    try { 
        nowPlaying = true
        search = false
        
     // let url = "https://api.themoviedb.org/3/search/movie/now_playing?api_key=" + apiKey + "&language=en-US&page=" + page
      let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`
      page++;
      
        let response = await fetch(url); 
        let resData = await response.json(); 
    
         displayMovies(resData);
   }
    catch(err) {
        console.log("Error");
    }
}


function displayMovies(data) {
      
        data.results.forEach((item) =>{
            if(item.Poster_Path == null){
             movieGrid.innerHTML +=  `
             <span class="movie-card">
                 <img id="movie-poster" src="placeholder.png" alt = ${item.title}>
                 <div class="movie-title">${item.title}</div>
                 <div class="movie-date">${item.release_date}</div>
                 <span div="movie-votes" id = ${item.id}>⭐${item.vote_average}</span>
            </span>
             <div class="space">
             </div>`        
    }
            else{
                movieGrid.innerHTML +=  `
             <span class="movie-card">
                 <img id="movie-poster" src=${posterPath + item.poster_path} alt = ${item.title}>
                 <div class="movie-title">${item.title}</div>
                 <div class="movie-date">${item.release_date}</div>
                 <span div="movie-votes" id = ${item.id}>⭐${item.vote_average}</span>
            </span>
             <div class="space">
             </div>`  
            }
    })
     }
     

async function getResults(ev) {

    ev.preventDefault()
    search  = true
    nowPlaying = false
    searchKey = userInput.value
    if (ev.target.className == "search-input"){
        url = `https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&page=" + page + "&query=" + searchKey`
    }
    else{
        url = `https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&page=" + page`
    }


let response = await fetch(url); 
        let resData = await response.json(); 
    
         displayMovies(resData);
         page ++;
   }


function clearSearch(){
    movieGrid.innerHTML= ``
    loadMore = false
    //..
    recommendedMovies();
}


 //event listeners

searchEl.addEventListener("submit", (event) =>{
    event.preventDefault()
    if (event.target.searchTerm.value == searchKey){
        getResults(searchKey);
    }
    else{
        recommendedMovies();
    }
})

loadMoreMoviesBtn.addEventListener("click", (event) =>{
    if (searchKey){
        getResults(searchKey);
    }
    else{
        recommendedMovies();
    }
})
 

clearSearchBtn.addEventListener("click", clearSearch)

window.onload = () => {
     result = true;
     recommendedMovies();
 }