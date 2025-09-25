'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Zap, Leaf, TrendingUp, Droplets, Wind, Sun } from 'lucide-react'

interface SustainabilityDashboardProps {
  dateRange: string
}

export default function SustainabilityDashboard({ dateRange }: SustainabilityDashboardProps) {
  const [sustainabilityData, setSustainabilityData] = useState<any[]>([])
  const [metrics, setMetrics] = useState({
    energySaved: 12.3,
    carbonReduction: 8.7,
    fuelEfficiency: 15.2,
    renewableEnergy: 25.4
  })

  useEffect(() => {
    // Generate sample sustainability data
    const generateData = () => {
      const data = []
      const days = dateRange === '1d' ? 24 : dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
      const isHourly = dateRange === '1d'

      for (let i = 0; i < days; i++) {
        const baseEnergy = 12
        const baseCarbon = 8
        const baseFuel = 15
        const baseRenewable = 25

        if (isHourly) {
          data.push({
            time: `${i.toString().padStart(2, '0')}:00`,
            energySaved: baseEnergy + (Math.random() - 0.5) * 4,
            carbonReduction: baseCarbon + (Math.random() - 0.5) * 2,
            fuelEfficiency: baseFuel + (Math.random() - 0.5) * 3,
            renewableEnergy: baseRenewable + (Math.random() - 0.5) * 5
          })
        } else {
          data.push({
            date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            energySaved: baseEnergy + (Math.random() - 0.5) * 4,
            carbonReduction: baseCarbon + (Math.random() - 0.5) * 2,
            fuelEfficiency: baseFuel + (Math.random() - 0.5) * 3,
            renewableEnergy: baseRenewable + (Math.random() - 0.5) * 5
          })
        }
      }
      return data
    }

    setSustainabilityData(generateData())
  }, [dateRange])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        energySaved: Math.max(0, Math.min(100, prev.energySaved + (Math.random() - 0.5) * 1)),
        carbonReduction: Math.max(0, Math.min(100, prev.carbonReduction + (Math.random() - 0.5) * 0.5)),
        fuelEfficiency: Math.max(0, Math.min(100, prev.fuelEfficiency + (Math.random() - 0.5) * 1)),
        renewableEnergy: Math.max(0, Math.min(100, prev.renewableEnergy + (Math.random() - 0.5) * 1))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getMetricColor = (value: number) => {
    if (value > 80) return 'text-green-400'
    if (value > 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Energy Saved</div>
              <div className={`text-2xl font-bold ${getMetricColor(metrics.energySaved)}`}>
                {metrics.energySaved.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.energySaved}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Carbon Reduction</div>
              <div className={`text-2xl font-bold ${getMetricColor(metrics.carbonReduction)}`}>
                {metrics.carbonReduction.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.carbonReduction}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Fuel Efficiency</div>
              <div className={`text-2xl font-bold ${getMetricColor(metrics.fuelEfficiency)}`}>
                {metrics.fuelEfficiency.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.fuelEfficiency}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Sun className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Renewable Energy</div>
              <div className={`text-2xl font-bold ${getMetricColor(metrics.renewableEnergy)}`}>
                {metrics.renewableEnergy.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${metrics.renewableEnergy}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Trends */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Energy Efficiency Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sustainabilityData}>
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
              <Line 
                type="monotone" 
                dataKey="energySaved" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Energy Saved (%)"
              />
              <Line 
                type="monotone" 
                dataKey="fuelEfficiency" 
                stroke="#eab308" 
                strokeWidth={2}
                dot={{ fill: '#eab308', strokeWidth: 2, r: 4 }}
                name="Fuel Efficiency (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Carbon Footprint */}
        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Carbon Footprint Reduction</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sustainabilityData}>
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
              <Bar dataKey="carbonReduction" fill="#06b6d4" name="Carbon Reduction (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Environmental Impact Summary */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Environmental Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">2.3 tons</div>
            <div className="text-sm text-slate-600">CO₂ Emissions Reduced</div>
            <div className="text-xs text-slate-500 mt-1">This month</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">1,250 L</div>
            <div className="text-sm text-slate-600">Fuel Saved</div>
            <div className="text-xs text-slate-500 mt-1">This month</div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Wind className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">45%</div>
            <div className="text-sm text-slate-600">Renewable Energy</div>
            <div className="text-xs text-slate-500 mt-1">Current usage</div>
          </div>
        </div>
      </div>

      {/* Sustainability Goals */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Sustainability Goals Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Reduce Carbon Emissions by 20%</span>
              <span className="text-green-600 font-medium">85% Complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Increase Renewable Energy to 50%</span>
              <span className="text-blue-600 font-medium">51% Complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '51%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Improve Fuel Efficiency by 15%</span>
              <span className="text-yellow-600 font-medium">73% Complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '73%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
