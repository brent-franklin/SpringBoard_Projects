const body = document.querySelector("body");
 
body.addEventListener("mousemove", function(e){
  const r = Math.round(e.pageX*255 / window.innerWidth);
  const g = Math.round(e.pageY*255 / window.innerWidth);
  const b = Math.round(e.screenX*255 / screen.availWidth);
  const o = Math.round(e.screenY*255 / screen.availHeight);;
  body.style.backgroundColor = `rgba(${r},${g},${b},${o})`;
});
 