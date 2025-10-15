import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HomePage from './components/HomePage'
import MainScreen from './components/MainScreen'

function App() {
  const [screen, setScreen] = useState<'home' | 'main'>('home')

  return (
    <AnimatePresence mode="wait">
      {screen === 'home' ? (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HomePage onStart={() => setScreen('main')} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <MainScreen />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
