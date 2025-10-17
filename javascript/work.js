import { fetchWorks, fetchCategories } from "./apiService.js";

const galleryContainer = document.getElementById("gallery");
const categoryFilters = document.getElementById("category-filters");

// on Charge les projets
export async function loadGallery() {
    try {
        const works = await fetchWorks();
        displayGallery(works);
        setupFilters(works);
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

// Affiche les projets dans la galerie
function displayGallery(works) {
    galleryContainer.innerHTML = "";

    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const caption = document.createElement("figcaption");
        caption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        galleryContainer.appendChild(figure);
    });
}
// Filtres par catégorie 
async function setupFilters(works) {
    // Si l’utilisateur est connecté → on ne crée PAS les filtres
    const token = localStorage.getItem("token");
    if (token) {
        categoryFilters.innerHTML = ""; // Supprime les filtres si on est connecté
        categoryFilters.style.display = "none";
        return;
    }

    try {
        const categories = await fetchCategories();
        categoryFilters.innerHTML = "";
        categoryFilters.style.display = "flex";

        // Bouton "Tous"
        const allBtn = document.createElement("button");
        allBtn.textContent = "Tous";
        allBtn.classList.add("filter-btn", "active");
        allBtn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            allBtn.classList.add("active");
            displayGallery(works);
        });
        categoryFilters.appendChild(allBtn);

        // Boutons pour chaque catégorie
        categories.forEach(cat => {
            const btn = document.createElement("button");
            btn.textContent = cat.name;
            btn.classList.add("filter-btn");
            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                btn.classList.add("active");
                const filtered = works.filter(w => w.categoryId === cat.id);
                displayGallery(filtered);
            });
            categoryFilters.appendChild(btn);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des filtres :", error);
    }
}
// Mode connecté (édition)
function setupEditMode() {
    const token = localStorage.getItem("token");
    const editBtn = document.getElementById("edit-btn");

    if (token && editBtn) {
        editBtn.classList.remove("hidden");
        categoryFilters.style.display = "none";
    } else if (editBtn) {
        editBtn.classList.add("hidden");
        categoryFilters.style.display = "flex"; 
    }
}
// Rafraîchir la galerie après ajout/suppression
document.addEventListener("galleryUpdated", () => {
    loadGallery();
});
//Initialisation
setupEditMode();
loadGallery();
