<?php 
// Turn off all error reporting
error_reporting(0);
    // First we execute our common code to connection to the database and start the session 
    require("common.php"); 
     
    // At the top of the page we check to see whether the user is logged in or not 
    if(empty($_SESSION['user'])) 
    { 
        // If they are not, we redirect them to the login page. 
        header("Location: login.php"); 
         
        // Remember that this die statement is absolutely critical.  Without it, 
        // people can view your members-only content without logging in. 
        die("Redirecting to login.php"); 
    } 
     
    // Everything below this point in the file is secured by the login system 
     
    // We can display the user's username to them by reading it from the session array.  Remember that because 
    // a username is user submitted content we must use htmlentities on it before displaying it to the user. 
?> 

<html>
<head>
<!-- Basic Page Needs
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta charset="utf-8">
  <title>U4 Info Screen</title>
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- Mobile Specific Metas
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- FONT
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css">

  <!-- CSS
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  
  <link rel="stylesheet" href="css/admin.css">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/skeleton.css">

  <!-- Favicon
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link rel="icon" type="image/png" href="images/favicon.png">
	
	
  <!-- Scripts
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
    


</head>
<body>
<!-- .container is main centered wrapper -->
<div class="container">

  <!-- columns should be the immediate child of a .row -->

  <div class="row header">
          <div class="eight columns"><a href="index.php"><img src="http://cdn.unit4.hosting.us.onehippo.com/binaries/content/gallery/unit4/brand/unit4_logo.png" /></a><span style="color:#b0c641;font-weight:bold;">INFO SCREENS</span></div>
          <div class="four columns" style="padding-top:10px;text-transform:capitalize;">Welcome <?php echo htmlentities($_SESSION['user']['email'], ENT_QUOTES, 'UTF-8'); ?><br><a href="edit_account.php">Edit account</a> | <a href="register.php">Add user</a> | <a href="logout.php">Logout</a></div>
		  
		 
</div>

 
	<style>
	form {
		margin:0px;
	}
	</style>
		
<script>
$(document).ready(
function(){
	$("#createSlide").click(function () {
		$("#createSlideForm").show("slow");
		$("#createSlide").hide("slow");
	});
});

$(document).ready(
	function(){
		$("#createMessage").click(function () {
			$("#createMessageForm").show("slow");
			$("#createMessage").hide("slow");
		});
	});
</script>
		
<?php include 'edit_slides.php' ?>
<div id="createSlide" style="color:#1EAEDB;text-decoration:underline;margin-bottom:25px;cursor:hand;">Create slide</div>
<div id="createSlideForm" style="display:none;">
	<?php include 'create_slide.php' ?>
</div>
<br>
<?php include 'edit_messages.php' ?>
<div id="createMessage" style="color:#1EAEDB;text-decoration:underline;margin-bottom:25px;cursor:hand;">Create message</div>
<div id="createMessageForm" style="display:none;">
	<?php include 'create_message.php' ?>
</div>
	<div class="color cf">							 <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
	</div>
</body>
</html>