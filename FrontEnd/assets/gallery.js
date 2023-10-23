//Test de la connexion à l'API et si reussi: générer les images depuis l'API
export async function addWorksToGallery(addWork) {  
    const gallery = document.querySelector(".gallery");
    let works = null;
    if(addWork) {
        works = [addWork];
    }
    else {
        try {
        works = await fetch("http://localhost:5678/api/works").then(works => works.json());
        window.localStorage.setItem("works", JSON.stringify(works));
        gallery.innerHTML = "";
        } catch {
            console.error("Nous avons rencontré le probleme de la connexion.")
        }
    }


    for (const work of works) {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;
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