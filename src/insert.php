<?php

 $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    //$emp_no = $request->emp_no;
    $name = $request->name;
    $email = $request->email;
    $message = $request->message;


$servername = "fdb17.awardspace.net";
$username = "2469413_chrisrachelwedding";
$password = "p2kvKL6p"; //Your User Password
$dbname = "2469413_chrisrachelwedding"; //Your Database Name


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO Guestbookrecords (id, name, email, message)
VALUES ('$name','$email','$message')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>