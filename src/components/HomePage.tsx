import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface HomePageProps {
  onStart: () => void
}

export default function HomePage({ onStart }: HomePageProps) {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'Bonjour François ! Vous avez reçu 10 nouveaux mails.\n3 ont été déplacés dans Factures, 2 supprimés, et 5 nécessitent une réponse.'

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 shadow-lg"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Assistant IA
          </h1>
          <p className="text-lg text-gray-600">
            Camping Merendella
          </p>
        </div>

        {/* Message Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="text-xl text-gray-800 leading-relaxed whitespace-pre-line font-light">
                {displayedText}
                <span className="inline-block w-0.5 h-6 bg-blue-600 ml-1 animate-pulse" />
              </p>
            </div>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: displayedText.length >= fullText.length ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <button
            onClick={onStart}
            disabled={displayedText.length < fullText.length}
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-medium text-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10">Démarrer la revue</span>
            <motion.div
              className="absolute inset-0 bg-blue-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">→</span>
          </button>
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          <div className="bg-white/50 backdrop-blur rounded-xl p-4 text-center border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">10</div>
            <div className="text-sm text-gray-600 mt-1">Nouveaux mails</div>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-xl p-4 text-center border border-gray-100">
            <div className="text-3xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-600 mt-1">À traiter</div>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-xl p-4 text-center border border-gray-100">
            <div className="text-3xl font-bold text-purple-600">3</div>
            <div className="text-sm text-gray-600 mt-1">Cartes Trello</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
