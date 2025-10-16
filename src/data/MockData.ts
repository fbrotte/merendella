export interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  content: string
  date: string
  category: 'reservation' | 'facture' | 'question' | 'spam' | 'prestataire' | 'rendez-vous' | 'recherche-doc' | 'rappel'
  trelloCardId?: string
  attachments?: Array<{ name: string; type: string; size: string }>
}

export interface Document {
  id: string
  title: string
  type: 'pdf' | 'docx' | 'xlsx' | 'image'
  size: string
  date: string
  preview: string
  relevance: number
}

export interface Reminder {
  id: string
  title: string
  description: string
  date: string
  time: string
  priority: 'low' | 'medium' | 'high'
  isNew?: boolean
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
    sender: 'Marc Dubois',
    senderEmail: 'm.dubois@ecotech-solutions.fr',
    subject: 'Rendez-vous - Installation panneaux solaires',
    content: `Bonjour François,

Suite à notre échange téléphonique de la semaine dernière concernant l'installation de panneaux solaires photovoltaïques sur le bâtiment principal du camping, je souhaiterais planifier un rendez-vous sur site pour :

- Évaluer précisément la surface disponible
- Mesurer l'ensoleillement actuel
- Vous présenter notre proposition technique détaillée
- Établir un devis personnalisé

Seriez-vous disponible dans les 10 prochains jours pour cette visite technique ? Celle-ci dure environ 1h30.

Dans l'attente de votre retour,
Cordialement,

Marc Dubois
Ingénieur Commercial
EcoTech Solutions`,
    date: '2024-10-09 09:15',
    category: 'rendez-vous',
    trelloCardId: 'trello-2'
  },
  {
    id: 'scenario-3',
    sender: 'Recherche de documents',
    senderEmail: '',
    subject: 'Recherche de documents - Projet rénovation piscine',
    content: '',
    date: '2024-10-09 10:00',
    category: 'recherche-doc'
  },
  {
    id: 'scenario-4',
    sender: 'Création de rappel',
    senderEmail: '',
    subject: 'Rappel - Vérifier les réservations',
    content: '',
    date: '2024-10-09 10:30',
    category: 'rappel'
  },
  {
    id: 'email-3',
    sender: 'Aquatech Solutions',
    senderEmail: 'facturation@aquatech-solutions.fr',
    subject: 'Facture n°2024-0892 - Travaux piscine',
    content: `Bonjour,

Veuillez trouver ci-joint la facture n°2024-0892 pour les travaux de rénovation de la piscine effectués en septembre 2024.

Montant total : 12 450,00 € TTC
Échéance de paiement : 30 jours

Cordialement,
Service Facturation
Aquatech Solutions`,
    date: '2024-10-09 11:00',
    category: 'facture',
    attachments: [
      {
        name: 'Facture_2024-0892_Aquatech.pdf',
        type: 'application/pdf',
        size: '245 KB'
      }
    ]
  }
]

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'Plans architecte - Rénovation piscine 2024.pdf',
    type: 'pdf',
    size: '2.4 MB',
    date: '2024-03-15',
    preview: 'Plans détaillés de la rénovation de la piscine principale incluant l\'agrandissement du bassin enfants, la nouvelle zone de plongeon et l\'installation du système de chauffage solaire.',
    relevance: 95
  },
  {
    id: 'doc-2',
    title: 'Devis Aquatech - Travaux piscine.xlsx',
    type: 'xlsx',
    size: '156 KB',
    date: '2024-03-20',
    preview: 'Devis détaillé d\'Aquatech Solutions pour les travaux de rénovation. Inclut le calendrier prévisionnel, les coûts par poste et les conditions de paiement.',
    relevance: 88
  },
  {
    id: 'doc-3',
    title: 'Projet piscine - Validation mairie.pdf',
    type: 'pdf',
    size: '890 KB',
    date: '2024-02-28',
    preview: 'Autorisation de travaux délivrée par la mairie pour le projet de rénovation et d\'agrandissement de la piscine. Permis de construire PC-2024-0156.',
    relevance: 82
  }
]

