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
    const AU_19_IMAGE_NAMES = ["Colliseum.jpg", "full_group_last_day.jpg", "colliseum_group.jpg", "fountain.jpg"];
    QUARTER_IMGS.set("19AU", AU_19_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("19AU", 0);
    QUARTER_IMG_TIMERS.set("19AU", null);

    const WI_20_IMAGE_NAMES = ["EmptyDorm.jpg", "NewYork.jpg", "Toms.jpg", "311_Proof.jpg"];
    QUARTER_IMGS.set("20WI", WI_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20WI", 0);
    QUARTER_IMG_TIMERS.set("20WI", null);

    const SP_20_IMAGE_NAMES = ["home.jpg", "332_Screenshot.jpg", "TA_Application.jpg"];
    QUARTER_IMGS.set("20SP", SP_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20SP", 0);
    QUARTER_IMG_TIMERS.set("20SP", null);

    const SU_20_IMAGE_NAMES = ["campsite.PNG", "camping.jpg", "poker_now.jpg", "ghost_pacer_setup.jpg", "kickstarter.jpg"];
    QUARTER_IMGS.set("20SU", SU_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20SU", 0);
    QUARTER_IMG_TIMERS.set("20SU", null);

    const AU_20_IMAGE_NAMES = ["bomb_lab.jpg", "Calendar.jpg", "TA_Graduation.PNG"];
    QUARTER_IMGS.set("20AU", AU_20_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("20AU", 0);
    QUARTER_IMG_TIMERS.set("20AU", null);

    const WI_21_IMAGE_NAMES = ["snow_backyard.PNG", "uw_snow.jpg", "docks.jpg"];
    QUARTER_IMGS.set("21WI", WI_21_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("21WI", 0);
    QUARTER_IMG_TIMERS.set("21WI", null);

    const SP_21_IMAGE_NAMES = ["ML_Graph.JPG", "CSE333_Image.jpg", "Sophie_Nature.jpg"];
    QUARTER_IMGS.set("21SP", SP_21_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("21SP", 0);
    QUARTER_IMG_TIMERS.set("21SP", null);

    const SU_21_IMAGE_NAMES = ["mountain.jpg", "benji_couch.jpg", "taco_bell.jpg"];
    QUARTER_IMGS.set("21SU", SU_21_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("21SU", 0);
    QUARTER_IMG_TIMERS.set("21SU", null);

    const AU_21_IMAGE_NAMES = ["house_poker.jpg", "mac_and_cheetos.jpg", "football_score.jpg"];
    QUARTER_IMGS.set("21AU", AU_21_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("21AU", 0);
    QUARTER_IMG_TIMERS.set("21AU", null);

    const WI_22_IMAGE_NAMES = ["Detlef_Clash_Meme.jpg", "amazon_view.jpg", "angela_josh_jame_cook.jpg"];
    QUARTER_IMGS.set("22WI", WI_22_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("22WI", 0);
    QUARTER_IMG_TIMERS.set("22WI", null);

    const SP_22_IMAGE_NAMES = ["on_poles.jpg", "bridge_boys.jpg", "154_Final_Exam.jpg"];
    QUARTER_IMGS.set("22SP", SP_22_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("22SP", 0);
    QUARTER_IMG_TIMERS.set("22SP", null);

    const SU_22_IMAGE_NAMES = ["monitors.jpg", "gas_station.jpg", "mamma_melina.jpg"];
    QUARTER_IMGS.set("22SU", SU_22_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("22SU", 0);
    QUARTER_IMG_TIMERS.set("22SU", null);

    const AU_22_IMAGE_NAMES = ["dawg_dash.JPG", "halloween.jpg", "gingerbread.jpg"];
    QUARTER_IMGS.set("22AU", AU_22_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("22AU", 0);
    QUARTER_IMG_TIMERS.set("22AU", null);

    const WI_23_IMAGE_NAMES = ["skiing.JPG", "pies.jpg", "dubs.jpg"];
    QUARTER_IMGS.set("23WI", WI_23_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("23WI", 0);
    QUARTER_IMG_TIMERS.set("23WI", null);

    const SP_23_IMAGE_NAMES = ["cherry_blossom.jpg", "beths.jpg", "painting.jpg", "154Photo.JPG"];
    QUARTER_IMGS.set("23SP", SP_23_IMAGE_NAMES);
    QUARTER_IMG_NUM.set("23SP", 0);
    QUARTER_IMG_TIMERS.set("23SP", null);
  }

  function addClick() {
    let quarters = document.querySelectorAll("#map .quarter");
    quarters.forEach(e => {
      let quarterSummary = e.querySelector(".quarter-summary");
      let closeButton = e.querySelector(".quarter-summary button");
      let quarterImage = e.querySelector("img");
      let quarterName = e.querySelector("img + div");
      e.addEventListener("click", () => {
        if(quarterSummary.classList.contains("close-button-clicked")) {
          quarterSummary.classList.remove("close-button-clicked");
        } else {
          if (quarterSummary) {
            quarterSummary.classList.remove("hide");
            quarterSummary.classList.add("show-list");
          }
          quarterImage.classList.add("hide");
          quarterName.classList.add("hide");
        }
      });
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          quarterSummary.classList.remove("show-list");
          quarterSummary.classList.add("hide");
          quarterSummary.classList.add("close-button-clicked");
          quarterImage.classList.remove("hide");
          quarterName.classList.remove("hide");
          e.removeEventListener("click");
        });
      }
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
