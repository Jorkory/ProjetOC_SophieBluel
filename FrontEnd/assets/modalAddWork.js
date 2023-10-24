import {addWorksToGalleryModal} from "./modalManageGallery.js"
import {addWorksToGallery} from "./gallery.js";
import { notification } from "./modals.js";
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
    const types = ["image/jpg", "image/jpeg", "image/png"]; // Validation l'extension du fichier
    const formImg = document.querySelector(".formImgLoad");
    if(image && types.includes(image.type) && image.size < 4194304) {
        if (formImg) {
            formImg.remove();
        }
        const modalFileOption = document.querySelector(".modalFileOption");
        modalFileOption.style.display = "none";
        const reader = new FileReader();
        reader.onload = () => {
            const modalFileImg = document.createElement("img");
            modalFileImg.src = reader.result;
            modalFileImg.className = "formImgLoad";
            const label = document.createElement("label");
            label.id = "labelAddFile";
            label.setAttribute("for", "btn-addFile");
            label.appendChild(modalFileImg);
            const modalFile = document.querySelector(".modalFile");
            modalFile.appendChild(label);
        }
        reader.readAsDataURL(image);
    }
    else {
        if(formImg) {
            formImg.remove();
            document.querySelector(".modalFileOption").style.display = "flex";
        }
        if (image) {
            if(!types.includes(image.type)) {
                notification(2, "red", `<i class="fa-solid fa-triangle-exclamation"></i> Nous n’acceptons pas les autres formats de fichiers, seulement JPG et PNG.`);
                document.getElementById("btn-addFile").value = "";
            }
            else if(image.size >= 4194304) {
                notification(2, "red", `<i class="fa-solid fa-triangle-exclamation"></i> Nous n’acceptons pas les fichiers de plus de 4 Mo`);
                document.getElementById("btn-addFile").value = "";
            }
        }
    }    
}


//Verifer la validation des inputs
export function validInput(event) {
    if (event) {event.preventDefault();}
    const image = document.getElementById("btn-addFile");
    const title= document.getElementById("titleImg");
    const category= document.getElementById("categoryImg");
    //Activer ou desactiver le bouton "Submit" en fonction de la validation des inputs
    const btnValidForm = document.querySelector(".btn-addWork-Valid");
    if (image.files[0] && image.value && title.value && category.value) {
            btnValidForm.classList.remove("disabled");
            if (event) {
                submitFormData(btnValidForm);
            }

    }
    else {
        btnValidForm.classList.add("disabled");
        if (event) {
            if (!image.files[0] && title.value && category.value) {
                notification(2, "red", `<i class="fa-solid fa-triangle-exclamation"></i> Veuillez d'ajouter une photo.`)
            }
            else if (!title.value && image.files[0] && category.value) {
                notification(2, "red", `<i class="fa-solid fa-triangle-exclamation"></i> Veuillez de saisir le titre.`)
            }
            else if (!category.value && image.files[0] && title.value) {
                notification(2, "red", `<i class="fa-solid fa-triangle-exclamation"></i> Veuillez de selectionner une catégorie.`)
            }
            else {
                notification(2, "red", `<i class="fa-solid fa-triangle-exclamation"></i> Veuillez de saisir tous les champs.`)
            };
        }
    }
}


//Envoyer Form-Data à l'API
async function submitFormData(button) {
    button.setAttribute("disabled", "");
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
        const resp = await response.json();
        addWorksToGalleryModal(resp);
        addWorksToGallery(resp);
        notification(1, "green", `<i class="fa-regular fa-circle-check"></i> La photo a été ajoutée avec succès.`);
        document.getElementById("modal2").close();
    }
    }
    catch {
        notification(2, "red", `<i class="fa-solid fa-triangle-exclamation"></i> Nous avons rencontré un problème, veuillez réessayer ultérieurement.`)
    }
    button.removeAttribute("disabled");
}