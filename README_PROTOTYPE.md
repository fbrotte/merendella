# 🏕️ Assistant IA - Camping Merendella (Prototype)

Un prototype visuel interactif présentant l'interface d'un assistant IA pour la gestion des emails et tâches d'un camping.

## 🎯 Objectif

Ce prototype est une **maquette interactive non-fonctionnelle** conçue pour visualiser les interactions principales du système :
- Revue matinale automatique des emails
- Conversation avec l'assistant IA
- Génération automatique de réponses
- Intégration avec Trello pour le suivi des tâches

## ✨ Fonctionnalités du prototype

### Page d'accueil
- Effet de frappe animé pour le résumé matinal
- Statistiques en temps réel (emails reçus, à traiter, etc.)
- Transition fluide vers l'écran principal

### Écran principal (2 colonnes)
- **Colonne gauche** : Historique de conversation avec l'IA
  - Messages utilisateur et assistant
  - Animation d'apparition progressive
  - Indicateur de statut en ligne

- **Colonne droite** : Panneau contextuel
  - Affichage détaillé des emails
  - Vue des cartes Trello associées
  - Boutons d'action interactifs

### Interactions simulées
- ✅ Génération de réponse IA (avec délai réaliste)
- ✅ Modification de réponse via IA
- ✅ Envoi de réponse avec notification
- ✅ Navigation entre email et carte Trello
- ✅ Progression automatique vers l'email suivant

## 🚀 Démarrage rapide

### Installation
```bash
npm install
```

### Lancement
```bash
npm run dev
```

Le prototype sera accessible sur **http://localhost:5173/**

## 🛠️ Stack technique

- **React 18** + **TypeScript** : Framework et typage
- **Vite** : Build tool ultra-rapide
- **TailwindCSS** : Styling moderne et responsive
- **Framer Motion** : Animations fluides
- **Lucide React** : Icônes élégantes

## 📁 Structure du projet

```
src/
├── components/
│   ├── HomePage.tsx          # Page d'accueil avec effet de frappe
│   ├── MainScreen.tsx         # Écran principal orchestrateur
│   ├── ChatColumn.tsx         # Colonne de conversation IA
│   ├── ContextPanel.tsx       # Panneau email/Trello
│   └── Toast.tsx              # Notifications
├── data/
│   └── MockData.ts            # Données simulées (emails, Trello, réponses IA)
├── lib/
│   └── utils.ts               # Utilitaires (cn helper)
├── App.tsx                    # Point d'entrée principal
└── index.css                  # Styles globaux + Tailwind
```

## 🎨 Design

### Palette de couleurs
- **Principal** : Bleu (#3b82f6) - Confiance et technologie
- **Succès** : Vert (#16a34a) - Actions positives
- **Trello** : Violet (#9333ea) - Intégration Trello
- **Neutre** : Gris - Backgrounds et textes

### Typographie
- **Font principale** : Inter (Google Fonts)
- Design moderne, épuré, inspiré de Notion et Linear

### Animations
- Transitions fluides entre les écrans
- Effet de frappe pour le texte
- Apparition progressive des messages
- Feedback visuel sur toutes les actions

## 📊 Données simulées

Le prototype utilise 5 emails d'exemple représentant différents cas d'usage :
1. **Réservation** : Demande de réservation pour juillet
2. **Facture** : Facture EDF (auto-classée)
3. **Question** : Demande d'informations sur les activités
4. **Annulation** : Demande d'annulation de réservation
5. **Retour client** : Message de remerciement

Chaque email pertinent a une carte Trello associée avec une checklist d'actions.

## 🎭 Scénario d'utilisation

1. **Arrivée** : Le gérant arrive et voit le résumé matinal
2. **Démarrage** : Clic sur "Démarrer la revue"
3. **Traitement** : Pour chaque email :
   - Lecture du contexte
   - Génération de réponse IA
   - Modification si nécessaire
   - Consultation de la carte Trello
   - Envoi de la réponse
4. **Progression** : Passage automatique à l'email suivant
5. **Fin** : Message de confirmation de fin de traitement

## ⚠️ Limitations (par design)

Ce prototype est **intentionnellement non-fonctionnel** :
- ❌ Pas de connexion à une vraie boîte email
- ❌ Pas d'API Trello réelle
- ❌ Pas d'IA backend
- ❌ Pas de persistance des données
- ❌ Pas d'authentification

Toutes les interactions sont **simulées** avec des données mockées et des délais réalistes.

## 🎯 Objectif de démonstration

Le prototype permet au client de :
- **Visualiser** l'interface finale
- **Comprendre** le flux de travail
- **Tester** les interactions principales
- **Valider** l'UX avant le développement

## 🔮 Prochaines étapes (après validation)

1. Backend avec véritable IA (GPT-4, Claude)
2. Intégration Gmail API
3. Connexion Trello API
4. Base de données pour la persistance
5. Authentification et multi-utilisateurs
6. Version mobile responsive
7. Statistiques et analytics

## 📝 Notes techniques

- Le prototype fonctionne entièrement côté client
- Aucune configuration backend nécessaire
- Temps de chargement ultra-rapide
- Compatible tous navigateurs modernes

## 🤝 Pour toute question

Ce prototype a été créé pour présenter visuellement le concept. Il s'agit d'une base pour discuter des fonctionnalités avant le développement complet.

---

**Fait avec ❤️ pour le Camping Merendella**
