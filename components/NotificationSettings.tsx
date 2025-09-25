'use client'

import { useState } from 'react'
import { 
  Bell, 
  Mail, 
  Smartphone, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Settings,
  Volume2,
  VolumeX,
  Save,
  RefreshCw
} from 'lucide-react'

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      enabled: true,
      conflictAlerts: true,
      delayAlerts: true,
      systemAlerts: true,
      weeklyReports: true,
      dailyDigest: false
    },
    push: {
      enabled: true,
      conflictAlerts: true,
      delayAlerts: true,
      systemAlerts: false,
      maintenanceAlerts: true
    },
    sms: {
      enabled: false,
      criticalAlerts: true,
      emergencyAlerts: true,
      systemDown: true
    },
    sound: {
      enabled: true,
      volume: 70,
      conflictSound: true,
      delaySound: true,
      systemSound: false
    },
    schedule: {
      workingHours: true,
      startTime: '09:00',
      endTime: '18:00',
      weekendAlerts: false,
      holidayAlerts: false
    }
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Show success message
    }, 2000)
  }

  const handleReset = () => {
    setNotifications({
      email: {
        enabled: true,
        conflictAlerts: true,
        delayAlerts: true,
        systemAlerts: true,
        weeklyReports: true,
        dailyDigest: false
      },
      push: {
        enabled: true,
        conflictAlerts: true,
        delayAlerts: true,
        systemAlerts: false,
        maintenanceAlerts: true
      },
      sms: {
        enabled: false,
        criticalAlerts: true,
        emergencyAlerts: true,
        systemDown: true
      },
      sound: {
        enabled: true,
        volume: 70,
        conflictSound: true,
        delaySound: true,
        systemSound: false
      },
      schedule: {
        workingHours: true,
        startTime: '09:00',
        endTime: '18:00',
        weekendAlerts: false,
        holidayAlerts: false
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Notification Settings</h2>
          <p className="text-slate-600">Configure alerts and notification preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Notification Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {notifications.email.enabled ? 'ON' : 'OFF'}
              </div>
              <div className="text-sm text-slate-600">Email Notifications</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {notifications.push.enabled ? 'ON' : 'OFF'}
              </div>
              <div className="text-sm text-slate-600">Push Notifications</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {notifications.sound.enabled ? 'ON' : 'OFF'}
              </div>
              <div className="text-sm text-slate-600">Sound Alerts</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {notifications.schedule.workingHours ? 'ON' : 'OFF'}
              </div>
              <div className="text-sm text-slate-600">Scheduled Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Notifications */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Email Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-800">Enable Email Notifications</div>
              <div className="text-xs text-slate-600">Receive alerts via email</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email.enabled}
                onChange={(e) => setNotifications({
                  ...notifications,
                  email: { ...notifications.email, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {notifications.email.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.email.conflictAlerts}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      email: { ...notifications.email, conflictAlerts: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Conflict Alerts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.email.delayAlerts}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      email: { ...notifications.email, delayAlerts: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Delay Alerts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.email.systemAlerts}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      email: { ...notifications.email, systemAlerts: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">System Alerts</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.email.weeklyReports}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      email: { ...notifications.email, weeklyReports: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Weekly Reports</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.email.dailyDigest}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      email: { ...notifications.email, dailyDigest: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Daily Digest</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Push Notifications */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Smartphone className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-800">Push Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-800">Enable Push Notifications</div>
              <div className="text-xs text-slate-600">Receive real-time alerts on mobile devices</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push.enabled}
                onChange={(e) => setNotifications({
                  ...notifications,
                  push: { ...notifications.push, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {notifications.push.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.push.conflictAlerts}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      push: { ...notifications.push, conflictAlerts: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Conflict Alerts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.push.delayAlerts}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      push: { ...notifications.push, delayAlerts: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Delay Alerts</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.push.systemAlerts}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      push: { ...notifications.push, systemAlerts: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">System Alerts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.push.maintenanceAlerts}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      push: { ...notifications.push, maintenanceAlerts: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Maintenance Alerts</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sound Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-800">Sound Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-800">Enable Sound Alerts</div>
              <div className="text-xs text-slate-600">Play sounds for notifications</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sound.enabled}
                onChange={(e) => setNotifications({
                  ...notifications,
                  sound: { ...notifications.sound, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {notifications.sound.enabled && (
            <div className="space-y-4 ml-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Volume Level
                </label>
                <div className="flex items-center space-x-3">
                  <VolumeX className="w-4 h-4 text-slate-600" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={notifications.sound.volume}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      sound: { ...notifications.sound, volume: parseInt(e.target.value) }
                    })}
                    className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <Volume2 className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-slate-700 w-12">{notifications.sound.volume}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.sound.conflictSound}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      sound: { ...notifications.sound, conflictSound: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Conflict Sounds</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.sound.delaySound}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      sound: { ...notifications.sound, delaySound: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Delay Sounds</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={notifications.sound.systemSound}
                    onChange={(e) => setNotifications({
                      ...notifications,
                      sound: { ...notifications.sound, systemSound: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">System Sounds</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-slate-800">Schedule Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-800">Working Hours Only</div>
              <div className="text-xs text-slate-600">Only send notifications during working hours</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.schedule.workingHours}
                onChange={(e) => setNotifications({
                  ...notifications,
                  schedule: { ...notifications.schedule, workingHours: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {notifications.schedule.workingHours && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={notifications.schedule.startTime}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    schedule: { ...notifications.schedule, startTime: e.target.value }
                  })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={notifications.schedule.endTime}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    schedule: { ...notifications.schedule, endTime: e.target.value }
                  })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications.schedule.weekendAlerts}
                onChange={(e) => setNotifications({
                  ...notifications,
                  schedule: { ...notifications.schedule, weekendAlerts: e.target.checked }
                })}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">Weekend Alerts</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications.schedule.holidayAlerts}
                onChange={(e) => setNotifications({
                  ...notifications,
                  schedule: { ...notifications.schedule, holidayAlerts: e.target.checked }
                })}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">Holiday Alerts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
