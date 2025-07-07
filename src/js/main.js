// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

//added sidechain 
import Sidechain from '@nprapps/sidechain';
import { transform } from 'async';
const guest = Sidechain.registerGuest({ sentinel: 'st' });

guest.sendMessage({
  type: 'analytics',
  eventCategory: 'interaction',
  eventAction: 'click',
  eventLabel: 'etc'
})
//end sidechain



// This all needs to be in a function that recalculates all variables when window is resized
function horizontalScroller(){
    //These vars help us determine how long our invisible scroll container needs to be for us to see the whole graphic on any screen
  let windowWidth = window.innerWidth;
  let horizontalLength = document.querySelector(".graphic-wrapper").scrollWidth; //  how wide the graphic is

  console.log("horizontalLength of graphic-wrapper:", horizontalLength)

  let distFromTop = document.querySelector(".horizontal-section").offsetTop; // how far the horizontal section is from page top

  console.log("horizontal section distFromTop:", distFromTop)

  // Dynamically calculate scroll distance based on viewport width (smaller screen width means you have to scroll more to see whole graphic. Must subtract windowWidth, otherwise the graphic will scroll all the way off the page and you'll see white. We want to stop when right edge of graphic reaches right edge of viewport.)
  let scrollLength = (horizontalLength *1.1) - windowWidth // length of graphic
  let scrollDistance = distFromTop +  scrollLength; // length from top + graphic 
  let scrollHeight = scrollLength +window.innerHeight;

 document.querySelector(".horizontal-section").style.height = scrollHeight  +  "px" 
  // console.log("scrollyContainerHeight needed:", scrollyContainerHeight)

  window.onscroll = function(){
  let scrollTop = window.pageYOffset
  console.log("window Y offset is:", scrollTop)
  // As soon as we have scrolled down (scrollTop) to where the graphic is (distFromTop), start moving the graphic-wrapper left. Stop moving it left once we have reached the end of the graphic (ie the end of scrolldistance)
  if (scrollTop >= distFromTop && scrollTop < scrollDistance){
    document.querySelector(".graphic-wrapper").style.transform= "translateX(-"+(scrollTop-distFromTop)+"px)";
  }
}
}



window.onload = horizontalScroller;
window.addEventListener("resize", horizontalScroller);
