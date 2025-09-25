'use client'

import { useState, useEffect } from 'react'
import { 
  Target, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Brain,
  BookOpen,
  Star,
  Trophy
} from 'lucide-react'

export default function TrainingModule() {
  const [training, setTraining] = useState({
    currentLevel: 'Beginner',
    score: 750,
    progress: 65,
    achievements: [
      { id: 1, name: 'First Decision', description: 'Made your first AI-assisted decision', earned: true },
      { id: 2, name: 'Conflict Resolver', description: 'Resolved 10 conflicts successfully', earned: true },
      { id: 3, name: 'Efficiency Expert', description: 'Achieved 90% efficiency in a scenario', earned: false },
      { id: 4, name: 'Crisis Handler', description: 'Handled 5 crisis scenarios', earned: false }
    ],
    scenarios: [
      { id: 1, name: 'Basic Operations', completed: true, score: 85, time: '12:30' },
      { id: 2, name: 'Peak Hour Management', completed: true, score: 78, time: '15:45' },
      { id: 3, name: 'Signal Failure Response', completed: false, score: 0, time: '--:--' },
      { id: 4, name: 'Weather Disruption', completed: false, score: 0, time: '--:--' },
      { id: 5, name: 'Emergency Train Routing', completed: false, score: 0, time: '--:--' }
    ],
    performance: {
      efficiency: 87.5,
      delayReduction: 23.4,
      conflictResolution: 91.2,
      decisionSpeed: 2.3
    }
  })

  const levels = [
    { name: 'Beginner', minScore: 0, maxScore: 500, color: 'bg-blue-500' },
    { name: 'Intermediate', minScore: 500, maxScore: 1000, color: 'bg-green-500' },
    { name: 'Advanced', minScore: 1000, maxScore: 1500, color: 'bg-purple-500' },
    { name: 'Expert', minScore: 1500, maxScore: 2000, color: 'bg-yellow-500' },
    { name: 'Master', minScore: 2000, maxScore: 9999, color: 'bg-red-500' }
  ]

  const getCurrentLevel = (score: number) => {
    return levels.find(level => score >= level.minScore && score < level.maxScore) || levels[0]
  }

  const currentLevelInfo = getCurrentLevel(training.score)

  return (
    <div className="space-y-6">
      {/* Training Header */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Controller Training</h2>
            <p className="text-slate-500">Flight simulator for train traffic controllers</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-slate-800">{training.score}</div>
            <div className="text-sm text-slate-500">Training Score</div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Current Level: {currentLevelInfo.name}</span>
            <span className="text-sm text-slate-500">
              {training.score}/{currentLevelInfo.maxScore} points
            </span>
          </div>
          <div className="w-full bg-slate-600 rounded-full h-3">
            <div 
              className={`${currentLevelInfo.color} h-3 rounded-full transition-all duration-500`}
              style={{ 
                width: `${Math.min(100, ((training.score - currentLevelInfo.minScore) / (currentLevelInfo.maxScore - currentLevelInfo.minScore)) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-slate-600">Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{training.performance.efficiency}%</div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-600">Delay Reduction</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{training.performance.delayReduction}%</div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-slate-600">Conflict Resolution</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{training.performance.conflictResolution}%</div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-slate-600">Decision Speed</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{training.performance.decisionSpeed}s</div>
        </div>
      </div>

      {/* Training Scenarios */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Training Scenarios</h3>
        <div className="space-y-3">
          {training.scenarios.map((scenario) => (
            <div key={scenario.id} className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    scenario.completed ? 'bg-green-500' : 'bg-slate-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">{scenario.name}</div>
                    <div className="text-xs text-slate-500">
                      {scenario.completed ? `Completed in ${scenario.time}` : 'Not started'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-800">
                      {scenario.completed ? `${scenario.score}%` : '--'}
                    </div>
                    <div className="text-xs text-slate-500">Score</div>
                  </div>
                  <button 
                    onClick={() => {
                      // Navigate to simulator with specific scenario
                      window.location.href = `/simulator?scenario=${scenario.id}`
                    }}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      scenario.completed 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {scenario.completed ? 'Retry' : 'Start'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {training.achievements.map((achievement) => (
            <div key={achievement.id} className={`rounded-lg p-4 border ${
              achievement.earned 
                ? 'bg-green-50 border-green-300' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-green-500' : 'bg-slate-500'
                }`}>
                  {achievement.earned ? (
                    <Trophy className="w-4 h-4 text-white" />
                  ) : (
                    <Star className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <div className={`text-sm font-medium ${
                    achievement.earned ? 'text-green-700' : 'text-slate-600'
                  }`}>
                    {achievement.name}
                  </div>
                  <div className="text-xs text-slate-500">{achievement.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification Progress */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Certification Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Basic Operations Certification</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-slate-600 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-sm text-green-400">100%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Advanced Traffic Management</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-slate-600 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-sm text-blue-400">65%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Crisis Management</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-slate-600 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <span className="text-sm text-yellow-400">30%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
