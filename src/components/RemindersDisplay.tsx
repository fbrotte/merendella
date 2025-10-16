import { motion } from 'framer-motion'
import { Bell, Clock, Calendar, AlertCircle } from 'lucide-react'
import type { Reminder } from '../data/MockData'

interface RemindersDisplayProps {
  reminders: Reminder[]
}

export default function RemindersDisplay({ reminders }: RemindersDisplayProps) {
  const getPriorityColor = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'medium':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const getPriorityLabel = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high':
        return 'Priorité haute'
      case 'medium':
        return 'Priorité moyenne'
      case 'low':
        return 'Priorité basse'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Mes rappels ({reminders.length})
        </h3>
      </div>

      {reminders.map((reminder, index) => (
        <motion.div
          key={reminder.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`rounded-xl p-4 border-2 transition-all ${
            reminder.isNew
              ? 'bg-green-50 border-green-300 shadow-lg'
              : 'bg-white border-gray-200 hover:shadow-md'
          }`}
        >
          {/* New Badge */}
          {reminder.isNew && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Nouveau rappel créé
              </span>
            </div>
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-gray-900 text-lg flex-1">
              {reminder.title}
            </h4>
            <span className={`px-2.5 py-1 rounded-full border text-xs font-medium whitespace-nowrap ml-2 ${getPriorityColor(reminder.priority)}`}>
              {getPriorityLabel(reminder.priority)}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-3">
            {reminder.description}
          </p>

          {/* Date and Time */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{formatDate(reminder.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{reminder.time}</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Info */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          Vous recevrez une notification pour chaque rappel 15 minutes avant l'heure prévue.
        </p>
      </div>
    </div>
  )
}
