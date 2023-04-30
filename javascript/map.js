"use strict";
(function() {

	window.addEventListener("load", init);
  window.addEventListener("resize", drawPaths);

	function init() {
    drawPaths();
    addHighlightOnMouseOver("honors-label", ".honors-course", "pink-highlight");
    addHighlightOnMouseOver("teaching-label", ".teaching", "red-highlight");
    addHighlightOnMouseOver("research-label", ".research", "orange-highlight");
    addHighlightOnMouseOver("impact-label", ".impact", "yellow-highlight");
    addHighlightOnMouseOver("work-label", ".work", "green-highlight");
    addHighlightOnMouseOver("cs-classes-label", ".cs-course", "blue-highlight");
    addHighlightOnMouseOver("misc-label", ".misc", "purple-highlight");

	}

  function drawPaths() {
    const horizontalCanvases = document.querySelectorAll(".horizontal-canvas");
    horizontalCanvases.forEach(drawHorizontal)
    const upperRightCanvases = document.querySelectorAll(".up-right-canvas");
    upperRightCanvases.forEach(drawUpRightCanvas);
    const lowerRightCanvases = document.querySelectorAll(".down-right-canvas");
    lowerRightCanvases.forEach(drawLowerRightCanvas);
  }

  function drawLowerRightCanvas(canvas) {
    canvas.height = 100
    canvas.width = Math.max(0.05*screen.width, 50);
    const ctx = canvas.getContext("2d");

    // Dashed line
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
  }

  function drawUpRightCanvas(canvas) {
    canvas.height = 100
    canvas.width = Math.max(0.05*screen.width, 50);
    const ctx = canvas.getContext("2d");

    // Dashed line
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, 0);
    ctx.stroke();
  }

  function drawHorizontal(canvas) {
    canvas.height = 100;
    canvas.width = Math.max(0.1*screen.width, 50);
    const ctx = canvas.getContext("2d");

    // Dashed line
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(0, 50);
    ctx.lineTo(canvas.width, 50);
    ctx.stroke();
  }

  function addHighlightOnMouseOver(label, className, highlight) {
		document.getElementById(label).addEventListener("mouseenter", function() {
      document.querySelectorAll(className).forEach(function(ele) {
        ele.classList.add(highlight);
      });
    });
    document.getElementById(label).addEventListener("mouseout", function() {
      document.querySelectorAll(className).forEach(function(ele) {
        ele.classList.remove(highlight);
      });
    });
  }

	// other functions you may define
})();
