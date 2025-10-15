import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Brain, FileText, Sparkles, CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import type { AIAction } from '../data/MockData'

interface AIActionsDisplayProps {
  actions: AIAction[]
  show: boolean
  isCompleted?: boolean
}

export default function AIActionsDisplay({ actions, show, isCompleted = false }: AIActionsDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (!show) return null

  const getIcon = (type: AIAction['type']) => {
    switch (type) {
      case 'analyze':
        return <Brain className="w-4 h-4" />
      case 'search':
        return <Search className="w-4 h-4" />
      case 'retrieve':
        return <FileText className="w-4 h-4" />
      case 'generate':
        return <Sparkles className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: AIAction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in_progress':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'pending':
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
    }
  }

  const completedCount = actions.filter(a => a.status === 'completed').length
  const totalCount = actions.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg overflow-hidden"
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-blue-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Processus de l'IA</h3>
          {isCompleted && (
            <span className="text-xs text-gray-500 font-normal">
              ({completedCount}/{totalCount} terminé{completedCount > 1 ? 's' : ''})
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Content - Collapsible */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {actions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(action.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 flex-shrink-0">
                        {getIcon(action.type)}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          action.status === 'completed'
                            ? 'text-gray-600'
                            : 'text-gray-900'
                        }`}
                      >
                        {action.description}
                      </span>
                    </div>

                    {action.details && (
                      <p className="text-xs text-gray-500 mt-1 ml-6 truncate">
                        {action.details}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
