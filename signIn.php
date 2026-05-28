<?php
session_start();

$email = $_POST['email'];
$password = $_POST['password'];

$usersFile = 'users.json';
if (!file_exists($usersFile)) {
    die("No users found! Please register first.");
}

$users = json_decode(file_get_contents($usersFile), true);

$foundUser = null;
foreach ($users as $user) {
    if ($user['email'] === $email) {
        $foundUser = $user;
        break;
    }
}

if ($foundUser) {
    if (password_verify($password, $foundUser['password'])) {
        $_SESSION['username'] = $foundUser['username'];
        $_SESSION['email'] = $foundUser['email'];
        $_SESSION['password'] = $foundUser['password'];
        $_SESSION['firstname'] = $foundUser['firstname'];
        $_SESSION['lastname'] = $foundUser['lastname'];
        $_SESSION['age'] = $foundUser['age'];
        $_SESSION['password'] = $password;
        header("Location: index.php");
        exit();
    } else {
        echo "Incorrect password.";
    }
} else {
    echo "User not found. Please register first.";
}
?>