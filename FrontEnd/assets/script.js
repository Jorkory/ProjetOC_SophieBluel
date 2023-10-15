// Fonction: Recepurer et stocker les travaux de l'architecte dans le localStorage depuis API au lancement HTML + Afficher les travaux à la galerie
async function addWorksToGallery() {
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
    window.localStorage.setItem("works", JSON.stringify(works));

    const gallery = document.querySelector(".gallery");

    for (work of works) {
        const figure = document.createElement("figure");
        figure.className = "categoryId" + work.categoryId;
        const figureImg = document.createElement("img");
        figureImg.src = work.imageUrl;
        figureImg.alt = work.title;
        figure.appendChild(figureImg);

        const figcapture = document.createElement("figcapture");
        figcapture.innerText = work.title;
        figure.appendChild(figcapture);

        gallery.appendChild(figure);
    }
}


// Fonction: masque les figures non demandés (filtre) en activant le "display:none" via Class
function filterWorksToGallery(category) {
    const figures = document.querySelectorAll(".gallery figure");
    for (i = 0; i < figures.length; i++) {
        if (figures[i].className.includes(category)) {
            figures[i].classList.remove("figureHidden");
        } else {
            figures[i].classList.add("figureHidden");
        }
    }
}

// Lancement HTML
addWorksToGallery()


// Barre de filtres, lorsque on clique sur le bouton de filtre => appeler la fonction qui va gerer les figures + CSS des boutons
const filterButtons = document.querySelectorAll(".filterGallery-btn");
filterButtons[0].classList.add("btn-active");
filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        filterButtons.forEach(btn => btn.classList.remove("btn-active"));

        switch (button.className) {
            case 'filterGallery-btn filterAll':
                filterWorksToGallery("");
                break;
            case 'filterGallery-btn filterObjects':
                filterWorksToGallery("categoryId1");
                break;
            case 'filterGallery-btn fitlerApartments':
                filterWorksToGallery("categoryId2");
                break;
            case 'filterGallery-btn filterHotelsRestaurants':
                filterWorksToGallery("categoryId3");
                break;
            default:
                console.error("Ce bouton ne correspond à aucun case (switch).");
        }
        button.classList.add("btn-active")
    })
})