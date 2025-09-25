'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Train, MapPin, AlertTriangle, CheckCircle, ZoomIn, ZoomOut, RotateCcw, Play, Pause, FastForward, Rewind } from 'lucide-react'

interface TrainData {
  id: string
  name: string
  number: string
  type: 'passenger' | 'freight' | 'express' | 'superfast'
  status: 'on-time' | 'delayed' | 'early' | 'cancelled'
  position: { x: number; y: number }
  route: string[]
  currentStation: string
  nextStation: string
  direction: 'north' | 'south' | 'east' | 'west'
  priority: number
  delay: number
  speed: number
  eta: string
  passengers: number
  color: string
}

interface StationData {
  id: string
  name: string
  code: string
  position: { x: number; y: number }
  type: 'major' | 'junction' | 'important' | 'halt'
  zone: string
  congestion: number
  platforms: number
}

interface RouteData {
  id: string
  name: string
  stations: string[]
  color: string
  type: 'main' | 'branch' | 'suburban'
  electrified: boolean
}

interface RailwayMapProps {
  onTrainSelect: (train: TrainData) => void
}

export default function RailwayMap({ onTrainSelect }: RailwayMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const animationRef = useRef<number>()
  
  // Map controls
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  
  // Simulation controls
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [selectedTrain, setSelectedTrain] = useState<TrainData | null>(null)
  
  // Real-time train data based on reference map
  const [trains, setTrains] = useState<TrainData[]>([
    {
      id: '1',
      name: 'Rajdhani Express',
      number: '12001',
      type: 'superfast',
      status: 'on-time',
      position: { x: 250, y: 120 },
      route: ['NDLS', 'JHS', 'BPL'],
      currentStation: 'NDLS',
      nextStation: 'JHS',
      direction: 'south',
      priority: 1,
      delay: 0,
      speed: 120,
      eta: '14:30',
      passengers: 1200,
      color: '#10b981'
    },
    {
      id: '2',
      name: 'Shatabdi Express',
      number: '12002',
      type: 'express',
      status: 'delayed',
      position: { x: 180, y: 280 },
      route: ['BPL', 'MUM', 'HYD'],
      currentStation: 'BPL',
      nextStation: 'MUM',
      direction: 'west',
      priority: 2,
      delay: 15,
      speed: 100,
      eta: '16:45',
      passengers: 800,
      color: '#f59e0b'
    },
    {
      id: '3',
      name: 'Duronto Express',
      number: '12213',
      type: 'superfast',
      status: 'on-time',
      position: { x: 420, y: 150 },
      route: ['KOL', 'HYD', 'BLR'],
      currentStation: 'KOL',
      nextStation: 'HYD',
      direction: 'south',
      priority: 1,
      delay: 0,
      speed: 110,
      eta: '18:20',
      passengers: 1000,
      color: '#10b981'
    },
    {
      id: '4',
      name: 'Jan Shatabdi',
      number: '12005',
      type: 'express',
      status: 'early',
      position: { x: 380, y: 380 },
      route: ['HYD', 'BLR', 'CHE'],
      currentStation: 'HYD',
      nextStation: 'BLR',
      direction: 'south',
      priority: 3,
      delay: -5,
      speed: 80,
      eta: '20:15',
      passengers: 600,
      color: '#3b82f6'
    },
    {
      id: '5',
      name: 'Garib Rath',
      number: '12213',
      type: 'express',
      status: 'delayed',
      position: { x: 120, y: 280 },
      route: ['MUM', 'BPL'],
      currentStation: 'MUM',
      nextStation: 'BPL',
      direction: 'east',
      priority: 4,
      delay: 25,
      speed: 90,
      eta: '22:30',
      passengers: 1500,
      color: '#ef4444'
    }
  ])

  // Major Indian Railway Stations based on reference map
  const stations: StationData[] = [
    { id: 'NDLS', name: 'New Delhi', code: 'NDLS', position: { x: 250, y: 80 }, type: 'major', zone: 'NR', congestion: 0.3, platforms: 16 },
    { id: 'JHS', name: 'Jhansi', code: 'JHS', position: { x: 250, y: 150 }, type: 'junction', zone: 'NCR', congestion: 0.2, platforms: 6 },
    { id: 'BPL', name: 'Bhopal', code: 'BPL', position: { x: 200, y: 220 }, type: 'junction', zone: 'WCR', congestion: 0.3, platforms: 8 },
    { id: 'MUM', name: 'Mumbai', code: 'MUM', position: { x: 120, y: 280 }, type: 'major', zone: 'WR', congestion: 0.4, platforms: 12 },
    { id: 'KOL', name: 'Kolkata', code: 'KOL', position: { x: 420, y: 120 }, type: 'major', zone: 'ER', congestion: 0.5, platforms: 23 },
    { id: 'HYD', name: 'Hyderabad', code: 'HYD', position: { x: 320, y: 320 }, type: 'major', zone: 'SCR', congestion: 0.3, platforms: 10 },
    { id: 'BLR', name: 'Bangalore', code: 'BLR', position: { x: 280, y: 400 }, type: 'major', zone: 'SWR', congestion: 0.2, platforms: 8 },
    { id: 'CHE', name: 'Chennai', code: 'CHE', position: { x: 380, y: 420 }, type: 'major', zone: 'SR', congestion: 0.2, platforms: 15 }
  ]

  // Railway routes based on reference map connections
  const routes: RouteData[] = [
    {
      id: 'delhi-jhansi-bhopal',
      name: 'Delhi-Jhansi-Bhopal Route',
      stations: ['NDLS', 'JHS', 'BPL'],
      color: '#7c3aed',
      type: 'main',
      electrified: true
    },
    {
      id: 'delhi-kolkata',
      name: 'Delhi-Kolkata Route',
      stations: ['NDLS', 'KOL'],
      color: '#06b6d4',
      type: 'main',
      electrified: true
    },
    {
      id: 'bhopal-mumbai',
      name: 'Bhopal-Mumbai Route',
      stations: ['BPL', 'MUM'],
      color: '#3b82f6',
      type: 'main',
      electrified: true
    },
    {
      id: 'mumbai-hyderabad',
      name: 'Mumbai-Hyderabad Route',
      stations: ['MUM', 'HYD'],
      color: '#ea580c',
      type: 'main',
      electrified: true
    },
    {
      id: 'kolkata-hyderabad',
      name: 'Kolkata-Hyderabad Route',
      stations: ['KOL', 'HYD'],
      color: '#dc2626',
      type: 'main',
      electrified: true
    },
    {
      id: 'bhopal-hyderabad',
      name: 'Bhopal-Hyderabad Route',
      stations: ['BPL', 'HYD'],
      color: '#7c3aed',
      type: 'main',
      electrified: true
    },
    {
      id: 'hyderabad-bangalore',
      name: 'Hyderabad-Bangalore Route',
      stations: ['HYD', 'BLR'],
      color: '#dc2626',
      type: 'main',
      electrified: true
    },
    {
      id: 'hyderabad-chennai',
      name: 'Hyderabad-Chennai Route',
      stations: ['HYD', 'CHE'],
      color: '#dc2626',
      type: 'main',
      electrified: true
    },
    {
      id: 'bangalore-chennai',
      name: 'Bangalore-Chennai Route',
      stations: ['BLR', 'CHE'],
      color: '#059669',
      type: 'main',
      electrified: true
    }
  ]

  // Simple train movement - straight lines between stations
  const updateTrainPositions = useCallback(() => {
    if (!isPlaying) return

    setTrains(prevTrains => 
      prevTrains.map(train => {
        const currentStation = stations.find(s => s.id === train.currentStation)
        const nextStation = stations.find(s => s.id === train.nextStation)
        
        if (!currentStation || !nextStation) return train
        
        // Simple straight line movement
        const dx = nextStation.position.x - train.position.x
        const dy = nextStation.position.y - train.position.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance === 0) return train
        
        const moveDistance = (train.speed * speed) / 60
        const newX = train.position.x + (dx / distance) * moveDistance
        const newY = train.position.y + (dy / distance) * moveDistance
        
        const distanceToNext = Math.sqrt(
          Math.pow(newX - nextStation.position.x, 2) + 
          Math.pow(newY - nextStation.position.y, 2)
        )
        
        if (distanceToNext < 10) {
          const currentIndex = train.route.indexOf(train.nextStation)
          const nextIndex = (currentIndex + 1) % train.route.length
          const newNextStation = train.route[nextIndex]
          
          return {
            ...train,
            currentStation: train.nextStation,
            nextStation: newNextStation,
            position: { x: nextStation.position.x, y: nextStation.position.y }
          }
        }
        
        return {
          ...train,
          position: { x: newX, y: newY }
        }
      })
    )
  }, [isPlaying, speed, stations])

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(updateTrainPositions)
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, updateTrainPositions])

  // Train status colors
  const getTrainStatusColor = (train: TrainData) => {
    switch (train.status) {
      case 'on-time': return '#10b981'
      case 'delayed': return '#ef4444'
      case 'early': return '#3b82f6'
      case 'cancelled': return '#6b7280'
      default: return '#94a3b8'
    }
  }

  // Station type styling - Reduced sizes to prevent overlap
  const getStationStyle = (station: StationData) => {
    switch (station.type) {
      case 'major': return { size: 6, color: '#dc2626', stroke: '#ffffff' }
      case 'junction': return { size: 5, color: '#059669', stroke: '#ffffff' }
      case 'important': return { size: 4, color: '#3b82f6', stroke: '#ffffff' }
      case 'halt': return { size: 3, color: '#6b7280', stroke: '#ffffff' }
      default: return { size: 3, color: '#94a3b8', stroke: '#ffffff' }
    }
  }

  // Simulation controls
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
  }

  const handleTrainClick = (train: TrainData) => {
    setSelectedTrain(train)
    onTrainSelect(train)
  }

  // Zoom functionality
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)))
  }

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg border border-gray-200 overflow-hidden relative">
      {/* Simulation Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
        <button
          onClick={handlePlayPause}
          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isPlaying 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleSpeedChange(0.5)}
            className={`px-2 py-1 rounded text-xs ${speed === 0.5 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            0.5x
          </button>
          <button
            onClick={() => handleSpeedChange(1)}
            className={`px-2 py-1 rounded text-xs ${speed === 1 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            1x
          </button>
          <button
            onClick={() => handleSpeedChange(2)}
            className={`px-2 py-1 rounded text-xs ${speed === 2 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            2x
          </button>
          <button
            onClick={() => handleSpeedChange(4)}
            className={`px-2 py-1 rounded text-xs ${speed === 4 ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            4x
          </button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex flex-col space-y-1">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-50 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-50 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-gray-50 rounded transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <span className="text-sm text-gray-700 font-medium">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      {/* Train Details Popup */}
      {selectedTrain && (
        <div className="absolute top-20 left-4 z-20 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{selectedTrain.name}</h3>
            <button
              onClick={() => setSelectedTrain(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Number:</span> {selectedTrain.number}</p>
            <p><span className="font-medium">Type:</span> {selectedTrain.type}</p>
            <p><span className="font-medium">Status:</span> 
              <span className={`ml-1 px-2 py-1 rounded text-xs ${
                selectedTrain.status === 'on-time' ? 'bg-green-100 text-green-700' :
                selectedTrain.status === 'delayed' ? 'bg-red-100 text-red-700' :
                selectedTrain.status === 'early' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {selectedTrain.status}
              </span>
            </p>
            <p><span className="font-medium">Current:</span> {selectedTrain.currentStation}</p>
            <p><span className="font-medium">Next:</span> {selectedTrain.nextStation}</p>
            <p><span className="font-medium">ETA:</span> {selectedTrain.eta}</p>
            <p><span className="font-medium">Delay:</span> {selectedTrain.delay > 0 ? `+${selectedTrain.delay}m` : `${selectedTrain.delay}m`}</p>
            <p><span className="font-medium">Passengers:</span> {selectedTrain.passengers.toLocaleString()}</p>
          </div>
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 600 550"
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ 
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* OpenRailwayMap Style Background */}
        <defs>
          <pattern id="railwayGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f1f5f9" strokeWidth="0.5" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#fafbfc" />
        <rect width="100%" height="100%" fill="url(#railwayGrid)" />

        {/* Map Title */}
        <text x="300" y="30" textAnchor="middle" className="text-xl font-bold fill-gray-800">
          Indian Railway Network - Real-time Status
        </text>

        {/* Railway Tracks - Realistic Steel Rails */}
        {routes.map((route) => (
          <g key={route.id}>
            {route.stations.map((stationId, index) => {
              if (index === route.stations.length - 1) return null
              const currentStation = stations.find(s => s.id === stationId)
              const nextStation = stations.find(s => s.id === route.stations[index + 1])
              
              if (!currentStation || !nextStation) return null
              
              // Use straight lines for simple, reliable tracks
              const pathData = `M ${currentStation.position.x},${currentStation.position.y} L ${nextStation.position.x},${nextStation.position.y}`
              
              // Realistic railway track styling
              return (
                <g key={`${route.id}-${index}`}>
                  {/* Track base (steel gray) */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#64748b"
                    strokeWidth={route.type === 'main' ? 10 : 8}
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  {/* Track rails (brighter steel) */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={route.electrified ? '#fbbf24' : '#e2e8f0'}
                    strokeWidth={route.type === 'main' ? 6 : 4}
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  {/* Electrification indicator */}
                  {route.electrified && (
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4,2"
                      opacity="0.7"
                    />
                  )}
                  {/* Track sleepers */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#8b5a2b"
                    strokeWidth="1"
                    strokeDasharray="1,6"
                    opacity="0.6"
                  />
                </g>
              )
            })}
          </g>
        ))}

        {/* Railway Stations - Interactive with Tooltips */}
        {stations.map((station) => {
          const style = getStationStyle(station)
          return (
            <g key={station.id}>
              {/* Station Node (Reference Map Style) */}
              <circle
                cx={station.position.x}
                cy={station.position.y}
                r="8"
                fill="#ffffff"
                stroke="#374151"
                strokeWidth="3"
                className="cursor-pointer hover:fill-blue-50 transition-colors"
                onClick={() => {
                  console.log(`Station clicked: ${station.name}`)
                }}
              />
              
              {/* Station Type Indicator */}
              <circle
                cx={station.position.x}
                cy={station.position.y}
                r="4"
                fill={style.color}
                stroke="#ffffff"
                strokeWidth="2"
              />
              
              {/* Station Name */}
              <text
                x={station.position.x}
                y={station.position.y - 15}
                textAnchor="middle"
                className="fill-gray-800 text-sm font-bold"
                style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
              >
                {station.name}
              </text>
              
              {/* Station Code */}
              <text
                x={station.position.x}
                y={station.position.y + 20}
                textAnchor="middle"
                className="fill-gray-600 text-xs font-medium"
                style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
              >
                {station.code}
              </text>
              
              {/* Congestion Indicator */}
              {station.congestion > 0.2 && (
                <circle
                  cx={station.position.x + 12}
                  cy={station.position.y - 12}
                  r="4"
                  fill={station.congestion > 0.5 ? '#ef4444' : station.congestion > 0.3 ? '#f59e0b' : '#10b981'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              )}
              
              {/* Station Tooltip on Hover */}
              <title>
                {`${station.name} (${station.code})
Zone: ${station.zone}
Platforms: ${station.platforms}
Congestion: ${Math.round(station.congestion * 100)}%
Type: ${station.type.toUpperCase()}`}
              </title>
            </g>
          )
        })}

        {/* Moving Trains - OpenRailwayMap Style */}
        {trains.map((train) => (
          <g key={train.id}>
            {/* Train Icon */}
            <g 
              transform={`translate(${train.position.x}, ${train.position.y})`}
              className="cursor-pointer"
              onClick={() => handleTrainClick(train)}
            >
              {/* Train Engine (Reference Map Style) */}
              <rect
                x="-10"
                y="-5"
                width="20"
                height="10"
                fill={train.color}
                stroke="#ffffff"
                strokeWidth="2"
                rx="3"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              />
              
              {/* Train Windows */}
              <rect
                x="-8"
                y="-3"
                width="16"
                height="6"
                fill="#ffffff"
                opacity="0.9"
                rx="1"
              />
              
              {/* Train Number */}
              <text
                x="0"
                y="2"
                textAnchor="middle"
                className="fill-gray-800 text-xs font-bold"
                style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
              >
                {train.number.slice(-2)}
              </text>
              
              {/* Status Indicator */}
              <circle
                cx="10"
                cy="-7"
                r="3"
                fill={getTrainStatusColor(train)}
                stroke="#ffffff"
                strokeWidth="1"
              />
              
              {/* Direction Arrow */}
              <path
                d={`M ${train.direction === 'east' ? '6' : train.direction === 'west' ? '-6' : '0'},-1 L ${train.direction === 'east' ? '8' : train.direction === 'west' ? '-8' : '0'},-1 L ${train.direction === 'east' ? '7' : train.direction === 'west' ? '-7' : '0'},${train.direction === 'east' ? '-3' : train.direction === 'west' ? '1' : '-1'}`}
                fill="#ffffff"
                stroke={train.color}
                strokeWidth="0.5"
              />
            </g>

            {/* Train Route Highlight (when selected) */}
            {selectedTrain?.id === train.id && (
              <g>
                {train.route.map((stationId, index) => {
                  if (index === train.route.length - 1) return null
                  const currentStation = stations.find(s => s.id === stationId)
                  const nextStation = stations.find(s => s.id === train.route[index + 1])
                  
                  if (!currentStation || !nextStation) return null
                  
                  return (
                    <path
                      key={`route-${train.id}-${index}`}
                      d={`M ${currentStation.position.x},${currentStation.position.y} L ${nextStation.position.x},${nextStation.position.y}`}
                      fill="none"
                      stroke={train.color}
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.4"
                    />
                  )
                })}
              </g>
            )}
          </g>
        ))}

        {/* Comprehensive Railway Network Legend */}
        <g transform="translate(20, 480)">
          <rect x="0" y="0" width="280" height="120" fill="white" stroke="#374151" strokeWidth="1" rx="6" />
          <text x="10" y="18" className="fill-gray-800 text-sm font-bold">Indian Railway Network Legend</text>
          
          {/* Track Types */}
          <g transform="translate(10, 30)">
            <path d="M 0,0 L 20,0" stroke="#64748b" strokeWidth="8" strokeLinecap="round"/>
            <path d="M 0,0 L 20,0" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round"/>
            <text x="25" y="4" className="fill-gray-700 text-xs">Electrified Track</text>
          </g>
          
          <g transform="translate(10, 45)">
            <path d="M 0,0 L 20,0" stroke="#64748b" strokeWidth="8" strokeLinecap="round"/>
            <path d="M 0,0 L 20,0" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round"/>
            <text x="25" y="4" className="fill-gray-700 text-xs">Non-Electrified Track</text>
          </g>
          
          {/* Station Types */}
          <g transform="translate(10, 60)">
            <rect x="0" y="-4" width="16" height="8" fill="#ffffff" stroke="#374151" strokeWidth="1" rx="2"/>
            <circle cx="8" cy="0" r="3" fill="#dc2626"/>
            <text x="20" y="2" className="fill-gray-700 text-xs">Major Terminal</text>
          </g>
          
          <g transform="translate(10, 75)">
            <rect x="0" y="-4" width="16" height="8" fill="#ffffff" stroke="#374151" strokeWidth="1" rx="2"/>
            <circle cx="8" cy="0" r="3" fill="#059669"/>
            <text x="20" y="2" className="fill-gray-700 text-xs">Junction Station</text>
          </g>
          
          <g transform="translate(10, 90)">
            <rect x="0" y="-4" width="16" height="8" fill="#ffffff" stroke="#374151" strokeWidth="1" rx="2"/>
            <circle cx="8" cy="0" r="3" fill="#3b82f6"/>
            <text x="20" y="2" className="fill-gray-700 text-xs">Important Station</text>
          </g>
          
          <g transform="translate(10, 105)">
            <circle cx="8" cy="0" r="4" fill="#ef4444"/>
            <text x="20" y="2" className="fill-gray-700 text-xs">High Congestion</text>
          </g>
          
          {/* Train Status */}
          <g transform="translate(140, 30)">
            <rect x="-8" y="-4" width="16" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1" rx="2"/>
            <text x="15" y="2" className="fill-gray-700 text-xs">On-Time Train</text>
          </g>
          
          <g transform="translate(140, 45)">
            <rect x="-8" y="-4" width="16" height="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" rx="2"/>
            <text x="15" y="2" className="fill-gray-700 text-xs">Delayed Train</text>
          </g>
          
          <g transform="translate(140, 60)">
            <rect x="-8" y="-4" width="16" height="8" fill="#ef4444" stroke="#ffffff" strokeWidth="1" rx="2"/>
            <text x="15" y="2" className="fill-gray-700 text-xs">High Priority</text>
          </g>
          
          <g transform="translate(140, 75)">
            <rect x="-8" y="-4" width="16" height="8" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" rx="2"/>
            <text x="15" y="2" className="fill-gray-700 text-xs">Early Train</text>
          </g>
          
          <g transform="translate(140, 90)">
            <circle cx="0" cy="0" r="4" fill="#8b5cf6"/>
            <text x="15" y="2" className="fill-gray-700 text-xs">SF - Superfast</text>
          </g>
          
          <g transform="translate(140, 105)">
            <circle cx="0" cy="0" r="4" fill="#06b6d4"/>
            <text x="15" y="2" className="fill-gray-700 text-xs">EX - Express</text>
          </g>
        </g>
      </svg>
    </div>
  )
}
