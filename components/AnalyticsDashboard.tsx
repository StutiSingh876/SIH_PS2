'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  Users, 
  AlertTriangle,
  Download,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Target,
  Gauge
} from 'lucide-react'

interface AnalyticsData {
  period: {
    start: number
    end: number
    duration: number
  }
  summary: {
    totalTrains: number
    averageDelay: number
    totalEnergySaved: number
    systemEfficiency: number
    disruptionsHandled: number
  }
  trends: {
    delayTrend: TrendData[]
    efficiencyTrend: TrendData[]
    energyTrend: TrendData[]
    conflictTrend: TrendData[]
  }
  insights: string[]
  recommendations: string[]
}

interface TrendData {
  timestamp: number
  value: number
  label?: string
}

interface PerformanceComparison {
  scenario: string
  aiMode: {
    totalDelay: number
    efficiency: number
    energySaved: number
    conflicts: number
  }
  manualMode: {
    totalDelay: number
    efficiency: number
    energySaved: number
    conflicts: number
  }
  improvement: {
    delayReduction: number
    efficiencyGain: number
    energySaved: number
    conflictReduction: number
  }
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [performanceComparison, setPerformanceComparison] = useState<PerformanceComparison | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('1h')
  const [isReplaying, setIsReplaying] = useState(false)
  const [replayProgress, setReplayProgress] = useState(0)

  useEffect(() => {
    // Load analytics data
    loadAnalyticsData()
  }, [selectedPeriod])

  const loadAnalyticsData = () => {
    // Simulate loading analytics data
    const mockData: AnalyticsData = {
      period: {
        start: Date.now() - 3600000, // 1 hour ago
        end: Date.now(),
        duration: 3600000
      },
      summary: {
        totalTrains: 14,
        averageDelay: 3.2,
        totalEnergySaved: 1250.5,
        systemEfficiency: 87.5,
        disruptionsHandled: 3
      },
      trends: {
        delayTrend: generateMockTrendData(60, 0, 10),
        efficiencyTrend: generateMockTrendData(60, 80, 95),
        energyTrend: generateMockTrendData(60, 1000, 1500),
        conflictTrend: generateMockTrendData(60, 0, 5)
      },
      insights: [
        'Peak delay occurred at 14:30 due to signal failure at Junction B',
        'System efficiency improved by 12% after AI optimization',
        'Energy consumption reduced by 8.5% through speed optimization',
        '3 disruptions handled successfully with minimal passenger impact'
      ],
      recommendations: [
        'Implement predictive maintenance for signals',
        'Optimize train scheduling during peak hours',
        'Consider infrastructure upgrades for high-traffic sections',
        'Enhance weather monitoring and response systems'
      ]
    }
    
    setAnalyticsData(mockData)
  }

  const generateMockTrendData = (points: number, min: number, max: number): TrendData[] => {
    const data: TrendData[] = []
    for (let i = 0; i < points; i++) {
      data.push({
        timestamp: Date.now() - (points - i) * 60000, // 1 minute intervals
        value: min + Math.random() * (max - min)
      })
    }
    return data
  }

  const loadPerformanceComparison = () => {
    const mockComparison: PerformanceComparison = {
      scenario: 'AI vs Manual Comparison',
      aiMode: {
        totalDelay: 45,
        efficiency: 87.5,
        energySaved: 1250,
        conflicts: 2
      },
      manualMode: {
        totalDelay: 78,
        efficiency: 72.3,
        energySaved: 890,
        conflicts: 5
      },
      improvement: {
        delayReduction: 33,
        efficiencyGain: 15.2,
        energySaved: 360,
        conflictReduction: 3
      }
    }
    
    setPerformanceComparison(mockComparison)
  }

