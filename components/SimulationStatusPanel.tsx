'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Zap, Target, TrendingUp } from 'lucide-react'

export default function SimulationStatusPanel() {
  const [simulation, setSimulation] = useState({
    isRunning: false,
    speed: 1,
    time: new Date(),
    scenarios: 5,
    completed: 2,
    efficiency: 87.5,
    conflicts: 3,
    resolved: 12
  })

  useEffect(() => {
    if (simulation.isRunning) {
      const interval = setInterval(() => {
        setSimulation(prev => ({
          ...prev,
          time: new Date(prev.time.getTime() + prev.speed * 60000),
          efficiency: Math.max(0, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 2)),
          conflicts: Math.max(0, prev.conflicts + (Math.random() - 0.5) * 0.5),
          resolved: prev.resolved + (Math.random() > 0.7 ? 1 : 0)
        }))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [simulation.isRunning, simulation.speed])

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200">
      <div className="flex items-center space-x-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${simulation.isRunning ? 'bg-green-500' : 'bg-slate-500'}`}></div>
        <h3 className="text-sm font-medium text-slate-800">Simulation Status</h3>
      </div>

      <div className="space-y-3">
        {/* Time Display */}
        <div className="text-center">
          <div className="text-lg font-mono text-slate-800">
            {simulation.time.toLocaleTimeString()}
          </div>
          <div className="text-xs text-slate-500">Speed: {simulation.speed}x</div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {simulation.efficiency.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500">Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {Math.round(simulation.conflicts)}
            </div>
            <div className="text-xs text-slate-500">Conflicts</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
            {simulation.isRunning ? 'Pause' : 'Play'}
          </button>
          <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-3 rounded text-sm transition-colors">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
