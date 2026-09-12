# Voyage Chine — Pouch

Application web simple pour organiser un voyage professionnel en Chine : itinéraire, rendez-vous fournisseurs pour la marque **Pouch**, et tourisme.

Pas de backend, pas de compte, pas d'installation : tout est stocké localement dans le navigateur (localStorage), avec export/import JSON pour sauvegarder ou transférer les données vers un autre appareil.

## Fonctionnalités

- **Accueil** — compte à rebours avant le départ, résumé (prochaines étapes, prochains rendez-vous fournisseurs, progression tourisme/checklist).
- **Itinéraire** — étapes par date/heure/ville (vol, hôtel, transport, activité, repas), à cocher une fois faites.
- **Fournisseurs** — carnet de rendez-vous : entreprise, contact, téléphone/email, date/heure, ville, lieu (usine/showroom), produits discutés, statut (à confirmer / confirmé / terminé / annulé), notes.
- **Tourisme** — lieux à visiter par ville, catégorie, priorité, à cocher une fois visités.
- **Checklist** — tâches (admin, bagage, marque Pouch, général).
- **Réglages** — nom/dates du voyage, thème clair/sombre, export/import JSON, réinitialisation.
- Utilisable en PWA : "Ajouter à l'écran d'accueil" sur mobile pour un accès rapide façon app native, avec cache hors-ligne basique.

Des exemples sont préchargés dans chaque section — modifie-les ou supprime-les librement.

## Utiliser l'app

Aucune installation nécessaire, tout est en HTML/CSS/JS pur.

**Le plus simple :** ouvre `index.html` directement dans un navigateur.

**Pour la version PWA / service worker** (nécessite un serveur, même local) :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

ou avec Node :

```bash
npx serve .
```

## Déployer en ligne (pour y accéder depuis le téléphone en Chine)

Le plus simple est **GitHub Pages** :

1. Dans les réglages du dépôt GitHub → *Pages*, choisir la branche courante et le dossier racine (`/`).
2. GitHub te donne une URL publique (ex. `https://<user>.github.io/china-trip-planner/`).
3. Ouvre cette URL sur ton téléphone et fais "Ajouter à l'écran d'accueil".

⚠️ En Chine, l'accès à GitHub Pages peut être instable selon le réseau — pense à utiliser un VPN, ou à garder l'app ouverte une fois chargée (le service worker met en cache les fichiers pour un usage hors-ligne).

## Sauvegarder / transférer les données

Les données vivent uniquement dans le navigateur utilisé (localStorage). Pour les avoir sur plusieurs appareils ou éviter de les perdre :

1. Réglages ⚙️ → **Exporter mes données (JSON)**.
2. Sur l'autre appareil, Réglages ⚙️ → **Importer des données** → sélectionner le fichier exporté.

## Structure du projet

```
index.html        Page principale
css/style.css      Style (thème clair/sombre)
js/data.js         Modèle de données + persistance localStorage
js/app.js          Logique de l'interface (rendu, formulaires, navigation)
manifest.json      Manifeste PWA
sw.js              Service worker (cache hors-ligne basique)
```
