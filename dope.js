const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add("completed");
    }

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.onclick = () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    };

    // Rename button
    const renameBtn = document.createElement("button");
    renameBtn.textContent = "✏";
    renameBtn.onclick = () => {
      const newText = prompt("Rename task:", todo.text);
      if (newText) {
        todo.text = newText;
        saveTodos();
        renderTodos();
      }
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    li.appendChild(completeBtn);
    li.appendChild(renameBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  const remaining = todos.filter(t => !t.completed).length;
  counter.textContent = `Tasks left: ${remaining}`;
}

// Add todo
addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  todos.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  saveTodos();
  renderTodos();
});

// Initial render
renderTodos();
