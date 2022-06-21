const apiKey = "4bbb7e45de73a2addf2cd9b4eabc0ac5"

//DOM selectors

const loadMoreBtnEl = document.querySelector("#load-more-movies-btn");
//const formEl = document.querySelector("form");
const closeSearchBtnEl = document.querySelector("#close-search-btn");
const searchInputEl = document.querySelector("#search-input");
const searchEl = document.querySelector("#search")
const movieGridEl = document.querySelector(".movie-grid");
const resultsEl = document.querySelector("#searchResults");


//parameters

let page = 1;
let searchKey = "";
let starter = false;

//functions

function nowPlayingMovies(searchKey, noInput ) { 
    if(noInput){
            return `https://api.themoviedb.org/3/movie/now_playing?api_key="${apiKey}"&language=en-US&page=${page}`;
         }
    else{
            return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchKey}&language=en-US&page=${page}`;
        }

}


async function getResults() {

    ev.preventDefault();
    starter = false;
    searchKey = userInput.value;

    if (ev.target.className == searchKey){
        url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchKey}&language=en-US&page=${page}`
    }
    else{
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key="${apiKey}"&language=en-US&page=${page}`
    }


        let response = await fetch(url); 
        console.log("response is: ",response)
        let resData = await response.json(); 
        console.log("resData is: ",resData)
        displayMovies(resData);
        return resData;
    
   }

   function displayMovies(responseData) {
      
    responseData.results.forEach(item =>{
        movieGridEl.innerHTML +=  `
             <span class="movie-card">
             <img id="movie-poster" src="https://image.tmdb.org/t/p/original/${item.poster_path}" alt = ${item.title} class = "movie-poster">
             <div class="movie-title">${item.title}</div>
             <div class="movie-date">${item.release_date}</div>
             <span div="movie-votes" id = ${item.id}>⭐${item.vote_average}</span>
        </span>
         <div class="space">
         </div>`              
})
}
 


function clearSearch(){
    movieGridEl.innerHTML= ``
    loadMore = false;
    nowPlayingMovies();
}


 //event listeners

searchEl.addEventListener("submit", (event) =>{
    event.preventDefault()
    starter = false;
    searchEl.value = "";
        if (event.target.searchTerm.value == searchKey){
        getResults(searchKey);
    }
    else{
        nowPlayingMovies();
    }
})

loadMoreBtnEl.addEventListener("click", (event) =>{
    if (searchKey){
        getResults(searchKey);
    }
    else{
        nowPlayingMovies();
    }
})
 

closeSearchBtnEl.addEventListener("click", clearSearch)

window.onload = () => {
     starter = true;
     nowPlayingMovies();
 }