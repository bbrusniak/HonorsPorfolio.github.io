"use strict";
(function() {

	window.addEventListener("load", init);

  const QUARTER_IMG_TIMERS = new Map(); // Maps from a quarter to its setInterval timerId
  const QUARTER_IMG_NUM = new Map(); // Maps from a quarter to its current image index
  const QUARTER_IMGS = new Map();

	function init() {
    setUpImageMap();
    addCarousels();
    addClick();
	}

  function setUpImageMap() {
    const AU_19_IMAGE_NAMES = ["Colliseum.jpg", "barry_bee_benson.jpg", "Raccoons.jpg"];
    QUARTER_IMGS.set("19AU", AU_19_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("19AU", 0);
    QUARTER_IMG_TIMERS.set("19AU", null);

    const WI_20_IMAGE_NAMES = ["EmptyDorm.jpg", "NewYork.jpg"];
    QUARTER_IMGS.set("20WI", WI_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20WI", 0);
    QUARTER_IMG_TIMERS.set("20WI", null);

    const SP_20_IMAGE_NAMES = ["332_Screenshot.jpg", "TA_Application.jpg"];
    QUARTER_IMGS.set("20SP", SP_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20SP", 0);
    QUARTER_IMG_TIMERS.set("20SP", null);
  }

  function addClick() {
    let quarters = document.querySelectorAll("#map .quarter");
    console.log(quarters);
    quarters.forEach(e => {
        e.addEventListener("click", () => {
          console.log("hello");
          e.querySelector(".quarter-summary").classList.remove("hide");
          e.querySelector(".quarter-summary").classList.add(".show-list");
          e.querySelector("img").classList.add("hide");
          e.querySelector("img + div").classList.add("hide");
      });
    });
  }

  function addCarousels() {
    let quarters = document.querySelectorAll("#map .quarter");
    quarters.forEach(e => {
      let quarterImage = e.querySelector("img");
      let quarter = e.querySelector("div").textContent;
      e.addEventListener("mouseenter", () => {startCarousel(quarterImage, quarter)});
      e.addEventListener("mouseleave", () => {pauseCarousel(quarter)});
    });
  }

  function startCarousel(quarterImage, quarter) {
    if(!QUARTER_IMG_TIMERS.get(quarter)) {
      getNextImage(quarterImage, quarter);
      let timerId = setInterval(getNextImage, 1000, quarterImage, quarter);
      QUARTER_IMG_TIMERS.set(quarter, timerId);
    }
  }

  function getNextImage(quarterImage, quarter) {
    let currCount = QUARTER_IMG_NUM.get(quarter) + 1;
    let images = QUARTER_IMGS.get(quarter);
    currCount = (currCount % images.length);
    QUARTER_IMG_NUM.set(quarter, currCount);
    quarterImage.src = "images/" + quarter + "/" + images[currCount];
  }

  function pauseCarousel(quarter) {
    if (QUARTER_IMG_TIMERS.get(quarter)) {
      clearInterval(QUARTER_IMG_TIMERS.get(quarter));
      QUARTER_IMG_TIMERS.set(quarter, null);
    }
  }

	// other functions you may define
})();
