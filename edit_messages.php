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
     
   
	$query = " 
        SELECT 
            messages.messageId, 
            messages.title, 
            messages.message,
            messages.messageType,
			users.email
        FROM messages, users
		WHERE users.userId = messages.userId
    "; 
     
    try 
    { 
        // These two statements run the query against your database table. 
        $stmt = $db->prepare($query); 
        $stmt->execute(); 
    } 
    catch(PDOException $ex) 
    { 
        // Note: On a production website, you should not output $ex->getMessage(). 
        // It may provide an attacker with helpful information about your code.  
        die("Failed to run query: " . $ex->getMessage()); 
    } 
         
    // Finally, we can retrieve all of the found rows into an array using fetchAll 
    $rows = $stmt->fetchAll(); 
?> 
<h1>Messages</h1>
<table class="u-full-width">
<thead>
    <tr> 
        
        <th>Title</th> 
        <th class="un">Message</th> 
        <th class="un">Message Type</th> 
        <th class="un">Created By</th> 
        <th></th> 
    </tr> 
	</thead>
	<tbody>
    <?php foreach($rows as $row): ?> 
        <tr> 
            <td><?php echo htmlentities($row['title'], ENT_QUOTES, 'UTF-8'); ?></td> 
            <td class="un"><?php echo htmlentities($row['message'], ENT_QUOTES, 'UTF-8'); ?></td> 
			 <td class="un"><?php echo htmlentities($row['messageType'], ENT_QUOTES, 'UTF-8'); ?></td> 
            <td class="un"><?php echo htmlentities($row['email'], ENT_QUOTES, 'UTF-8'); ?></td> 
			
			<td>
		<form action='delete_message.php?messageId=<?php echo $row['messageId']; ?>' method="post">
        <input type="submit" name="submit" value="Delete">
    </form>
			
        </tr> 
    <?php endforeach; ?> 
	</tbody>
</table> 