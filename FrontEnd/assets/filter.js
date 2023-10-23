// Bouton du filtre cliqué
export function btnFilterWorks(filterButtons, button, event) {
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
    button.classList.add("btn-active");
}


// Masquer les figures non demandés (filtre) en activant le "display:none" via dataSet
function filterWorksToGallery(categoryId) {
    const figures = document.querySelectorAll(".gallery figure");
    for (let i = 0; i < figures.length; i++) {
        if (figures[i].dataset.categoryId === categoryId || categoryId === "0") {
            figures[i].classList.remove("figureHidden");
        } else {
            figures[i].classList.add("figureHidden");
        }
    }
}