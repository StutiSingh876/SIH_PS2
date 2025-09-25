'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Train, 
  Map, 
  Calendar, 
  Settings, 
  Bell, 
  User, 
  LogOut,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import RailwayMap from '@/components/RailwayMap'
import TrainSchedule from '@/components/TrainSchedule'
import AIRecommendations from '@/components/AIRecommendations'
import TrainDetailsModal from '@/components/TrainDetailsModal'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [selectedTrain, setSelectedTrain] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Train className="w-6 h-6 text-slate-800" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">SITO Dashboard</h1>
                  <p className="text-sm text-gray-500">Smart Intelligent Traffic Orchestrator</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Current Time */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.username}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <div className="flex flex-col h-[calc(100vh-140px)]">
        {/* Top Section - Railway Network and Train Schedule */}
        <div className="flex flex-1 min-h-0">
          {/* Left Pane - Railway Map (Half Page) */}
          <div className="w-1/2 border-r border-gray-200 bg-white">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <Map className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Railway Network</h2>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-hidden">
                <RailwayMap onTrainSelect={setSelectedTrain} />
              </div>
            </div>
          </div>

          {/* Right Pane - Train Schedule (Half Page) */}
          <div className="w-1/2 bg-white">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <h2 className="text-lg font-semibold text-gray-900">Train Schedule</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      All Clear
                    </button>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      2 Conflicts
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-hidden">
                <TrainSchedule onTrainSelect={setSelectedTrain} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - AI Recommendations */}
        <div className="h-96 border-t border-gray-200 bg-white flex-shrink-0">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto min-h-0 bg-gray-50">
              <AIRecommendations />
            </div>
          </div>
        </div>
      </div>

      {/* Train Details Modal */}
      {selectedTrain && (
        <TrainDetailsModal
          train={selectedTrain}
          onClose={() => setSelectedTrain(null)}
        />
      )}
    </div>
  )
}
