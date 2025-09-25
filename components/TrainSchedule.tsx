'use client'

import { useState } from 'react'
import { Train, Clock, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'

interface Train {
  id: string
  name: string
  type: 'passenger' | 'freight' | 'express'
  status: 'on-time' | 'delayed' | 'early'
  scheduledTime: string
  actualTime: string
  platform: string
  priority: number
  delay: number
  route: string[]
}

interface TrainScheduleProps {
  onTrainSelect: (train: Train) => void
}

export default function TrainSchedule({ onTrainSelect }: TrainScheduleProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('current')
  
  const trains: Train[] = [
    {
      id: '1',
      name: 'Rajdhani Express',
      type: 'express',
      status: 'on-time',
      scheduledTime: '14:30',
      actualTime: '14:30',
      platform: '1',
      priority: 1,
      delay: 0,
      route: ['Delhi', 'Mumbai']
    },
    {
      id: '2',
      name: 'Shatabdi Express',
      type: 'express',
      status: 'delayed',
      scheduledTime: '15:00',
      actualTime: '15:15',
      platform: '2',
      priority: 2,
      delay: 15,
      route: ['Mumbai', 'Chennai']
    },
    {
      id: '3',
      name: 'Goods Train 12345',
      type: 'freight',
      status: 'on-time',
      scheduledTime: '15:30',
      actualTime: '15:30',
      platform: '3',
      priority: 3,
      delay: 0,
      route: ['Chennai', 'Kolkata']
    },
    {
      id: '4',
      name: 'Passenger Train',
      type: 'passenger',
      status: 'early',
      scheduledTime: '16:00',
      actualTime: '15:55',
      platform: '4',
      priority: 4,
      delay: -5,
      route: ['Kolkata', 'Delhi']
    },
    {
      id: '5',
      name: 'Duronto Express',
      type: 'express',
      status: 'delayed',
      scheduledTime: '16:30',
      actualTime: '16:45',
      platform: '1',
      priority: 1,
      delay: 15,
      route: ['Delhi', 'Chennai']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'text-green-600'
      case 'delayed': return 'text-red-600'
      case 'early': return 'text-blue-600'
      default: return 'text-slate-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="w-4 h-4" />
      case 'delayed': return <AlertTriangle className="w-4 h-4" />
      case 'early': return <Clock className="w-4 h-4" />
      default: return <Train className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-400'
      case 2: return 'bg-orange-400'
      case 3: return 'bg-yellow-400'
      case 4: return 'bg-green-400'
      default: return 'bg-slate-400'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Time Range Selector */}
      <div className="mb-4">
        <div className="flex space-x-2">
          {['current', 'next-2h', 'all-day'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedTimeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {range === 'current' ? 'Current' : 
               range === 'next-2h' ? 'Next 2h' : 'All Day'}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {trains.map((train) => (
          <div
            key={train.id}
            onClick={() => onTrainSelect(train)}
            className="bg-white rounded-lg p-4 border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getPriorityColor(train.priority)}`}></div>
                <h3 className="font-semibold text-slate-800">{train.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  train.type === 'express' ? 'bg-purple-100 text-purple-700' :
                  train.type === 'freight' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {train.type.toUpperCase()}
                </span>
              </div>
              <div className={`flex items-center space-x-1 ${getStatusColor(train.status)}`}>
                {getStatusIcon(train.status)}
                <span className="text-sm font-medium">
                  {train.status === 'delayed' ? `+${train.delay}m` :
                   train.status === 'early' ? `${train.delay}m` : 'On Time'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Scheduled:</span>
                <span className="text-slate-800 ml-2">{train.scheduledTime}</span>
              </div>
              <div>
                <span className="text-slate-500">Actual:</span>
                <span className="text-slate-800 ml-2">{train.actualTime}</span>
              </div>
              <div>
                <span className="text-slate-500">Platform:</span>
                <span className="text-slate-800 ml-2">{train.platform}</span>
              </div>
              <div>
                <span className="text-slate-500">Priority:</span>
                <span className="text-slate-800 ml-2">{train.priority}</span>
              </div>
            </div>

            {/* Route */}
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-slate-500 text-sm">Route:</span>
              <div className="flex items-center space-x-1">
                {train.route.map((station, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-slate-800 text-sm">{station}</span>
                    {index < train.route.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-slate-500 mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 bg-white rounded-lg p-3 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {trains.filter(t => t.status === 'on-time').length}
            </div>
            <div className="text-xs text-slate-500">On Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {trains.filter(t => t.status === 'delayed').length}
            </div>
            <div className="text-xs text-slate-500">Delayed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {trains.filter(t => t.status === 'early').length}
            </div>
            <div className="text-xs text-slate-500">Early</div>
          </div>
        </div>
      </div>
    </div>
  )
}
