'use client'

import { useState } from 'react'
import { 
  Database, 
  Wifi, 
  Cloud, 
  Server, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  TestTube,
  Save
} from 'lucide-react'

export default function DataSourceConfig() {
  const [dataSources, setDataSources] = useState([
    {
      id: '1',
      name: 'TMS Database',
      type: 'database',
      status: 'connected',
      endpoint: 'tms.railways.gov.in:5432',
      lastSync: '2024-01-15 14:30:15',
      records: 1250000,
      latency: 45
    },
    {
      id: '2',
      name: 'GPS Tracking',
      type: 'api',
      status: 'connected',
      endpoint: 'gps.railways.gov.in/api/v1',
      lastSync: '2024-01-15 14:30:12',
      records: 89000,
      latency: 23
    },
    {
      id: '3',
      name: 'Weather API',
      type: 'api',
      status: 'connected',
      endpoint: 'weather.imd.gov.in/api',
      lastSync: '2024-01-15 14:30:15',
      records: 12500,
      latency: 35
    },
    {
      id: '4',
      name: 'IoT Sensors',
      type: 'iot',
      status: 'disconnected',
      endpoint: 'iot.railways.gov.in:1883',
      lastSync: '2024-01-15 10:45:22',
      records: 0,
      latency: 0
    }
  ])

  const [showAddSource, setShowAddSource] = useState(false)
  const [selectedSource, setSelectedSource] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'disconnected': return <XCircle className="w-4 h-4 text-red-600" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default: return <XCircle className="w-4 h-4 text-slate-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600'
      case 'disconnected': return 'text-red-600'
      case 'error': return 'text-yellow-600'
      default: return 'text-slate-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return <Database className="w-5 h-5 text-blue-600" />
      case 'api': return <Cloud className="w-5 h-5 text-green-600" />
      case 'iot': return <Wifi className="w-5 h-5 text-purple-600" />
      case 'server': return <Server className="w-5 h-5 text-orange-600" />
      default: return <Database className="w-5 h-5 text-slate-600" />
    }
  }

  const handleTestConnection = (sourceId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Simulate connection test
      setDataSources(prev => prev.map(source => 
        source.id === sourceId 
          ? { ...source, status: 'connected', lastSync: new Date().toLocaleString() }
          : source
      ))
    }, 2000)
  }

  const handleDeleteSource = (sourceId: string) => {
    setDataSources(prev => prev.filter(source => source.id !== sourceId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Data Source Configuration</h2>
          <p className="text-slate-600">Manage IoT sensors, APIs, and external data sources</p>
        </div>
        <button
          onClick={() => setShowAddSource(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Data Source</span>
        </button>
      </div>

      {/* Data Source Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {dataSources.filter(s => s.status === 'connected').length}
              </div>
              <div className="text-sm text-slate-600">Connected</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {dataSources.filter(s => s.status === 'disconnected').length}
              </div>
              <div className="text-sm text-slate-600">Disconnected</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{dataSources.length}</div>
              <div className="text-sm text-slate-600">Total Sources</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {Math.round(dataSources.reduce((sum, source) => sum + source.latency, 0) / dataSources.length)}ms
              </div>
              <div className="text-sm text-slate-600">Avg Latency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources List */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800">Data Sources</h3>
          <p className="text-sm text-slate-600">Configure and monitor external data connections</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Last Sync
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Records
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Latency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dataSources.map((source) => (
                <tr key={source.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(source.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-slate-800">{source.name}</div>
                        <div className="text-sm text-slate-600">ID: {source.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-800 bg-slate-200">
                      {source.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(source.status)}
                      <span className={`text-sm font-medium ${getStatusColor(source.status)}`}>
                        {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-700 font-mono">{source.endpoint}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {source.lastSync}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {source.records.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                    {source.latency}ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleTestConnection(source.id)}
                        disabled={isLoading}
                        className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                      >
                        <TestTube className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedSource(source)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSource(source.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Source Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <Database className="w-6 h-6 text-blue-600" />
            <h4 className="font-semibold text-slate-800">Database</h4>
          </div>
          <p className="text-sm text-slate-600 mb-3">PostgreSQL, MySQL, Oracle</p>
          <div className="text-xs text-slate-500">
            {dataSources.filter(s => s.type === 'database').length} sources
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <Cloud className="w-6 h-6 text-green-600" />
            <h4 className="font-semibold text-slate-800">API</h4>
          </div>
          <p className="text-sm text-slate-600 mb-3">REST, GraphQL, SOAP</p>
          <div className="text-xs text-slate-500">
            {dataSources.filter(s => s.type === 'api').length} sources
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <Wifi className="w-6 h-6 text-purple-600" />
            <h4 className="font-semibold text-slate-800">IoT</h4>
          </div>
          <p className="text-sm text-slate-600 mb-3">MQTT, CoAP, WebSocket</p>
          <div className="text-xs text-slate-500">
            {dataSources.filter(s => s.type === 'iot').length} sources
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3 mb-3">
            <Server className="w-6 h-6 text-orange-600" />
            <h4 className="font-semibold text-slate-800">Server</h4>
          </div>
          <p className="text-sm text-slate-600 mb-3">File, FTP, SFTP</p>
          <div className="text-xs text-slate-500">
            {dataSources.filter(s => s.type === 'server').length} sources
          </div>
        </div>
      </div>

      {/* Connection Health */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Connection Health</h3>
        <div className="space-y-4">
          {dataSources.map((source) => (
            <div key={source.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {getTypeIcon(source.type)}
                <div>
                  <div className="text-sm font-medium text-slate-800">{source.name}</div>
                  <div className="text-xs text-slate-600">{source.endpoint}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-slate-700">{source.latency}ms</div>
                  <div className="text-xs text-slate-500">Latency</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-700">{source.records.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">Records</div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(source.status)}
                  <span className={`text-sm ${getStatusColor(source.status)}`}>
                    {source.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
