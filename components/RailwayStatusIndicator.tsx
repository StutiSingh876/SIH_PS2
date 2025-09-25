'use client'

import { useState, useEffect } from 'react'
import { Train, Signal, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

export default function RailwayStatusIndicator() {
  const [status, setStatus] = useState({
    trains: 47,
    active: 23,
    delayed: 3,
    onTime: 20,
    early: 1
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStatus(prev => ({
        trains: prev.trains + (Math.random() - 0.5) * 2,
        active: prev.active + (Math.random() - 0.5) * 1,
        delayed: Math.max(0, prev.delayed + (Math.random() - 0.5) * 0.5),
        onTime: prev.onTime + (Math.random() - 0.5) * 1,
        early: Math.max(0, prev.early + (Math.random() - 0.5) * 0.3)
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <h3 className="text-sm font-medium text-slate-800">Railway Status</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="text-center">
          <div className="text-xl font-bold text-slate-800">{Math.round(status.trains)}</div>
          <div className="text-xs text-slate-500">Total Trains</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-green-600">{Math.round(status.onTime)}</div>
          <div className="text-xs text-slate-500">On Time</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-red-600">{Math.round(status.delayed)}</div>
          <div className="text-xs text-slate-500">Delayed</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-600">{Math.round(status.early)}</div>
          <div className="text-xs text-slate-500">Early</div>
        </div>
      </div>

    </div>
  )
}
