import { addWorksToGallery, filterWorksToGallery, DeleteWorkFromGallery, addWorksToGalleryDialog } from "./gallery.js";
import {isConnect} from "./connect.js";

// Lancement HTML: generer les images sur la page d'accueil depuis API
addWorksToGallery()


// Barre de filtres
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


// Vérifier l'état de connexion
const userConnect = JSON.parse(window.localStorage.getItem("login"));
const buttonLogin = document.querySelector(".buttonLogin");

if (userConnect) {
    isConnect(buttonLogin);


    //Dialog: Ouvrir ou Fermer
    const btnModalModif = document.querySelector(".btn-modal-modif");
    const dialogModal1= document.querySelector("#modal1");
    const btnCloseModal = document.querySelector(".btn-closeModal");
    const modalContainer = document.querySelector(".modal1-container")

    const openModal = (event) => {
        event.preventDefault();
        addWorksToGalleryDialog();
        dialogModal1.showModal(); 
    }

    const closeModal = (event) => {
        event.preventDefault();
        dialogModal1.close();    
    }

    btnModalModif.addEventListener('click', openModal)
    btnCloseModal.addEventListener('click', closeModal)
    dialogModal1.addEventListener('click', closeModal)
    modalContainer.addEventListener('click', (e) => e.stopPropagation());
    
}