'use client'

import { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  TrendingUp,
  BarChart3,
  Train,
  MapPin,
  Signal,
  Cloud,
  Shield,
  Brain,
  Target,
  Activity,
  Users,
  Gauge,
  Download,
  Upload,
  Calendar,
  FileText
} from 'lucide-react'

interface Scenario {
  id: string
  name: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert'
  type: 'training' | 'what-if' | 'disruption' | 'crisis' | 'playback' | 'comparison'
  duration: number
  expectedOutcome: string
  successCriteria: string[]
}

interface ScenarioResult {
  scenarioId: string
  startTime: number
  endTime: number
  duration: number
  success: boolean
  score: number
  metrics: {
    totalDelay: number
    conflicts: number
    energySaved: number
    passengerImpact: number
    systemEfficiency: number
  }
  actions: ScenarioAction[]
  recommendations: string[]
}

interface ScenarioAction {
  timestamp: number
  action: string
  description: string
  impact: number
  success: boolean
}

export default function ScenarioTester() {
  const [selectedScenario, setSelectedScenario] = useState<string>('basic')
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [scenarioResults, setScenarioResults] = useState<ScenarioResult[]>([])
  const [currentResult, setCurrentResult] = useState<ScenarioResult | null>(null)

  const scenarios: Scenario[] = [
    {
      id: 'basic',
      name: 'Basic Operations',
      description: 'Normal railway operations with 8 express, 4 freight, and 2 suburban trains',
      difficulty: 'Easy',
      type: 'training',
      duration: 60,
      expectedOutcome: 'Maintain on-time performance with minimal delays',
      successCriteria: ['Average delay < 5 minutes', 'System efficiency > 85%', 'No conflicts']
    },
    {
      id: 'peak',
      name: 'Peak Hour Congestion',
      description: 'High traffic scenario with 6 additional suburban local trains (3-minute headway)',
      difficulty: 'Medium',
      type: 'what-if',
      duration: 60,
      expectedOutcome: 'Manage congestion and minimize cascading delays',
      successCriteria: ['Average delay < 15 minutes', 'System efficiency > 70%', 'Resolve all conflicts']
    },
    {
      id: 'signal_failure',
      name: 'Signal Failure at Junction B',
      description: 'Signal failure at Junction B blocking both UP and DOWN lines for 7 minutes',
      difficulty: 'Hard',
      type: 'disruption',
      duration: 60,
      expectedOutcome: 'Minimize cascading delays and restore normal operations',
      successCriteria: ['Total delay < 30 minutes', 'Restore signal within 15 minutes', 'No safety incidents']
    },
    {
      id: 'weather',
      name: 'Weather Disruption',
      description: 'Heavy fog conditions reducing section speed to 50% of normal',
      difficulty: 'Hard',
      type: 'disruption',
      duration: 60,
      expectedOutcome: 'Maintain safety while minimizing delays',
      successCriteria: ['Average delay < 20 minutes', 'No accidents', 'Maintain 60% efficiency']
    },
    {
      id: 'emergency',
      name: 'Emergency Train',
      description: 'Medical emergency special train with highest priority',
      difficulty: 'Expert',
      type: 'crisis',
      duration: 60,
      expectedOutcome: 'Provide clear path for emergency train',
      successCriteria: ['Emergency train delay < 5 minutes', 'Minimize impact on other trains', 'No safety incidents']
    },
    {
      id: 'comparison',
      name: 'AI vs Manual Comparison',
      description: 'Compare AI and manual decision making for 1 hour',
      difficulty: 'Expert',
      type: 'comparison',
      duration: 120,
      expectedOutcome: 'Demonstrate AI superiority in conflict resolution',
      successCriteria: ['AI mode outperforms manual', 'Document all decisions', 'Measure improvement metrics']
    }
  ]

  const startScenario = () => {
    const scenario = scenarios.find(s => s.id === selectedScenario)
    if (!scenario) return

    setIsRunning(true)
    setCurrentTime(0)
    
    const result: ScenarioResult = {
      scenarioId: scenario.id,
      startTime: Date.now(),
      endTime: 0,
      duration: 0,
      success: false,
      score: 0,
      metrics: {
        totalDelay: 0,
        conflicts: 0,
        energySaved: 0,
        passengerImpact: 0,
        systemEfficiency: 0
      },
      actions: [],
      recommendations: []
    }
    
    setCurrentResult(result)
  }

  const stopScenario = () => {
    if (!currentResult) return
    
    const updatedResult = {
      ...currentResult,
      endTime: Date.now(),
      duration: currentTime,
      success: currentResult.metrics.totalDelay < 30 && currentResult.metrics.conflicts === 0,
      score: calculateScore(currentResult.metrics)
    }
    
    setScenarioResults(prev => [...prev, updatedResult])
    setCurrentResult(null)
    setIsRunning(false)
  }

  const resetScenario = () => {
    setIsRunning(false)
    setCurrentTime(0)
    setCurrentResult(null)
  }

  const calculateScore = (metrics: any): number => {
    let score = 100
    
    // Deduct points for delays
    score -= Math.min(metrics.totalDelay * 2, 50)
    
    // Deduct points for conflicts
    score -= metrics.conflicts * 10
    
    // Add points for energy savings
    score += Math.min(metrics.energySaved / 100, 20)
    
    // Add points for efficiency
    score += (metrics.systemEfficiency - 50) * 0.5
    
    return Math.max(0, Math.min(100, score))
  }

  const addAction = (action: string, description: string, impact: number) => {
    if (!currentResult) return
    
    const newAction: ScenarioAction = {
      timestamp: currentTime,
      action,
      description,
      impact,
      success: impact > 0
    }
    
    setCurrentResult(prev => ({
      ...prev!,
      actions: [...prev!.actions, newAction],
      metrics: {
        ...prev!.metrics,
        totalDelay: Math.max(0, prev!.metrics.totalDelay + impact),
        conflicts: impact < 0 ? prev!.metrics.conflicts + 1 : prev!.metrics.conflicts
      }
    }))
  }

  const exportResults = () => {
    const data = {
      scenarios: scenarioResults,
      summary: {
        totalScenarios: scenarioResults.length,
        successfulScenarios: scenarioResults.filter(r => r.success).length,
        averageScore: scenarioResults.reduce((sum, r) => sum + r.score, 0) / scenarioResults.length,
        totalActions: scenarioResults.reduce((sum, r) => sum + r.actions.length, 0)
      }
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scenario-results.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importResults = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        setScenarioResults(data.scenarios || [])
      } catch (error) {
        console.error('Error importing results:', error)
      }
    }
    reader.readAsText(file)
  }

  // Simulate scenario progression
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1)
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isRunning])

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario)

  return (
    <div className="h-full bg-slate-50 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Scenario Testing</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Export/Import */}
          <div className="flex items-center space-x-2">
            <button
              onClick={exportResults}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center space-x-1 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={importResults}
                className="hidden"
              />
            </label>
          </div>

          {/* Control Buttons */}
          <button
            onClick={isRunning ? stopScenario : startScenario}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={resetScenario}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Scenario Selection */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Scenario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  selectedScenario === scenario.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{scenario.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    scenario.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    scenario.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    scenario.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{scenario.description}</p>
                <div className="text-xs text-slate-500">
                  Duration: {scenario.duration} min • Type: {scenario.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Scenario Info */}
        {selectedScenarioData && (
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Scenario Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Expected Outcome</h4>
                <p className="text-sm text-slate-600">{selectedScenarioData.expectedOutcome}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Success Criteria</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  {selectedScenarioData.successCriteria.map((criteria, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Current Scenario Progress */}
        {isRunning && currentResult && (
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Scenario Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Time Elapsed</span>
                <span className="font-semibold text-slate-800">{currentTime}s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Delay</span>
                <span className="font-semibold text-slate-800">{currentResult.metrics.totalDelay.toFixed(1)}m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Conflicts</span>
                <span className="font-semibold text-slate-800">{currentResult.metrics.conflicts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Actions Taken</span>
                <span className="font-semibold text-slate-800">{currentResult.actions.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isRunning && (
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Available Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => addAction('speed_adjustment', 'Adjust train speed', -2)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Speed Adjustment
              </button>
              <button
                onClick={() => addAction('reroute', 'Reroute train', -5)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Reroute Train
              </button>
              <button
                onClick={() => addAction('hold_train', 'Hold train', 3)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Hold Train
              </button>
              <button
                onClick={() => addAction('priority_change', 'Change priority', -1)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm transition-colors"
              >
                Change Priority
              </button>
            </div>
          </div>
        )}

        {/* Scenario Results */}
        {scenarioResults.length > 0 && (
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Scenario Results</h3>
            <div className="space-y-4">
              {scenarioResults.map((result, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">
                      {scenarios.find(s => s.id === result.scenarioId)?.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {result.success ? 'Success' : 'Failed'}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">
                        Score: {result.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Duration:</span>
                      <span className="font-semibold text-slate-800 ml-1">{result.duration}s</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Total Delay:</span>
                      <span className="font-semibold text-slate-800 ml-1">{result.metrics.totalDelay.toFixed(1)}m</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Conflicts:</span>
                      <span className="font-semibold text-slate-800 ml-1">{result.metrics.conflicts}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Actions:</span>
                      <span className="font-semibold text-slate-800 ml-1">{result.actions.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
