export function ajoutListenersAvis() {
  const piecesElements = document.querySelectorAll(".fiches article button");

  for (let i = 0; i < piecesElements.length; i++) {
    piecesElements[i].addEventListener("click", async function (event) {
      const id = event.target.dataset.id;

      let localAvis = window.localStorage.getItem(`avis-${id}`);

      if (localAvis === null) {
        const reponse = await fetch(
          "http://localhost:8081/pieces/" + id + "/avis"
        );
        localAvis = await reponse.json();
        const valeurLocalAvis = JSON.stringify(localAvis);
        window.localStorage.setItem(`avis-${id}`, valeurLocalAvis);
      } else {
        localAvis = JSON.parse(localAvis);
      }
      
      const pieceElement = event.target.parentElement;

      const avisElement = document.createElement("p");
      for (let i = 0; i < localAvis.length; i++) {
        avisElement.innerHTML += `<b>${localAvis[i].utilisateur}:</b> ${localAvis[i].commentaire} <br>`;
      }
      pieceElement.appendChild(avisElement);
    });
  }
}

export function ajoutListenerEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis");
  formulaireAvis.addEventListener("submit", function (event) {
    event.preventDefault();
    // Création de l’objet du nouvel avis.
    const avis = {
      pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur: event.target.querySelector("[name=utilisateur]").value,
      commentaire: event.target.querySelector("[name=commentaire]").value,
      nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value),
    };
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(avis);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:8081/avis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
  });
}
