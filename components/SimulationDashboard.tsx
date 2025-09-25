'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
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
  Gauge
} from 'lucide-react'
import { RailwaySimulation } from '@/lib/simulation/RailwaySimulation'
import { AIOptimizer } from '@/lib/simulation/AIOptimizer'

interface SimulationState {
  isRunning: boolean
  time: number
  speed: number
  kpis: any
  trains: any[]
  stations: any[]
  signals: any[]
  disruptions: any[]
  events: any[]
}

interface KPICard {
  title: string
  value: string
  change: string
  icon: any
  color: string
  trend: 'up' | 'down' | 'neutral'
}

export default function SimulationDashboard() {
  const router = useRouter()
  const simulationRef = useRef<RailwaySimulation | null>(null)
  const aiOptimizerRef = useRef<AIOptimizer | null>(null)
  
  const [simulation, setSimulation] = useState<SimulationState>({
    isRunning: false,
    time: 0,
    speed: 1,
    kpis: {
      trainsClearedPerHour: 12.5,
      averageDelay: 2.3,
      passengerImpact: 150,
      energyUsage: 45.2,
      systemEfficiency: 87.5,
      conflicts: 3,
      totalDelay: 18.5,
      throughput: 95.2
    },
    trains: [
      { id: 'T001', name: 'Express 12001', status: 'running', currentPosition: 45.2, speed: 120, delay: 0 },
      { id: 'T002', name: 'Freight 24001', status: 'delayed', currentPosition: 23.8, speed: 80, delay: 5.2 },
      { id: 'T003', name: 'Local 34001', status: 'running', currentPosition: 67.1, speed: 60, delay: 0 },
      { id: 'T004', name: 'Express 12002', status: 'early', currentPosition: 89.3, speed: 125, delay: -2.1 },
      { id: 'T005', name: 'Freight 24002', status: 'running', currentPosition: 12.4, speed: 75, delay: 0 },
      { id: 'T006', name: 'Local 34002', status: 'delayed', currentPosition: 56.7, speed: 55, delay: 3.8 }
    ],
    stations: [
      { id: 'S001', name: 'Station A', position: 0, capacity: 4, currentTrains: 2 },
      { id: 'S002', name: 'Junction B', position: 30, capacity: 6, currentTrains: 3 },
      { id: 'S003', name: 'Station C', position: 60, capacity: 4, currentTrains: 1 },
      { id: 'S004', name: 'Station D', position: 90, capacity: 3, currentTrains: 2 },
      { id: 'S005', name: 'Terminal E', position: 120, capacity: 8, currentTrains: 4 }
    ],
    signals: [
      { id: 'SG001', position: 15, state: 'green' },
      { id: 'SG002', position: 45, state: 'yellow' },
      { id: 'SG003', position: 75, state: 'red' },
      { id: 'SG004', position: 105, state: 'green' },
      { id: 'SG005', position: 30, state: 'green' },
      { id: 'SG006', position: 60, state: 'yellow' }
    ],
    disruptions: [],
    events: []
  })

  const [aiRecommendations, setAIRecommendations] = useState<any[]>([])
  const [selectedMode, setSelectedMode] = useState<'ai' | 'manual'>('ai')
  const [showSettings, setShowSettings] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState('basic')

  // Initialize simulation engine
  useEffect(() => {
    if (!simulationRef.current) {
      try {
        simulationRef.current = new RailwaySimulation()
        aiOptimizerRef.current = new AIOptimizer(simulationRef.current)
        
        // Set up event listeners
        simulationRef.current.addEventListener((event: any) => {
          handleSimulationEvent(event)
        })
        
        // Initial state update
        updateSimulationState()
      } catch (error) {
        console.error('Error initializing simulation engine:', error)
        // Set default state if initialization fails
        setSimulation(prev => ({
          ...prev,
          isRunning: false,
          kpis: {
            trainsClearedPerHour: 0,
            averageDelay: 0,
            passengerImpact: 0,
            energyUsage: 0,
            systemEfficiency: 0,
            conflicts: 0,
            totalDelay: 0,
            throughput: 0
          },
          trains: [],
          stations: [],
          signals: [],
          disruptions: [],
          events: []
        }))
      }
    }
  }, [])

  const handleSimulationEvent = (event: any) => {
    console.log('Simulation event:', event)
    updateSimulationState()
  }

  const updateSimulationState = () => {
    if (simulationRef.current) {
      try {
        const state = simulationRef.current.getState()
        setSimulation({
          isRunning: state.isRunning,
          time: state.currentTime,
          speed: state.speed,
          kpis: state.kpis || {
            trainsClearedPerHour: 0,
            averageDelay: 0,
            passengerImpact: 0,
            energyUsage: 0,
            systemEfficiency: 0,
            conflicts: 0,
            totalDelay: 0,
            throughput: 0
          },
          trains: state.trains || [],
          stations: state.stations || [],
          signals: state.signals || [],
          disruptions: state.disruptions || [],
          events: state.events || []
        })
      } catch (error) {
        console.error('Error updating simulation state:', error)
        // Set default state if there's an error
        setSimulation(prev => ({
          ...prev,
          isRunning: false,
          kpis: {
            trainsClearedPerHour: 0,
            averageDelay: 0,
            passengerImpact: 0,
            energyUsage: 0,
            systemEfficiency: 0,
            conflicts: 0,
            totalDelay: 0,
            throughput: 0
          },
          trains: [],
          stations: [],
          signals: [],
          disruptions: [],
          events: []
        }))
      }
    }
  }

  const toggleSimulation = () => {
    setSimulation(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }))
    console.log('Simulation toggled:', !simulation.isRunning ? 'Started' : 'Paused')
  }

  const resetSimulation = () => {
    setSimulation(prev => ({
      ...prev,
      isRunning: false,
      time: 0,
      disruptions: [],
      kpis: {
        trainsClearedPerHour: 12.5,
        averageDelay: 2.3,
        passengerImpact: 150,
        energyUsage: 45.2,
        systemEfficiency: 87.5,
        conflicts: 3,
        totalDelay: 18.5,
        throughput: 95.2
      }
    }))
    setAIRecommendations([])
    console.log('Simulation reset')
  }

  const changeSpeed = (newSpeed: number) => {
    setSimulation(prev => ({
      ...prev,
      speed: newSpeed
    }))
    console.log('Speed changed to:', newSpeed)
  }

  const generateAIRecommendations = async () => {
    // Generate mock AI recommendations
    const mockRecommendations = [
      {
        id: 'rec-001',
        type: 'reroute',
        priority: 'high',
        title: 'Reroute Express 12001',
        description: 'Reroute Express 12001 to avoid signal congestion at Junction B. This will reduce delay by 3.2 minutes.',
        impact: 'High',
        confidence: 92,
        estimatedSavings: 192,
        affectedTrains: ['T001'],
        affectedSections: ['SG002']
      },
      {
        id: 'rec-002',
        type: 'speed_adjustment',
        priority: 'medium',
        title: 'Increase Freight Speed',
        description: 'Increase speed of Freight 24001 from 80 km/h to 95 km/h to maintain schedule.',
        impact: 'Medium',
        confidence: 78,
        estimatedSavings: 45,
        affectedTrains: ['T002'],
        affectedSections: ['SG001', 'SG002']
      },
      {
        id: 'rec-003',
        type: 'platform_reallocation',
        priority: 'low',
        title: 'Optimize Platform Usage',
        description: 'Reallocate platforms at Station C to reduce waiting time for Local 34001.',
        impact: 'Low',
        confidence: 85,
        estimatedSavings: 15,
        affectedTrains: ['T003'],
        affectedSections: ['S003']
      }
    ]
    
    setAIRecommendations(mockRecommendations)
    console.log('Generated AI recommendations:', mockRecommendations)
  }

  const applyRecommendation = (recommendationId: string) => {
    const recommendation = aiRecommendations.find(rec => rec.id === recommendationId)
    if (recommendation) {
      console.log('Applied recommendation:', recommendation.title)
      // Update simulation KPIs based on recommendation
      setSimulation(prev => ({
        ...prev,
        kpis: {
          ...prev.kpis,
          averageDelay: Math.max(0, prev.kpis.averageDelay - (recommendation.estimatedSavings / 60)),
          systemEfficiency: Math.min(100, prev.kpis.systemEfficiency + 2)
        }
      }))
    }
    setAIRecommendations(prev => 
      prev.filter(rec => rec.id !== recommendationId)
    )
  }

  const injectDisruption = (type: string) => {
    const disruption = {
      id: `disruption-${Date.now()}`,
      type: type as 'signal_failure' | 'weather' | 'emergency_train',
      severity: type === 'signal_failure' ? 'critical' : type === 'weather' ? 'high' : 'medium' as 'low' | 'medium' | 'high' | 'critical',
      affectedSections: [30, 60, 90],
      startTime: simulation.time,
      duration: 300,
      resolved: false,
      description: `${type.replace('_', ' ')} disruption injected at ${new Date().toLocaleTimeString()}`
    }
    
    // Add disruption to simulation state
    setSimulation(prev => ({
      ...prev,
      disruptions: [...prev.disruptions, disruption]
    }))
    
    console.log('Injected disruption:', disruption)
  }

  const scenarios = [
    { id: 'basic', name: 'Basic Operations', description: 'Normal railway operations' },
    { id: 'peak', name: 'Peak Hour Congestion', description: 'High traffic with 6 additional local trains' },
    { id: 'signal_failure', name: 'Signal Failure', description: 'Signal failure at Junction B' },
    { id: 'weather', name: 'Weather Disruption', description: 'Heavy fog conditions' },
    { id: 'emergency', name: 'Emergency Train', description: 'Medical emergency special train' },
    { id: 'comparison', name: 'AI vs Manual', description: 'Compare AI and manual decision making' }
  ]

  const kpiCards: KPICard[] = [
    {
      title: 'Trains Cleared/Hour',
      value: simulation.kpis.trainsClearedPerHour.toFixed(1),
      change: '+2.3',
      icon: Train,
      color: 'text-blue-600',
      trend: 'up'
    },
    {
      title: 'Average Delay',
      value: `${simulation.kpis.averageDelay.toFixed(1)}m`,
      change: '-1.2m',
      icon: Clock,
      color: 'text-red-600',
      trend: 'down'
    },
    {
      title: 'System Efficiency',
      value: `${simulation.kpis.systemEfficiency.toFixed(1)}%`,
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-green-600',
      trend: 'up'
    },
    {
      title: 'Energy Usage',
      value: `${simulation.kpis.energyUsage.toFixed(1)}kWh`,
      change: '-8.5%',
      icon: Zap,
      color: 'text-yellow-600',
      trend: 'down'
    }
  ]

  return (
    <div className="h-full bg-slate-50 rounded-lg shadow-md">
      {/* Header and Controls */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${simulation.isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`}></div>
            <h2 className="text-xl font-bold text-slate-800">Railway Simulation Dashboard</h2>
            <span className="text-sm text-slate-500">
              {simulation.isRunning ? 'Running' : 'Paused'} • {simulation.speed}x Speed • {simulation.time}min
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Scenario Selector */}
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm"
          >
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>

          {/* Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedMode('manual')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedMode === 'manual' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setSelectedMode('ai')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedMode === 'ai' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              AI Mode
            </button>
          </div>

          {/* Control Buttons */}
          <button 
            onClick={toggleSimulation}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
          >
            {simulation.isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button 
            onClick={resetSimulation}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                  <p className={`text-xs ${card.trend === 'up' ? 'text-green-600' : card.trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
                    {card.change}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${card.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simulation Controls */}
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Simulation Controls</h3>
          <div className="flex items-center space-x-4">
            {/* Speed Control */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-slate-600">Speed:</label>
              <button 
                onClick={() => changeSpeed(Math.max(0.5, simulation.speed - 0.5))}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded text-sm transition-colors"
              >
                -
              </button>
              <span className="text-sm font-mono text-slate-800 w-12 text-center">{simulation.speed}x</span>
              <button 
                onClick={() => changeSpeed(Math.min(5, simulation.speed + 0.5))}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded text-sm transition-colors"
              >
                +
              </button>
            </div>

            {/* AI Recommendations Button */}
            <button 
              onClick={generateAIRecommendations}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>Generate AI Recommendations</span>
            </button>

            {/* Disruption Buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => injectDisruption('signal_failure')}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
              >
                <Signal className="w-4 h-4" />
                <span>Signal Failure</span>
              </button>
              <button 
                onClick={() => injectDisruption('weather')}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
              >
                <Cloud className="w-4 h-4" />
                <span>Weather</span>
              </button>
              <button 
                onClick={() => injectDisruption('emergency_train')}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
              >
                <Shield className="w-4 h-4" />
                <span>Emergency</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>AI Recommendations</span>
            </h3>
            <div className="space-y-3">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        rec.priority === 'high' ? 'bg-red-500' : 
                        rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600">
                      {rec.confidence}% confidence
                    </div>
                  </div>
                  <p className="text-slate-700 mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Impact: {rec.impact} • Savings: {rec.estimatedSavings} seconds
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => applyRecommendation(rec.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => {
                          console.log('Override recommendation:', rec.id)
                          setAIRecommendations(prev => 
                            prev.filter(r => r.id !== rec.id)
                          )
                        }}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1 rounded text-sm transition-colors"
                      >
                        Override
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Disruptions */}
        {simulation.disruptions.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Active Disruptions</span>
            </h3>
            <div className="space-y-3">
              {simulation.disruptions.map((disruption) => (
                <div key={disruption.id} className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-red-800">{disruption.type.replace('_', ' ').toUpperCase()}</h4>
                      <p className="text-sm text-red-600">Severity: {disruption.severity}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          console.log('Resolve disruption:', disruption.id)
                          // Remove disruption from the list
                          setSimulation(prev => ({
                            ...prev,
                            disruptions: prev.disruptions.filter(d => d.id !== disruption.id)
                          }))
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Train Status */}
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <Train className="w-5 h-5 text-blue-600" />
            <span>Train Status</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {simulation.trains.slice(0, 6).map((train) => (
              <div key={train.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{train.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    train.status === 'running' ? 'bg-green-100 text-green-700' :
                    train.status === 'delayed' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {train.status}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  <div>Position: {train.currentPosition.toFixed(1)} km</div>
                  <div>Speed: {train.speed.toFixed(1)} km/h</div>
                  <div>Delay: {train.delay.toFixed(1)} min</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signal Status */}
        <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <Signal className="w-5 h-5 text-green-600" />
            <span>Signal Status</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {simulation.signals.map((signal) => (
              <div key={signal.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-center">
                <div className="text-sm font-semibold text-slate-800">{signal.id}</div>
                <div className={`w-3 h-3 rounded-full mx-auto mt-2 ${
                  signal.state === 'green' ? 'bg-green-500' :
                  signal.state === 'yellow' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <div className="text-xs text-slate-500 mt-1">{signal.state}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}