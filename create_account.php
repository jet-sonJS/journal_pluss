<?php
$newUser = [
  'username' => $_POST['username'],
  'email' => $_POST['email'],
  'profilepic' => $_POST['pfp'],
  'password' => password_hash($_POST['password'], PASSWORD_DEFAULT)
];

$usersFile = 'users.json';
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

$users[] = $newUser;

file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

session_start();
$_SESSION['username'] = $newUser['username'];
$_SESSION['email'] = $newUser['email'];
$_SESSION['password'] = $newUser['password'];
$_SESSION['password'] = $_POST['password'];
$_SESSION['profilepic'] = $_POST['pfp'];
header('Location: index.php');
exit();
?>