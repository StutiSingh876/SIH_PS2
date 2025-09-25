'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Settings, 
  Users, 
  Shield, 
  Database, 
  Bell, 
  Globe,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  User,
  Key,
  Database as DbIcon,
  Wifi,
  Monitor
} from 'lucide-react'
import UserManagement from '@/components/UserManagement'
import SystemSettings from '@/components/SystemSettings'
import SecuritySettings from '@/components/SecuritySettings'
import NotificationSettings from '@/components/NotificationSettings'
import DataSourceConfig from '@/components/DataSourceConfig'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('users')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const tabs = [
    { id: 'users', label: 'User Management', icon: Users, description: 'Manage user roles and permissions' },
    { id: 'system', label: 'System Settings', icon: Settings, description: 'Configure system parameters' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Security and access control' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Alert and notification settings' },
    { id: 'data', label: 'Data Sources', icon: Database, description: 'IoT and external data configuration' }
  ]

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Show success message
    }, 2000)
  }

  if (!user) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-slate-800" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Settings & Administration</h1>
                  <p className="text-sm text-slate-500">System configuration and user management</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* System Status */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600">System Online</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-slate-200">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Configuration</h2>
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* System Info */}
          <div className="p-4 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">System Information</h3>
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="text-slate-700">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Uptime:</span>
                <span className="text-slate-700">15d 8h</span>
              </div>
              <div className="flex justify-between">
                <span>Users:</span>
                <span className="text-slate-700">47</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600">Healthy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'system' && <SystemSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'data' && <DataSourceConfig />}
          </div>
        </div>
      </div>
    </div>
  )
}
