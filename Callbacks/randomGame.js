function randomGame(){
    let count = 1;
    let num = setInterval(function(){
        let randomNum = Math.random();
        if(randomNum>0.75){
            clearInterval(num);
            console.log("The number of attempts was " + count);
        }else{
            console.log(count);
            count++;
        }
    }, 1000);
}

randomGame();