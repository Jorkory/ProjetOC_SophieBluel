// Afficher la page d'accueil en mode Edition

export function isConnect() {

    // Modifier le bouton "Login" => "Logout"
    const buttonLogin = document.querySelector(".buttonLogin");
    buttonLogin.innerText = "Logout";
    buttonLogin.href = "#";
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault();
        window.localStorage.removeItem("login");
        location.href = "./index.html";
    })

    // Creer la barre en noir "Mode édition" en haut de la page
    const header = document.querySelector("header");
    const editModeDiv = document.createElement("div");
    header.className = "editMode";
    editModeDiv.className = "editModeDiv";
    editModeDiv.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Mode édition`;
    header.prepend(editModeDiv);

    // Creer le bouton à côte du h2 "Mes projets"
    const paraProjet = document.querySelector(".paraProjet");
    const btnModal = document.createElement("a");
    btnModal.className = "btn-modal-modif";
    btnModal.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Modifier`
    paraProjet.appendChild(btnModal);

    // Ajouter le script de modals.js au HTML
    const head = document.querySelector("head");
    const scriptModals = document.createElement("script");
    scriptModals.setAttribute("src", "./assets/modals.js");
    scriptModals.setAttribute("type", "module");
    scriptModals.setAttribute("defer", "");
    head.appendChild(scriptModals);


    // Supprimer la barre de filtre
    const barFilter = document.querySelector(".filterGallery");
    barFilter.remove();

}