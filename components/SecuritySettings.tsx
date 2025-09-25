'use client'

import { useState } from 'react'
import { 
  Shield, 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle,
  Save,
  RefreshCw,
  User,
  Database,
  Wifi
} from 'lucide-react'

export default function SecuritySettings() {
  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expirationDays: 90
    },
    authentication: {
      twoFactorAuth: true,
      sessionTimeout: 480,
      maxLoginAttempts: 5,
      lockoutDuration: 30,
      requireStrongPasswords: true
    },
    encryption: {
      dataEncryption: true,
      encryptionAlgorithm: 'AES-256',
      keyRotationDays: 30,
      secureTransmission: true
    },
    accessControl: {
      roleBasedAccess: true,
      ipWhitelist: false,
      allowedIPs: '',
      timeBasedAccess: false,
      workingHours: { start: '09:00', end: '18:00' }
    }
  })

  const [showPasswords, setShowPasswords] = useState(false)
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
    setSecuritySettings({
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expirationDays: 90
      },
      authentication: {
        twoFactorAuth: true,
        sessionTimeout: 480,
        maxLoginAttempts: 5,
        lockoutDuration: 30,
        requireStrongPasswords: true
      },
      encryption: {
        dataEncryption: true,
        encryptionAlgorithm: 'AES-256',
        keyRotationDays: 30,
        secureTransmission: true
      },
      accessControl: {
        roleBasedAccess: true,
        ipWhitelist: false,
        allowedIPs: '',
        timeBasedAccess: false,
        workingHours: { start: '09:00', end: '18:00' }
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Security Settings</h2>
          <p className="text-slate-600">Configure security policies and access controls</p>
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

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">98%</div>
              <div className="text-sm text-slate-600">Security Score</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">AES-256</div>
              <div className="text-sm text-slate-600">Encryption</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">2FA</div>
              <div className="text-sm text-slate-600">Authentication</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">0</div>
              <div className="text-sm text-slate-600">Active Threats</div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Policy */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Lock className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-800">Password Policy</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Minimum Length
              </label>
              <input
                type="number"
                value={securitySettings.passwordPolicy.minLength}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  passwordPolicy: {
                    ...securitySettings.passwordPolicy,
                    minLength: parseInt(e.target.value)
                  }
                })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="6"
                max="32"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Expiration Days
              </label>
              <input
                type="number"
                value={securitySettings.passwordPolicy.expirationDays}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  passwordPolicy: {
                    ...securitySettings.passwordPolicy,
                    expirationDays: parseInt(e.target.value)
                  }
                })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="30"
                max="365"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.passwordPolicy.requireUppercase}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    passwordPolicy: {
                      ...securitySettings.passwordPolicy,
                      requireUppercase: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Require Uppercase Letters</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.passwordPolicy.requireLowercase}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    passwordPolicy: {
                      ...securitySettings.passwordPolicy,
                      requireLowercase: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Require Lowercase Letters</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.passwordPolicy.requireNumbers}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    passwordPolicy: {
                      ...securitySettings.passwordPolicy,
                      requireNumbers: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Require Numbers</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.passwordPolicy.requireSpecialChars}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    passwordPolicy: {
                      ...securitySettings.passwordPolicy,
                      requireSpecialChars: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Require Special Characters</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-slate-800">Authentication Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.twoFactorAuth}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    authentication: {
                      ...securitySettings.authentication,
                      twoFactorAuth: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Enable Two-Factor Authentication</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={securitySettings.authentication.sessionTimeout}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  authentication: {
                    ...securitySettings.authentication,
                    sessionTimeout: parseInt(e.target.value)
                  }
                })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="30"
                max="1440"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                value={securitySettings.authentication.maxLoginAttempts}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  authentication: {
                    ...securitySettings.authentication,
                    maxLoginAttempts: parseInt(e.target.value)
                  }
                })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="3"
                max="10"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Lockout Duration (minutes)
              </label>
              <input
                type="number"
                value={securitySettings.authentication.lockoutDuration}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  authentication: {
                    ...securitySettings.authentication,
                    lockoutDuration: parseInt(e.target.value)
                  }
                })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="5"
                max="60"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.requireStrongPasswords}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    authentication: {
                      ...securitySettings.authentication,
                      requireStrongPasswords: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Require Strong Passwords</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Encryption Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-slate-800">Encryption Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.encryption.dataEncryption}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    encryption: {
                      ...securitySettings.encryption,
                      dataEncryption: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Enable Data Encryption</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Encryption Algorithm
              </label>
              <select
                value={securitySettings.encryption.encryptionAlgorithm}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  encryption: {
                    ...securitySettings.encryption,
                    encryptionAlgorithm: e.target.value
                  }
                })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="AES-256">AES-256</option>
                <option value="AES-128">AES-128</option>
                <option value="3DES">3DES</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Key Rotation (days)
              </label>
              <input
                type="number"
                value={securitySettings.encryption.keyRotationDays}
                onChange={(e) => setSecuritySettings({
                  ...securitySettings,
                  encryption: {
                    ...securitySettings.encryption,
                    keyRotationDays: parseInt(e.target.value)
                  }
                })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="7"
                max="365"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.encryption.secureTransmission}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    encryption: {
                      ...securitySettings.encryption,
                      secureTransmission: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Secure Transmission (TLS/SSL)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Access Control */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-slate-800">Access Control</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.accessControl.roleBasedAccess}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    accessControl: {
                      ...securitySettings.accessControl,
                      roleBasedAccess: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Enable Role-Based Access Control</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.accessControl.ipWhitelist}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    accessControl: {
                      ...securitySettings.accessControl,
                      ipWhitelist: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Enable IP Whitelist</span>
              </label>
            </div>
            {securitySettings.accessControl.ipWhitelist && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Allowed IP Addresses (comma-separated)
                </label>
                <textarea
                  value={securitySettings.accessControl.allowedIPs}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    accessControl: {
                      ...securitySettings.accessControl,
                      allowedIPs: e.target.value
                    }
                  })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="192.168.1.0/24, 10.0.0.0/8"
                />
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={securitySettings.accessControl.timeBasedAccess}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    accessControl: {
                      ...securitySettings.accessControl,
                      timeBasedAccess: e.target.checked
                    }
                  })}
                  className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Enable Time-Based Access</span>
              </label>
            </div>
            {securitySettings.accessControl.timeBasedAccess && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Working Hours Start
                  </label>
                  <input
                    type="time"
                    value={securitySettings.accessControl.workingHours.start}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      accessControl: {
                        ...securitySettings.accessControl,
                        workingHours: {
                          ...securitySettings.accessControl.workingHours,
                          start: e.target.value
                        }
                      }
                    })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Working Hours End
                  </label>
                  <input
                    type="time"
                    value={securitySettings.accessControl.workingHours.end}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      accessControl: {
                        ...securitySettings.accessControl,
                        workingHours: {
                          ...securitySettings.accessControl.workingHours,
                          end: e.target.value
                        }
                      }
                    })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
