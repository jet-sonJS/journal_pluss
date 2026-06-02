<?php
session_start();
?>
<html>
  <head>
    <title>Profile</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Profile for <?php echo $_SESSION['username'] ?></h1>
    <form action="update_profile.php" method="post">
      <label>Profile Picture: <img src="<?php echo $_SESSION['profilepic']; ?>" id="preview" />
        <input type="file" value="<?php echo $_SESSION['profilepic']; ?>" name="pfp" id="pfp">
      </label><br><br>
      <label>Username: <input type="text" value="<?php echo $_SESSION['username']; ?>" name="username" id="username"></label><br><br>
      <label>Email: <input type="email" value="<?php echo $_SESSION['email']; ?>" name="email" id="email"></label><br><br>
      <label>Password: <input type="password" value="********" name="pswd" class="dis" id="pswd" disabled></label>
      <button>Change</button>
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
        <a href="index.php">📑</a>
        <a href="calendar.php">📆</a>
        <a href="profile.php">👤</a>
    </div>
  </body>
</html>