const $inputs = $('input');
const $form = $('form');
const $movieList = $('#movie-list');


$form.submit((e) => {
    e.preventDefault();
    
    if($inputs[0].value === '' || $inputs[1].value === ''){
        return;
    } else {
        $('ul')
        .append(
            `<li><strong>Movie:</strong> ${$inputs[0].value} <br>
            <strong>Rating:</strong> <span>${$inputs[1].value}</span>
            <br><button type="submit" class="remove">Remove</button></li>`
            )
        }
    
    $form.trigger('reset');
})


$movieList.on('click', '.remove', function() {
    $(this).parent().remove();
})

$('#alphabet').click(() => {
    $movieList.children().detach().sort(function(a, b) {
      return $(a).text().localeCompare($(b).text());
    }).appendTo($movieList);  
})

$('#numbers').click(() => {
    // console.log($movieList.find('li').detach().find('span').parent('li'));
    $movieList.find('li').find('span').sort(function(a, b) {
        if($(a).text().localeCompare($(b).text()) === 1){
            return $(a).parent();
        } else {
            return $(b).parent();
        }
      }).appendTo($movieList);  
})


 

