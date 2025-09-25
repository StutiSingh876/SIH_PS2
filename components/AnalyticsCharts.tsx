'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

interface AnalyticsChartsProps {
  type: 'efficiency' | 'delays' | 'conflicts' | 'sustainability'
  dateRange: string
}

export default function AnalyticsCharts({ type, dateRange }: AnalyticsChartsProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line')

  useEffect(() => {
    // Generate sample data based on type and date range
    const generateData = () => {
      const data: any[] = []
      const days = dateRange === '1d' ? 24 : dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
      const isHourly = dateRange === '1d'

      for (let i = 0; i < days; i++) {
        const baseValue = getBaseValue(type)
        const variation = (Math.random() - 0.5) * 20
        const value = Math.max(0, Math.min(100, baseValue + variation))

        if (isHourly) {
          data.push({
            time: `${i.toString().padStart(2, '0')}:00`,
            value: value,
            efficiency: 85 + Math.random() * 15,
            delays: Math.random() * 30,
            conflicts: Math.floor(Math.random() * 5)
          })
        } else {
          data.push({
            date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            value: value,
            efficiency: 85 + Math.random() * 15,
            delays: Math.random() * 30,
            conflicts: Math.floor(Math.random() * 5)
          })
        }
      }
      return data
    }

    setChartData(generateData())
  }, [type, dateRange])

  const getBaseValue = (type: string) => {
    switch (type) {
      case 'efficiency': return 85
      case 'delays': return 15
      case 'conflicts': return 3
      case 'sustainability': return 75
      default: return 50
    }
  }

  const getChartColor = (type: string) => {
    switch (type) {
      case 'efficiency': return '#10b981'
      case 'delays': return '#ef4444'
      case 'conflicts': return '#f59e0b'
      case 'sustainability': return '#06b6d4'
      default: return '#6366f1'
    }
  }

  const getYAxisLabel = (type: string) => {
    switch (type) {
      case 'efficiency': return 'Efficiency (%)'
      case 'delays': return 'Delay (minutes)'
      case 'conflicts': return 'Conflicts (count)'
      case 'sustainability': return 'Sustainability Score (%)'
      default: return 'Value'
    }
  }

  const pieData = [
    { name: 'On Time', value: 75, color: '#10b981' },
    { name: 'Delayed', value: 20, color: '#ef4444' },
    { name: 'Early', value: 5, color: '#06b6d4' }
  ]

  const renderChart = () => {
    if (chartType === 'pie' && type === 'efficiency') {
      return (
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
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey={dateRange === '1d' ? 'time' : 'date'} 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                color: '#1e293b'
              }} 
            />
            <Bar dataKey="value" fill={getChartColor(type)} />
          </BarChart>
        </ResponsiveContainer>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey={dateRange === '1d' ? 'time' : 'date'} 
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              color: '#1e293b'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getChartColor(type)} 
            strokeWidth={2}
            dot={{ fill: getChartColor(type), strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="space-y-4">
      {/* Chart Type Selector */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {['line', 'bar', 'pie'].map((chart) => (
            <button
              key={chart}
              onClick={() => setChartType(chart as any)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                chartType === chart
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {chart.charAt(0).toUpperCase() + chart.slice(1)}
            </button>
          ))}
        </div>
        <div className="text-sm text-slate-500">
          {chartData.length} data points
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        {renderChart()}
      </div>

      {/* Chart Summary */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-slate-100 rounded-lg p-3">
          <div className="text-slate-500 mb-1">Average</div>
          <div className="text-slate-800 font-semibold">
            {chartData.length > 0 
              ? (chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length).toFixed(1)
              : '0'
            }
            {type === 'efficiency' || type === 'sustainability' ? '%' : 
             type === 'delays' ? 'm' : ''}
          </div>
        </div>
        <div className="bg-slate-100 rounded-lg p-3">
          <div className="text-slate-500 mb-1">Peak</div>
          <div className="text-slate-800 font-semibold">
            {chartData.length > 0 
              ? Math.max(...chartData.map(item => item.value)).toFixed(1)
              : '0'
            }
            {type === 'efficiency' || type === 'sustainability' ? '%' : 
             type === 'delays' ? 'm' : ''}
          </div>
        </div>
        <div className="bg-slate-100 rounded-lg p-3">
          <div className="text-slate-500 mb-1">Trend</div>
          <div className="text-green-600 font-semibold">
            {chartData.length > 1 
              ? (chartData[chartData.length - 1].value > chartData[0].value ? '+' : '') +
                (chartData[chartData.length - 1].value - chartData[0].value).toFixed(1)
              : '0'
            }
            {type === 'efficiency' || type === 'sustainability' ? '%' : 
             type === 'delays' ? 'm' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
