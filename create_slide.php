<?php 

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
     
    
	
	
   
    if(!empty($_POST)) 
    { 
        // Ensure that the user has entered a non-empty message title 
        if(empty($_POST['title'])) 
        { 
            // Note that die() is generally a terrible way of handling user errors 
            // like this.  It is much better to display the error with the form 
            // and allow the user to correct their mistake.  However, that is an 
            // exercise for you to implement yourself. 
            die("Please enter a title."); 
        } 
         
        // Ensure that the user has entered a non-empty password 
        if(empty($_POST['body'])) 
        { 
            die("Please enter slide body text."); 
        } 
		
		 
        // Ensure that the user has entered a non-empty password 
        if(empty($_POST['slideImageId'])) 
        { 
            die("Please select slide image."); 
        } 
         
        // An INSERT query is used to add new rows to a database table.
        // Again, we are using special tokens (technically called parameters) to 
        // protect against SQL injection attacks. 
        $query = " 
            INSERT INTO slides ( 
                title, 
                body,
				slideImageId,
				userId
            ) VALUES ( 
                :title, 
                :body,
				:slideImageId,
				:userId
            ) 
        "; 
         
        
        // Here we prepare our tokens for insertion into the SQL query.  We do not 
        // store the original password; only the hashed version of it.  We do store 
        // the salt (in its plaintext form; this is not a security risk). 
        $query_params = array( 
            ':title' => $_POST['title'], 
            ':body' => $_POST['body'],
			':slideImageId' => $_POST['slideImageId'],
			':userId' => $_SESSION['user']['userId']
        ); 
         
        try 
        { 
            // Execute the query to create the user 
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex) 
        { 
            // Note: On a production website, you should not output $ex->getMessage(). 
            // It may provide an attacker with helpful information about your code.  
            die("Failed to run query: " . $ex->getMessage()); 
        } 
         
        // This redirects the user back to the messages page after they create a new message 
        header("Location: private.php"); 
         
        // Calling die or exit after performing a redirect using the header function 
        // is critical.  The rest of your PHP script will continue to execute and 
        // will be sent to the user if you do not die or exit. 
        die("Redirecting to private.php"); 
    } 
     
?> 

<script>
 function displayImage(elem) {
    var image = document.getElementById("slideImagePreview");
    image.src = 'images/slides/' + elem.value + '.jpg';        
  }
</script>



<form action="create_slide.php" method="post"> 

  <div class="row">
    <div class="six columns">
      <label for="title">Title</label>
      <input class="u-full-width" maxlength="100" type="text" name="title" placeholder="Slide title" id="title" required>
    </div>
    <div class="three columns">
      <label for="slideImageId">Slide image</label>
      <select class="u-full-width" name="slideImageId" id="slideImageId" onchange="displayImage(this);">
        <option selected="true" value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
    </div>
	<div class="three columns">
	<img id="slideImagePreview" style="height:80px;width:120px;" src="images/slides/1.jpg"/>
	</div>
  </div>
  <label for="body">Slide body</label>
  <textarea class="u-full-width" maxlength="1000" name="body" placeholder="Slide body text…" id="body" required></textarea>
  
    <input class="button-primary" type="submit" value="Add slide"/> 
</form>

