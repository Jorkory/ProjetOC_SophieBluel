import {addWorksToGalleryModal} from "./modalManageGallery.js";
import {modalAddWork} from "./modalAddWork.js";
import {validInput} from "./modalAddWork.js";
import { loadShowImg } from "./modalAddWork.js";

const dialogManageGallery =  `
    <div class="modal-container" >
        <button class="btn-close modal1"><i class="fa-solid fa-xmark"></i></button>
        <h2 class="title-modal">Galerie photo</h2>
        <div class="modalGallery-container">
            <div class="modalGallery">
            </div>
        </div>
        <button class="btn-addWork">Ajouter une photo</button>
    </div>
`

const dialogAddWork = `
    <div class="modal-container" >
        <button class="btn-backModal"><i class="fa-solid fa-arrow-left"></i></button>
        <button class="btn-close modal2"><i class="fa-solid fa-xmark"></i></button>
        <h2 class="title-modal">Ajout photo</h2>
        <form id="formAddWork" name="formAddWork">
            <div class="modalAddWork-container">
                <div class="modalFile">
                    <div class="modalFileOption">
                        <i class="fa-regular fa-image"></i>
                        <label for="btn-addFile" id="labelAddFile">+ Ajouter photo</label>
                        <input type="file" id="btn-addFile" accept=".jpg, .png" name="image">
                        <p>jpg, png : 4mo max</p>
                    </div>
                </div>
                <label for="titleImg">Titre</label>
                <input type="text" name="title" id="titleImg">
                <label for="categoryImg">Catégorie</label>
                <select name="category" id="categoryImg">
                    <option value=""></option>
                    <option value="1">Objets</option>
                    <option value="2">Appartements</option>
                    <option value="3">Hôtels & restaurants</option>
                </select>
            </div>
            <button class="btn-addWork-Valid">Valider</button>
        </form>	
    </div>
`



//Generer la dialog ManageGallery et Generer les images de la galerie pour les gerer dans la fenetre de modal
addDialogs()
addWorksToGalleryModal();


// Ajouter "listener" des boutons (modals)
const btnModal = document.querySelector(".btn-modal-modif");
btnModal.addEventListener('click', (event) => {
    event.preventDefault();
    const dialogModal = document.querySelector(`#modal1`);
    dialogModal.showModal();
})

const btnAddWork = document.querySelector(".btn-addWork");
btnAddWork.addEventListener('click', () => {modalAddWork()});

const btnsClose = document.querySelectorAll(".btn-close");
btnsClose.forEach((btn) => {
    btn.addEventListener('click', () => {
        document.getElementById("modal1").close();
        document.getElementById("modal2").close();
    })
})

const modalsClose = document.querySelectorAll(".modal");
modalsClose.forEach((btn) => {
    btn.addEventListener('click', () => {
        document.getElementById("modal1").close();
        document.getElementById("modal2").close();
    })
})

const modalsContainer = document.querySelectorAll(".modal-container");
modalsContainer.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation();
    })
})

const btnBackModal =  document.querySelector(".btn-backModal");
btnBackModal.addEventListener('click', () => {
    document.getElementById("modal2").close();
})

const btnValidForm = document.querySelector(".btn-addWork-Valid");
btnValidForm.addEventListener('click', (event) => validInput(event));

//Input Image
const btnFile = document.getElementById("btn-addFile");
btnFile.addEventListener('change', (event) => {
    loadShowImg(event.target.files[0]);
    validInput();
});
    
//Input Titre
const inputTitleImg = document.querySelector("#titleImg");
inputTitleImg.addEventListener('change', () => {validInput()});

//Input Categorie
const selectCategoryImg = document.querySelector("#categoryImg");
selectCategoryImg.addEventListener('change', () => {validInput()}); 


//Generer les dialogs
function addDialogs() {
    const portfolio = document.querySelector("#portfolio");
    const dialog1 = document.createElement("dialog");
    dialog1.id = "modal1";
    dialog1.className = "modal";
    dialog1.innerHTML += dialogManageGallery;
    portfolio.appendChild(dialog1); 
    const dialog2 = document.createElement("dialog");
    dialog2.id = "modal2";
    dialog2.className = "modal";
    dialog2.innerHTML += dialogAddWork;
    portfolio.appendChild(dialog2); 

}


// Notification
export function notification(modalId, color, message) {
    let modal = null;
    if (modalId === 1) {
        modal = document.getElementById("modal1");
    }
    else if (modalId === 2) {
        modal = document.getElementById("modal2");
    }
    const notification = document.createElement("div");
    notification.className = "notification " + color;
    notification.innerHTML = message;
    modal.querySelector(".modal-container").appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add("hide");
        setTimeout(() => {notification.remove();}, 300)
    }, 2000)    
}