export const mockReminders: Reminder[] = [
  {
    id: 'reminder-1',
    title: 'Appeler le fournisseur piscine',
    description: 'Relancer Aquatech pour le devis final des travaux de rénovation',
    date: '2024-10-12',
    time: '10:00',
    priority: 'high'
  },
  {
    id: 'reminder-2',
    title: 'Réunion équipe animation',
    description: 'Préparer le planning des activités pour la semaine prochaine',
    date: '2024-10-13',
    time: '14:30',
    priority: 'medium'
  },
  {
    id: 'reminder-3',
    title: 'Vérifier stock produits entretien',
    description: 'Inventaire des produits de nettoyage et commande si nécessaire',
    date: '2024-10-15',
    time: '09:00',
    priority: 'low'
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
    title: 'RDV EcoTech - Panneaux Solaires',
    description: 'Rendez-vous avec Marc Dubois (EcoTech Solutions)\nVisite technique installation panneaux photovoltaïques\nDurée: 1h30',
    list: 'Rendez-vous',
    checklist: [
      { id: '1', text: 'Confirmer le créneau avec Marc Dubois', checked: true },
      { id: '2', text: 'Créer événement Google Calendar', checked: true },
      { id: '3', text: 'Préparer les plans du bâtiment principal', checked: false },
      { id: '4', text: 'Rassembler les factures électricité 2024', checked: false }
    ],
    linkedEmailId: 'email-2'
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

// Actions RAG pour le rendez-vous (email 2)
export const mockAIActionsRDV: AIAction[] = [
  {
    id: 'action-rdv-1',
    type: 'analyze',
    description: 'Analyse de la demande de rendez-vous',
    status: 'pending',
    details: 'm.dubois@ecotech-solutions.fr - Visite technique panneaux solaires'
  },
  {
    id: 'action-rdv-2',
    type: 'retrieve',
    description: 'Accès à l\'agenda Google Calendar',
    status: 'pending',
    details: 'Calendrier François - 10 prochains jours'
  },
  {
    id: 'action-rdv-3',
    type: 'search',
    description: 'Identification des créneaux disponibles',
    status: 'pending',
    details: '1h30 requis - hors période haute affluence'
  },
  {
    id: 'action-rdv-4',
    type: 'analyze',
    description: 'Sélection du créneau optimal',
    status: 'pending',
    details: 'Mardi 15 octobre, 14h00-15h30'
  },
  {
    id: 'action-rdv-5',
    type: 'generate',
    description: 'Création de l\'événement calendrier',
    status: 'pending',
    details: 'Google Calendar + notification'
  },
  {
    id: 'action-rdv-6',
    type: 'generate',
    description: 'Génération de la réponse avec confirmation',
    status: 'pending'
  }
]

// Actions RAG pour la recherche de documents (scenario 3)
export const mockAIActionsDocSearch: AIAction[] = [
  {
    id: 'action-doc-1',
    type: 'analyze',
    description: 'Analyse de la demande utilisateur',
    status: 'pending',
    details: 'Recherche : plans projet rénovation piscine'
  },
  {
    id: 'action-doc-2',
    type: 'search',
    description: 'Recherche dans la base documentaire',
    status: 'pending',
    details: 'Scan de 1,247 documents du camping'
  },
  {
    id: 'action-doc-3',
    type: 'analyze',
    description: 'Analyse sémantique des documents',
    status: 'pending',
    details: 'Traitement NLP - Extraction mots-clés'
  },
  {
    id: 'action-doc-4',
    type: 'retrieve',
    description: 'Récupération des documents pertinents',
    status: 'pending',
    details: '3 documents trouvés avec score > 80%'
  },
  {
    id: 'action-doc-5',
    type: 'analyze',
    description: 'Classement par pertinence',
    status: 'pending',
    details: 'Tri par score de similarité'
  }
]

// Actions RAG pour la création de rappel (scenario 4)
export const mockAIActionsReminder: AIAction[] = [
  {
    id: 'action-reminder-1',
    type: 'analyze',
    description: 'Analyse de la demande de rappel',
    status: 'pending',
    details: 'Extraction : tâche, date, heure, priorité'
  },
  {
    id: 'action-reminder-2',
    type: 'analyze',
    description: 'Interprétation temporelle',
    status: 'pending',
    details: 'Calcul de la date : "dans 3 jours" → 2024-10-12'
  },
  {
    id: 'action-reminder-3',
    type: 'search',
    description: 'Vérification des conflits d\'agenda',
    status: 'pending',
    details: 'Calendrier Google - Pas de conflit détecté'
  },
  {
    id: 'action-reminder-4',
    type: 'generate',
    description: 'Création du rappel',
    status: 'pending',
    details: 'Ajout dans la liste des rappels'
  }
]

// Actions RAG pour le traitement de facture (email 3 / scenario 5)
export const mockAIActionsInvoice: AIAction[] = [
  {
    id: 'action-invoice-1',
    type: 'analyze',
    description: 'Détection et analyse de la facture',
    status: 'pending',
    details: 'Type : Facture prestataire | Format : PDF'
  },
  {
    id: 'action-invoice-2',
    type: 'analyze',
    description: 'Extraction des métadonnées',
    status: 'pending',
    details: 'N° 2024-0892 | Aquatech Solutions | 12 450,00 €'
  },
  {
    id: 'action-invoice-3',
    type: 'generate',
    description: 'Upload vers Google Drive',
    status: 'pending',
    details: 'Dossier : Facturation/2024/Aquatech Solutions'
  },
  {
    id: 'action-invoice-4',
    type: 'generate',
    description: 'Déplacement du mail vers Factures',
    status: 'pending',
    details: 'Gmail : Label "Factures" appliqué'
  },
  {
    id: 'action-invoice-5',
    type: 'generate',
    description: 'Lancement de l\'impression',
    status: 'pending',
    details: 'Imprimante : HP LaserJet Bureau'
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
François - Camping Merendella`,

  'rendez-vous': `Bonjour Marc,

Merci pour votre email.

J'ai le plaisir de vous confirmer que j'ai trouvé un créneau disponible pour votre visite technique concernant l'installation des panneaux solaires.

**Rendez-vous confirmé :**
📅 Mardi 15 octobre 2024
🕐 14h00 - 15h30 (1h30)
📍 Camping Merendella - Bâtiment principal

J'ai créé l'événement dans mon agenda et vous recevrez une invitation Google Calendar avec tous les détails.

N'hésitez pas à me contacter si vous avez besoin d'informations complémentaires avant la visite.

Au plaisir de vous recevoir,

Cordialement,
François
Camping Merendella`
}
