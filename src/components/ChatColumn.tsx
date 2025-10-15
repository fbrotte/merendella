import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import type { Message } from '../data/MockData'

interface ChatColumnProps {
  messages: Message[]
}

export default function ChatColumn({ messages }: ChatColumnProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
            <motion.div
              key={message.id}
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
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input (disabled - prototype only) */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="L'assistant travaille pour vous..."
            disabled
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 cursor-not-allowed"
          />
          <button
            disabled
            className="px-6 py-3 bg-gray-200 text-gray-400 rounded-xl font-medium text-sm cursor-not-allowed"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  )
}
