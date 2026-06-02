<?php
session_start();
?>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calendar</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- <input type="date" id="datePicker"> -->
    <div class="date-picker">
        <div class="top-bar">
                <button id="prev">‹</button>
                <span id="month_name"></span>
                <button id="next">›</button>
        </div>

        <div class="weekdays">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
        </div>

        <div class="grid" id="grid"></div>
    </div>
    <div id="modal" class="modal">
        <div class="modal-content">
            <span id="close">✕</span>
            <h2 id="modal-date"></h2>
            <div id="entry-list">No entries for this date.</div>
        </div>
    </div>
    <script src="script.js"></script>
    <div id="nav">
        <a href="index.php">📑</a>
        <a href="calendar.php">📆</a>
        <a href="profile.php">👤</a>
    </div>
</body>
</html>