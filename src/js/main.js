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
  // let windowWidth = window.innerWidth;
  let horizontalSection = document.querySelector(".horizontal-section")
  // let wordpressWrapper = document.querySelector(".custom-html.embed-container.mv-4") // may need this because WP wrapper isn't 100vw? thought I could use sticky-wrapper as proxy for custom-html.embed-container div but not working
  let distFromTop = horizontalSection.getBoundingClientRect().top + window.scrollY;
  let horizontalLength = document.querySelector(".graphic-wrapper").scrollWidth; //  how wide the graphic is

  // Dynamically calculate scroll distance based on viewport width (smaller screen width means you have to scroll more to see whole graphic. Must subtract windowWidth, otherwise the graphic will scroll all the way off the page and you'll see white. We want to stop when right edge of graphic reaches right edge of viewport.)
  let scrollLength = (horizontalLength *1.05) - horizontalSection.offsetWidth // length of graphic
  let scrollDistance = distFromTop +  scrollLength; // length from top + graphic 
  let scrollHeight = scrollLength + window.innerHeight;

  horizontalSection.style.height = scrollHeight  +  "px" 

  window.onscroll = function(){
  let scrollTop = window.scrollY;
  let graphicScroller = document.querySelector(".graphic-wrapper");

    // As soon as we have scrolled down (scrollTop) to where the graphic is (distFromTop), start moving the graphic-wrapper left. Stop moving it left once we have reached the end of the graphic (ie the end of scrolldistance)
  if (scrollTop < distFromTop) {
      graphicScroller.style.transform = "translateX(0px)";
  } else if (scrollTop >= distFromTop && scrollTop < scrollDistance){
    document.querySelector(".graphic-wrapper").style.transform= "translateX(-"+(scrollTop-distFromTop)+"px)";
  }

}
}



window.addEventListener("load", () => {
  setTimeout(horizontalScroller, 100); // give WP a sec to finish layout
});

window.addEventListener("resize", horizontalScroller);
