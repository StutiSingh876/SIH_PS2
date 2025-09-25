'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Zap,
  BarChart3,
  Target
} from 'lucide-react'

interface PerformanceMetricsProps {
  conflicts: number
  delays: number
  efficiency: number
  energySaved: number
}

export default function PerformanceMetrics({ 
  conflicts, 
  delays, 
  efficiency, 
  energySaved 
}: PerformanceMetricsProps) {
  const [metrics, setMetrics] = useState({
    conflicts,
    delays,
    efficiency,
    energySaved,
    throughput: 85,
    punctuality: 92,
    passengerSatisfaction: 88,
    safetyScore: 98
  })

  useEffect(() => {
    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        conflicts: Math.max(0, prev.conflicts + (Math.random() - 0.5) * 2),
        delays: Math.max(0, prev.delays + (Math.random() - 0.5) * 5),
        efficiency: Math.min(100, Math.max(0, prev.efficiency + (Math.random() - 0.5) * 2)),
        energySaved: Math.max(0, prev.energySaved + (Math.random() - 0.5) * 1),
        throughput: Math.min(100, Math.max(0, prev.throughput + (Math.random() - 0.5) * 1)),
        punctuality: Math.min(100, Math.max(0, prev.punctuality + (Math.random() - 0.5) * 1)),
        passengerSatisfaction: Math.min(100, Math.max(0, prev.passengerSatisfaction + (Math.random() - 0.5) * 1)),
        safetyScore: Math.min(100, Math.max(0, prev.safetyScore + (Math.random() - 0.5) * 0.5))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getMetricColor = (value: number, type: 'positive' | 'negative' = 'positive') => {
    if (type === 'negative') {
      return value > 80 ? 'text-red-400' : value > 60 ? 'text-yellow-400' : 'text-green-400'
    }
    return value > 80 ? 'text-green-400' : value > 60 ? 'text-yellow-400' : 'text-red-400'
  }

  const getMetricIcon = (value: number, type: 'positive' | 'negative' = 'positive') => {
    if (type === 'negative') {
      return value > 80 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />
    }
    return value > 80 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-white">Real-time Metrics</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Conflicts</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-400">{Math.round(metrics.conflicts)}</div>
            <div className="text-xs text-slate-400">Active conflicts</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Delays</span>
              <Clock className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-400">{Math.round(metrics.delays)}m</div>
            <div className="text-xs text-slate-400">Average delay</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Efficiency</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400">{Math.round(metrics.efficiency)}%</div>
            <div className="text-xs text-slate-400">System efficiency</div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Energy Saved</span>
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400">{Math.round(metrics.energySaved)}%</div>
            <div className="text-xs text-slate-400">Fuel efficiency</div>
          </div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-white">Performance Indicators</h3>
        </div>

        <div className="space-y-4">
          {/* Throughput */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Throughput</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getMetricColor(metrics.throughput)}`}>
                  {Math.round(metrics.throughput)}%
                </span>
                {getMetricIcon(metrics.throughput)}
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.throughput}%` }}
              ></div>
            </div>
          </div>

          {/* Punctuality */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Punctuality</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getMetricColor(metrics.punctuality)}`}>
                  {Math.round(metrics.punctuality)}%
                </span>
                {getMetricIcon(metrics.punctuality)}
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.punctuality}%` }}
              ></div>
            </div>
          </div>

          {/* Passenger Satisfaction */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Passenger Satisfaction</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getMetricColor(metrics.passengerSatisfaction)}`}>
                  {Math.round(metrics.passengerSatisfaction)}%
                </span>
                {getMetricIcon(metrics.passengerSatisfaction)}
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.passengerSatisfaction}%` }}
              ></div>
            </div>
          </div>

          {/* Safety Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Safety Score</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getMetricColor(metrics.safetyScore)}`}>
                  {Math.round(metrics.safetyScore)}%
                </span>
                {getMetricIcon(metrics.safetyScore)}
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.safetyScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Summary */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">Simulation Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Duration:</span>
            <span className="text-white">2h 15m</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Trains Processed:</span>
            <span className="text-white">47</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Conflicts Resolved:</span>
            <span className="text-green-400">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Delays Prevented:</span>
            <span className="text-blue-400">8</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Energy Saved:</span>
            <span className="text-yellow-400">15%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">AI Recommendations:</span>
            <span className="text-purple-400">23</span>
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">Performance Trends</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Efficiency Trend</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">+5.2%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Delay Reduction</span>
            <div className="flex items-center space-x-1">
              <TrendingDown className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">-12.8%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Energy Optimization</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">+8.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
