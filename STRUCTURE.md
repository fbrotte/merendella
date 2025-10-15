# 📂 Structure du projet

```
camping-assistant-prototype/
│
├── 📄 Configuration
│   ├── package.json              # Dépendances et scripts
│   ├── tsconfig.json             # Configuration TypeScript
│   ├── vite.config.ts            # Configuration Vite
│   ├── tailwind.config.js        # Configuration TailwindCSS
│   ├── postcss.config.js         # Configuration PostCSS
│   └── eslint.config.js          # Configuration ESLint
│
├── 📚 Documentation
│   ├── README_PROTOTYPE.md       # Documentation complète du prototype
│   ├── GUIDE_DEMO.md            # Guide pour la démo client
│   └── STRUCTURE.md             # Ce fichier (architecture)
│
├── 🎨 Public
│   └── vite.svg                  # Logo Vite
│
└── 💻 Source (src/)
    │
    ├── 🎯 Racine
    │   ├── main.tsx              # Point d'entrée React
    │   ├── App.tsx               # Composant racine (navigation home/main)
    │   └── index.css             # Styles globaux + Tailwind
    │
    ├── 🧩 Composants (components/)
    │   ├── HomePage.tsx          # Page d'accueil avec effet de frappe
    │   ├── MainScreen.tsx        # Écran principal (orchestrateur)
    │   ├── ChatColumn.tsx        # Colonne conversation IA (gauche)
    │   ├── ContextPanel.tsx      # Panneau email/Trello (droite)
    │   └── Toast.tsx             # Notifications toast
    │
    ├── 📊 Données (data/)
    │   └── MockData.ts           # Données simulées (emails, Trello, réponses IA)
    │
    ├── 🛠️ Utilitaires (lib/)
    │   └── utils.ts              # Helper cn() pour classes CSS
    │
    └── 🎨 Assets (assets/)
        └── react.svg             # Logo React
```

## 📦 Composants détaillés

### App.tsx
**Rôle** : Gestion de la navigation principale
- État : `home` ou `main`
- Transitions animées avec Framer Motion
- Point d'entrée de l'application

### HomePage.tsx
**Rôle** : Page d'accueil / Landing
**Fonctionnalités** :
- Effet de frappe (typing effect) pour le message d'accueil
- Statistiques animées (emails reçus, à traiter, cartes Trello)
- Bouton "Démarrer la revue"
- Design moderne avec dégradé et animations

**Props** :
- `onStart()` : Callback pour passer à l'écran principal

### MainScreen.tsx
**Rôle** : Orchestrateur principal de l'application
**Fonctionnalités** :
- Gestion de l'état global (messages, emails, mode)
- Logique des interactions (générer, modifier, envoyer)
- Progression automatique entre les emails
- Coordination ChatColumn + ContextPanel

**État géré** :
- `messages[]` : Historique conversation
- `currentEmailIndex` : Email en cours
- `panelMode` : 'email' ou 'trello'
- `aiResponse` : Réponse générée
- `isGenerating` : État de chargement

### ChatColumn.tsx
**Rôle** : Affichage de la conversation avec l'IA
**Fonctionnalités** :
- Liste des messages (user + assistant)
- Avatars et bulles de conversation
- Auto-scroll vers le dernier message
- Indicateur "en ligne"
- Input désactivé (prototype only)

**Props** :
- `messages[]` : Liste des messages à afficher

### ContextPanel.tsx
**Rôle** : Panneau contextuel email/Trello
**Fonctionnalités** :
- Mode double : email OU trello
- Affichage email complet (sender, date, contenu)
- Affichage carte Trello (checklist)
- Zone de réponse IA générée
- Boutons d'action contextuels
- Transitions animées entre modes

**Props** :
- `mode` : 'email' | 'trello'
- `email?` : Email à afficher
- `trelloCard?` : Carte Trello à afficher
- `aiResponse?` : Réponse IA générée
- `isGenerating?` : État de génération
- Callbacks pour toutes les actions

### Toast.tsx
**Rôle** : Notifications temporaires
**Fonctionnalités** :
- Apparition/disparition animée
- Auto-fermeture après 3 secondes
- Position fixe en bas à droite
- Design avec succès (vert)

**Props** :
- `message` : Texte à afficher
- `show` : Visibilité
- `onClose()` : Callback de fermeture

## 📊 Données (MockData.ts)

### Interfaces TypeScript

```typescript
interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  content: string
  date: string
  category: 'reservation' | 'facture' | 'question' | 'spam'
  trelloCardId?: string
}

interface TrelloCard {
  id: string
  title: string
  description: string
  list: string
  checklist: Array<{ id: string; text: string; checked: boolean }>
  linkedEmailId?: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
```

### Données mockées

- **mockEmails** : 5 emails d'exemple
  - Réservation (Marie Dupont)
  - Facture EDF (auto-classée)
  - Question activités (Jean Martin)
  - Annulation (Sophie Laurent)
  - Remerciements (Pierre Moreau)

- **mockTrelloCards** : 3 cartes Trello
  - Liées aux 3 premiers emails
  - Checklists d'actions à faire

- **mockAIResponse** : Réponses pré-rédigées par catégorie
  - reservation
  - question
  - annulation

## 🎨 Styling

### TailwindCSS
- **Palette personnalisée** : primary (blue)
- **Font** : Inter (Google Fonts)
- **Utility-first** : Classes Tailwind partout

### Framer Motion
- **Transitions** : Entre pages et composants
- **Animations** : Apparition progressive, hover effects
- **Gestures** : Effets au survol

### Lucide Icons
- Icons modernes et cohérents
- Utilisés dans tous les composants

## 🔄 Flux de données

```
App.tsx (navigation)
    ↓
HomePage.tsx → onStart() →
    ↓
MainScreen.tsx (état global)
    ↓
    ├─→ ChatColumn.tsx (messages)
    │
    └─→ ContextPanel.tsx (email/trello)
            ↓
        Callbacks ← MainScreen
            ↓
        État mis à jour
            ↓
        Re-render
```

## 🚀 Scripts disponibles

```bash
npm run dev      # Lancer le serveur de développement
npm run build    # Build pour production
npm run preview  # Prévisualiser le build
npm run lint     # Linter le code
```

## 📏 Tailles approximatives

- **Total lignes de code** : ~1200 lignes
- **Composants** : 5 composants React
- **Mock data** : ~200 lignes
- **Poids bundle (prod)** : ~150 KB gzippé

## 🎯 Principes de design

1. **Single Responsibility** : Chaque composant a un rôle clair
2. **Props drilling minimal** : État centralisé dans MainScreen
3. **Typage strict** : Toutes les interfaces définies
4. **Immutabilité** : Pas de mutation d'état direct
5. **Composition** : Petits composants réutilisables

---

**Architecture simple, moderne et maintenable** ✨
