export interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  content: string
  date: string
  category: 'reservation' | 'facture' | 'question' | 'spam'
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
    sender: 'Marie Dupont',
    senderEmail: 'marie.dupont@gmail.com',
    subject: 'Réservation pour juillet - 2 semaines',
    content: `Bonjour,

Je souhaite réserver un emplacement pour 2 semaines du 15 au 29 juillet pour ma famille (2 adultes, 2 enfants). Nous avons un camping-car de 7m.

Pouvez-vous me confirmer les disponibilités et le tarif ?

Cordialement,
Marie Dupont`,
    date: '2024-10-09 08:30',
    category: 'reservation',
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
    title: 'Réservation Marie Dupont - Juillet',
    description: 'Réservation pour 2 semaines du 15 au 29 juillet\nFamille: 2 adultes + 2 enfants\nCamping-car 7m',
    list: 'Réservations en cours',
    checklist: [
      { id: '1', text: 'Vérifier disponibilité emplacement grand format', checked: false },
      { id: '2', text: 'Calculer le tarif (haute saison)', checked: false },
      { id: '3', text: 'Envoyer devis par email', checked: false },
      { id: '4', text: 'Attendre confirmation et acompte', checked: false }
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

export const mockAIResponse = {
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
