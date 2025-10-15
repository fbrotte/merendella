import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatColumn from './ChatColumn'
import ContextPanel from './ContextPanel'
import { mockEmails, mockTrelloCards, initialMessages, mockAIResponse } from '../data/MockData'
import type { Message } from '../data/MockData'
import Toast from './Toast'

export default function MainScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0)
  const [panelMode, setPanelMode] = useState<'email' | 'trello'>('email')
  const [aiResponse, setAiResponse] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false })

  const currentEmail = mockEmails[currentEmailIndex]
  const currentTrelloCard = mockTrelloCards.find(card => card.id === currentEmail?.trelloCardId)

  useEffect(() => {
    // Auto-advance to first email
    const timer = setTimeout(() => {
      addMessage('user', `Montre-moi le premier email à traiter.`)
      setTimeout(() => {
        addMessage('assistant', `Voici le premier email de Marie Dupont concernant une réservation pour juillet. Je l'ai déjà analysé.`)
      }, 800)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
      addMessage('assistant', 'Réponse envoyée ! J\'ai mis à jour la carte Trello associée.')
      setAiResponse('')

      // Move to next email after a delay
      setTimeout(() => {
        if (currentEmailIndex < mockEmails.length - 1) {
          setCurrentEmailIndex(prev => prev + 1)
          setPanelMode('email')
          addMessage('assistant', `Email suivant : ${mockEmails[currentEmailIndex + 1].subject}`)
        } else {
          addMessage('assistant', 'Tous les emails ont été traités ! Excellente matinée de travail. 🎉')
        }
      }, 2000)
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
            <p className="text-sm text-gray-600">Revue matinale des emails</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-blue-600">{currentEmailIndex + 1}/{mockEmails.length}</span>
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
          <ChatColumn messages={messages} />
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
