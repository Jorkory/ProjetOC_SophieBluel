import { addWorksToGallery, filterWorksToGallery } from "./gallery.js";

// Lancement HTML: generer les images sur la page d'accueil depuis API
addWorksToGallery()

// Vérifier l'état de connexion
const connect = JSON.parse(window.localStorage.getItem("login"));
const buttonLogin = document.querySelector(".buttonLogin");

if (connect) {
    buttonLogin.querySelector("li").innerText = "Logout";
    buttonLogin.href = "./index.html";
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault();
        window.localStorage.removeItem("login");
        location.href = buttonLogin.href;
    })
}

// Barre de filtres, lorsque on clique sur le bouton de filtre => appeler la fonction qui va gerer les figures + CSS des boutons
const filterButtons = document.querySelectorAll(".filterGallery-btn");
filterButtons[0].classList.add("btn-active");
filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        filterButtons.forEach(btn => btn.classList.remove("btn-active"));

        switch (button.className) {
            case 'filterGallery-btn filterAll':
                filterWorksToGallery("0");
                break;
            case 'filterGallery-btn filterObjects':
                filterWorksToGallery("1");
                break;
            case 'filterGallery-btn fitlerApartments':
                filterWorksToGallery("2");
                break;
            case 'filterGallery-btn filterHotelsRestaurants':
                filterWorksToGallery("3");
                break;
            default:
                console.error("Ce bouton ne correspond à aucun case (switch).");
        }
        button.classList.add("btn-active")
    })
})





