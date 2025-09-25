'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle, Users, Zap } from 'lucide-react'

interface PerformanceOverviewProps {
  dateRange: string
}

export default function PerformanceOverview({ dateRange }: PerformanceOverviewProps) {
  const [metrics, setMetrics] = useState({
    efficiency: 87.5,
    punctuality: 92.3,
    conflicts: 2,
    delays: 8.5,
    energySaved: 12.3,
    passengerSatisfaction: 89.1
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        efficiency: Math.max(0, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 2)),
        punctuality: Math.max(0, Math.min(100, prev.punctuality + (Math.random() - 0.5) * 1)),
        conflicts: Math.max(0, prev.conflicts + (Math.random() - 0.5) * 0.5),
        delays: Math.max(0, prev.delays + (Math.random() - 0.5) * 1),
        energySaved: Math.max(0, Math.min(100, prev.energySaved + (Math.random() - 0.5) * 1)),
        passengerSatisfaction: Math.max(0, Math.min(100, prev.passengerSatisfaction + (Math.random() - 0.5) * 1))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getMetricColor = (value: number, type: 'positive' | 'negative' = 'positive') => {
    if (type === 'negative') {
      return value > 80 ? 'text-red-400' : value > 60 ? 'text-yellow-400' : 'text-green-400'
    }
    return value > 80 ? 'text-green-400' : value > 60 ? 'text-yellow-400' : 'text-red-400'
  }

  const getTrendIcon = (value: number) => {
    return value > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Performance Overview</h2>
        <p className="text-sm text-slate-500">Key performance indicators for {dateRange}</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Efficiency */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Efficiency</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                {getTrendIcon(5.2)}
                <span className="text-sm font-medium">+5.2%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">{metrics.efficiency.toFixed(1)}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.efficiency}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">System throughput optimization</div>
          </div>

          {/* Punctuality */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Punctuality</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                {getTrendIcon(2.1)}
                <span className="text-sm font-medium">+2.1%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">{metrics.punctuality.toFixed(1)}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.punctuality}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">On-time performance</div>
          </div>

          {/* Conflicts */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Conflicts</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                {getTrendIcon(-1.5)}
                <span className="text-sm font-medium">-1.5</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">{metrics.conflicts.toFixed(1)}</div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (metrics.conflicts / 10) * 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Active conflicts resolved</div>
          </div>

          {/* Delays */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Avg Delays</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                {getTrendIcon(-3.2)}
                <span className="text-sm font-medium">-3.2m</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">{metrics.delays.toFixed(1)}m</div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (metrics.delays / 30) * 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Average delay per train</div>
          </div>

          {/* Energy Saved */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Energy Saved</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                {getTrendIcon(2.8)}
                <span className="text-sm font-medium">+2.8%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">{metrics.energySaved.toFixed(1)}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.energySaved}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Fuel efficiency optimization</div>
          </div>

          {/* Passenger Satisfaction */}
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Satisfaction</span>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                {getTrendIcon(1.7)}
                <span className="text-sm font-medium">+1.7%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">{metrics.passengerSatisfaction.toFixed(1)}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${metrics.passengerSatisfaction}%` }}
              ></div>
            </div>
            <div className="text-xs text-slate-500 mt-2">Passenger experience rating</div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-1">47</div>
            <div className="text-sm text-gray-700">Trains Processed</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">23</div>
            <div className="text-sm text-gray-700">AI Recommendations</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
            <div className="text-sm text-gray-700">Conflicts Resolved</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-amber-600 mb-1">8</div>
            <div className="text-sm text-gray-700">Delays Prevented</div>
          </div>
        </div>
      </div>
    </div>
  )
}
