import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckSquare, Calendar, User, Trello, ArrowLeft, Sparkles, Send, Edit3 } from 'lucide-react'
import type {Email, TrelloCard} from '../data/MockData'
import { cn } from '../lib/utils'

interface ContextPanelProps {
  mode: 'email' | 'trello'
  email?: Email
  trelloCard?: TrelloCard
  aiResponse?: string
  isGenerating?: boolean
  onGenerateResponse?: () => void
  onModifyResponse?: () => void
  onSendResponse?: () => void
  onViewTrello?: () => void
  onBackToEmail?: () => void
  onAiResponseChange?: (value: string) => void
}

export default function ContextPanel({
  mode,
  email,
  trelloCard,
  aiResponse,
  isGenerating,
  onGenerateResponse,
  onModifyResponse,
  onSendResponse,
  onViewTrello,
  onBackToEmail,
  onAiResponseChange,
}: ContextPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {mode === 'email' ? (
              <Mail className="w-6 h-6" />
            ) : (
              <Trello className="w-6 h-6" />
            )}
            <h2 className="text-lg font-semibold">
              {mode === 'email' ? 'Aperçu Email' : 'Carte Trello'}
            </h2>
          </div>
          {mode === 'trello' && onBackToEmail && (
            <button
              onClick={onBackToEmail}
              className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au mail
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {mode === 'email' && email && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              {/* Email Header */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{email.sender}</h3>
                    <p className="text-sm text-gray-600">{email.senderEmail}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    email.category === 'reservation' && "bg-purple-100 text-purple-700",
                    email.category === 'question' && "bg-blue-100 text-blue-700",
                    email.category === 'facture' && "bg-green-100 text-green-700"
                  )}>
                    {email.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {email.date}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 pt-2">
                  {email.subject}
                </h2>
              </div>

              {/* Email Content */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {email.content}
                </p>
              </div>

              {/* AI Response */}
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Réponse générée par IA (modifiable)
                  </div>
                  <textarea
                    value={aiResponse}
                    onChange={(e) => onAiResponseChange?.(e.target.value)}
                    className="w-full min-h-[300px] bg-blue-50 rounded-xl p-4 border border-blue-200 text-gray-800 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="La réponse générée par l'IA apparaîtra ici..."
                  />
                </motion.div>
              )}

              {/* Actions */}
              <div className="space-y-3 pt-2">
                {!aiResponse ? (
                  <button
                    onClick={onGenerateResponse}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-5 h-5" />
                    {isGenerating ? 'Génération en cours...' : 'Générer réponse IA'}
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={onModifyResponse}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Modifier via IA
                    </button>
                    <button
                      onClick={onSendResponse}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer
                    </button>
                  </div>
                )}

                {email.trelloCardId && onViewTrello && (
                  <button
                    onClick={onViewTrello}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl font-medium transition-colors border border-purple-200"
                  >
                    <Trello className="w-4 h-4" />
                    Voir carte Trello associée
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {mode === 'trello' && trelloCard && (
            <motion.div
              key="trello"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 space-y-6"
            >
              {/* Trello Card Header */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {trelloCard.list}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {trelloCard.title}
                </h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {trelloCard.description}
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CheckSquare className="w-4 h-4" />
                  Checklist ({trelloCard.checklist.filter(item => item.checked).length}/{trelloCard.checklist.length})
                </div>
                <div className="space-y-2">
                  {trelloCard.checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        readOnly
                        className="mt-0.5 w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer"
                      />
                      <span className={cn(
                        "flex-1 text-sm",
                        item.checked ? "text-gray-500 line-through" : "text-gray-800"
                      )}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-blue-800">
                  Cette carte est liée à l'email et sera mise à jour automatiquement après l'envoi de votre réponse.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
