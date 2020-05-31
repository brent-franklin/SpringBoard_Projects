// grab form and stop autocomplete
const myForm = document.querySelector('#myForm');
const memeList = document.querySelector('#formContainer');
myForm.autocomplete = 'off';

myForm.addEventListener('submit', function(e){
    e.preventDefault();
    // Create new divs with image, two text fields, and capture form info
    const imgLink = document.querySelector('input[name="images"]').value;
    const headerSource = document.querySelector('input[name="header"]').value;
    const footerSource = document.querySelector('input[name="footer"]').value;
    const newImage = document.createElement('img');
    const newDiv = document.createElement('div');
    const newP1 = document.createElement('div');
    const newP2 = document.createElement('div');

    // if feilds are empty alert
    if(imgLink === '' || headerSource === '' || footerSource === ''){
        alert('Please Complete All 3 Text Feilds')
        return;
    }
  
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