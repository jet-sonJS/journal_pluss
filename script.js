const grid = document.getElementById("grid");
const label = document.getElementById("month_name");

let current = new Date();
let selected = null;

function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function markEntryDot(date, element) {
  element.style.position = "relative";

  fetch(`get_entries.php?date=${formatDate(date)}`)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.innerHTML = `${data.length}`;
        element.appendChild(dot);
      }
    })
    .catch(() => {});
}

function render() {
  if (!grid || !label) {
    return;
  }

  grid.innerHTML = "";

  const year = current.getFullYear();
  const month = current.getMonth();

  label.textContent = current.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  for (let i = firstDay; i > 0; i--) {
    const date = new Date(year, month, -i + 1);
    const d = document.createElement("div");
    d.classList.add("other-month");
    d.textContent = date.getDate();
    markEntryDot(date, d);
    grid.appendChild(d);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const d = document.createElement("div");
    d.textContent = i;
    markEntryDot(date, d);

    const today = new Date();
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      d.classList.add("today");
    }

    d.onclick = () => {
      selected = new Date(year, month, i);
      render();
      openModal(selected);
    };

    if (
      selected &&
      i === selected.getDate() &&
      month === selected.getMonth() &&
      year === selected.getFullYear()
    ) {
      d.classList.add("selected");
    }

    grid.appendChild(d);
  }

  while (grid.children.length < daysInMonth + firstDay) {
    const d = document.createElement("div");
    d.classList.add("other-month");
    d.textContent = grid.children.length;
    grid.appendChild(d);
  }

  
}

if (grid && label) {
  document.getElementById("prev").onclick = () => {
    current.setMonth(current.getMonth() - 1);
    render();
  };

  document.getElementById("next").onclick = () => {
    current.setMonth(current.getMonth() + 1);
    render();
  };

  render();
}

function openModal(date) {
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close");
  modal.style.display = "block";
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };
  showEntries(date);
}

function initNavTooltips() {
  const navLinks = document.querySelectorAll("#nav a[data-tooltip]");
  navLinks.forEach((link) => {
    const text = link.getAttribute("data-tooltip");
    if (!text) return;

    const tooltip = document.createElement("span");
    tooltip.className = "tooltip-box";
    tooltip.textContent = text;
    link.appendChild(tooltip);

    const show = () => {
      tooltip.classList.add("show");
    };
    const hide = () => {
      tooltip.classList.remove("show");
    };

    link.addEventListener("mouseenter", show);
    link.addEventListener("focus", show);
    link.addEventListener("mouseleave", hide);
    link.addEventListener("blur", hide);
  });
}

initNavTooltips();

function showEntries(d) {
  const modalDate = document.getElementById("modal-date");
  const entryList = document.getElementById("entry-list");
  entryList.innerHTML = "Loading entries...";
  modalDate.textContent = `${d.toDateString()}`;

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  // const time = String(date.getTime()).padStart(2, "0"); 
  const dateString = `${d.getFullYear()}-${month}-${day}`;

  fetch(`get_entries.php?date=${dateString}`)
    .then((response) => response.json())
    .then((data) => {
      entryList.innerHTML = "";
      if (!Array.isArray(data) || data.length === 0) {
        entryList.innerHTML = "No entries for this date.";
        return;
      }

      data.forEach((entry) => {
        const entryElement = document.createElement("div");
        entryElement.classList.add("entry");
        entryElement.innerHTML = `<div class="date">${entry.date}</div>${entry.content.replace(/\n/g, '<br>')}`;
        entryList.appendChild(entryElement);
      });
    })
    .catch(() => {
      entryList.innerHTML = "No entries for this date.";
    });
}

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
          <div class="entry">
            <div class="date">${entry.date}</div>
            <div>${entry.content.replace(/\n/g, '<br>')}</div>
            <button id="remove">Remove</button>
            <button id="edit">Edit</button>
            <button id="copy">Copy</button>
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
          showStatus('Please add content.', false);
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