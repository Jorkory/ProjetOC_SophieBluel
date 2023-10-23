// Fonction: Generer les photos de la galerie dans la fenetre de modale
export function addWorksToGalleryModal(addWork) {
    const modalGallery = document.querySelector(".modalGallery");
    let works = null;
    if(addWork) {
        works = [addWork];
    }
    else {
        const worksJSON = window.localStorage.getItem("works");
        works = JSON.parse(worksJSON);
        modalGallery.innerHTML = "";
    }


    for (const work of works) {
        const figure = document.createElement("figure");
        const figureImg = document.createElement("img");
        figure.dataset.id = work.id;
        figureImg.src = work.imageUrl;
        figureImg.alt = work.title;
        const figureBtnDel = document.createElement("i");
        figureBtnDel.className = "btn-delete fa-solid fa-trash-can";
        figureBtnDel.title = "Supprimer cette image";
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
async function DeleteWorkFromGallery(btnTrashHTML) {
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
            const works = document.querySelectorAll("figure");
            for(let i = 0; i < works.length; i++) {
                if(works[i].dataset.id === workToDelete.dataset.id) {
                    works[i].remove();
                    break;
                }
            }
            workToDelete.remove();
            notification()
        }
   } 
   catch {
        console.error("Nous avons rencontré un problème, veuillez réessayer ultérieurement.");
    }
}

//Notification
function notification() {
    const modal = document.querySelector(".modal-container");
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerHTML = `<i class="fa-regular fa-circle-check"></i> La photo a été supprimée avec succès.`;
    modal.appendChild(notification);
    
    document.querySelector("#modal2").close();
    
    setTimeout(() => {
        notification.classList.add("hide");
        setTimeout(() => {notification.remove();}, 300)
    }, 1400)    
}