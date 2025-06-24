const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
console.log("hello js is called relex");
function showPopup() {
  popup.style.display = "block";
}

function closePopup() {
  popup.style.display = "none";
}

closeBtn.addEventListener("click", closePopup);
window.addEventListener("load", showPopup);
