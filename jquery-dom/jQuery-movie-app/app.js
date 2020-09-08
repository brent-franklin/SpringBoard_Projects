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
            `<li
            data-title="${$inputs[0].value}" 
            data-rating="${$inputs[1].value}">
            <strong>Movie:</strong> <span>${$inputs[0].value}</span> <br>
            <strong>Rating:</strong> <span>${$inputs[1].value}</span> <br>
            <button type="submit" class="remove">Remove</button></li>`
            )
        }
    
    $form.trigger('reset');
})


$movieList.on('click', '.remove', function() {
    $(this).parent().remove();
})



$('#alphabet').on('click',function(){
    
    if($(this).text() === "Sort A-Z"){
    const alphArr = [...document.querySelectorAll('[data-title]')].sort(function(a, b){
        const aData = (a.dataset.title).toLowerCase();
        const bData = (b.dataset.title).toLowerCase();
            return (aData < bData) ? -1 : (aData > bData) ? 1 : 0;
    })
        $movieList.empty().append(alphArr);
    } else { 
        const reverseArr = [...$movieList.children()].reverse();
        $movieList.empty().append(reverseArr);
    }

    $(this).text() === "Sort A-Z" ? $(this).text('Sort Z-A') : $(this).text('Sort A-Z');
});



$('#numbers').on('click',function(){
    if($(this).text() === "Sort Rate-->"){
        const alphArr = [...document.querySelectorAll('[data-title]')].sort(function(a, b){
            const aData = parseInt(a.dataset.rating);
            const bData = parseInt(b.dataset.rating);
                return (aData < bData) ? -1 : (aData > bData) ? 1 : 0;
        })
            $movieList.empty().append(alphArr);
        } else { 
            const reverseArr = [...$movieList.children()].reverse();
            $movieList.empty().append(reverseArr);
        }
    
        $(this).text() === "Sort Rate-->" ? $(this).text('<--Sort Rate') : $(this).text('Sort Rate-->');
    });
