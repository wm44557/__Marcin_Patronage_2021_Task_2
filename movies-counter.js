
export let moviesCounter = 0;
export let moviesSeenCounter = 0;

export function setCounterOfTo(element,value,type='MC') {
    type === 'MC'? moviesCounter = value:moviesSeenCounter = value;

}



