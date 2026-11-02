# Mon carnet rétablissement

Carnet personnel de Philippe Vaudan, pair praticien en santé mentale, sous forme d'application installable (PWA).

- S'installe sur l'écran d'accueil (iPhone, Android, ordinateur).
- Fonctionne hors connexion.
- Les réponses restent uniquement sur l'appareil de la personne : rien n'est envoyé sur internet.
- Export des fiches en PDF.

## Mettre en ligne sur GitHub Pages

1. Sur github.com, crée un nouveau dépôt public nommé `carnet-retablissement`.
2. Dans le dépôt : **Add file → Upload files**, puis glisse **tout le contenu** de ce dossier (pas le dossier lui-même). Valide avec **Commit changes**.
3. **Settings → Pages** : dans « Branch », choisis `main` et `/ (root)`, puis **Save**.
4. Après une ou deux minutes, le carnet est en ligne à l'adresse :
   `https://TON-NOM-GITHUB.github.io/carnet-retablissement/`

Cette adresse ne doit plus changer une fois que des personnes ont installé le carnet.

## Mettre à jour le carnet

1. Remplace les fichiers modifiés dans le dépôt (Upload files, même nom).
2. Dans `sw.js`, augmente le numéro de version (`v1` → `v2`, etc.).
3. Les téléphones reçoivent la nouvelle version à la prochaine ouverture avec internet. Les réponses déjà écrites sont conservées.

## Contenu du dossier

- `index.html` : le carnet
- `manifest.webmanifest`, `sw.js`, `icons/` : ce qui en fait une application installable et hors ligne
- `vendor/` : outils pour lire et créer les PDF, et pour le QR code
- `ressources/`, `annexes/` : documents PDF du carnet
