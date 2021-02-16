'use strict';
import {moviesData} from "./data.js";

const moviesCounterSeenDiv = document.getElementById('moviesCounterSeen');
const moviesCounterAllDiv = document.getElementById('moviesCounterAll');
const moviesListContainer = document.getElementById('moviesListContainer');

let moviesCounter = moviesData.filter(item => item.seen === 'T');

moviesCounterAllDiv.textContent = String(moviesData.length);
moviesCounterSeenDiv.textContent = String(moviesCounter.length);

let newElement;
let itemChildListItem;

const renderSeen = (datasetId, index) => {
    moviesData[index].seen = "T"
    // document.querySelector(`li[data-id='${datasetId}'] .seenDiv`).innerHTML = `T`;
    document.querySelector(`li[data-id='${datasetId}'] .seenDiv`).innerHTML = `<i class="far fa-eye"></i>`;
    moviesCounter = moviesData.filter(item => item.seen === 'T');
    console.log(moviesData)
    moviesCounterSeenDiv.textContent = String(moviesCounter.length);
}


const appendChild = (tagName, innerHTML, className, itemSeen) => {
    itemChildListItem = document.createElement(tagName)
    itemChildListItem.innerHTML = innerHTML;
    className ? itemChildListItem.className = className : null;
    if (itemSeen) {
        // itemChildListItem.innerHTML === "T" ? itemChildListItem.innerHTML = `T` : itemChildListItem.innerHTML = `F`;
        itemChildListItem.innerHTML === "T" ? itemChildListItem.innerHTML = `<i class="far fa-eye"></i>` : itemChildListItem.innerHTML = `open movie`;
        itemChildListItem.addEventListener('click', function (e) {
            let datasetId = Number(e.target.parentElement.dataset.id)
            moviesData.forEach((item, index) => item.id === datasetId ? renderSeen(datasetId, index) : null);
        })
    }
    newElement.appendChild(itemChildListItem);

}

moviesData.forEach(function (item, index) {
        newElement = document.createElement('li');
        newElement.id = `list_item_${item.id}`;
        newElement.dataset.id = item.id;
        newElement.className = "movie";

        appendChild('h2', item.title, 'h2Title');
        appendChild('p', item.year, 'pYear');
        appendChild('p', item.summary, 'pSummary');
        appendChild('div', item.seen, 'seenDiv', true);

        moviesListContainer.appendChild(newElement);
    }
);


