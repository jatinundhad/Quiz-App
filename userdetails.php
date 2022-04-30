<?php

// connect using MySQL database using MySQLi extension
$servername = "localhost";
$username = "root";
$password = "";

// create a connection object
$conn = mysqli_connect($servername,$username,$password);
echo "connection was successful";

// Die if connection was not successful
if(!$conn){
    die("Connection failed: ".mysqli_connect_error());
}else{
    echo "connection was successful.";
}





























// if(isset($_POST['submit'])){
//     $username=$_POST['username'];
//     $question=$_POST['question'];
//     $score=$_POST['score'];
//     $time=$_POST['time'];
//     $perc=$_POST['perc'];

//     $sql="INSERT INTO `users`(`username`, `questions`, `score`, `time`, `percentage`) VALUES ('$username','$question','$score','$time','$perc')";
//     $result = $conn->query($sql);

//     if ($result == TRUE) {
//       echo "New record created successfully.";
//     }else{
//       echo "Error:". $sql . "<br>". $conn->error;
//     } 

//     $conn->close();
// }

?>