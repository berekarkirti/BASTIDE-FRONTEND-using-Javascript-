//------------------------------------------------total code for index.html file-----------------------------------------------------------------------------------
// head-slider
const slidingText = document.getElementById("sliding-text");
const sentences = slidingText.innerHTML.split(" | ");
let sentenceIndex = 0;

function slideText() {
  const maxWidth = window.innerWidth - slidingText.clientWidth;
  let currentPosition = 0;
  // console.log(maxWidth);

  const slideInterval = setInterval(() => {
    if (currentPosition <= maxWidth) {
      slidingText.style.left = currentPosition + "px";
      currentPosition += 10;
    }
    else {
      clearInterval(slideInterval);
      setTimeout(() => {
        slidingText.style.left = "0px";
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        slidingText.innerHTML = sentences[sentenceIndex];
        setTimeout(slideText, 2000);
      }
        , 1000);
    }
  }, 10);
}
slideText();

// product-slider
$(document).ready(function () {
  $('.products-slider').slick({
    slidesToShow: 4, // Number of slides to show
    slidesToScroll: 5, // Number of slides to scroll
    autoplay: true, // Autoplay enabled
    autoplaySpeed: 2000, // Autoplay speed in milliseconds
    dots: true, // Show dots navigation
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 8
        }
      }
    ]
  });
});

// get button:-
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");

// SORTING PART low to high

sortAtoZBtn.addEventListener("click", () => {

  const sortAtoZdata = productdata.sort((a, b) => a.price - b.price)
  Cardlist(sortAtoZdata)

})

// SORTING PART high to low

sortZtoABtn.addEventListener("click", () => {

  const sortZtoAdata = productdata.sort((a, b) => b.price - a.price)
  Cardlist(sortZtoAdata)

})
