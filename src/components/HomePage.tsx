import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface HomePageProps {
  onStart: () => void
}

export default function HomePage({ onStart }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-2xl mb-8 shadow-xl"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          Assistant IA
        </h1>
        <p className="text-2xl text-gray-600 mb-12">
          Camping Merendella
        </p>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onStart}
          className="group relative px-10 py-5 bg-blue-600 text-white rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Démarrer la démo
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
          <motion.div
            className="absolute inset-0 bg-blue-700"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </div>
  )
}
