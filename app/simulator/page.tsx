'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward,
  Settings,
  Download,
  Upload,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  Train,
  Map
} from 'lucide-react'
import RailwayMap from '@/components/RailwayMap'
import TrainSchedule from '@/components/TrainSchedule'
import SimulationControls from '@/components/SimulationControls'
import PerformanceMetrics from '@/components/PerformanceMetrics'
import SimulationStatusPanel from '@/components/SimulationStatusPanel'
import SimulationDashboard from '@/components/SimulationDashboard'
import ScenarioTester from '@/components/ScenarioTester'

export default function SimulatorPage() {
  const [user, setUser] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [selectedScenario, setSelectedScenario] = useState('basic')
  const [selectedTrain, setSelectedTrain] = useState<any>(null)
  const [simulationData, setSimulationData] = useState({
    conflicts: 0,
    delays: 0,
    efficiency: 0,
    energySaved: 0
  })
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
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => new Date(prev.getTime() + simulationSpeed * 60000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, simulationSpeed])

  const scenarios = [
    { id: 'basic', name: 'Basic Operations', difficulty: 'Easy', type: 'training' },
    { id: 'congestion', name: 'Peak Hour Congestion', difficulty: 'Medium', type: 'what-if' },
    { id: 'disruption', name: 'Signal Failure', difficulty: 'Hard', type: 'disruption' },
    { id: 'weather', name: 'Weather Disruption', difficulty: 'Hard', type: 'disruption' },
    { id: 'emergency', name: 'Emergency Train', difficulty: 'Expert', type: 'crisis' },
    { id: 'historical', name: 'Historical Replay', difficulty: 'Training', type: 'playback' },
    { id: 'comparison', name: 'AI vs Manual', difficulty: 'Analysis', type: 'comparison' }
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentTime(new Date())
    setSimulationData({ conflicts: 0, delays: 0, efficiency: 0, energySaved: 0 })
  }

  const handleSpeedChange = (speed: number) => {
    setSimulationSpeed(speed)
  }

  const handleSkipBack = () => {
    setCurrentTime(prev => new Date(prev.getTime() - 60000)) // Go back 1 minute
  }

  const handleSkipForward = () => {
    setCurrentTime(prev => new Date(prev.getTime() + 60000)) // Go forward 1 minute
  }

  const handleExport = () => {
    // Export simulation data
    const data = {
      scenario: selectedScenario,
      time: currentTime,
      speed: simulationSpeed,
      data: simulationData
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `simulation-${selectedScenario}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    // Import simulation data
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            setSelectedScenario(data.scenario || 'basic')
            setCurrentTime(new Date(data.time) || new Date())
            setSimulationSpeed(data.speed || 1)
            setSimulationData(data.data || { conflicts: 0, delays: 0, efficiency: 0, energySaved: 0 })
          } catch (error) {
            console.error('Error importing simulation data:', error)
            alert('Error importing simulation data. Please check the file format.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  if (!user) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-slate-800" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">SITO Simulator</h1>
                  <p className="text-sm text-slate-500">Training & Scenario Testing</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* Scenario Selector */}
              <div className="flex items-center space-x-3">
                <label className="text-sm text-slate-600">Scenario:</label>
                <select
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-sm"
                >
                  {scenarios.map((scenario) => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.name} ({scenario.difficulty})
                    </option>
                  ))}
                </select>
              </div>

              {/* Simulation Time */}
              <div className="flex items-center space-x-2 text-slate-600">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePlayPause}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleReset}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleSkipBack}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleSkipForward}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Speed Control */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-slate-600">Speed:</label>
                <select
                  value={simulationSpeed}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 text-sm"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={5}>5x</option>
                  <option value={10}>10x</option>
                </select>
              </div>

              {/* Export/Import */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleExport}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleImport}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Upload className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <SimulationDashboard />
        
        {/* Scenario Testing Section */}
        <div className="mt-8">
          <ScenarioTester />
        </div>
      </div>
    </div>
  )
}
