# 🎬 Guide de Démonstration

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrir **http://localhost:5173/** dans votre navigateur.

## 🎯 Scénario de démonstration (5 minutes)

### 1. Page d'accueil (30 secondes)
- Montrer l'effet de frappe du texte
- Expliquer le concept : résumé automatique matinal
- Montrer les statistiques en bas (10 emails, 5 à traiter, 3 cartes Trello)
- Cliquer sur **"Démarrer la revue"**

### 2. Interface principale (4 minutes)

#### Vue d'ensemble
- **Gauche** : Conversation avec l'assistant IA
- **Droite** : Contenu contextuel (email ou Trello)

#### Premier email - Réservation
1. L'assistant présente automatiquement le premier email de Marie Dupont
2. Montrer l'email dans le panneau de droite (expéditeur, date, contenu)
3. Cliquer sur **"Générer réponse IA"**
   - Animation de génération (2 secondes)
   - Réponse personnalisée apparaît
4. Cliquer sur **"Modifier via IA"**
   - La réponse est légèrement reformulée
5. Cliquer sur **"Voir carte Trello associée"**
   - Transition vers la vue Trello
   - Montrer la checklist des actions à faire
6. Cliquer sur **"Retour au mail"**
7. Cliquer sur **"Envoyer"**
   - Toast de confirmation
   - Passage automatique à l'email suivant

#### Deuxième email - Question client
1. L'assistant annonce le nouvel email (Jean Martin - activités)
2. **"Générer réponse IA"** → Réponse sur les activités et piscine
3. **"Voir carte Trello"** si souhaité
4. **"Envoyer"** → Passage au suivant

#### Troisième email - Annulation
1. Email d'annulation de Sophie Laurent
2. Générer → Réponse avec conditions d'annulation
3. Envoyer → Passage au suivant

### 3. Points clés à souligner

#### Automatisation
- Tri automatique des emails (factures, spam)
- Analyse du contexte
- Génération de réponses personnalisées

#### Gain de temps
- 10 emails reçus → 5 nécessitent attention
- 3 traités automatiquement
- Réponses générées en 2 secondes

#### Intelligence contextuelle
- Chaque réponse adaptée au type d'email
- Tarifs calculés automatiquement
- Informations cohérentes

#### Intégration Trello
- Création automatique de cartes
- Checklist des actions à faire
- Synchronisation bidirectionnelle

## 💡 Messages clés pour le client

### Avant (situation actuelle)
- 2h par jour à répondre aux emails
- Risque d'oubli ou d'erreur
- Réponses parfois incohérentes
- Gestion manuelle de Trello

### Après (avec l'assistant)
- ✅ 80% d'emails traités automatiquement
- ✅ Réponses en 30 minutes au lieu de 2h
- ✅ Cohérence garantie
- ✅ Trello à jour en temps réel
- ✅ Aucun email oublié

## 🎨 Éléments visuels à mettre en avant

### Design moderne
- Interface épurée, professionnelle
- Animations fluides et naturelles
- Codes couleur intuitifs

### Expérience utilisateur
- Pas besoin de formation
- Navigation intuitive
- Feedback visuel constant

### Crédibilité
- Réponses de qualité professionnelle
- Ton chaleureux et personnalisé
- Adapté au contexte camping/tourisme

## 🔄 Parcours complet (si temps)

Le prototype contient **5 emails** :
1. **Marie Dupont** - Réservation juillet (avec Trello)
2. **Jean Martin** - Question activités (avec Trello)
3. **Sophie Laurent** - Annulation (avec Trello)
4. **Pierre Moreau** - Remerciements (sans Trello)
5. Message final de félicitations de l'assistant

## ❓ Questions fréquentes anticipées

### "C'est vraiment de l'IA ?"
**Réponse** : Ce prototype simule l'IA. La version finale utilisera GPT-4 ou Claude pour de vraies réponses contextuelles.

### "Ça marche avec Gmail ?"
**Réponse** : Oui, la version finale s'intégrera avec Gmail via API officielle.

### "Et si l'IA se trompe ?"
**Réponse** : Vous validez toujours avant envoi. L'IA propose, vous décidez. Option "Modifier via IA" pour ajuster.

### "Combien de temps pour développer ?"
**Réponse** : 2-3 mois pour une V1 fonctionnelle avec les fonctionnalités essentielles.

### "Quel coût ?"
**Réponse** : À discuter selon périmètre. L'API IA coûte ~0,01€ par email traité.

## 🎯 Objectif de la démo

À la fin, le client doit :
- ✅ Comprendre le concept et le flux
- ✅ Visualiser l'interface au quotidien
- ✅ Voir le gain de temps concret
- ✅ Avoir envie de la version finale

## 📱 Bonus : Mentionner les évolutions possibles

- Version mobile pour répondre en déplacement
- Synthèse vocale du résumé matinal
- Statistiques et analytics
- Multi-langue automatique
- Intégration calendrier de réservations
- Suggestions proactives

---

**Prêt pour la démo ! 🚀**
