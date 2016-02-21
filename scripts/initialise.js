$('#messages').load('messages.php');
$('#slides').load('slides.php');
$(document).ready(
	function() {
		setInterval(function() {
		   $('#messages').load('messages.php');
		   $('#slides').load('slides.php');
		 }, 60000);
	});