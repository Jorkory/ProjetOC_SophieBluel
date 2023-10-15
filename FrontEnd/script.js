// Recepurer et ajouter à la galerie les travaux de l'architecte
async function addWorks() {
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
    const gallery = document.querySelector(".gallery");

    for (work of works) {
        const figure = document.createElement("figure");

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

addWorks()