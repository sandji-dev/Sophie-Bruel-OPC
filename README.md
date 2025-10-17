# 🏛️ Portfolio Architecte – Sophie Bluel

Projet front-end réalisé dans le cadre du parcours **Développeur Web** chez [OpenClassrooms](https://openclassrooms.com/).

---

## 🎯 Objectif du projet

Développer la partie **front-end** du site portfolio d'une architecte d'intérieur : **Sophie Bluel**.

L’objectif est de permettre :
- la **visualisation dynamique** des projets depuis une API (via `fetch`)
- la **connexion administrateur** via un formulaire de login
- la **gestion des projets** (ajout & suppression) à travers une **interface modale** sans rechargement de page.

---

## 🧩 Fonctionnalités principales

### 🔹 Visiteur
- Affichage des projets de l’architecte depuis l’API.
- Filtrage des projets par catégorie.
- Navigation fluide sans rechargement de page.

### 🔹 Administrateur (mode édition)
- Connexion via le formulaire de login.
- Apparition d’une **bannière “Mode édition”** et des boutons “Modifier”.
- Suppression d’un projet directement depuis la modale.
- Ajout d’un nouveau projet (image + titre + catégorie).
- Actualisation dynamique du DOM (pas besoin de recharger la page).

---

## ⚙️ Technologies utilisées

- **HTML5 / CSS3 / JavaScript (ES6)**
- **API REST**
- **Fetch API**
- **LocalStorage**
- **Font Awesome** pour les icônes

---

## 🧠 Architecture du projet

FrontEnd/
│
├── assets/
│ ├── images/
│ ├── icons/
│ ├── style.css
│ └── modal.css
│
├── javascript/
│ ├── apiService.js → Gestion des appels à l’API
│ ├── work.js → Chargement et affichage de la galerie
│ ├── modal.js → Gestion de la modale (ajout/suppression)
│ ├── login.js → Gestion du formulaire de connexion
│ └── auth.js → Mode édition et déconnexion
│
├── index.html → Page principale (galerie)
└── login.html → Page de connexion


---

## 🚀 Installation et utilisation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/sandji-dev/Sophie-Bruel-OPC.git
cd Sophie-Bruel-OPC

2️⃣ Lancer le serveur backend

⚠️ Le backend doit être lancé pour que le front puisse communiquer avec l’API.

Le backend du projet est disponible sur le dépôt :
👉 OpenClassrooms - Backend Sophie Bluel

Lancez-le avec :

npm install
npm start


Le backend tourne généralement sur :
📍 http://localhost:5678

3️⃣ Ouvrir le Front-end

Ouvrez le fichier index.html via un serveur local, par exemple avec VS Code Live Server.

🔐 Identifiants administrateur (fournis par l’API)
Email : sophie.bluel@test.tld
Mot de passe : S0phie

🧾 Critères de validation (résumés)

✅ Galerie dynamique (depuis l’API)
✅ Filtrage par catégories
✅ Connexion / déconnexion fonctionnelle
✅ Suppression d’un projet sans rechargement
✅ Ajout d’un projet avec aperçu image et mise à jour immédiate
✅ Code clair, organisé et commenté

👨‍💻 Auteur

Ricky Sandjon (sandji-dev)
📬 Profil GitHub:sandji-dev

📄 Licence

Projet réalisé dans le cadre d’une formation OpenClassrooms
.
Usage éducatif uniquement.