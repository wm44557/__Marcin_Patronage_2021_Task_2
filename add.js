import setCounterOfTo from "./movies-counter.js";
import MoviesStorage from "./movies-storage.js";
import {moviesCounter, moviesSeenCounter} from "./movies-counter.js";

const dElement = {
    moviesSeen: document.getElementById('anotherMoviesCounterAll'),
    moviesCounter: document.getElementById('anotherMoviesCounterSeen'),
    moviesContainer: document.getElementById('formContainer')
}

let store = new MoviesStorage();
const moviesCounterSeenFn = () => store.get().filter(item => item.seen === 'T').length;

setCounterOfTo(moviesCounter, store.get().length)
setCounterOfTo(moviesSeenCounter, moviesCounterSeenFn(), 'MoviesSeen')

dElement['moviesSeen'].textContent = String(moviesSeenCounter);
dElement['moviesCounter'].textContent = String(moviesCounter);



