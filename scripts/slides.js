var slideDivs = $('div[id^="slide-"]').hide(),
	currentSlideDivIndex = 0;

(function cycle() {

	slideDivs.eq(currentSlideDivIndex).fadeIn(200)
			  .delay(10000)
			  .fadeOut(200, cycle);

	currentSlideDivIndex = ++currentSlideDivIndex % slideDivs.length;

})();





