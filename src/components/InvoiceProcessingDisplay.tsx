import { motion } from 'framer-motion'
import { FileText, HardDrive, Mail, Printer, CheckCircle, Calendar, Euro } from 'lucide-react'

interface InvoiceProcessingDisplayProps {
  invoiceNumber: string
  supplier: string
  amount: string
  date: string
  drivePath: string
  fileName: string
}

export default function InvoiceProcessingDisplay({
  invoiceNumber,
  supplier,
  amount,
  date,
  drivePath,
  fileName
}: InvoiceProcessingDisplayProps) {
  const processingSteps = [
    {
      icon: <HardDrive className="w-5 h-5" />,
      title: 'Document enregistré sur Google Drive',
      details: `Chemin : ${drivePath}`,
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email déplacé vers "Factures"',
      details: 'Le mail a été automatiquement classé dans votre dossier Factures',
      color: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    {
      icon: <Printer className="w-5 h-5" />,
      title: 'Impression lancée',
      details: 'HP LaserJet Bureau - 1 page en file d\'attente',
      color: 'text-green-600 bg-green-50 border-green-200'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Résumé de la facture */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-xl font-bold text-gray-900">
                Facture {invoiceNumber}
              </h3>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                Traitée automatiquement
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Prestataire</div>
                <div className="font-semibold text-gray-900">{supplier}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Montant TTC</div>
                <div className="font-semibold text-gray-900 flex items-center gap-1">
                  <Euro className="w-4 h-4" />
                  {amount}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Numéro de facture</div>
                <div className="font-semibold text-gray-900">{invoiceNumber}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Date</div>
                <div className="font-semibold text-gray-900 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Étapes de traitement */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Actions effectuées automatiquement
        </h4>

        {processingSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className={`rounded-xl p-4 border-2 ${step.color}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 mb-1">
                  {step.title}
                </div>
                <div className="text-sm text-gray-700">
                  {step.details}
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fichier PDF */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">
              {fileName}
            </div>
            <div className="text-sm text-gray-600">
              245 KB • PDF
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
              Ouvrir
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Automatisation activée :</strong> Toutes les factures reçues par email sont automatiquement traitées, classées et sauvegardées dans Google Drive.
        </p>
      </div>
    </div>
  )
}
