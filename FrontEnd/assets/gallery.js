// Fonction: Recepurer et affricher les travaux de l'architecte à la galerie
export async function addWorksToGallery() {
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
    window.localStorage.setItem("works", JSON.stringify(works));
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

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


// Fonction: masquer les figures non demandés (filtre) en activant le "display:none" via dataSet
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


// Fonction: Generer les photos de la galerie dans la fenetre de modale
export async function addWorksToGalleryDialog() {
    const modalGallery = document.querySelector(".modalGallery");
    const worksJSON = window.localStorage.getItem("works");
    const works = JSON.parse(worksJSON);
    
    modalGallery.innerHTML = "";

    for (const work of works) {
        const figure = document.createElement("figure");
        const figureImg = document.createElement("img");
        figure.dataset.id = work.id;
        figureImg.src = work.imageUrl;
        const figureBtnDel = document.createElement("i");
        figureBtnDel.className = "btn-delete fa-solid fa-trash-can"
        figure.appendChild(figureImg);
        figure.appendChild(figureBtnDel)
        modalGallery.appendChild(figure);
    }

    // Dialog: Supprimer la photo depuis la galerie
    const btnsDeleteWork = document.querySelectorAll(".btn-delete");
    btnsDeleteWork.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            DeleteWorkFromGallery(event);
        });
    });
}


// Fonction: Supprimer la photo (travail) de l'architecte => API + DOM
export async function DeleteWorkFromGallery(btnTrashHTML) {
    const workToDelete = btnTrashHTML.target.parentNode;
    
   try{
        const token = JSON.parse(window.localStorage.getItem("login")).token;
        const askDelete = {
            Authorization : `Bearer ${token}`
        };
        const response = await fetch("http://localhost:5678/api/works/"+workToDelete.dataset.id, {
            method: "DELETE",
            headers: askDelete,
        })
        
        if (response.ok) {
            addWorksToGallery();
            workToDelete.remove();
        }
   } 
   catch {
        console.error("Nous avons rencontré un problème de la connexion.");
}


}