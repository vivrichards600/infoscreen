// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player('ytplayer', {
		height: '390',
		width: '640',
		autoplay: 1,
		videoId: 'y60wDzZt8yg',
		playerVars: { 'autoplay': 1,'controls': 1,'autohide':1,'wmode':'opaque' },
		events: {
			'onStateChange': function(e) {
				if (e.data == 0) {
				}
			}
		}
	});
}