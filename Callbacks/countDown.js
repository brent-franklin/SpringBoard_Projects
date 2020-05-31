function countDown(num){
    let count = setInterval(function(){
      if(num <= 0){
        clearInterval(count);
        console.log('DONE!');
      }
      else {
        console.log(num);
      }
      num--;
    },1000)
  }
  
  countDown(5);