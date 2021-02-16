'use strict';
import setCounterOfTo from "./movies-counter.js";
import MoviesStorage from "./movies-storage.js";
import {moviesCounter, moviesSeenCounter} from "./movies-counter.js";

const dElement = {
    moviesSeen: document.getElementById('moviesCounterSeen'),
    moviesCounter: document.getElementById('moviesCounterAll'),
    moviesContainer: document.getElementById('moviesListContainer')
}

const store = new MoviesStorage();

// store.get(21)
// store.set({
//     "id": 222,
//     "title": "The xD Redemption",
// }, 1)
// store.remove(222)

const moviesCounterSeenFn = () => store.get().filter(item => item.seen === 'T').length;


setCounterOfTo(moviesCounter, store.get().length)
setCounterOfTo(moviesSeenCounter, moviesCounterSeenFn(), 'MoviesSeen')

dElement['moviesSeen'].textContent = String(moviesSeenCounter);
dElement['moviesCounter'].textContent = String(moviesCounter);


const renderSeen = (datasetId, index) => {
    store.get()[index].seen = "T"
    document.querySelector(`li[data-id='${datasetId}'] .seenDiv`).innerHTML = `<i class="far fa-eye"></i>`;
    setCounterOfTo(moviesSeenCounter, moviesCounterSeenFn(), 'MoviesSeen')
    store.set(store.get()[index], datasetId)
    dElement['moviesSeen'].textContent = String(moviesSeenCounter);
}


// LIST ELEMENTS GENERATOR

let newElement;
let itemChildListItem;


const appendChild = (tagName, innerHTML, className, itemSeen) => {
    itemChildListItem = document.createElement(tagName)
    itemChildListItem.innerHTML = innerHTML;
    className ? itemChildListItem.className = className : null;
    if (itemSeen) {
        itemChildListItem.innerHTML === "T" ? itemChildListItem.innerHTML = `<i class="far fa-eye"></i>` : itemChildListItem.innerHTML = `open movie`;
        itemChildListItem.addEventListener('click', function (e) {
            let datasetId = Number(e.target.parentElement.dataset.id)
            store.get().forEach((item, index) => item.id === datasetId ? renderSeen(datasetId, index) : null);
        })
    }
    newElement.appendChild(itemChildListItem);

}

store.get().forEach(function (item, index) {
        newElement = document.createElement('li');
        newElement.id = `list_item_${item.id}`;
        newElement.dataset.id = item.id;
        newElement.className = "movie";

        appendChild('h2', item.title, 'h2Title');
        appendChild('p', item.year, 'pYear');
        appendChild('p', item.summary, 'pSummary');
        appendChild('div', item.seen, 'seenDiv', true);

        dElement['moviesContainer'].appendChild(newElement);
    }
);


