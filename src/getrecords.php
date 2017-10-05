<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("fdb17.awardspace.net", "2469413_chrisrachelwedding", "p2kvKL6p", "2469413_chrisrachelwedding");

$result = $conn->query("SELECT name, message FROM Guestbookrecords");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"name":"'  . $rs["name"] . '",';
    $outp .= '"message":"'   . $rs["message"]        . '"}';
}
$outp ='{"records":['.$outp.']}';
//$outp = '['.$outp.']';
$conn->close();

echo($outp);
?>