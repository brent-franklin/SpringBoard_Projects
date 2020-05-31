
//SELECTING FORM AND UL
const myForm = document.querySelector('form');
const list = document.querySelector('#list');



// RETRIEVE ITEMS FROM LOCALSTORAGE
const localItems = JSON.parse(localStorage.getItem('todos')) || [];


for(let i = 0; i<localItems.length; i++){
    let localItem = document.createElement("li");
    const remove = document.createElement('button');
    remove.innerText = 'Mark Complete';
    localItem.innerText = localItems[i].todo;
    localItem.isCompleted = localItems[i].isCompleted ? true : false;
    if (localItem.isCompleted) {
        localItem.classList.toggle('strike')
        remove.innerText = "Remove";
      }

    list.appendChild(localItem);
    list.appendChild(remove);

    if (remove.innerText === 'Remove'){
        let undo = document.createElement('button');
        undo.innerText = 'Undo';
        remove.insertAdjacentElement('afterend', undo);
    }
};



//EVENT LISTENER ON FORM BUTTOM
myForm.addEventListener('submit', function(e){
    e.preventDefault();
    //CREATING LIST ITEMS FOR TODO W/ BUTTONS
    const newLi = document.createElement('li');
    const item = document.querySelector('input[name="list-item"]');
    const remove = document.createElement('button');
    remove.innerText = 'Mark Complete';
    newLi.innerText = item.value;
    newLi.isCompleted = false;
    
  
    // SAVE TO LOCALSTORAGE
    if(item.value !== ''){
        list.appendChild(newLi);
        list.appendChild(remove);
        localItems.push({ todo: newLi.innerText, isCompleted: false });
        localStorage.setItem("todos", JSON.stringify(localItems));
    }else {
        alert('PLEASE ENTER A TASK');
    }

    myForm.reset();
});




//EVENT LISTENER FOR NEW BUTTON ON TODO ITEMS
list.addEventListener('click', function(e){
    let newIsCompleted = JSON.parse(localStorage.todos);
    switch(e.target.innerText){
        case 'Mark Complete':
            const undo = document.createElement('button');
            undo.innerText = 'Undo';
            let clicked = e.target.previousElementSibling;
            clicked.classList.toggle('strike');
            clicked.isCompleted = true;
            e.target.innerText = 'Remove';
            e.target.insertAdjacentElement('afterend', undo);

            for(let i = 0; i<localItems.length; i++){
                if(localItems[i].todo === clicked.innerText){
                    localItems[i].isCompleted = clicked.isCompleted;
                    localStorage.setItem("todos", JSON.stringify(localItems));
                }
            }
            
        break;
        case 'Remove':
            e.target.previousElementSibling.remove();
            e.target.nextElementSibling.remove();
            e.target.remove();
            //REMOVE ITEM FROM LOCAL STORAGE
            for(let i = 0; i<localItems.length; i++){
                if(localItems[i].isCompleted === true){
                    localItems.splice(i, 1);
                    localStorage.setItem("todos", JSON.stringify(localItems));
                }
            }
        break;
        case 'Undo':
            e.target.previousElementSibling.innerText = 'Mark Complete';
            e.target.previousElementSibling.previousElementSibling.classList.toggle('strike');
            e.target.remove();
            // UNSTRIKE TEXT IN LOCALSTORAGE + SWITCH TO .ISCOMPLETED FALSE
            for(let i = 0; i<localItems.length; i++){
                if(localItems[i].isCompleted === true){
                    localItems[i].isCompleted = false;
                    localStorage.setItem("todos", JSON.stringify(localItems));
                }
            }
        break;
}});