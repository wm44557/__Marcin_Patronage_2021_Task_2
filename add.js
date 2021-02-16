import setCounterOfTo from "./movies-counter.js";
import MoviesStorage from "./movies-storage.js";
import {moviesCounter, moviesSeenCounter} from "./movies-counter.js";

const dElement = {
    moviesSeen: document.getElementById('anotherMoviesCounterSeen'),
    moviesCounter: document.getElementById('anotherMoviesCounterAll'),
    container: document.getElementById('formContainer'),

}

let store = new MoviesStorage();
const moviesCounterSeenFn = () => store.get().filter(item => item.seen === 'T').length;

setCounterOfTo(moviesCounter, store.get().length)
setCounterOfTo(moviesSeenCounter, moviesCounterSeenFn(), 'MoviesSeen')

dElement['moviesSeen'].textContent = String(moviesSeenCounter);
dElement['moviesCounter'].textContent = String(moviesCounter);


let formState = {
    id: new Date().getUTCMilliseconds(),
    title: '',
    year: '',
    genre: '',
    summary: '',
    seen: 'F'
}


const formVerification = () => {
    const titleVerification = () => store.get().filter(item => item.title === formState.title);
    console.log(titleVerification())
    if (formState.title === '' ||
        formState.year === '' ||
        formState.genre === '' ||
        formState.summary === '') {
        document.querySelector("form p").textContent = "You cant send form with empty field"
    } else if (String(formState.year).length !== 4) {
        document.querySelector("form p").textContent = "The year field must contain 4 characters"

    } else if (titleVerification().length !== 0) {
        document.querySelector("form p").textContent = "Movie with that name already exists"

    } else {
        document.querySelector("form p").textContent = ''
    }
}


const addForm = () => {
    const form = document.createElement('form');
    let itemChildListItem;

    const appendChild = (tagName, innerHTML, placeholder, listener, type) => {
        itemChildListItem = document.createElement(tagName)
        itemChildListItem.innerHTML = innerHTML;
        placeholder ? itemChildListItem.placeholder = placeholder : null;
        type ? itemChildListItem.type = type : null;

        if (listener === 'click') {
            itemChildListItem.addEventListener('click', function (e) {
                e.preventDefault()
                formVerification()
                let error = document.querySelector("form p").textContent;

                if (error === '') {
                    formState.id = new Date().getUTCMilliseconds();
                    store.set(formState)
                    setCounterOfTo(moviesCounter, store.get().length)
                    dElement['moviesCounter'].textContent = String(moviesCounter);
                    document.querySelectorAll("input").forEach(item => {
                        item.value = ''
                    })
                }
            })
        }

        if (listener === 'change') {
            itemChildListItem.addEventListener('input', function (e) {
                const {value} = e.target;
                placeholder === 'title' ? formState.title = value : null;
                placeholder === 'year' ? formState.year = Number(value) : null;
                placeholder === 'genre' ? formState.genre = value : null;
                placeholder === 'summary' ? formState.summary = value : null;

            })
        }
        form.appendChild(itemChildListItem);
    }

    appendChild('h1', 'Add film');
    appendChild('input', formState.title, 'title', 'change', 'text');
    appendChild('input', formState.year, 'year', 'change', 'number');
    appendChild('input', formState.genre, 'genre', 'change', 'text');
    appendChild('input', formState.summary, 'summary', 'change', 'text');
    appendChild('p', '');
    appendChild('button', 'SAVE', null, 'click');
    dElement['container'].appendChild(form);
}


addForm()

