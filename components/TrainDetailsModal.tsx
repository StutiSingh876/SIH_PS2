'use client'

import { useState } from 'react'
import { 
  X, 
  Train, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Settings
} from 'lucide-react'

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
  position: { x: number; y: number }
  direction: 'north' | 'south' | 'east' | 'west'
}

interface TrainDetailsModalProps {
  train: Train
  onClose: () => void
}

export default function TrainDetailsModal({ train, onClose }: TrainDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('details')
  const [isEditing, setIsEditing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'text-green-400'
      case 'delayed': return 'text-red-400'
      case 'early': return 'text-blue-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return <CheckCircle className="w-5 h-5" />
      case 'delayed': return <AlertTriangle className="w-5 h-5" />
      case 'early': return <Clock className="w-5 h-5" />
      default: return <Train className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-500'
      case 2: return 'bg-orange-500'
      case 3: return 'bg-yellow-500'
      case 4: return 'bg-green-500'
      default: return 'bg-slate-500'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              train.status === 'on-time' ? 'bg-green-500' :
              train.status === 'delayed' ? 'bg-red-500' : 'bg-blue-500'
            }`}>
              <Train className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{train.name}</h2>
              <p className="text-sm text-slate-400">Train ID: {train.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          {['details', 'actions', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Status Overview */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Current Status</h3>
                  <div className={`flex items-center space-x-2 ${getStatusColor(train.status)}`}>
                    {getStatusIcon(train.status)}
                    <span className="font-medium">
                      {train.status === 'delayed' ? `+${train.delay}m` :
                       train.status === 'early' ? `${train.delay}m` : 'On Time'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Scheduled Time:</span>
                    <span className="text-white ml-2">{train.scheduledTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Actual Time:</span>
                    <span className="text-white ml-2">{train.actualTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Platform:</span>
                    <span className="text-white ml-2">{train.platform}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Priority:</span>
                    <div className="inline-flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(train.priority)}`}></div>
                      <span className="text-white">{train.priority}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div>
                <h3 className="font-semibold text-white mb-3">Route</h3>
                <div className="flex items-center space-x-2">
                  {train.route.map((station, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-slate-700 rounded-lg px-3 py-2">
                        <span className="text-white text-sm">{station}</span>
                      </div>
                      {index < train.route.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-slate-400 mx-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Position Information */}
              <div>
                <h3 className="font-semibold text-white mb-3">Current Position</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Coordinates:</span>
                    <span className="text-white ml-2">({train.position.x}, {train.position.y})</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Direction:</span>
                    <span className="text-white ml-2 capitalize">{train.direction}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors">
                    <Play className="w-4 h-4 inline mr-2" />
                    Resume
                  </button>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg transition-colors">
                    <Pause className="w-4 h-4 inline mr-2" />
                    Hold
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors">
                    <RotateCcw className="w-4 h-4 inline mr-2" />
                    Reroute
                  </button>
                  <button className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 inline mr-2" />
                    Settings
                  </button>
                </div>
              </div>

              {/* Priority Adjustment */}
              <div>
                <h3 className="font-semibold text-white mb-4">Priority Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Priority:</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(train.priority)}`}></div>
                      <span className="text-white">{train.priority}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      High Priority
                    </button>
                    <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Medium Priority
                    </button>
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Low Priority
                    </button>
                  </div>
                </div>
              </div>

              {/* Delay Management */}
              <div>
                <h3 className="font-semibold text-white mb-4">Delay Management</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Delay:</span>
                    <span className={`font-medium ${
                      train.delay > 0 ? 'text-red-400' :
                      train.delay < 0 ? 'text-green-400' : 'text-white'
                    }`}>
                      {train.delay > 0 ? `+${train.delay}m` :
                       train.delay < 0 ? `${train.delay}m` : 'On Time'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Clear Delay
                    </button>
                    <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded text-sm transition-colors">
                      Add Delay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Status Change</span>
                  <span className="text-slate-400 text-sm">2 min ago</span>
                </div>
                <p className="text-slate-300 text-sm">Train delayed due to signal failure at Junction B</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Platform Assignment</span>
                  <span className="text-slate-400 text-sm">15 min ago</span>
                </div>
                <p className="text-slate-300 text-sm">Assigned to Platform 2 from Platform 1</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Route Update</span>
                  <span className="text-slate-400 text-sm">30 min ago</span>
                </div>
                <p className="text-slate-300 text-sm">Route optimized to avoid congestion</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-slate-700">
          <div className="text-sm text-slate-400">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit'}
            </button>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
