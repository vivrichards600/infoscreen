
var messageDivs = $('div[id^="message-"]').hide(),
	currentMessageDivIndex = 0;

(function cycle() {

	messageDivs.eq(currentMessageDivIndex).fadeIn(300)
			  .delay(5000)
			  .fadeOut(300, cycle);

	currentMessageDivIndex = ++currentMessageDivIndex % messageDivs.length;

})();