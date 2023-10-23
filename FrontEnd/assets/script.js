import { isConnect } from "./connect.js";
import {btnFilterWorks} from "./filter.js";
import {addWorksToGallery} from "./gallery.js";

// Lancement HTML: generer les images sur la page d'accueil depuis API
addWorksToGallery()


// Barre de filtres
const filterButtons = document.querySelectorAll(".filterGallery-btn");
filterButtons[0].classList.add("btn-active");
filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => { btnFilterWorks(filterButtons, button, event) });
});


// Vérifier l'état de connexion
const userConnect = JSON.parse(window.localStorage.getItem("login"));

if (userConnect) {
    isConnect();
}