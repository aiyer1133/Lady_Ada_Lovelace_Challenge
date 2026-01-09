const button = document.getElementById("btn");
const text = document.getElementById("text");

button.addEventListener("click", () => {
  text.textContent = "DOM manipulated 😎 JavaScript works!";
});