  const startReplay = () => {
    setIsReplaying(true)
    setReplayProgress(0)
    
    // Simulate replay progress
    const interval = setInterval(() => {
      setReplayProgress(prev => {
        if (prev >= 100) {
          setIsReplaying(false)
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const stopReplay = () => {
    setIsReplaying(false)
    setReplayProgress(0)
  }

  const exportData = (format: 'json' | 'csv') => {
    console.log(`Exporting data in ${format} format`)
    // In real implementation, this would trigger data export
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="h-full bg-slate-50 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Analytics & Reports</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>

          {/* Replay Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={isReplaying ? stopReplay : startReplay}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
            >
              {isReplaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setReplayProgress(0)}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Export */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportData('json')}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              Export JSON
            </button>
            <button
              onClick={() => exportData('csv')}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Trains</p>
                <p className="text-2xl font-bold text-slate-800">{analyticsData.summary.totalTrains}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Avg Delay</p>
                <p className="text-2xl font-bold text-slate-800">{analyticsData.summary.averageDelay.toFixed(1)}m</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Efficiency</p>
                <p className="text-2xl font-bold text-slate-800">{analyticsData.summary.systemEfficiency.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Zap className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Energy Saved</p>
                <p className="text-2xl font-bold text-slate-800">{analyticsData.summary.totalEnergySaved.toFixed(0)}kWh</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Disruptions</p>
                <p className="text-2xl font-bold text-slate-800">{analyticsData.summary.disruptionsHandled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>AI vs Manual Performance</span>
          </h3>
          
          <button
            onClick={loadPerformanceComparison}
            className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Load Comparison Data
          </button>

          {performanceComparison && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">AI Mode</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Delay:</span>
                      <span className="font-semibold text-green-600">{performanceComparison.aiMode.totalDelay}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Efficiency:</span>
                      <span className="font-semibold text-green-600">{performanceComparison.aiMode.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Energy Saved:</span>
                      <span className="font-semibold text-green-600">{performanceComparison.aiMode.energySaved}kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Conflicts:</span>
                      <span className="font-semibold text-green-600">{performanceComparison.aiMode.conflicts}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Manual Mode</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Delay:</span>
                      <span className="font-semibold text-red-600">{performanceComparison.manualMode.totalDelay}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Efficiency:</span>
                      <span className="font-semibold text-red-600">{performanceComparison.manualMode.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Energy Saved:</span>
                      <span className="font-semibold text-red-600">{performanceComparison.manualMode.energySaved}kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Conflicts:</span>
                      <span className="font-semibold text-red-600">{performanceComparison.manualMode.conflicts}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">AI Improvement</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">-{performanceComparison.improvement.delayReduction}m</div>
                    <div className="text-sm text-green-700">Delay Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+{performanceComparison.improvement.efficiencyGain}%</div>
                    <div className="text-sm text-green-700">Efficiency Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+{performanceComparison.improvement.energySaved}kWh</div>
                    <div className="text-sm text-green-700">Energy Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">-{performanceComparison.improvement.conflictReduction}</div>
                    <div className="text-sm text-green-700">Conflicts Reduced</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Historical Replay */}
        <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <Play className="w-5 h-5 text-blue-600" />
            <span>Historical Replay</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${replayProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  {isReplaying ? 'Replaying...' : 'Ready to replay'} • {replayProgress.toFixed(0)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Replay Controls</h4>
                <div className="space-y-2">
                  <button
                    onClick={startReplay}
                    disabled={isReplaying}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    Start Replay
                  </button>
                  <button
                    onClick={stopReplay}
                    disabled={!isReplaying}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    Stop Replay
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Replay Settings</h4>
                <div className="space-y-2">
                  <select className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm">
                    <option>1x Speed</option>
                    <option>2x Speed</option>
                    <option>5x Speed</option>
                    <option>10x Speed</option>
                  </select>
                  <select className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm">
                    <option>Last Hour</option>
                    <option>Last 6 Hours</option>
                    <option>Last 24 Hours</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Export Options</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => exportData('json')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    Export JSON
                  </button>
                  <button
                    onClick={() => exportData('csv')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Key Insights</span>
            </h3>
            <div className="space-y-3">
              {analyticsData.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span>Recommendations</span>
            </h3>
            <div className="space-y-3">
              {analyticsData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
