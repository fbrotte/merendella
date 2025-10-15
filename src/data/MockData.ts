export interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  content: string
  date: string
  category: 'reservation' | 'facture' | 'question' | 'spam' | 'prestataire'
  trelloCardId?: string
}

export interface TrelloCard {
  id: string
  title: string
  description: string
  list: string
  checklist: Array<{ id: string; text: string; checked: boolean }>
  linkedEmailId?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export const mockEmails: Email[] = [
  {
    id: 'email-1',
    sender: 'Laura Mercier',
    senderEmail: 'l.mercier@digitalpulse-marketing.com',
    subject: 'Campagne été 2025 - Questions sur le brief',
    content: `Bonjour François,

J'espère que vous allez bien. J'ai bien reçu votre cahier des charges pour la campagne digitale été 2025 du Camping Merendella.

Avant de vous envoyer notre proposition détaillée, j'aurais quelques questions de clarification :

1. Concernant le budget global de 15K€, souhaitez-vous que l'on inclue aussi la création de contenu vidéo ou uniquement les visuels statiques ?

2. Pour le ciblage publicitaire, vous mentionnez "familles avec enfants 4-12 ans" - avez-vous des données sur vos clients actuels que nous pourrions utiliser pour affiner les personas ?

3. Le calendrier indique un démarrage campagne le 15 mars - confirmez-vous que vous aurez validé tous les visuels avant cette date ?

Pourriez-vous me partager également les résultats de la campagne 2024 dont vous faisiez mention lors de notre dernière réunion ?

Merci d'avance,
Laura Mercier
Chef de Projet Digital
Digital Pulse Marketing`,
    date: '2024-10-09 08:30',
    category: 'prestataire',
    trelloCardId: 'trello-1'
  },
  {
    id: 'email-2',
    sender: 'Comptabilité EDF',
    senderEmail: 'factures@edf.fr',
    subject: 'Votre facture EDF de septembre 2024',
    content: `Bonjour,

Votre facture d'électricité pour le mois de septembre est disponible.

Montant: 847,32 €
Échéance: 25 octobre 2024

Cordialement,
Service Client EDF`,
    date: '2024-10-09 07:15',
    category: 'facture'
  },
  {
    id: 'email-3',
    sender: 'Jean Martin',
    senderEmail: 'jm.martin@outlook.fr',
    subject: 'Question sur les activités',
    content: `Bonjour François,

Nous avons réservé pour la semaine prochaine et je voulais savoir quelles activités sont proposées pour les enfants de 8 ans ?

Y a-t-il une piscine chauffée ?

Merci !
Jean`,
    date: '2024-10-09 09:45',
    category: 'question',
    trelloCardId: 'trello-2'
  },
  {
    id: 'email-4',
    sender: 'Sophie Laurent',
    senderEmail: 'sophie.l@free.fr',
    subject: 'Annulation réservation',
    content: `Bonjour,

Malheureusement, je dois annuler ma réservation du 20 au 27 août pour raisons familiales.

Référence: RES-2024-0892

Merci de me confirmer l'annulation.
Sophie Laurent`,
    date: '2024-10-09 10:20',
    category: 'reservation',
    trelloCardId: 'trello-3'
  },
  {
    id: 'email-5',
    sender: 'Pierre Moreau',
    senderEmail: 'p.moreau@gmail.com',
    subject: 'Félicitations pour votre séjour exceptionnel!',
    content: `Bonjour,

Nous avons passé un excellent séjour la semaine dernière. L'accueil était parfait, les emplacements bien entretenus.

Un grand merci à toute l'équipe !

Pierre Moreau`,
    date: '2024-10-09 11:00',
    category: 'question'
  }
]

export const mockTrelloCards: TrelloCard[] = [
  {
    id: 'trello-1',
    title: 'Campagne Marketing Été 2025 - Digital Pulse',
    description: 'Projet campagne digitale avec Digital Pulse Marketing\nBudget: 15K€\nLancement prévu: 15 mars 2025',
    list: 'Projets Marketing',
    checklist: [
      { id: '1', text: 'Valider le budget final (vidéo incluse ou non)', checked: false },
      { id: '2', text: 'Partager données clients 2024 pour personas', checked: false },
      { id: '3', text: 'Confirmer résultats campagne 2024', checked: false },
      { id: '4', text: 'Valider le timeline de validation des visuels', checked: false }
    ],
    linkedEmailId: 'email-1'
  },
  {
    id: 'trello-2',
    title: 'Question activités - Jean Martin',
    description: 'Client arrive la semaine prochaine\nDemande infos activités enfants 8 ans + piscine',
    list: 'À traiter rapidement',
    checklist: [
      { id: '1', text: 'Envoyer programme activités enfants', checked: false },
      { id: '2', text: 'Confirmer piscine chauffée 28°C', checked: false },
      { id: '3', text: 'Mentionner club enfants 4-12 ans', checked: false }
    ],
    linkedEmailId: 'email-3'
  },
  {
    id: 'trello-3',
    title: 'Annulation RES-2024-0892',
    description: 'Sophie Laurent - Annulation du 20-27 août\nRaisons familiales',
    list: 'Annulations & Remboursements',
    checklist: [
      { id: '1', text: 'Vérifier conditions annulation', checked: false },
      { id: '2', text: 'Calculer montant remboursement', checked: false },
      { id: '3', text: 'Libérer l\'emplacement dans le planning', checked: false },
      { id: '4', text: 'Envoyer confirmation annulation', checked: false }
    ],
    linkedEmailId: 'email-4'
  }
]

export const initialMessages: Message[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: 'Bonjour François ! Vous avez reçu 10 nouveaux mails. 3 ont été déplacés dans Factures, 2 supprimés comme spam, et 5 nécessitent une réponse.',
    timestamp: '09:00'
  }
]

