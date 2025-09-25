'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Train, Shield, Users, Settings, Globe, LogIn } from 'lucide-react'
import './input-override.css'

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'controller',
    language: 'en'
  })
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    localStorage.setItem('user', JSON.stringify(formData))
    router.push('/dashboard')
  }

  const handleGuestMode = () => {
    router.push('/dashboard')
  }

  useEffect(() => {
    // Force white backgrounds on all input fields
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]')
    inputs.forEach(input => {
      const element = input as HTMLInputElement
      element.style.backgroundColor = '#ffffff'
      element.style.background = '#ffffff'
      element.style.backgroundImage = 'none'
      element.style.color = '#1e293b'
    })
  }, [isLogin])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Train className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SITO</h1>
              <p className="text-sm text-gray-600">Smart Intelligent Traffic Orchestrator</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              className="bg-white text-gray-800 px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
              <option value="bn">বাংলা</option>
            </select>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors shadow-sm"
            >
              {isLogin ? 'Back' : 'Login'}
            </button>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-6 py-12">
        {!isLogin ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                AI-Powered Railway Traffic
                <span className="block text-blue-600">
                  Orchestration
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Transform Indian Railways with intelligent decision-support system that optimizes 
                train precedence, crossings, and platform allocations in real-time.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsLogin(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-sm"
                >
                  Get Started
                </button>
                <button
                  onClick={handleGuestMode}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-sm"
                >
                  Guest Mode
                </button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="8" width="18" height="6" rx="3" fill="currentColor"/>
                    <rect x="4" y="9" width="3" height="4" rx="1" fill="white"/>
                    <path d="M6 10 L8 10 L8 11 L10 11" stroke="white" strokeWidth="0.5" fill="none"/>
                    <path d="M12 10 L14 10 L14 12 L16 12" stroke="white" strokeWidth="0.5" fill="none"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Optimization</h3>
                <p className="text-gray-600">AI algorithms generate conflict-free schedules with dynamic precedence decisions.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h3>
                <p className="text-gray-600">Guaranteed conflict-free, rule-compliant train paths with full override capabilities.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Controller Empowerment</h3>
                <p className="text-gray-600">AI acts as decision-support with transparency, override rights, and predictive insights.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Language</h3>
                <p className="text-gray-600">Voice-enabled AI co-pilot supporting Hindi, Tamil, Bengali, and other languages.</p>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Notice</h3>
                  <p className="text-gray-600">
                    This system handles critical railway operations. All actions are logged and monitored. 
                    Unauthorized access is strictly prohibited and may result in legal action.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Login Form */
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to access SITO dashboard</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="controller">Controller</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
