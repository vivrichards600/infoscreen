<html>
<head>
	<title>Unit4 Info Screen</title>
	<link rel="stylesheet" type="text/css" href="styles.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>


</head>
<body>

	<div id="header">
		<a href="private.php"><img src="http://cdn.unit4.hosting.us.onehippo.com/binaries/content/gallery/unit4/brand/unit4_logo.png" /></a>
		
		
	</div>
    <div id="container">
        <div id="slides">
		
		<?php include 'slides.php'; ?>
		</div>
        

    </div>
	<div class="color cf">							 <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
	</div>
	
    <div id="messages">
		<?php include 'messages.php'; ?>	
	</div> 
	<script src="scripts/initialise.js"></script>
</body>
</html>