'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Target, 
  BookOpen, 
  Award, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Star,
  Trophy
} from 'lucide-react'
import TrainingModule from '@/components/TrainingModule'

export default function TrainingPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) {
    return <div className="min-h-screen bg-slate-700 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-slate-800" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Controller Training</h1>
                  <p className="text-sm text-slate-500">Flight simulator for train traffic controllers</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Training Progress */}
              <div className="text-right">
                <div className="text-sm text-slate-500">Training Progress</div>
                <div className="text-lg font-bold text-slate-800">65%</div>
              </div>
              
              {/* Level Badge */}
              <div className="bg-blue-500 rounded-lg px-3 py-2">
                <div className="text-sm text-white font-medium">Intermediate</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <TrainingModule />
      </div>
    </div>
  )
}
