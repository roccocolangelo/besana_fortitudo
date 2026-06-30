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

document.getElementById("loginModal").addEventListener("click", function (e) {
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

    closeLogin();

    if (deleteId) {

      await cancellaSanzione(deleteId);

      deleteId = null;

    } else {

      isLogged = true;

      salvaSanzione();

    }

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

  await caricaSanzioni();
}

async function caricaSanzioni() {

  const response = await fetch(
    API + "/sanzioni"
  );

  const data = await response.json();

  const tbody =
    document.getElementById("lista-sanzioni");

  tbody.innerHTML = "";

  data.forEach(item => {

    tbody.innerHTML += `
      <tr>
        <td>${item.player}</td>
        <td>${item.date}</td>
        <td>€ ${item.amount}</td>
        <td>${item.rule}</td>
        <td>
          <button
            class="delete-btn"
            onclick="richiediDelete(${item.id})">
            Cancella
          </button>
        </td>
      </tr>
    `;
  });

}

window.addEventListener("load", caricaSanzioni);

let deleteId = null;

function richiediDelete(id) {

  deleteId = id;

  isLogged = false;

  document.getElementById(
    "loginModal"
  ).style.display = "block";
}

async function cancellaSanzione(id) {

  await fetch(
    API + "/sanzioni/" + id,
    {
      method: "DELETE"
    }
  );

  alert("✅ Sanzione eliminata");

  caricaSanzioni();
}