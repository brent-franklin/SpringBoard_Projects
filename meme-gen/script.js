/*// grab form and stop autocomplete
const myForm = document.querySelector('#myForm');
const memeList = document.querySelector('#formContainer');
myForm.autocomplete = 'off';

myForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    // if feilds are empty alert
    if(imgLink === '' || headerSource === '' || footerSource === ''){
        return alert('Please Complete All 3 Text Feilds');
    }

    // Create new divs with image, two text fields, and capture form info
    const imgLink = document.querySelector('input[name="images"]').value;
    const headerSource = document.querySelector('input[name="header"]').value;
    const footerSource = document.querySelector('input[name="footer"]').value;
    const newImage = document.createElement('img');
    const newDiv = document.createElement('div');
    const newP1 = document.createElement('div');
    const newP2 = document.createElement('div');
  
    // add form info to created divs
    newImage.src = imgLink;             
    newDiv.classList = 'memeContainer';
    newP1.innerText = headerSource;
    newP1.classList = 'top';
    newP2.innerText = footerSource;
    newP2.classList = 'bottom';

    // control size of images
    if(newImage.width > 500) {
        newDiv.width = newImage.width = '500px';
    } else if(newImage.width < 400) {
        newImage.style.width = newDiv.style.width = '400px';
    }else{
        newDiv.width = newImage.width;
    };

    // combine divs under one container
    newDiv.appendChild(newP1);
    newDiv.appendChild(newP2);
    newDiv.appendChild(newImage);
    
    // add ability to remove from page
    newImage.addEventListener('click', function(e){
        e.target.parentNode.remove();
        e.target.previousElementSibling.remove();
        e.target.nextElementSibling.remove();
        e.target.remove();
    })

    // add container and contents to DOM
    memeList.appendChild(newDiv);

    // animate the opacity when the new div is added.
    newDiv.animate([{opacity:0},{opacity:1}], 2000);
    
    
    myForm.reset();

});
*/

const myForm = document.querySelector('#myForm');
const memeList = document.querySelector('#formContainer');
myForm.autocomplete = 'off';

myForm.addEventListener('submit', function(e){
    e.preventDefault();
    
    // Create new divs with image, two text fields, and capture form info
    const imgLink = document.querySelector('input[name="images"]').value;
    const headerSource = document.querySelector('input[name="header"]').value;
    const footerSource = document.querySelector('input[name="footer"]').value;
    const color = document.querySelector("#myList").value;
    const newImage = document.createElement('img');
    const newDiv = document.createElement('div');
    const newP1 = document.createElement('div');
    const newP2 = document.createElement('div');
    const newColor = document.createElement('div')

    
    // if feilds are empty alert
    if(imgLink === ''){
        return alert('Please Include Image URL/Image Location');
    } 
    
    if(headerSource === '' && document.getElementById("hInclude").checked){
        return alert('Please Include Header or Uncheck "Add Header"');
    }

    if(footerSource === '' && document.getElementById("fInclude").checked){
        return alert('Please Include Footer or Uncheck "Add Footer"');
    }

  
    // add form info to created divs
    newImage.src = imgLink;             
    newDiv.classList = 'memeContainer';

    if(document.getElementById('hOuter').checked){
        newP1.innerText = headerSource;
        newP1.classList = 'topOuter';
    }else {
        newP1.innerText = headerSource;
        newP1.classList = 'top';
    }

    if(document.getElementById('fOuter').checked){
        newP2.innerText = footerSource;
        newP2.classList = 'bottomOuter';
    }else {
        newP2.innerText = footerSource;
        newP2.classList = 'bottom';
    }
    
    if(color !== 'None'){
        newColor.style.backgroundColor = color;
        newColor.classList = 'color';
    }


    // control size of images
    if(newImage.width > 500) {
        newDiv.width = newImage.width = '500px';
    } else if(newImage.width < 400) {
        newImage.style.width = newDiv.style.width = '400px';
    }else{
        newDiv.width = newImage.width;
    };


    // combine divs under one container
    newDiv.appendChild(newP1);
    newDiv.appendChild(newImage);
    newDiv.appendChild(newP2);
    newDiv.appendChild(newColor)

    
    // add ability to remove from page
    newImage.addEventListener('click', function(e){
        e.target.parentNode.remove();
        e.target.previousElementSibling.remove();
        e.target.nextElementSibling.remove();
        e.target.remove();
    })


    // add container and contents to DOM
    memeList.appendChild(newDiv);


    // animate the opacity when the new div is added.
    newDiv.animate([{opacity:0},{opacity:1}], 2000);
    
    
    myForm.reset();

});