import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Mic, Paperclip, Send } from 'lucide-react'
import type { Message, AIAction } from '../data/MockData'
import AIActionsDisplay from './AIActionsDisplay'

interface ChatColumnProps {
  messages: Message[]
  onSendMessage?: (content: string) => void
  aiActions?: AIAction[]
  showAIActions?: boolean
  aiActionsCompleted?: boolean
}

export default function ChatColumn({ messages, onSendMessage, aiActions = [], showAIActions = false, aiActionsCompleted = false }: ChatColumnProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleMicClick = () => {
    setIsRecording(true)

    // Simulate recording for 2 seconds
    setTimeout(() => {
      setIsRecording(false)
      const voiceMessages = [
        'Peux-tu me donner plus de détails sur cet email ?',
        'Génère une réponse pour ce client s\'il te plaît',
        'Fais une version plus courte de cette réponse',
        'Ajoute une mention des tarifs spéciaux',
        'Est-ce que tu peux vérifier les disponibilités ?'
      ]
      const randomMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)]
      if (onSendMessage) {
        onSendMessage(randomMessage)
      }
    }, 2000)
  }

  const handleFileClick = () => {
    // Simulate file upload
    if (onSendMessage) {
      onSendMessage('📎 [Fichier joint: reservation_details.pdf]')
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Assistant IA</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-gray-600">En ligne</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <div key={message.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'assistant'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <Bot className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] ${
                    message.role === 'user' ? 'items-end' : 'items-start'
                  } flex flex-col gap-1`}
                >
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'assistant'
                        ? 'bg-white border border-gray-200 text-gray-800'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 px-2">
                    {message.timestamp}
                  </span>
                </div>
              </motion.div>

              {/* AI Actions Display - Show after the last message when active */}
              {showAIActions && index === messages.length - 1 && (
                <div className="mt-4 mb-4">
                  <AIActionsDisplay actions={aiActions} show={true} />
                </div>
              )}
            </div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input - Interactive for demo */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-2">
          {/* Mic button */}
          <button
            onClick={handleMicClick}
            disabled={isRecording}
            className={`p-3 rounded-xl transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Enregistrement vocal"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* File upload button */}
          <button
            onClick={handleFileClick}
            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
            title="Joindre un fichier"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text input */}
          <input
            type="text"
            placeholder="Tapez votre message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isRecording}
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />

          {/* Send button */}
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isRecording}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Envoyer
          </button>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 text-red-600 text-sm font-medium"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Enregistrement en cours...
          </motion.div>
        )}
      </div>
    </div>
  )
}