// Interface pour les actions de l'IA (processus RAG visible)
export interface AIAction {
  id: string
  type: 'search' | 'analyze' | 'retrieve' | 'generate'
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  details?: string
}

export const mockAIActions: AIAction[] = [
  {
    id: 'action-1',
    type: 'analyze',
    description: 'Analyse de l\'expéditeur',
    status: 'pending',
    details: 'l.mercier@digitalpulse-marketing.com'
  },
  {
    id: 'action-2',
    type: 'search',
    description: 'Recherche du contexte prestataire',
    status: 'pending',
    details: 'Digital Pulse Marketing - Historique des échanges'
  },
  {
    id: 'action-3',
    type: 'retrieve',
    description: 'Récupération du cahier des charges',
    status: 'pending',
    details: 'Cahier_des_charges_campagne_ete_2025.pdf'
  },
  {
    id: 'action-4',
    type: 'retrieve',
    description: 'Extraction des données campagne 2024',
    status: 'pending',
    details: 'Rapport_performance_campagne_2024.xlsx'
  },
  {
    id: 'action-5',
    type: 'search',
    description: 'Recherche statistiques clients actuels',
    status: 'pending',
    details: 'Base de données CRM - Segmentation familles'
  },
  {
    id: 'action-6',
    type: 'generate',
    description: 'Génération de la réponse contextualisée',
    status: 'pending'
  }
]

export const mockAIResponse = {
  prestataire: `Bonjour Laura,

Merci pour votre email et pour votre réactivité sur ce projet.

Voici les réponses à vos questions :

**1. Budget et contenu vidéo :**
Le budget de 15K€ doit inclure la création de 2-3 vidéos courtes (30-45 sec) pour les réseaux sociaux. C'était un point important de notre brief initial. Si cela pose problème au niveau budget, merci de me proposer une alternative.

**2. Ciblage et personas :**
Excellente question ! Je vous transfère en pièce jointe notre analyse clients 2024. Voici quelques chiffres clés :
- 68% de familles avec enfants 4-12 ans
- 45% viennent de région parisienne, 30% Grand-Est, 25% autres
- Durée moyenne séjour : 10 jours
- Pic de réservation : février-mars

**3. Timeline de validation :**
Oui, je confirme la date du 15 mars pour le démarrage. Pour respecter ce délai, il faudrait que tous les visuels soient soumis avant le 1er mars, ce qui me laisse 2 semaines de validation.

**Résultats campagne 2024 :**
- ROI : 4,2x
- Taux de conversion : 8,5%
- 892 réservations directement attribuées à la campagne
- Budget investi : 12K€

Je reste disponible si vous avez besoin d'autres informations.

Cordialement,
François
Camping Merendella`,

  reservation: `Bonjour Marie,

Merci pour votre demande de réservation !

J'ai le plaisir de vous confirmer que nous avons de la disponibilité pour la période souhaitée (15-29 juillet).

Pour un emplacement grand confort adapté à votre camping-car de 7m, le tarif est de 48€/nuit en haute saison, soit 672€ pour 14 nuits.

Ce tarif comprend :
- Emplacement spacieux avec électricité
- Accès piscine chauffée
- Activités enfants incluses

Pour confirmer votre réservation, un acompte de 30% (201,60€) est demandé.

Cordialement,
François - Camping Merendella`,

  question: `Bonjour Jean,

Merci pour votre message !

Concernant les activités pour votre enfant de 8 ans, nous proposons :
- Club enfants 4-12 ans (tous les matins)
- Chasse au trésor le mercredi
- Ateliers créatifs et sportifs
- Mini-disco en soirée

Oui, notre piscine est chauffée à 28°C toute la saison !

Au plaisir de vous accueillir la semaine prochaine.

Cordialement,
François - Camping Merendella`,

  annulation: `Bonjour Sophie,

Je comprends votre situation et j'ai bien pris note de votre demande d'annulation pour la réservation RES-2024-0892 (20-27 août).

Conformément à nos conditions :
- Annulation à plus de 30 jours : remboursement intégral de l'acompte
- Votre remboursement de 189€ sera effectué sous 7 jours ouvrés

L'emplacement a été libéré dans notre planning.

En espérant vous accueillir une prochaine fois.

Cordialement,
François - Camping Merendella`
}
