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
    <button id="addEntry">Add Entry</button>

<div id="modal" class="modal">
   <div class="modal-content">
      <span id="close">✕</span>
    <div id="entry-form">
      <h2>New Journal Entry</h2>
      <label>Date: <input type="date" id="entry-date" value="<?php echo date('Y-m-d'); ?>" readonly></label>
      <br><br>
      <textarea id="entry-content" rows="8" style="width: 100%; padding: 10px; font-size: 1rem;" placeholder="Write your journal entry here..."></textarea>
      <br><br>
      <button id="saveEntry">Save Entry</button>
      <button id="cancelEntry" type="button">Cancel</button>
    </div>
    </div>
    </div>

   <script>
      const addEntry = document.getElementById('addEntry');
      const entryForm = document.getElementById('modal');
      const saveEntry = document.getElementById('saveEntry');
      const cancelEntry = document.getElementById('cancelEntry');
      const entryDate = document.getElementById('entry-date');
      const entryContent = document.getElementById('entry-content');
      const entryStatus = document.getElementById('entry-status');
      const entriesContainer = document.getElementById('entries');

      function showStatus(message, success = true) {
        entryStatus.textContent = message;
        entryStatus.style.color = success ? 'green' : 'red';
        entryStatus.style.marginBottom = '10px';
      }

      function toggleForm(show) {
        entryForm.style.display = show ? 'block' : 'none';
      }

      function renderEntries(entries) {
        if (!entries || entries.length === 0) {
          entriesContainer.innerHTML = '<p>No entries for this date.</p>';
          return;
        }

        entriesContainer.innerHTML = entries.map(entry => `
          <div style="border:1px solid #ddd; padding: 15px; margin-bottom: 12px; border-radius: 8px; text-align: left;">
            <div style="font-size: 0.9rem; color: #555; margin-bottom: 8px;">${entry.date}</div>
            <div>${entry.content.replace(/\n/g, '<br>')}</div>
          </div>
        `).join('');
      }

      function loadEntries(date) {
        entriesContainer.innerHTML = 'Loading entries...';

        fetch(`get_entries.php?date=${date}`)
          .then(response => response.json())
          .then(data => {
            renderEntries(data);
          })
          .catch(() => {
            entriesContainer.innerHTML = '<p>Unable to load entries.</p>';
          });
      }

      addEntry.onclick = () => {
        toggleForm(true);
      };

      cancelEntry.onclick = () => {
        toggleForm(false);
        entryContent.value = '';
      };

      saveEntry.onclick = () => {
        const date = entryDate.value;
        const content = entryContent.value.trim();

        if (!date || !content) {
          showStatus('Please add both a date and content.', false);
          setTimeout(() => {
                    showStatus('');
                }, 2000);
          return;
        }

        saveEntry.disabled = true;
        showStatus('Saving entry...', true);
    setTimeout(() => {
                    showStatus('');
                }, 2000);
        fetch('save_entry.php', {
          method: 'POST',
          body: new URLSearchParams({ date, content })
        })
          .then(response => response.json())
          .then(data => {
            saveEntry.disabled = false;
            if (data.success) {
                showStatus('Entry saved successfully.');
                setTimeout(() => {
                    showStatus('');
                }, 2000);
              entryContent.value = '';
              toggleForm(false);
              if (date === entryDate.value) {
                loadEntries(date);
              }
            } else {
                    showStatus(data.message || 'Failed to save entry.', false);
                    setTimeout(() => {
                    showStatus('');
                }, 2000);
            }
          })
          .catch(() => {
            saveEntry.disabled = false;
            showStatus('Unexpected error saving entry.', false);
          });
      };

      loadEntries(entryDate.value);
    </script>
   <script src="script.js"></script>
   <div id="nav">
        <a href="index.php">📑</a>
        <a href="calendar.php">📆</a>
        <a href="profile.php">👤</a>
    </div>
</body>
</html>