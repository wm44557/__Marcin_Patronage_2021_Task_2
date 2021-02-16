import setCounterOfTo from "./movies-counter.js";
import MoviesStorage from "./movies-storage.js";
import {moviesCounter, moviesSeenCounter} from "./movies-counter.js";

const dElement = {
    moviesSeen: document.getElementById('anotherMoviesCounterSeen'),
    moviesCounter: document.getElementById('anotherMoviesCounterAll'),
    container: document.getElementById('formContainer')
}

let store = new MoviesStorage();
const moviesCounterSeenFn = () => store.get().filter(item => item.seen === 'T').length;

setCounterOfTo(moviesCounter, store.get().length)
setCounterOfTo(moviesSeenCounter, moviesCounterSeenFn(), 'MoviesSeen')

dElement['moviesSeen'].textContent = String(moviesSeenCounter);
dElement['moviesCounter'].textContent = String(moviesCounter);

const addForm = () => {
    const form = document.createElement('form');
    let itemChildListItem;

    const appendChild = (tagName, innerHTML, placeholder, listener, type) => {
        itemChildListItem = document.createElement(tagName)
        itemChildListItem.innerHTML = innerHTML;
        placeholder ? itemChildListItem.placeholder = placeholder : null;
        type ? itemChildListItem.type = type : null;


        form.appendChild(itemChildListItem);
    }

    appendChild('h1', 'Add film');
    appendChild('input', '', 'title', 'change', 'text');
    appendChild('input', '', 'year', 'change', 'number');
    appendChild('input', '', 'year', 'change', 'text');
    appendChild('input', '', 'summary', 'change', 'text');
    appendChild('p', '');
    appendChild('button', 'SAVE', null, 'click');
    dElement['container'].appendChild(form);
}


addForm()

