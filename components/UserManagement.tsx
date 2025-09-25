'use client'

import { useState } from 'react'
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  ShieldCheck, 
  ShieldX,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@railways.gov.in',
      role: 'controller',
      status: 'active',
      lastLogin: '2024-01-15 14:30',
      permissions: ['dashboard', 'simulator', 'analytics'],
      department: 'Operations'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@railways.gov.in',
      role: 'supervisor',
      status: 'active',
      lastLogin: '2024-01-15 13:45',
      permissions: ['dashboard', 'analytics', 'settings'],
      department: 'Management'
    },
    {
      id: '3',
      name: 'Amit Singh',
      email: 'amit.singh@railways.gov.in',
      role: 'trainer',
      status: 'inactive',
      lastLogin: '2024-01-10 09:15',
      permissions: ['simulator'],
      department: 'Training'
    },
    {
      id: '4',
      name: 'Suresh Patel',
      email: 'suresh.patel@railways.gov.in',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15 15:20',
      permissions: ['dashboard', 'simulator', 'analytics', 'settings'],
      department: 'IT'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [showAddUser, setShowAddUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const roles = [
    { value: 'controller', label: 'Controller', color: 'bg-blue-500' },
    { value: 'supervisor', label: 'Supervisor', color: 'bg-green-500' },
    { value: 'trainer', label: 'Trainer', color: 'bg-purple-500' },
    { value: 'admin', label: 'Administrator', color: 'bg-red-500' }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find(r => r.value === role)
    return roleConfig?.color || 'bg-slate-500'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'inactive': return <XCircle className="w-4 h-4 text-red-400" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />
      default: return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-600">Manage user accounts, roles, and permissions</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
        >
          <option value="all">All Roles</option>
          {roles.map(role => (
            <option key={role.value} value={role.value}>{role.label}</option>
          ))}
        </select>
        <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-2 rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-800">{user.name}</div>
                        <div className="text-sm text-slate-600">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getRoleColor(user.role)}`}>
                      {roles.find(r => r.value === user.role)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user.status)}
                      <span className="text-sm text-slate-600 capitalize">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`transition-colors ${
                          user.status === 'active' 
                            ? 'text-red-600 hover:text-red-700' 
                            : 'text-green-600 hover:text-green-700'
                        }`}
                      >
                        {user.status === 'active' ? (
                          <ShieldX className="w-4 h-4" />
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-slate-500 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{users.length}</div>
              <div className="text-sm text-slate-600">Total Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {users.filter(u => u.status === 'active').length}
              </div>
              <div className="text-sm text-slate-600">Active Users</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {users.filter(u => u.role === 'admin').length}
              </div>
              <div className="text-sm text-slate-600">Administrators</div>
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
                {users.filter(u => u.status === 'inactive').length}
              </div>
              <div className="text-sm text-slate-600">Inactive Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
