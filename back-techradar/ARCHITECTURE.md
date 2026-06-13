# Architecture de TechRadar

## Vue d'ensemble

TechRadar est né de la frustration de passer 30 à 45 minutes par jour à
chercher des articles tech intéressants sur Dev.to, Hacker News et Medium.
L'objectif est de regrouper automatiquement ces articles et de les résumer
avec l'IA pour réduire au maximum le temps passé en veille technologique.

Pour l'instant, TechRadar utilise l'API de Dev.to pour récupérer des articles
par thématique (tags). Hacker News sera ajouté dans une phase ultérieure.

## Stack technique et pourquoi ces choix

- **Backend : Laravel (PHP)** — Choix fait pour mettre en pratique les
  compétences acquises pendant la formation EPITECH Coding Academy, dans
  un projet solo et concret.
- **Base de données : MySQL** — Combinaison utilisée régulièrement avec
  Laravel pendant la formation EPITECH, choix naturel par familiarité.
- **Frontend : Vue.js** (à venir, Phase 2)
- **Source de données : Dev.to API** — API publique, bien documentée,
  facile d'accès comparée à Hacker News (documentation minimaliste) et
  Medium (pas d'API publique accessible).

Le choix de stockage en base de données plutôt que d'appeler l'API Dev.to
à chaque requête vient d'une contrainte technique réelle : les APIs tierces
ont des limites de requêtes (rate limits), et les résumés générés par l'IA
ont un coût — il ne faut pas les regénérer à chaque affichage.

## Architecture — les deux flux

TechRadar fonctionne avec deux flux indépendants qui ne se rencontrent
qu'au niveau de la base de données.

**Flux 1 — Ingestion (arrière-plan, automatique)**

Le Scheduler Laravel (`routes/console.php`, `hourly()`) déclenche
`ArticleFetcher` toutes les heures, sans intervention humaine. Ce service
appelle l'API Dev.to et utilise `Article::updateOrCreate()` pour stocker
les articles en évitant les doublons — si un article avec la même URL
existe déjà, il est mis à jour plutôt que recréé.

**Flux 2 — Lecture (déclenché par l'utilisateur)**

Quand un utilisateur ouvre TechRadar, le frontend Vue.js fait une requête
vers `GET /api/articles`. Cette route appelle `ArticleController`, qui
récupère les articles depuis la BDD via `Article::all()` et les retourne
en JSON. Vue.js reçoit ce JSON et l'affiche sous forme de cartes lisibles
pour l'utilisateur.

Ces deux flux sont volontairement séparés : l'utilisateur ne déclenche
jamais d'appel direct à Dev.to. Il lit toujours des données déjà stockées
en BDD, ce qui évite de dépendre des rate limits de l'API au moment de
l'affichage.

## Structure des fichiers clés

- **`app/Models/Article.php`** — Représente la table `articles`. Définit
  les colonnes modifiables (`$fillable`) et c'est via cette classe qu'on
  lit et écrit en base de données (`Article::all()`, `Article::updateOrCreate()`).

- **`app/Http/Controllers/ArticleController.php`** — Reçoit la requête
  HTTP du frontend, appelle `Article::all()` pour récupérer les articles
  depuis la BDD, et retourne le résultat en JSON.

- **`app/Services/ArticleFetcher.php`** — Appelle l'API Dev.to, parse
  la réponse, et stocke chaque article en BDD via `Article::updateOrCreate()`
  pour éviter les doublons.

- **`routes/api.php`** — Définit le contrat entre backend et frontend :
  la route `GET /api/articles` qui renvoie la liste des articles.

- **`routes/console.php`** — Définit la tâche planifiée (`Schedule::call`,
  `hourly()`) qui déclenche `ArticleFetcher` automatiquement.

## Erreurs rencontrées et solutions

- **404 sur `/api/ping`** — `api.php` créé manuellement n'était pas
  enregistré dans `bootstrap/app.php`. Résolu avec `php artisan install:api`.

- **Access denied MySQL** — Les credentials dans `.env` étaient corrects
  mais commentés (préfixés par `#`).

- **MassAssignmentException** — Laravel bloque l'écriture en masse par
  défaut. Résolu en déclarant `$fillable` dans `Article.php`.

- **Incorrect datetime value** — Dev.to renvoie les dates au format ISO
  8601 (`2026-05-28T06:20:38Z`), MySQL attend `2026-05-28 06:20:38`.
  Résolu avec `Carbon::parse()`.

## Ce qui vient ensuite

- **Phase 2** : Frontend Vue.js — affichage des articles, filtres par catégorie
- **Phase 3** : Intégration IA — génération automatique des résumés via
  Claude API ou OpenAI, gestion des tokens et coûts
- **Phase 4** : Optimisation et déploiement — caching, ajout de Hacker News,
  amélioration UI/UX, déploiement
