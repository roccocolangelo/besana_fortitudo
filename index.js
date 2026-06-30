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

const API = "https://besanapi.roccocolangelo.workers.dev";



async function login() {

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  const response = await fetch(API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user,
      pass
    })
  });

  if (response.ok) {

    isLogged = true;

    closeLogin();

    salvaSanzione();

  } else {

    alert("Credenziali errate ❌");

  }
}

async function salvaSanzione() {

  const payload = {
    player: document.getElementById("giocatore").value,
    date: document.getElementById("data").value,
    amount: parseFloat(
      document.getElementById("importo").value
    ),
    rule: document.getElementById("articolo").value
  };

  const response = await fetch(API + "/sanzioni", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {

    alert("✅ Sanzione salvata");

    form.reset();

  } else {

    alert("❌ Errore salvataggio");

  }
}