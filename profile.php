<?php
session_start();
?>
<html>
  <head>
    <title>Profile</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Profile</h1>
    <form action="update_profile.php" method="post">
      <img src="<?php echo isset($_SESSION['profilepic']) ? $_SESSION['profilepic'] : 'default-profile.png'; ?>" id="preview" /><br>
      <label>Profile Picture: 
        <input type="file" value="<?php echo $_SESSION['profilepic']; ?>" name="pfp" id="pfp">
      </label><br><br>
      <label>Username: <input type="text" value="<?php echo $_SESSION['username']; ?>" name="username" id="username"></label><br><br>
      <label>Email: <input type="email" value="<?php echo $_SESSION['email']; ?>" name="email" id="email"></label><br><br>
      <label>Password: <input type="password" value="********" name="pswd" class="dis" id="pswd" disabled></label>
      <button type="button" onclick="changePassword()" class="change">Change</button>
      <br><br>
      <button type="submit">Save</button>
    <script>    
      document.getElementById("pfp").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            document.getElementById("preview").src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    </script>
    </form>
     <div id="nav">
        <a href="index.php" data-tooltip="Today" aria-label="Journal Entries">📑</a>
        <a href="calendar.php" data-tooltip="Calendar" aria-label="Calendar">📆</a>
        <a href="profile.php" data-tooltip="Your Profile" aria-label="Profile" class="active">👤</a>
    </div>
      <script src="script.js"></script>
    </body>
</html>