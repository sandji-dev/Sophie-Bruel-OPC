const API_URL = "http://localhost:5678/api";

//Récupérer tous les travaux
export async function fetchWorks() {
    try {
        const response = await fetch(`${API_URL}/works`);
        if (!response.ok) throw new Error("Erreur lors du chargement des travaux");
        return await response.json();
    } catch (error) {
        throw error;
    }
}
//  Récupérer les catégories
export async function fetchCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error("Erreur lors du chargement des catégories");
        return await response.json();
    } catch (error) {
        console.error("Erreur API fetchCategories :", error);
        throw error;
    }
}
//  Connexion utilisateur
export async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            if (response.status === 405) {
                throw new Error("Méthode non autorisée (405) — Vérifie le serveur ou la méthode HTTP.");
            } else {
                throw new Error("Email ou mot de passe incorrect.");
            }
        }

        const data = await response.json();
        return data; // contient { token: "..." }

    } catch (error) {
        console.error("Erreur dans loginUser :", error);
        throw error;
    }
}
// Supprimer un travail
export async function deleteWork(workId, token) {
    try {
        const response = await fetch(`${API_URL}/works/${workId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.ok;
    } catch (error) {
        console.error("Erreur API deleteWork :", error);
        throw error;
    }
}
// Ajouter un travail
export async function addWork(formData, token) {
    try {
        const response = await fetch(`${API_URL}/works`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erreur ${response.status}: ${errorText}`);
        }

        return await response.json(); // Renvoie le nouveau projet ajouté

    } catch (error) {
        console.error("Erreur API addWork :", error);
        throw error;
    }
}
