'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Zap,
  Target
} from 'lucide-react'
import AnalyticsCharts from '@/components/AnalyticsCharts'
import PerformanceOverview from '@/components/PerformanceOverview'
import OverrideAnalysis from '@/components/OverrideAnalysis'
import SustainabilityDashboard from '@/components/SustainabilityDashboard'

export default function AnalyticsPage() {
  const [user, setUser] = useState<any>(null)
  const [dateRange, setDateRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('efficiency')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const dateRanges = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ]

  const metrics = [
    { value: 'efficiency', label: 'Efficiency', icon: TrendingUp },
    { value: 'delays', label: 'Delays', icon: Clock },
    { value: 'conflicts', label: 'Conflicts', icon: AlertTriangle },
    { value: 'sustainability', label: 'Sustainability', icon: Zap }
  ]

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting analytics data...')
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
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Analytics & Reports</h1>
                  <p className="text-sm text-gray-500">Performance insights and operational intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Date Range Selector */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm"
                >
                  {dateRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Metric Selector */}
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 text-sm"
                >
                  {metrics.map((metric) => (
                    <option key={metric.value} value={metric.value}>
                      {metric.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
                <button
                  onClick={handleExport}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Performance Overview */}
        <PerformanceOverview dateRange={dateRange} />

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Efficiency Trends</h2>
              <p className="text-sm text-gray-600">System performance over time</p>
            </div>
            <div className="p-6 bg-gray-50">
              <AnalyticsCharts type="efficiency" dateRange={dateRange} />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">Delay Analysis</h2>
              <p className="text-sm text-gray-600">Delay patterns and causes</p>
            </div>
            <div className="p-6 bg-gray-50">
              <AnalyticsCharts type="delays" dateRange={dateRange} />
            </div>
          </div>
        </div>

        {/* Override Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-semibold text-gray-900">Controller Override Analysis</h2>
            <p className="text-sm text-gray-600">AI recommendation acceptance and override patterns</p>
          </div>
          <div className="p-6 bg-gray-50">
            <OverrideAnalysis dateRange={dateRange} />
          </div>
        </div>

        {/* Sustainability Dashboard */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-semibold text-gray-900">Sustainability Dashboard</h2>
            <p className="text-sm text-gray-600">Environmental impact and energy optimization</p>
          </div>
          <div className="p-6 bg-gray-50">
            <SustainabilityDashboard dateRange={dateRange} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">47</div>
              <div className="text-gray-700 text-sm font-medium">Trains Processed</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">23</div>
              <div className="text-gray-700 text-sm font-medium">AI Recommendations</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-gray-700 text-sm font-medium">Conflicts Resolved</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-600 mb-2">8</div>
              <div className="text-gray-700 text-sm font-medium">Delays Prevented</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
