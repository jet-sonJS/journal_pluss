<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: login.html");
    exit();
}

$filename = 'users.json';

$updatedUserName = htmlspecialchars(trim($_POST['fname']));
$updatedEmail = htmlspecialchars(trim($_POST['email']));
$updatedPfp = htmlspecialchars(trim($_POST['pfp']));
$updatedPassword  = password_hash($_POST['pswd'], PASSWORD_DEFAULT);

if (file_exists($filename)) {
    $data = json_decode(file_get_contents($filename), true);

    foreach ($data as &$user) {
        if ($user['username'] === $_SESSION['username']) {
            $user['profilepic'] = $_POST['pfp'];
            $user['email']     = $updatedEmail;
            $user['password']  = $_POST['pswd'];
            $_SESSION['password'] = $updatedPassword;
            $_SESSION['profilepic'] = $_POST['pfp'];
            $_SESSION['username'] = $updatedUserName;
            $_SESSION['email']     = $updatedEmail;
            break;
        }
    }

    file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));

    echo "Profile updated successfully.<br><a href='profile.php'>Back to Profile</a>";
} else {
    echo "Error: User data file not found.";
}
?>
