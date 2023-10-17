// Fonction: Recepurer et affricher les travaux de l'architecte à la galerie
export async function addWorksToGallery() {
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
    const gallery = document.querySelector(".gallery");

    for (const work of works) {
        const figure = document.createElement("figure");
        figure.dataset.categoryId = work.categoryId;
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


// Fonction: masque les figures non demandés (filtre) en activant le "display:none" via dataSet
export function filterWorksToGallery(categoryId) {
    const figures = document.querySelectorAll(".gallery figure");
    for (let i = 0; i < figures.length; i++) {
        if (figures[i].dataset.categoryId === categoryId || categoryId === "0") {
            figures[i].classList.remove("figureHidden");
        } else {
            figures[i].classList.add("figureHidden");
        }
    }
}