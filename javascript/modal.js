import { fetchWorks, fetchCategories, addWork, deleteWork } from "./apiService.js";

const modal = document.querySelector(".modal");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalGalleryView = document.querySelector(".modal-gallery-view");
const modalAddView = document.querySelector(".modal-add-view");
const modalCloseBtn = document.querySelector(".modal-close");
const modalBackBtn = document.querySelector(".modal-back-btn");
const modalAddBtn = document.querySelector(".modal-add-btn");
const addPhotoForm = document.getElementById("add-photo-form");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("image-preview");
const categorySelect = document.getElementById("category");
const formError = document.getElementById("form-error");

let currentWorks = [];

// Ouvre la modale
export function openModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    loadModalGallery();
}

//Ferme la modale
export function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

// Écouteurs pour ouverture et fermeture
const editBtn = document.getElementById("edit-btn");
if (editBtn) editBtn.addEventListener("click", openModal);
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
if (modalWrapper) modalWrapper.addEventListener("click", (e) => e.stopPropagation());

// Charger la galerie dans la modale
async function loadModalGallery() {
    try {
        currentWorks = await fetchWorks();
        renderModalGallery(currentWorks);
    } catch (error) {
        console.error("Erreur chargement galerie modale :", error);
    }
}

// Fonction qui affiche la galerie
function renderModalGallery(works) {
    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = "";

    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const trashBtn = document.createElement("button");
        trashBtn.classList.add("delete-btn");
        trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

        //  Suppression avec confirmation
        trashBtn.addEventListener("click", async () => {
            const token = localStorage.getItem("token");
            if (!token) return alert("Non autorisé.");

            const confirmDelete = confirm(`Voulez-vous vraiment supprimer "${work.title}" ?`);
            if (!confirmDelete) return;

            const ok = await deleteWork(work.id, token);
            if (ok) {
                // Supprime de la liste locale et du DOM
                currentWorks = currentWorks.filter(w => w.id !== work.id);
                renderModalGallery(currentWorks);
                document.querySelector(`[data-id='${work.id}']`)?.remove(); // supprime aussi dans la galerie principale
            } else {
                alert("Erreur lors de la suppression.");
            }
        });

        figure.appendChild(img);
        figure.appendChild(trashBtn);
        modalGallery.appendChild(figure);
    });
}

//Passage à la vue d’ajout
if (modalAddBtn) {
    modalAddBtn.addEventListener("click", async () => {
        modalGalleryView.classList.add("hidden");
        modalAddView.classList.remove("hidden");

        const categories = await fetchCategories();
        categorySelect.innerHTML = `<option value="">Choisissez une catégorie</option>`;
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    });
}

//Retour à la galerie 
if (modalBackBtn) {
    modalBackBtn.addEventListener("click", () => {
        modalAddView.classList.add("hidden");
        modalGalleryView.classList.remove("hidden");
        addPhotoForm.reset();
        imagePreview.innerHTML = `
            <i class="fa-regular fa-image"></i>
            <p>Ajouter photo</p>
        `;
    });
}

// Aperçu de l’image avant envoi
if (imageInput) {
    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imagePreview.innerHTML = `<img src="${reader.result}" alt="Aperçu">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Soumission du formulaire d’ajout
if (addPhotoForm) {
    addPhotoForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Vous devez être connecté pour ajouter un projet.");
            return;
        }

        const imageFile = imageInput.files[0];
        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value;

        if (!imageFile || !title || !category) {
            formError.classList.remove("hidden");
            return;
        }

        formError.classList.add("hidden");

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("title", title);
        formData.append("category", category);

        try {
            const newWork = await addWork(formData, token);

            // Mettre à jour immédiatement la galerie modale
            currentWorks.push(newWork);
            renderModalGallery(currentWorks);

            // Rafraîchir aussi la galerie principale
            document.dispatchEvent(new Event("galleryUpdated"));

            // Réinitialiser et revenir à la galerie
            modalAddView.classList.add("hidden");
            modalGalleryView.classList.remove("hidden");
            addPhotoForm.reset();
            imagePreview.innerHTML = `
                <i class="fa-regular fa-image"></i>
                <p>Ajouter photo</p>
            `;
        } catch (error) {
            console.error("Erreur lors de l’ajout :", error);
            alert("Impossible d’ajouter la photo.");
        }
    });
}
