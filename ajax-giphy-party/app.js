const gifForm = document.getElementById('gif-form');
const gifInput = document.getElementById('gif-input');
const clearBtn = document.getElementById('clear-btn');
const gifContainer = document.getElementById('gif-container');
const gifArr = document.querySelector('.gif-arr');

async function gifAPI(e) {
    e.preventDefault();
    const gifRequest = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${gifInput.value}&api_key=9YTX24I4R0FdI5mLKdVfZsqLIabzJ3Lf`);
    const apiList = gifRequest.data.data;
    gifListFunc(apiList);
    gifInput.value = '';
}

function newGif(params) {
    const newGif = document.createElement('video');
    newGif.autoplay = true;
    newGif.loop = true;
    newGif.src = params;
    newGif.classList = 'gif hide';
    return newGif;
}

function gifListFunc(params) {
    const gifList = document.createElement('ul');
    const leftArrow = document.createElement('div');
    const rightArrow = document.createElement('div');
    
    const heading = document.createElement('h2');
    heading.innerText = `"${gifInput.value}"`;
    gifContainer.append(heading);


    gifList.className = 'gif-arr';
    leftArrow.className = 'left';
    rightArrow.className = 'right';

    gifList.append(leftArrow);
    createCards(params, gifList);
    gifList.append(rightArrow);

    gifList.firstElementChild.nextElementSibling.lastElementChild.classList.toggle('hide');
    gifContainer.append(gifList);
}

function createCards(params, gifList) {
    for (const gifs of params) {
        const gif = gifs.images.looping.mp4;
        const newCard = document.createElement('li');
        newCard.classList = 'card';
        newCard.append(newGif(gif))
        gifList.append(newCard);
    }
    return gifList;
}

gifForm.addEventListener('submit', gifAPI);

clearBtn.addEventListener('click', () => gifContainer.innerHTML = '');


gifContainer.addEventListener('click', (e) => {
    let gifStack = [...e.target.parentElement.children];
    gifStack.pop();
    gifStack.shift();

    
    if(e.target.classList.value === 'right'){
        for (const gif of gifStack) {
            if(gif.lastElementChild.classList.value === 'gif'){
                if(gif.nextElementSibling.lastElementChild.classList === null){
                    return;
                }
                gif.lastElementChild.classList = 'gif hide';
                gif.nextElementSibling.lastElementChild.classList = 'gif';
                return;
            }
        }
    }

    if(e.target.classList.value === 'left'){
        for (const gif of gifStack) {
            if(gif.lastElementChild.classList.value === 'gif'){
                if(gif.previousElementSibling.lastElementChild.classList === null){
                    return;
                }
                gif.lastElementChild.classList = 'gif hide';
                gif.previousElementSibling.lastElementChild.classList = 'gif';
                return;
            }
        }
    }

})