'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react'

interface OverrideAnalysisProps {
  dateRange: string
}

export default function OverrideAnalysis({ dateRange }: OverrideAnalysisProps) {
  const [overrideData, setOverrideData] = useState<any[]>([])
  const [summary, setSummary] = useState({
    totalRecommendations: 0,
    accepted: 0,
    overridden: 0,
    acceptanceRate: 0
  })

  useEffect(() => {
    // Generate sample override data
    const generateData = () => {
      const data = []
      const days = dateRange === '1d' ? 24 : dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
      const isHourly = dateRange === '1d'

      for (let i = 0; i < days; i++) {
        const accepted = Math.floor(Math.random() * 10) + 5
        const overridden = Math.floor(Math.random() * 5) + 1
        const total = accepted + overridden

        if (isHourly) {
          data.push({
            time: `${i.toString().padStart(2, '0')}:00`,
            accepted,
            overridden,
            total,
            acceptanceRate: (accepted / total) * 100
          })
        } else {
          data.push({
            date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            accepted,
            overridden,
            total,
            acceptanceRate: (accepted / total) * 100
          })
        }
      }
      return data
    }

    const data = generateData()
    setOverrideData(data)
    
    // Calculate summary
    const totalRecs = data.reduce((sum, item) => sum + item.total, 0)
    const totalAccepted = data.reduce((sum, item) => sum + item.accepted, 0)
    const totalOverridden = data.reduce((sum, item) => sum + item.overridden, 0)
    
    setSummary({
      totalRecommendations: totalRecs,
      accepted: totalAccepted,
      overridden: totalOverridden,
      acceptanceRate: totalRecs > 0 ? (totalAccepted / totalRecs) * 100 : 0
    })
  }, [dateRange])

  const pieData = [
    { name: 'Accepted', value: summary.accepted, color: '#10b981' },
    { name: 'Overridden', value: summary.overridden, color: '#ef4444' }
  ]

  const overrideReasons = [
    { reason: 'Safety Concern', count: 8, percentage: 35 },
    { reason: 'Operational Priority', count: 6, percentage: 26 },
    { reason: 'Passenger Impact', count: 4, percentage: 17 },
    { reason: 'Technical Issue', count: 3, percentage: 13 },
    { reason: 'Other', count: 2, percentage: 9 }
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{summary.totalRecommendations}</div>
              <div className="text-sm text-slate-500">Total Recommendations</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{summary.accepted}</div>
              <div className="text-sm text-slate-500">Accepted</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{summary.overridden}</div>
              <div className="text-sm text-slate-500">Overridden</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{summary.acceptanceRate.toFixed(1)}%</div>
              <div className="text-sm text-slate-500">Acceptance Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acceptance Trend */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Acceptance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overrideData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey={dateRange === '1d' ? 'time' : 'date'} 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#1e293b'
                }} 
              />
              <Bar dataKey="accepted" fill="#10b981" name="Accepted" />
              <Bar dataKey="overridden" fill="#ef4444" name="Overridden" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Acceptance Distribution */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Acceptance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#1e293b'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Override Reasons */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Override Reasons</h3>
        <div className="space-y-3">
          {overrideReasons.map((reason, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <span className="text-slate-700 font-medium">{reason.reason}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${reason.percentage}%` }}
                  ></div>
                </div>
                <span className="text-slate-600 font-medium w-12 text-right">{reason.count}</span>
                <span className="text-slate-500 w-12 text-right">{reason.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controller Performance */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-600 mb-4">Controller Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">92%</div>
            <div className="text-sm text-slate-500">AI Trust Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">15</div>
            <div className="text-sm text-slate-500">Avg Decisions/Hour</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">3.2s</div>
            <div className="text-sm text-slate-500">Avg Response Time</div>
          </div>
        </div>
      </div>
    </div>
  )
}
