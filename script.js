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
        dot.style.position = "absolute";
        dot.style.top = "5px";
        dot.style.right = "5px";
        dot.style.padding = "3px 6px";
        dot.style.borderRadius = "50%";
        dot.style.fontWeight = "bold";
        dot.style.textAlign = "center";
        dot.style.fontSize = "10px";
        dot.style.color = "white";
        dot.style.width = "fit-content";
        dot.style.height = "fit-content";
        dot.style.backgroundColor = "#00ed0492";
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
  modalDate.textContent = d.toDateString();

  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
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