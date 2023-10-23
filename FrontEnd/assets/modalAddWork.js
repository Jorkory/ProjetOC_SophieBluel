import {addWorksToGalleryModal} from "./modalManageGallery.js"
import {addWorksToGallery} from "./gallery.js";
//Modal: Ajouter photo
export function modalAddWork() {
    // ouvrir la fenetre de modal
    const dialogModal = document.querySelector(`#modal2`);
    dialogModal.showModal();

    //Reset formulaire
    const form = document.getElementById("formAddWork");
    form.reset();
    const imgLoad = document.querySelector(".formImgLoad");
    if(imgLoad){
    imgLoad.remove();
    } 
    const modalFileOption = document.querySelector(".modalFileOption");
    modalFileOption.style.display = "flex";
    validInput();
}


//Charger et afficher l'image
export function loadShowImg(image) {
    const modalFileOption = document.querySelector(".modalFileOption");
    modalFileOption.style.display = "none";
    const reader = new FileReader();
    reader.onload = () => {
        const modalFileImg = document.createElement("img");
        modalFileImg.src = reader.result;
        modalFileImg.className = "formImgLoad";
        modalFileImg.addEventListener('click', () => {
            modalFileImg.remove();
            modalFileOption.style.display = "flex";
        })
        const modalFile = document.querySelector(".modalFile");
        modalFile.appendChild(modalFileImg);
    }
    reader.readAsDataURL(image);
}


//Verifer la validation des inputs
export function validInput() {
    const image = document.getElementById("btn-addFile");
    const title= document.getElementById("titleImg");
    const category= document.getElementById("categoryImg");
    //Activer ou desactiver le bouton "Submit" en fonction de la validation des inputs
    const btnValidForm = document.querySelector(".btn-addWork-Valid");
    if (image.files[0] && title.value && category.value) {
            btnValidForm.removeAttribute("disabled");
    }
    else {
        btnValidForm.setAttribute("disabled", "");
    }
}


//Envoyer Form-Data à l'API
export async function submitFormData(event) {
    event.preventDefault();
    const form = document.getElementById("formAddWork");
    const formData = new FormData(form);
    
    try {
    const user = JSON.parse(window.localStorage.getItem("login"));

    const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${user.token}`
        },
        body: formData
    });

    if (response.ok) {
        notification();
        const resp = await response.json();
        addWorksToGalleryModal(resp);
        addWorksToGallery(resp);
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
    notification.innerHTML = `<i class="fa-regular fa-circle-check"></i> La photo a été ajoutée avec succès.`;
    modal.appendChild(notification);
    
    document.querySelector("#modal2").close();
    
    setTimeout(() => {
        notification.classList.add("hide");
        setTimeout(() => {notification.remove();}, 300)
    }, 1400)    
}
