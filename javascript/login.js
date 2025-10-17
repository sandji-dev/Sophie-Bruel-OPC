import { loginUser } from "./apiService.js";

const form = document.querySelector("form");
const errorMessage = document.createElement("p");
errorMessage.classList.add("error-message");
form.appendChild(errorMessage);

// Fonction pour afficher les messages d’erreur 
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.color = "red";
    errorMessage.style.marginTop = "10px";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation simple
    if (!email || !password) {
        showError("Veuillez remplir tous les champs.");
        return;
    }

    try {
        const data = await loginUser(email, password);

        // Vérifie si un token est bien renvoyé
        if (data && data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html"; // redirection vers la page principale
        } else {
            showError("Email ou mot de passe incorrect.");
        }

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        if (error.message.includes("405")) {
            showError("Erreur 405 : Méthode non autorisée. Vérifie le serveur.");
        } else {
            showError("Connexion échouée. Vérifie ton email et ton mot de passe.");
        }
    }
});