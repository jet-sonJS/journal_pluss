<?php
session_start();
?>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Journal++</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Today</h1>
    <div id="entry-status"></div>
    <div id="entries"></div>
    <button id="addEntry">New</button>

<div id="modal" class="modal">
   <div class="modal-content">
      <span id="close" onclick="toggleForm(false)">✕</span>
    <div id="entry-form">
      <h2>New Journal Entry</h2>
      <label>Date: <input type="date" style="width:fit-content" id="entry-date" value="<?php echo date('Y-m-d'); ?>" readonly></label>
      <br><br>
      <textarea id="entry-content" rows="8" style="width: 100%; padding: 10px; font-size: 1rem;" placeholder="Type here..."></textarea>
      <br><br>
      <button id="saveEntry">Save</button>
      <button id="cancelEntry" type="button">Cancel</button>
    </div>
    </div>
    </div>
   <div id="nav">
        <a href="index.php" class="active" data-tooltip="Today" aria-label="Journal Entries">📑</a>
        <a href="calendar.php" data-tooltip="Calendar" aria-label="Calendar">📆</a>
        <a href="profile.php" data-tooltip="Your Profile" aria-label="Profile">👤</a>
    </div>
    <script src="script.js"></script>
</body>
</html>