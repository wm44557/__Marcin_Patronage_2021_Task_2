'use strict';
import setCounterOfTo from "./movies-counter.js";
import MoviesStorage from "./movies-storage.js";
import {moviesCounter, moviesSeenCounter} from "./movies-counter.js";

const dElement = {
    moviesSeen: document.getElementById('moviesCounterSeen'),
    moviesCounter: document.getElementById('moviesCounterAll'),
    moviesContainer: document.getElementById('moviesListContainer')
}

let store = new MoviesStorage();

export const moviesCounterSeenFn = () => store.get().filter(item => item.seen === 'T').length;

const counterInitFromStore = (dElement) => {
    setCounterOfTo(moviesCounter, store.get().length)
    setCounterOfTo(moviesSeenCounter, moviesCounterSeenFn(), 'MoviesSeen')

    dElement['moviesSeen'].textContent = String(moviesSeenCounter);
    dElement['moviesCounter'].textContent = String(moviesCounter);
}
counterInitFromStore(dElement)


const render = (datasetId, index, role) => {
    if (role === 'seen') {
        let old = store.get()[index]
        old.seen = 'T';
        store.set(old, datasetId)
        setCounterOfTo(moviesSeenCounter, moviesCounterSeenFn(), 'MoviesSeen')
        document.querySelector(`li[data-id='${datasetId}'] .seenDiv`).innerHTML = `<i class="far fa-eye"></i>`;
        dElement['moviesSeen'].textContent = String(moviesSeenCounter);

    } else if (role === "delete") {
        store.remove(datasetId)
        setCounterOfTo(moviesSeenCounter, store.get().length)
        dElement['moviesCounter'].textContent = String(moviesCounter);
        document.querySelector(`li[data-id='${datasetId}']`).remove()
    }

}


// LIST ELEMENTS GENERATOR

let newElement;
let itemChildListItem;


const appendChild = (tagName, innerHTML, className, itemFunction) => {
    itemChildListItem = document.createElement(tagName)
    itemChildListItem.innerHTML = innerHTML;
    className ? itemChildListItem.className = className : null;
    if (itemFunction === "seen") {
        itemChildListItem.innerHTML === "T" ? itemChildListItem.innerHTML = `<i class="far fa-eye"></i>` : itemChildListItem.innerHTML = `open movie`;
        itemChildListItem.addEventListener('click', function (e) {
            let datasetId = Number(e.target.parentElement.dataset.id)
            console.log('tyrytyry')
            store.get().forEach((item, index) => item.id === datasetId ? render(datasetId, index, "seen") : null);
        })
    } else if (itemFunction === "delete") {
        itemChildListItem.addEventListener('click', function (e) {
            let datasetId = Number(e.target.parentElement.dataset.id)
            store.get().forEach((item, index) => item.id === datasetId ? render(datasetId, index, "delete") : null);
        })
    }

    newElement.appendChild(itemChildListItem);

}

const renderList = () => {
    store.get().forEach(function (item, index) {
            newElement = document.createElement('li');
            newElement.id = `list_item_${item.id}`;
            newElement.dataset.id = item.id;
            newElement.className = "movie";

            appendChild('h2', item.title, 'h2Title');
            appendChild('p', item.year, 'pYear');
            appendChild('p', item.summary, 'pSummary');
            appendChild('div', item.seen, 'seenDiv', "seen");
            appendChild('div', 'x', 'deleteDiv', "delete");

            dElement['moviesContainer'].appendChild(newElement);
        }
    );
}

renderList()
