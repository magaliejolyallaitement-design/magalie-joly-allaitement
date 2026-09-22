# Magalie Joly Allaitement 64 — export GitHub Pages

Cet export est un site statique autonome. Il ne dépend pas de React, de Vite, d’un serveur Node ou d’un CDN d’images pour son fonctionnement courant. Les images et les polices utilisées sont incluses dans `assets/`.

## Publication avec GitHub Pages

1. Créez un dépôt GitHub nommé `magalie-joly-allaitement`.
2. Déposez le contenu de ce dossier à la racine du dépôt, puis validez sur la branche `main`.
3. Dans **Settings → Pages**, choisissez **GitHub Actions** comme source de publication.
4. L’action `.github/workflows/deploy-pages.yml` publiera automatiquement le site après chaque modification de `main`.
5. Le fichier `CNAME` prépare le domaine `magaliejolyallaitement.fr`. Dans IONOS, configurez les enregistrements DNS demandés par GitHub Pages et attendez la propagation.

## Formulaire de contact

GitHub Pages ne traite pas directement les formulaires. Sur cet export, le formulaire ouvre le logiciel de messagerie de la personne avec les informations préremplies. Si vous préférez un formulaire en ligne sans logiciel de messagerie, remplacez ce mécanisme par un service de formulaire compatible avec votre compte.

## Modifier le site

Les pages HTML se trouvent à la racine et dans les dossiers de chaque page. Les styles sont dans `site.css`, les interactions dans `site.js`, et les ressources visuelles et typographiques dans `assets/`. Le lien de réservation est centralisé dans `SITE.bookingUrl` dans `site.js` ; le lien Google est dans `SITE.googleReviewsUrl`.

Après chaque modification, vérifiez l’accueil, la page Contact, les liens de réservation, le formulaire, les avis Google et l’affichage mobile.
