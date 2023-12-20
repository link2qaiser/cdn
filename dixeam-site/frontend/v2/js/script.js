$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true
 });
 const accordionItemHeaders = document.querySelectorAll(
   ".accordion-item-header"
   );
 
 accordionItemHeaders.forEach((accordionItemHeader) => {
   accordionItemHeader.addEventListener("click", (event) => {
     // Uncomment in case you only want to allow for the display of only one collapsed item at a time!
 
     const currentlyActiveAccordionItemHeader = document.querySelector(
       ".accordion-item-header.active"
       );
     if (
       currentlyActiveAccordionItemHeader &&
       currentlyActiveAccordionItemHeader !== accordionItemHeader
       ) {
       currentlyActiveAccordionItemHeader.classList.toggle("active");
   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
 }
 accordionItemHeader.classList.toggle("active");
 const accordionItemBody = accordionItemHeader.nextElementSibling;
 if (accordionItemHeader.classList.contains("active")) {
   accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
 } else {
   accordionItemBody.style.maxHeight = 0;
 }
 });
 });
 
 // 
 // Model Box
 var openBtn = document.getElementById("openBtns");
 var modal = document.getElementById("myModalwq");
 var closeBtn = modal.querySelector(".close");
 
 // Open modal with fade-in effect
 openBtn.addEventListener("click", function() {
     modal.style.display = "block";
     setTimeout(function() {
      modal.style.opacity = "1";
  }, 10);
 });
 
 // Close modal with fade-out effect
 function closeModal() {
     modal.style.opacity = "0";
     setTimeout(function() {
      modal.style.display = "none";
  }, 300);
 }
 
 closeBtn.addEventListener("click", closeModal);
 
 window.addEventListener("click", function(event) {
     if (event.target === modal) {
      closeModal();
  }
 });
 //end modal
 
  // vars
 'use strict'
 var testim = document.getElementById("testim"),
 testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
 testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
 testimLeftArrow = document.getElementById("left-arrow"),
 testimRightArrow = document.getElementById("right-arrow"),
 testimSpeed = 4500,
 currentSlide = 0,
 currentActive = 0,
 testimTimer,
 touchStartPos,
 touchEndPos,
 touchPosDiff,
 ignoreTouch = 30;
 ;
 
 window.onload = function() {
 
     // Testim Script
     function playSlide(slide) {
         for (var k = 0; k < testimDots.length; k++) {
             testimContent[k].classList.remove("active");
             testimContent[k].classList.remove("inactive");
             testimDots[k].classList.remove("active");
         }
 
         if (slide < 0) {
             slide = currentSlide = testimContent.length-1;
         }
 
         if (slide > testimContent.length - 1) {
             slide = currentSlide = 0;
         }
 
         if (currentActive != currentSlide) {
             testimContent[currentActive].classList.add("inactive");            
         }
         testimContent[slide].classList.add("active");
         testimDots[slide].classList.add("active");
 
         currentActive = currentSlide;
         
         clearTimeout(testimTimer);
         testimTimer = setTimeout(function() {
             playSlide(currentSlide += 1);
         }, testimSpeed)
     }
 
     testimLeftArrow.addEventListener("click", function() {
         playSlide(currentSlide -= 1);
     })
 
     testimRightArrow.addEventListener("click", function() {
         playSlide(currentSlide += 1);
     })    
 
     for (var l = 0; l < testimDots.length; l++) {
         testimDots[l].addEventListener("click", function() {
             playSlide(currentSlide = testimDots.indexOf(this));
         })
     }
 
     playSlide(currentSlide);
 
     // keyboard shortcuts
     document.addEventListener("keyup", function(e) {
         switch (e.keyCode) {
         case 37:
             testimLeftArrow.click();
             break;
             
         case 39:
             testimRightArrow.click();
             break;
 
         case 39:
             testimRightArrow.click();
             break;
 
         default:
             break;
         }
     })
     
     testim.addEventListener("touchstart", function(e) {
         touchStartPos = e.changedTouches[0].clientX;
     })
     
     testim.addEventListener("touchend", function(e) {
         touchEndPos = e.changedTouches[0].clientX;
         
         touchPosDiff = touchStartPos - touchEndPos;
         
         console.log(touchPosDiff);
         console.log(touchStartPos); 
         console.log(touchEndPos); 
 
         
         if (touchPosDiff > 0 + ignoreTouch) {
             testimLeftArrow.click();
         } else if (touchPosDiff < 0 - ignoreTouch) {
             testimRightArrow.click();
         } else {
           return;
       }
       
   })
 }
 
 
 // Slider Testimonial
 'use strict'
 var testim = document.getElementById("testim"),
 testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
 testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
 testimLeftArrow = document.getElementById("left-arrow"),
 testimRightArrow = document.getElementById("right-arrow"),
 testimSpeed = 4500,
 currentSlide = 0,
 currentActive = 0,
 testimTimer,
 touchStartPos,
 touchEndPos,
 touchPosDiff,
 ignoreTouch = 30;
 ;
 
 window.onload = function() {
 
     // Testim Script
     function playSlide(slide) {
         for (var k = 0; k < testimDots.length; k++) {
             testimContent[k].classList.remove("active");
             testimContent[k].classList.remove("inactive");
             testimDots[k].classList.remove("active");
         }
 
         if (slide < 0) {
             slide = currentSlide = testimContent.length-1;
         }
 
         if (slide > testimContent.length - 1) {
             slide = currentSlide = 0;
         }
 
         if (currentActive != currentSlide) {
             testimContent[currentActive].classList.add("inactive");            
         }
         testimContent[slide].classList.add("active");
         testimDots[slide].classList.add("active");
 
         currentActive = currentSlide;
         
         clearTimeout(testimTimer);
         testimTimer = setTimeout(function() {
             playSlide(currentSlide += 1);
         }, testimSpeed)
     }
 
     testimLeftArrow.addEventListener("click", function() {
         playSlide(currentSlide -= 1);
     })
 
     testimRightArrow.addEventListener("click", function() {
         playSlide(currentSlide += 1);
     })    
 
     for (var l = 0; l < testimDots.length; l++) {
         testimDots[l].addEventListener("click", function() {
             playSlide(currentSlide = testimDots.indexOf(this));
         })
     }
 
     playSlide(currentSlide);
 
     // keyboard shortcuts
     document.addEventListener("keyup", function(e) {
         switch (e.keyCode) {
         case 37:
             testimLeftArrow.click();
             break;
             
         case 39:
             testimRightArrow.click();
             break;
 
         case 39:
             testimRightArrow.click();
             break;
 
         default:
             break;
         }
     })
     
     testim.addEventListener("touchstart", function(e) {
         touchStartPos = e.changedTouches[0].clientX;
     })
     
     testim.addEventListener("touchend", function(e) {
         touchEndPos = e.changedTouches[0].clientX;
         
         touchPosDiff = touchStartPos - touchEndPos;
         
         console.log(touchPosDiff);
         console.log(touchStartPos); 
         console.log(touchEndPos);   
 
         
         if (touchPosDiff > 0 + ignoreTouch) {
             testimLeftArrow.click();
         } else if (touchPosDiff < 0 - ignoreTouch) {
             testimRightArrow.click();
         } else {
             return;
         }
         
     })
 }
 
 