'use client'

import { useState } from 'react'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward,
  Settings,
  Save,
  FolderOpen,
  BarChart3
} from 'lucide-react'

interface SimulationControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onReset: () => void
  simulationSpeed: number
  onSpeedChange: (speed: number) => void
  selectedScenario: string
  onScenarioChange: (scenario: string) => void
}

export default function SimulationControls({
  isPlaying,
  onPlayPause,
  onReset,
  simulationSpeed,
  onSpeedChange,
  selectedScenario,
  onScenarioChange
}: SimulationControlsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const scenarios = [
    { id: 'basic', name: 'Basic Operations', difficulty: 'Easy', description: 'Normal day-to-day operations' },
    { id: 'congestion', name: 'Peak Hour Congestion', difficulty: 'Medium', description: 'High traffic during rush hours' },
    { id: 'disruption', name: 'Signal Failure', difficulty: 'Hard', description: 'Critical signal system failure' },
    { id: 'weather', name: 'Weather Disruption', difficulty: 'Hard', description: 'Adverse weather conditions' },
    { id: 'emergency', name: 'Emergency Train', difficulty: 'Expert', description: 'Priority emergency train routing' }
  ]

  const speedOptions = [
    { value: 0.5, label: '0.5x (Slow)' },
    { value: 1, label: '1x (Normal)' },
    { value: 2, label: '2x (Fast)' },
    { value: 5, label: '5x (Very Fast)' },
    { value: 10, label: '10x (Ultra Fast)' }
  ]

  return (
    <div className="space-y-6">
      {/* Scenario Selection */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">Scenario Selection</h3>
        <div className="space-y-2">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedScenario === scenario.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
              onClick={() => onScenarioChange(scenario.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">{scenario.name}</h4>
                  <p className="text-sm text-slate-400">{scenario.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  scenario.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                  scenario.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  scenario.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {scenario.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">Playback Controls</h3>
        <div className="space-y-4">
          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-3">
            <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={onPlayPause}
              className={`p-3 rounded-lg transition-colors ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={onReset}
              className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white p-2 rounded-lg transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Speed Control */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Simulation Speed
            </label>
            <div className="flex space-x-2">
              {speedOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSpeedChange(option.value)}
                  className={`px-3 py-2 rounded text-sm transition-colors ${
                    simulationSpeed === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Controls */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white">Advanced Controls</h3>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {showAdvanced && (
          <div className="space-y-4">
            {/* Time Controls */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Jump to Time
              </label>
              <div className="flex space-x-2">
                <input
                  type="time"
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  defaultValue="14:30"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Jump
                </button>
              </div>
            </div>

            {/* Save/Load */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors">
                <Save className="w-4 h-4 inline mr-2" />
                Save State
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors">
                <FolderOpen className="w-4 h-4 inline mr-2" />
                Load State
              </button>
            </div>

            {/* AI Settings */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                AI Assistance Level
              </label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                <option value="full">Full AI Assistance</option>
                <option value="partial">Partial AI Assistance</option>
                <option value="none">No AI Assistance</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
            <BarChart3 className="w-4 h-4 inline mr-1" />
            Analyze
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
            <Settings className="w-4 h-4 inline mr-1" />
            Configure
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
            <Play className="w-4 h-4 inline mr-1" />
            Auto-Play
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
            <RotateCcw className="w-4 h-4 inline mr-1" />
            Reset All
          </button>
        </div>
      </div>
    </div>
  )
}
