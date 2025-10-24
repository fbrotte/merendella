import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ChatColumn from './ChatColumn'
import ContextPanel from './ContextPanel'
import { mockEmails, mockTrelloCards, initialMessages, mockAIResponse, mockAIActions, mockAIActionsRDV, mockAIActionsDocSearch, mockAIActionsReminder, mockAIActionsInvoice, mockReminders, mockDocuments } from '../data/MockData'
import type { Message, AIAction, Reminder, Document } from '../data/MockData'
import Toast from './Toast'

export default function MainScreen() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [panelMode, setPanelMode] = useState<'email' | 'trello' | 'reminders' | 'documents' | 'calendar' | 'invoice'>('email')
  const [aiResponse, setAiResponse] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false })
  const [aiActions, setAiActions] = useState<AIAction[]>([...mockAIActions])
  const [showAIActions, setShowAIActions] = useState(false)
  const [aiActionsCompleted, setAiActionsCompleted] = useState(false)
  const [reminders, setReminders] = useState<Reminder[]>([...mockReminders])
  const [foundDocuments, setFoundDocuments] = useState<Document[]>([])
  const [proposedDate, setProposedDate] = useState<string>('2024-10-15')
  const [proposedTime, setProposedTime] = useState<string>('14:00')
  const [invoiceData, setInvoiceData] = useState<{
    invoiceNumber: string
    supplier: string
    amount: string
    date: string
    drivePath: string
    fileName: string
  } | null>(null)

  // Store active timeouts to clean them up when changing examples
  const activeTimeouts = useRef<NodeJS.Timeout[]>([])

  const currentEmail = mockEmails[currentEmailIndex]
  const currentTrelloCard = mockTrelloCards.find(card => card.id === currentEmail?.trelloCardId)

  // Clear all active timeouts
  const clearAllTimeouts = () => {
    activeTimeouts.current.forEach(timer => clearTimeout(timer))
    activeTimeouts.current = []
  }

  // Initialize first example on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startExample(0)
    }, 100)

    return () => {
      clearTimeout(timer)
      clearAllTimeouts()
    }
  }, [])

  const startExample = (emailIndex: number) => {
    // Clear any pending timeouts from previous example
    clearAllTimeouts()

    // Reset all state
    setMessages([]) // Start with empty messages
    setCurrentEmailIndex(emailIndex)
    setPanelMode(emailIndex === 2 ? 'invoice' : emailIndex === 3 ? 'documents' : emailIndex === 4 ? 'reminders' : 'email')
    setAiResponse('')
    setIsGenerating(false)
    setShowAIActions(false)
    setAiActions([...mockAIActions])
    setReminders([...mockReminders])
    setFoundDocuments([])
    setInvoiceData(null)

    const email = mockEmails[emailIndex]

    // Start the appropriate scenario based on email index
    const timer = setTimeout(() => {
      if (emailIndex === 0) {
        // Example 1: Marketing campaign with RAG
        addMessage('assistant', `Très bien, passons au prochain mail. Voici l'email de Laura Mercier de Digital Pulse Marketing concernant la campagne été 2025. Je vais analyser le contexte pour préparer une réponse complète.`)
        const timer2 = setTimeout(() => {
          triggerAIActionsSequence()
        }, 800)
        activeTimeouts.current.push(timer2)
      } else if (emailIndex === 1) {
        // Example 2: Appointment scheduling with calendar check
        addMessage('assistant', `OK, passons au prochain mail. Voici l'email de Marc Dubois concernant un rendez-vous pour les panneaux solaires. Je vais vérifier votre agenda et trouver un créneau disponible.`)
        const timer2 = setTimeout(() => {
          triggerAppointmentActionsSequence()
        }, 800)
        activeTimeouts.current.push(timer2)
      } else if (emailIndex === 2) {
        // Example 3: Invoice processing
        addMessage('assistant', `Très bien, passons au prochain mail. J'ai détecté une facture d'Aquatech Solutions. Je vais la traiter automatiquement : enregistrement sur Drive, classement et impression.`)
        const timer2 = setTimeout(() => {
          triggerInvoiceProcessingSequence()
        }, 800)
        activeTimeouts.current.push(timer2)
      } else if (emailIndex === 3) {
        // Example 4: Document search
        addMessage('user', 'J\'aimerais que tu retrouves les plans du projet de rénovation de la piscine.')
        const timer2 = setTimeout(() => {
          addMessage('assistant', 'Bien sûr ! Je vais rechercher dans tous les documents du camping pour trouver les plans du projet de rénovation de la piscine.')
          const timer3 = setTimeout(() => {
            triggerDocumentSearchSequence()
          }, 800)
          activeTimeouts.current.push(timer3)
        }, 600)
        activeTimeouts.current.push(timer2)
      } else if (emailIndex === 4) {
        // Example 5: Reminder creation
        addMessage('user', 'Ajoute-moi un rappel pour vérifier les réservations en attente dans 3 jours à 11h.')
        const timer2 = setTimeout(() => {
          addMessage('assistant', 'Parfait ! Je vais créer un rappel pour vérifier les réservations en attente. Je calcule la date et je l\'ajoute à votre liste.')
          const timer3 = setTimeout(() => {
            triggerReminderCreationSequence()
          }, 800)
          activeTimeouts.current.push(timer3)
        }, 600)
        activeTimeouts.current.push(timer2)
      } else {
        // Other examples: just show the email
        addMessage('assistant', `Très bien, passons au prochain mail. Voici l'email de ${email.sender} : ${email.subject}`)
      }
    }, 500)
    activeTimeouts.current.push(timer)
  }

  const handleExampleChange = (index: number) => {
    startExample(index)
  }

  const triggerAIActionsSequence = () => {
    setShowAIActions(true)
    setAiActionsCompleted(false)

    // Progress through actions sequentially
    const delays = [500, 1200, 2000, 2800, 3600, 4400]

    delays.forEach((delay, index) => {
      setTimeout(() => {
        setAiActions(prev =>
          prev.map((action, i) =>
            i === index
              ? { ...action, status: 'in_progress' as const }
              : action
          )
        )

        // Complete after 600ms
        setTimeout(() => {
          setAiActions(prev =>
            prev.map((action, i) =>
              i === index
                ? { ...action, status: 'completed' as const }
                : action
            )
          )
        }, 600)
      }, delay)
    })

    // After all actions complete: mark as completed, add message, generate response
    setTimeout(() => {
      setAiActionsCompleted(true)

      // Add completion message
      setTimeout(() => {
        addMessage('assistant', 'Analyse terminée ! J\'ai rassemblé toutes les informations nécessaires. Je génère maintenant une réponse complète...')

        // Auto-trigger response generation
        setTimeout(() => {
          setIsGenerating(true)

          setTimeout(() => {
            const responseKey = currentEmail.category as keyof typeof mockAIResponse
            const generatedResponse = mockAIResponse[responseKey] || mockAIResponse.reservation
            setAiResponse(generatedResponse)
            setIsGenerating(false)
            addMessage('assistant', 'Voici la réponse générée avec toutes les données contextuelles. Vous pouvez la modifier si nécessaire avant de l\'envoyer.')
          }, 2000)
        }, 500)
      }, 300)
    }, 5500)
  }

  const triggerAppointmentActionsSequence = () => {
    // Load appointment-specific actions (only the first 4 steps - up to finding the slot)
    const searchActions = mockAIActionsRDV.slice(0, 4) // Only search and analysis steps
    setAiActions(searchActions)
    setShowAIActions(true)
    setAiActionsCompleted(false)

    // Progress through appointment search actions sequentially
    const delays = [500, 1200, 2000, 2800]

    delays.forEach((delay, index) => {
      setTimeout(() => {
        setAiActions(prev =>
          prev.map((action, i) =>
            i === index
              ? { ...action, status: 'in_progress' as const }
              : action
          )
        )

        // Complete after 600ms
        setTimeout(() => {
          setAiActions(prev =>
            prev.map((action, i) =>
              i === index
                ? { ...action, status: 'completed' as const }
                : action
            )
          )
        }, 600)
      }, delay)
    })

    // After search complete: mark as completed, show calendar
    setTimeout(() => {
      setAiActionsCompleted(true)

      // Add completion message and show calendar
      setTimeout(() => {
        addMessage('assistant', 'J\'ai trouvé un créneau disponible ! Je vous propose le mardi 15 octobre à 14h00 pour 1h30. Vous pouvez valider ce créneau ou en choisir un autre dans le calendrier.')
        setPanelMode('calendar')
        setProposedDate('2024-10-15')
        setProposedTime('14:00')
      }, 300)
    }, 3800)
  }

  const handleValidateCalendar = () => {
    // User validated the calendar slot
    addMessage('user', 'Valide ce créneau et crée le rendez-vous.')
    setPanelMode('email')

    setTimeout(() => {
      addMessage('assistant', 'Parfait ! Je crée le rendez-vous dans Google Calendar et je génère la réponse de confirmation...')

      // Show the calendar creation action
      setShowAIActions(true)
      setAiActionsCompleted(false)
      setAiActions([mockAIActionsRDV[4]]) // Calendar creation step

      setTimeout(() => {
        setAiActions(prev =>
          prev.map(action => ({ ...action, status: 'in_progress' as const }))
        )

        setTimeout(() => {
          setAiActions(prev =>
            prev.map(action => ({ ...action, status: 'completed' as const }))
          )
          setAiActionsCompleted(true)

          // Generate response
          setTimeout(() => {
            setIsGenerating(true)

            setTimeout(() => {
              const responseKey = currentEmail.category as keyof typeof mockAIResponse
              const generatedResponse = mockAIResponse[responseKey] || mockAIResponse.reservation
              setAiResponse(generatedResponse)
              setIsGenerating(false)
              addMessage('assistant', 'Rendez-vous confirmé pour le mardi 15 octobre à 14h ! La réponse est prête à être envoyée.')
              setShowAIActions(false)
            }, 2000)
          }, 500)
        }, 600)
      }, 500)
    }, 800)
  }

  const handleCancelCalendar = () => {
    addMessage('user', 'Annule, je vais proposer une autre date.')
    setPanelMode('email')
  }

  const triggerDocumentSearchSequence = () => {
    // Load document search actions
    setAiActions([...mockAIActionsDocSearch])
    setShowAIActions(true)
    setAiActionsCompleted(false)

    // Progress through document search actions sequentially
    const delays = [500, 1200, 2000, 2800, 3600]

    delays.forEach((delay, index) => {
      setTimeout(() => {
        setAiActions(prev =>
          prev.map((action, i) =>
            i === index
              ? { ...action, status: 'in_progress' as const }
              : action
          )
        )

        // Complete after 600ms
        setTimeout(() => {
          setAiActions(prev =>
            prev.map((action, i) =>
              i === index
                ? { ...action, status: 'completed' as const }
                : action
            )
          )
        }, 600)
      }, delay)
    })

    // After all actions complete: mark as completed, show documents
    setTimeout(() => {
      setAiActionsCompleted(true)

      // Add completion message and show documents
      setTimeout(() => {
        setFoundDocuments(mockDocuments)
        addMessage('assistant', 'J\'ai trouvé 3 documents pertinents concernant le projet de rénovation de la piscine. Les documents sont affichés par ordre de pertinence.')
      }, 300)
    }, 4800)
  }

  const triggerReminderCreationSequence = () => {
    // Load reminder creation actions
    setAiActions([...mockAIActionsReminder])
    setShowAIActions(true)
    setAiActionsCompleted(false)

    // Progress through reminder creation actions sequentially
    const delays = [500, 1200, 2000, 2800]

    delays.forEach((delay, index) => {
      setTimeout(() => {
        setAiActions(prev =>
          prev.map((action, i) =>
            i === index
              ? { ...action, status: 'in_progress' as const }
              : action
          )
        )

        // Complete after 600ms
        setTimeout(() => {
          setAiActions(prev =>
            prev.map((action, i) =>
              i === index
                ? { ...action, status: 'completed' as const }
                : action
            )
          )
        }, 600)
      }, delay)
    })

    // After all actions complete: mark as completed, add new reminder
    setTimeout(() => {
      setAiActionsCompleted(true)

      // Add completion message and create new reminder
      setTimeout(() => {
        const newReminder: Reminder = {
          id: 'reminder-new',
          title: 'Vérifier les réservations en attente',
          description: 'Passer en revue toutes les réservations en attente et envoyer les confirmations',
          date: '2024-10-12',
          time: '11:00',
          priority: 'high',
          isNew: true
        }
        setReminders(prev => [newReminder, ...prev])
        addMessage('assistant', 'Rappel créé avec succès ! Il apparaît en haut de votre liste. Vous recevrez une notification le 12 octobre à 10h45.')
      }, 300)
    }, 4000)
  }

  const triggerInvoiceProcessingSequence = () => {
    // Load invoice processing actions
    setAiActions([...mockAIActionsInvoice])
    setShowAIActions(true)
    setAiActionsCompleted(false)

    // Progress through invoice processing actions sequentially
    const delays = [500, 1200, 2000, 2800, 3600]

    delays.forEach((delay, index) => {
      setTimeout(() => {
        setAiActions(prev =>
          prev.map((action, i) =>
            i === index
              ? { ...action, status: 'in_progress' as const }
              : action
          )
        )

        // Complete after 600ms
        setTimeout(() => {
          setAiActions(prev =>
            prev.map((action, i) =>
              i === index
                ? { ...action, status: 'completed' as const }
                : action
            )
          )
        }, 600)
      }, delay)
    })

    // After all actions complete: mark as completed, set invoice data
    setTimeout(() => {
      setAiActionsCompleted(true)

      // Add completion message and show invoice details
      setTimeout(() => {
        setInvoiceData({
          invoiceNumber: '2024-0892',
          supplier: 'Aquatech Solutions',
          amount: '12 450,00 €',
          date: '09 octobre 2024',
          drivePath: 'Facturation/2024/Aquatech Solutions',
          fileName: 'Facture_2024-0892_Aquatech.pdf'
        })
        addMessage('assistant', 'Traitement automatique terminé ! La facture a été enregistrée sur Drive, le mail classé dans Factures, et l\'impression lancée.')
      }, 300)
    }, 4800)
  }

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleGenerateResponse = () => {
    setIsGenerating(true)
    addMessage('user', 'Génère une réponse professionnelle pour cet email.')

    setTimeout(() => {
      const responseKey = currentEmail.category as keyof typeof mockAIResponse
      const generatedResponse = mockAIResponse[responseKey] || mockAIResponse.reservation
      setAiResponse(generatedResponse)
      setIsGenerating(false)
      addMessage('assistant', 'J\'ai généré une réponse personnalisée. Vous pouvez la modifier ou l\'envoyer directement.')
    }, 2000)
  }

  const handleModifyResponse = () => {
    addMessage('user', 'Rend la réponse plus chaleureuse.')

    setTimeout(() => {
      // Simulate AI modification
      const modified = aiResponse.replace('Cordialement,', 'Très cordialement,\nAu plaisir de vous accueillir !\n\n')
      setAiResponse(modified)
      addMessage('assistant', 'J\'ai rendu la réponse plus chaleureuse et accueillante.')
    }, 1500)
  }

  const handleSendResponse = () => {
    addMessage('user', 'Envoie cette réponse.')
    setToast({ message: 'Réponse envoyée avec succès ✅', show: true })

    setTimeout(() => {
      addMessage('assistant', 'Réponse envoyée avec succès ! La carte Trello a été mise à jour automatiquement.')
      setAiResponse('')
    }, 1000)
  }

  const handleViewTrello = () => {
    setPanelMode('trello')
    addMessage('user', 'Montre-moi la carte Trello associée.')
    setTimeout(() => {
      addMessage('assistant', `Voici la carte "${currentTrelloCard?.title}". Elle contient les étapes à suivre pour ce dossier.`)
    }, 800)
  }

  const handleBackToEmail = () => {
    setPanelMode('email')
    addMessage('user', 'Retour à l\'email.')
    setTimeout(() => {
      addMessage('assistant', 'Retour à l\'email. Prêt à générer ou modifier la réponse.')
    }, 500)
  }

  const handleAiResponseChange = (value: string) => {
    setAiResponse(value)
  }

  const handleSendMessage = (content: string) => {
    // Add user message
    addMessage('user', content)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Bien sûr, je vais traiter cette demande.',
        'Compris ! Je m\'en occupe immédiatement.',
        'Parfait, laissez-moi analyser cela.',
        'D\'accord, je vais vous aider avec ça.',
        'Entendu, je prends en charge cette requête.'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      addMessage('assistant', randomResponse)
    }, 800)
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Assistant IA - Camping Merendella</h1>
            <p className="text-sm text-gray-600">Démos scénarios</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Exemple :</span>
              <select
                value={currentEmailIndex}
                onChange={(e) => handleExampleChange(Number(e.target.value))}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                {mockEmails.map((email, index) => (
                  <option key={email.id} value={index}>
                    {index + 1}. {email.sender} - {email.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - 2 Columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Chat */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-1/2 border-r border-gray-200"
        >
          <ChatColumn
            messages={messages}
            onSendMessage={handleSendMessage}
            aiActions={aiActions}
            showAIActions={showAIActions}
            aiActionsCompleted={aiActionsCompleted}
          />
        </motion.div>

        {/* Right Column - Context Panel */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-1/2"
        >
          <ContextPanel
            mode={panelMode}
            email={currentEmail}
            trelloCard={currentTrelloCard}
            reminders={reminders}
            documents={foundDocuments}
            proposedDate={proposedDate}
            proposedTime={proposedTime}
            invoiceData={invoiceData}
            aiResponse={aiResponse}
            isGenerating={isGenerating}
            onGenerateResponse={handleGenerateResponse}
            onModifyResponse={handleModifyResponse}
            onSendResponse={handleSendResponse}
            onViewTrello={currentTrelloCard ? handleViewTrello : undefined}
            onBackToEmail={handleBackToEmail}
            onAiResponseChange={handleAiResponseChange}
            onValidateCalendar={handleValidateCalendar}
            onCancelCalendar={handleCancelCalendar}
          />
        </motion.div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  )
}
