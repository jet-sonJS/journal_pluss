const grid = document.getElementById("grid");
const label = document.getElementById("month_name");

let current = new Date();
let selected = null;

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
    const d = document.createElement("div");
    d.classList.add("other-month");
    d.textContent = prevDays - i + 2;
    grid.appendChild(d);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const d = document.createElement("div");
    d.textContent = i;

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
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  showEntries(date);
}

function showEntries(date) {
  const modalDate = document.getElementById("modal-date");
  const entryList = document.getElementById("entry-list");
  entryList.innerHTML = "Loading entries...";
  modalDate.textContent = date.toDateString();
  fetch(`get_entries.php?date=${date.toISOString().split("T")[0]}`)
    .then((response) => response.json())
    .then((data) => {
      entryList.innerHTML = "";
      if (data.length === 0) {
        entryList.innerHTML = "No entries for this date.";
      } else {
        data.forEach((entry) => {
          const entryElement = document.createElement("div");
          entryElement.textContent = entry.content;
          entryList.appendChild(entryElement);
        });
      }
    });
}