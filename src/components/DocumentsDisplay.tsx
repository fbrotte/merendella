import { motion } from 'framer-motion'
import { FileText, Download, Eye, File } from 'lucide-react'
import type { Document } from '../data/MockData'

interface DocumentsDisplayProps {
  documents: Document[]
}

export default function DocumentsDisplay({ documents }: DocumentsDisplayProps) {
  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-600" />
      case 'docx':
        return <FileText className="w-6 h-6 text-blue-600" />
      case 'xlsx':
        return <FileText className="w-6 h-6 text-green-600" />
      case 'image':
        return <File className="w-6 h-6 text-purple-600" />
    }
  }

  const getFileTypeColor = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'docx':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'xlsx':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'image':
        return 'bg-purple-100 text-purple-700 border-purple-200'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {documents.length} document{documents.length > 1 ? 's' : ''} trouvé{documents.length > 1 ? 's' : ''}
        </h3>
        <span className="text-sm text-gray-600">Triés par pertinence</span>
      </div>

      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 mt-1">
              {getFileIcon(doc.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate mb-1">
                {doc.title}
              </h4>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className={`px-2 py-0.5 rounded border text-xs font-medium ${getFileTypeColor(doc.type)}`}>
                  {doc.type.toUpperCase()}
                </span>
                <span>{doc.size}</span>
                <span>•</span>
                <span>{new Date(doc.date).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                <span className="text-xs">Pertinence</span>
                <span className="font-bold">{doc.relevance}%</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <p className="text-sm text-gray-700 leading-relaxed mb-3 pl-9">
            {doc.preview}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 pl-9">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors">
              <Eye className="w-4 h-4" />
              Aperçu
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
