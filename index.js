function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

let isLogged = false;

const form = document.getElementById("form-sanzione");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isLogged) {
    document.getElementById("loginModal").style.display = "block";
    return;
  }

  salvaSanzione();
});

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

document.getElementById("loginModal").addEventListener("click", function(e) {
  if (e.target === this) {
    this.style.display = "none";
  }
});