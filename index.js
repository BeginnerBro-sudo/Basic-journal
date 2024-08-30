const userInput = document.getElementById("user-input");
const saveArea = document.getElementById("save-area");
const addEntry = document.getElementById("add-entry");

let currentEditIndex = null;

function saveEntries(entries) {
  localStorage.setItem("journalEntries", JSON.stringify(entries));
}

function loadEntries() {
  const entries = localStorage.getItem("journalEntries");
  return entries ? JSON.parse(entries) : [];
}

function addNewEntry(newEntry) {
  const entries = loadEntries();
  if (newEntry.trim()) {
    entries.push(newEntry);
    saveEntries(entries);
  }
}

function trueEdit(entryItem, index) {
  entryItem.addEventListener("click", () => {
    currentEditIndex = index;
    userInput.value = entryItem.textContent;
  });
}

function displayEntries() {
  const entries = loadEntries();
  saveArea.innerHTML = "";

  entries.forEach((entry, index) => {
    const entryItem = document.createElement("li");
    entryItem.textContent = entry;
    trueEdit(entryItem, index);
    saveArea.appendChild(entryItem);
  });
}

addEntry.addEventListener("click", () => {
  const newEntry = userInput.value.trim();
  if (newEntry) {
    const entries = loadEntries();
    if (currentEditIndex !== null) {
      entries[currentEditIndex] = newEntry;
      currentEditIndex = null;
    } else {
      addNewEntry(newEntry);
    }
    userInput.value = "";
    saveEntries(entries);
    displayEntries();
  }
});
displayEntries();

document.addEventListener("DOMContentLoaded", displayEntries);
