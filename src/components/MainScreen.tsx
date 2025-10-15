import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatColumn from './ChatColumn'
import ContextPanel from './ContextPanel'
import { mockEmails, mockTrelloCards, initialMessages, mockAIResponse, mockAIActions, mockAIActionsRDV } from '../data/MockData'
import type { Message, AIAction } from '../data/MockData'
import Toast from './Toast'

export default function MainScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [panelMode, setPanelMode] = useState<'email' | 'trello'>('email')
  const [aiResponse, setAiResponse] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false })
  const [aiActions, setAiActions] = useState<AIAction[]>([...mockAIActions])
  const [showAIActions, setShowAIActions] = useState(false)
  const [aiActionsCompleted, setAiActionsCompleted] = useState(false)

  const currentEmail = mockEmails[currentEmailIndex]
  const currentTrelloCard = mockTrelloCards.find(card => card.id === currentEmail?.trelloCardId)

  // Initialize first example on mount
  useEffect(() => {
    startExample(0)
  }, [])

  const startExample = (emailIndex: number) => {
    // Reset all state
    setMessages([]) // Start with empty messages
    setCurrentEmailIndex(emailIndex)
    setPanelMode('email')
    setAiResponse('')
    setIsGenerating(false)
    setShowAIActions(false)
    setAiActions([...mockAIActions])

    const email = mockEmails[emailIndex]

    // Start the appropriate scenario based on email index
    const timer = setTimeout(() => {
      if (emailIndex === 0) {
        // Example 1: Marketing campaign with RAG
        addMessage('assistant', `Très bien, passons au prochain mail. Voici l'email de Laura Mercier de Digital Pulse Marketing concernant la campagne été 2025. Je vais analyser le contexte pour préparer une réponse complète.`)
        setTimeout(() => {
          triggerAIActionsSequence()
        }, 800)
      } else if (emailIndex === 1) {
        // Example 2: Appointment scheduling with calendar check
        addMessage('assistant', `OK, passons au prochain mail. Voici l'email de Marc Dubois concernant un rendez-vous pour les panneaux solaires. Je vais vérifier votre agenda et trouver un créneau disponible.`)
        setTimeout(() => {
          triggerAppointmentActionsSequence()
        }, 800)
      } else {
        // Other examples: just show the email
        addMessage('assistant', `Très bien, passons au prochain mail. Voici l'email de ${email.sender} : ${email.subject}`)
      }
    }, 500)
  }

  const handleExampleChange = (index: number) => {
    startExample(index)
  }

  const triggerAIActionsSequence = () => {
    setShowAIActions(true)

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

    // After all actions complete: hide actions, add message, generate response
    setTimeout(() => {
      setShowAIActions(false)

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

      // Reset actions for potential next use
      setTimeout(() => {
        setAiActions([...mockAIActions])
      }, 1000)
    }, 5500)
  }

  const triggerAppointmentActionsSequence = () => {
    // Load appointment-specific actions
    setAiActions([...mockAIActionsRDV])
    setShowAIActions(true)

    // Progress through appointment actions sequentially
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

    // After all actions complete: hide actions, add messages, generate response
    setTimeout(() => {
      setShowAIActions(false)

      // Add completion message
      setTimeout(() => {
        addMessage('assistant', 'Parfait ! J\'ai vérifié votre agenda et trouvé un créneau disponible. Le rendez-vous a été créé dans Google Calendar. Je génère maintenant la réponse de confirmation...')

        // Auto-trigger response generation
        setTimeout(() => {
          setIsGenerating(true)

          setTimeout(() => {
            const responseKey = currentEmail.category as keyof typeof mockAIResponse
            const generatedResponse = mockAIResponse[responseKey] || mockAIResponse.reservation
            setAiResponse(generatedResponse)
            setIsGenerating(false)
            addMessage('assistant', 'Rendez-vous confirmé pour le mardi 15 octobre à 14h ! La réponse est prête à être envoyée.')
          }, 2000)
        }, 500)
      }, 300)

      // Reset actions for potential next use
      setTimeout(() => {
        setAiActions([...mockAIActions])
      }, 1000)
    }, 5500)
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
            aiResponse={aiResponse}
            isGenerating={isGenerating}
            onGenerateResponse={handleGenerateResponse}
            onModifyResponse={handleModifyResponse}
            onSendResponse={handleSendResponse}
            onViewTrello={currentTrelloCard ? handleViewTrello : undefined}
            onBackToEmail={handleBackToEmail}
            onAiResponseChange={handleAiResponseChange}
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
