$(function () {
    console.log("Let's get ready to party with jQuery!")
});

$('img').addClass('image-center');

$('p').last().remove();

let randomSize = Math.random() * 100;

$('#title').css('font-size', randomSize);

$('ol').append('<li>SpringBoard jQuery Practice</li>')

$('aside').empty().append('<p>I apologize for the weird list</p>');

const $inputs = $('input');

$('body').css('background-color', `rgb(${$inputs[0].value}, ${$inputs[1].value}, ${$inputs[2].value})`)

$('img').on('click', (e) => {
    e.target.remove();
})

