import { motion } from 'framer-motion'
import { Calendar, Clock, Check, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface TimeSlot {
  time: string
  available: boolean
}

interface CalendarDisplayProps {
  proposedDate: string
  proposedTime: string
  onValidate: () => void
  onCancel: () => void
}

export default function CalendarDisplay({ proposedDate, proposedTime, onValidate, onCancel }: CalendarDisplayProps) {
  const [selectedDate, setSelectedDate] = useState(proposedDate)
  const [selectedTime, setSelectedTime] = useState(proposedTime)

  // Générer les jours de la semaine
  const generateWeekDays = () => {
    const baseDate = new Date(proposedDate)
    const days = []

    // Trouver le lundi de la semaine
    const dayOfWeek = baseDate.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(baseDate)
    monday.setDate(baseDate.getDate() + diff)

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday: date.toDateString() === new Date().toDateString()
      })
    }
    return days
  }

  // Générer les créneaux horaires
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = []
    for (let hour = 8; hour <= 18; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: Math.random() > 0.3 // Simuler disponibilité
      })
      if (hour < 18) {
        slots.push({
          time: `${hour.toString().padStart(2, '0')}:30`,
          available: Math.random() > 0.3
        })
      }
    }
    return slots
  }

  const weekDays = generateWeekDays()
  const timeSlots = generateTimeSlots()

  const formatProposedDate = () => {
    const date = new Date(proposedDate)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const isProposedSlot = (date: string, time: string) => {
    return date === proposedDate && time === proposedTime
  }

  const isSelectedSlot = (date: string, time: string) => {
    return date === selectedDate && time === selectedTime
  }

  return (
    <div className="space-y-6">
      {/* Header avec créneau proposé */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Créneau proposé par l'IA
            </h3>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium capitalize">{formatProposedDate()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{proposedTime} - {proposedTime.split(':')[0]}:30</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Durée : 1h30 • Aucun conflit détecté
            </p>
          </div>
        </div>
      </div>

      {/* Calendrier hebdomadaire */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* En-tête du calendrier */}
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h4 className="font-semibold text-gray-900">
            Semaine du {weekDays[0].dayNumber} au {weekDays[6].dayNumber} octobre 2024
          </h4>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Grille du calendrier */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Jours de la semaine */}
            <div className="grid grid-cols-8 border-b border-gray-200">
              <div className="p-3 bg-gray-50 border-r border-gray-200"></div>
              {weekDays.map((day) => (
                <div
                  key={day.date}
                  className={`p-3 text-center border-r border-gray-200 ${
                    day.date === proposedDate ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-xs font-medium text-gray-600 uppercase">
                    {day.dayName}
                  </div>
                  <div className={`text-lg font-semibold mt-1 ${
                    day.date === proposedDate ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day.dayNumber}
                  </div>
                </div>
              ))}
            </div>

            {/* Créneaux horaires */}
            <div className="max-h-[400px] overflow-y-auto">
              {timeSlots.map((slot) => (
                <div key={slot.time} className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50">
                  <div className="p-2 bg-gray-50 border-r border-gray-200 text-sm font-medium text-gray-600 flex items-center justify-center">
                    {slot.time}
                  </div>
                  {weekDays.map((day) => {
                    const isProposed = isProposedSlot(day.date, slot.time)
                    const isSelected = isSelectedSlot(day.date, slot.time)
                    const available = slot.available

                    return (
                      <button
                        key={`${day.date}-${slot.time}`}
                        onClick={() => {
                          if (available) {
                            setSelectedDate(day.date)
                            setSelectedTime(slot.time)
                          }
                        }}
                        disabled={!available}
                        className={`p-2 border-r border-gray-100 text-xs transition-all ${
                          isProposed
                            ? 'bg-blue-100 border-2 border-blue-400 font-semibold text-blue-900'
                            : isSelected
                            ? 'bg-green-100 border-2 border-green-400 font-semibold text-green-900'
                            : available
                            ? 'hover:bg-blue-50 cursor-pointer text-gray-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {isProposed && '✓ Proposé'}
                        {!isProposed && isSelected && '✓ Sélectionné'}
                        {!isProposed && !isSelected && (available ? 'Disponible' : 'Occupé')}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onValidate}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
        >
          <Check className="w-5 h-5" />
          Valider ce créneau et créer le rendez-vous
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Info */}
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <p className="text-sm text-amber-800">
          💡 <strong>Astuce :</strong> Vous pouvez sélectionner un autre créneau disponible en cliquant dessus dans le calendrier avant de valider.
        </p>
      </div>
    </div>
  )
}
