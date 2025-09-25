'use client'

import { useState } from 'react'
import { 
  Settings, 
  Monitor, 
  Wifi, 
  Database, 
  Shield, 
  Bell, 
  Globe,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    systemName: 'SITO Production',
    timezone: 'Asia/Kolkata',
    language: 'en',
    theme: 'dark',
    autoRefresh: true,
    refreshInterval: 30,
    maxConcurrentUsers: 100,
    sessionTimeout: 480,
    dataRetention: 90,
    backupFrequency: 'daily',
    logLevel: 'info',
    enableNotifications: true,
    enableAuditLog: true,
    enableMaintenanceMode: false
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
    // Reset to default values
    setSettings({
      systemName: 'SITO Production',
      timezone: 'Asia/Kolkata',
      language: 'en',
      theme: 'dark',
      autoRefresh: true,
      refreshInterval: 30,
      maxConcurrentUsers: 100,
      sessionTimeout: 480,
      dataRetention: 90,
      backupFrequency: 'daily',
      logLevel: 'info',
      enableNotifications: true,
      enableAuditLog: true,
      enableMaintenanceMode: false
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
          <p className="text-slate-600">Configure system parameters and preferences</p>
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

      {/* System Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">General Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                System Name
              </label>
              <input
                type="text"
                value={settings.systemName}
                onChange={(e) => setSettings({...settings, systemName: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({...settings, theme: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Performance Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Monitor className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-800">Performance Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.autoRefresh}
                  onChange={(e) => setSettings({...settings, autoRefresh: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Enable Auto Refresh</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                value={settings.refreshInterval}
                onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value)})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="5"
                max="300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Concurrent Users
              </label>
              <input
                type="number"
                value={settings.maxConcurrentUsers}
                onChange={(e) => setSettings({...settings, maxConcurrentUsers: parseInt(e.target.value)})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="30"
                max="1440"
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Database className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-800">Data Management</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Data Retention (days)
              </label>
              <input
                type="number"
                value={settings.dataRetention}
                onChange={(e) => setSettings({...settings, dataRetention: parseInt(e.target.value)})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="7"
                max="365"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Backup Frequency
              </label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Log Level
              </label>
              <select
                value={settings.logLevel}
                onChange={(e) => setSettings({...settings, logLevel: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warn">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Notifications */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-slate-800">Security & Notifications</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => setSettings({...settings, enableNotifications: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Enable Notifications</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.enableAuditLog}
                  onChange={(e) => setSettings({...settings, enableAuditLog: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Enable Audit Logging</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.enableMaintenanceMode}
                  onChange={(e) => setSettings({...settings, enableMaintenanceMode: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Maintenance Mode</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-700">Database: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-700">API: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-700">AI Engine: Online</span>
          </div>
        </div>
      </div>
    </div>
  )
}
