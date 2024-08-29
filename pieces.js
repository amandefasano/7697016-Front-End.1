// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

// Création des balises 
const article = pieces[0];

/* image */
const imageElement = document.createElement("img");
imageElement.src = article.image;

/* nom */
const nomElement = document.createElement("h2");
nomElement.innerText = article.nom;

/* prix */ 
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

/* catégorie */
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

/* description */
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = article.description ?? "Pas de description pour le moment.";

/* disponibilité */
const disponibiliteElement = document.createElement("p");
disponibiliteElement.innerHTML = article.disponibilite ? "En stock" : "Rupture de stock";

//Rattachement de nos balises au DOM
const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(imageElement);
sectionFiches.appendChild(nomElement);
sectionFiches.appendChild(prixElement);
sectionFiches.appendChild(categorieElement);
sectionFiches.appendChild(descriptionElement);
sectionFiches.appendChild(disponibiliteElement);