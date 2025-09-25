'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Play,
  RotateCcw
} from 'lucide-react'

interface Recommendation {
  id: string
  type: 'optimization' | 'conflict' | 'delay' | 'efficiency'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  confidence: number
  action: string
  estimatedSavings: number
}

export default function AIRecommendations() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const router = useRouter()

  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'conflict',
      priority: 'high',
      title: 'Resolve Track Conflict',
      description: 'Train 12345 and Rajdhani Express are on collision course at Junction A. Immediate action required.',
      impact: 'Prevent 30-minute delay cascade',
      confidence: 95,
      action: 'Hold Train 12345 for 5 minutes',
      estimatedSavings: 1800
    },
    {
      id: '2',
      type: 'optimization',
      priority: 'medium',
      title: 'Platform Reallocation',
      description: 'Optimize platform assignments to reduce passenger transfer time by 8 minutes.',
      impact: 'Improve passenger experience',
      confidence: 87,
      action: 'Switch platforms 2 and 4',
      estimatedSavings: 480
    },
    {
      id: '3',
      type: 'efficiency',
      priority: 'low',
      title: 'Energy Optimization',
      description: 'Adjust speed profile for freight train to reduce fuel consumption by 12%.',
      impact: 'Reduce carbon footprint',
      confidence: 78,
      action: 'Implement eco-driving mode',
      estimatedSavings: 150
    },
    {
      id: '4',
      type: 'delay',
      priority: 'high',
      title: 'Delay Propagation Prevention',
      description: 'Shatabdi Express delay will affect 3 connecting trains. Proactive rerouting recommended.',
      impact: 'Prevent 45-minute network delay',
      confidence: 92,
      action: 'Reroute via alternative track',
      estimatedSavings: 2700
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-slate-500 bg-slate-50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conflict': return <AlertTriangle className="w-4 h-4" />
      case 'optimization': return <TrendingUp className="w-4 h-4" />
      case 'delay': return <Clock className="w-4 h-4" />
      case 'efficiency': return <Zap className="w-4 h-4" />
      default: return <Brain className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conflict': return 'text-red-600'
      case 'optimization': return 'text-blue-600'
      case 'delay': return 'text-yellow-600'
      case 'efficiency': return 'text-green-600'
      default: return 'text-slate-600'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with AI Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">AI Active</span>
          </div>
          <div className="text-xs text-slate-500">
            Last updated: 2 min ago
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white border-2 border-slate-300 rounded-lg p-4 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={getTypeColor(rec.type)}>
                  {getTypeIcon(rec.type)}
                </div>
                <h3 className="font-bold text-slate-800">{rec.title}</h3>
                <span className={`text-xs px-2 py-1 rounded font-bold ${
                  rec.priority === 'high' ? 'bg-red-200 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-green-200 text-green-800'
                }`}>
                  {rec.priority.toUpperCase()}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-600">
                {rec.confidence}% confidence
              </div>
            </div>

            <p className="text-slate-700 mb-3">{rec.description}</p>

            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Accept
              </button>
              <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-4 rounded text-sm transition-colors">
                <RotateCcw className="w-4 h-4 inline mr-1" />
                Override
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* What-If Simulator */}
      <div className="mt-4 bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Play className="w-4 h-4 text-blue-600" />
          <h4 className="font-semibold text-slate-800">What-If Simulator</h4>
        </div>
        <p className="text-slate-600 text-sm mb-3">
          Test alternative scenarios and see their impact
        </p>
        <button 
          onClick={() => router.push('/simulator')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors"
        >
          <Play className="w-4 h-4 inline mr-2" />
          Run Simulation
        </button>
      </div>

      {/* Performance Metrics */}
      <div className="mt-4 bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
        <h4 className="font-semibold text-slate-800 text-sm mb-2">Today's Performance</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-green-600 font-semibold">+23%</div>
            <div className="text-slate-500">Efficiency</div>
          </div>
          <div>
            <div className="text-blue-600 font-semibold">-45min</div>
            <div className="text-slate-500">Delays Saved</div>
          </div>
          <div>
            <div className="text-purple-600 font-semibold">12</div>
            <div className="text-slate-500">Conflicts Resolved</div>
          </div>
          <div>
            <div className="text-yellow-600 font-semibold">8.5%</div>
            <div className="text-slate-500">Energy Saved</div>
          </div>
        </div>
      </div>
    </div>
  )
}
