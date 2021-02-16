export let moviesCounter = 0;
export let moviesSeenCounter = 0;

export default function setCounterOfTo(element, value, type = 'moviesCounter') {
    type === 'moviesCounter' ? moviesCounter = value : moviesSeenCounter = value;
}



