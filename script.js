// Load notes from localStorage
window.onload = () => {
  showNotes();
};

function addNote() {
  const title = document.getElementById("note-title").value.trim();
  const content = document.getElementById("note-content").value.trim();

  if (title === "" || content === "") {
    alert("Both fields are required!");
    return;
  }

  const note = { title, content };
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("note-title").value = "";
  document.getElementById("note-content").value = "";

  showNotes();
}

function showNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const container = document.getElementById("notes-container");
  container.innerHTML = "";

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.content}</p>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;

    container.appendChild(div);
  });
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function searchNotes() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const noteCards = document.querySelectorAll(".note");

  noteCards.forEach(note => {
    const title = note.querySelector("h2").textContent.toLowerCase();
    const content = note.querySelector("p").textContent.toLowerCase();
    const matches = title.includes(searchTerm) || content.includes(searchTerm);
    note.style.display = matches ? "block" : "none";
  });
}

// Toggle Dark Mode
function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById("modeIcon");

  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  icon.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("darkMode", isDark);
}

// Apply saved mode on load
window.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("darkMode") === "true";
  const icon = document.getElementById("modeIcon");

  if (isDark) {
    document.body.classList.add("dark-mode");
    icon.textContent = "☀️";
    document.getElementById("darkToggle").checked = true;
  }
});

