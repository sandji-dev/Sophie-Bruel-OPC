// Vérifier si l'utilisateur est connecté
const token = localStorage.getItem("token");

if (token) {
  // Activer le mode édition
  document.body.classList.add("edit-mode");

  // Bannière noire "mode édition"
  const banner = document.createElement("div");
  banner.classList.add("edit-mode-banner");
  banner.innerHTML = `
    <i class="fa-regular fa-pen-to-square"></i>
    <p>Mode édition</p>
  `;
  document.body.prepend(banner);

  // Afficher les liens "modifier"
  const editLinks = document.querySelectorAll(".edit-link");
  editLinks.forEach(link => link.classList.remove("hidden"));

  // Changer "login" → "logout"
  const loginLink = document.querySelector("nav li a[href='login.html']");
  if (loginLink) {
    loginLink.textContent = "logout";
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      window.location.reload();
    });
}
}
