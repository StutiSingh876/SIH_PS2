/**
 * Real-time Indian Railways Section Controller Dashboard Simulation
 * Handles 120km double line section with dynamic train management
 */

interface ConflictAnalysis {
  conflictId: string
  type: 'track_conflict' | 'station_congestion' | 'signal_failure' | 'priority_conflict'
  severity: 'low' | 'medium' | 'high' | 'critical'
  affectedTrains: string[]
  affectedSections: string[]
  currentImpact: number
  resolutionOptions: any[]
}

interface AIRecommendation {
  id: string
  type: 'reroute' | 'priority_change' | 'speed_adjustment' | 'platform_reallocation'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  confidence: number
  action: string
  estimatedSavings: number
  affectedTrains: string[]
  affectedSections: string[]
}

export interface Train {
  id: string
  name: string
  type: 'express' | 'freight' | 'suburban'
  priority: number
  currentPosition: number // km from start
  speed: number // km/h
  maxSpeed: number
  status: 'running' | 'stopped' | 'delayed' | 'early'
  delay: number // minutes
  passengerCount: number
  energyConsumption: number
  route: string[]
  currentStation?: string
  nextStation?: string
  arrivalTime?: number
  departureTime?: number
}

export interface Station {
  id: string
  name: string
  position: number // km from start
  platforms: number
  capacity: number
  currentTrains: string[]
  waitingTrains: string[]
  platformOccupancy: { [platform: string]: string | null }
}

export interface Signal {
  id: string
  position: number // km from start
  state: 'green' | 'yellow' | 'red'
  failure: boolean
  lastChange: number
  controlledBy: string
}

export interface Junction {
  id: string
  name: string
  position: number
  connections: string[]
  currentTrains: string[]
  queue: string[]
}

export interface WeatherCondition {
  type: 'clear' | 'fog' | 'rain' | 'storm'
  severity: number // 0-1
  speedReduction: number // 0-1
  visibilityReduction: number // 0-1
  startTime: number
  endTime?: number
}

export interface Disruption {
  id: string
  type: 'signal_failure' | 'track_blockage' | 'weather' | 'emergency_train'
  severity: 'low' | 'medium' | 'high' | 'critical'
  affectedSections: number[]
  startTime: number
  duration: number
  resolved: boolean
  description: string
}

export interface SimulationState {
  currentTime: number
  isRunning: boolean
  speed: number
  weather: WeatherCondition
  trains: Train[]
  stations: Station[]
  signals: Signal[]
  junctions: Junction[]
  disruptions: Disruption[]
  kpis: KPIs
  events: Event[]
}

export interface KPIs {
  trainsClearedPerHour: number
  averageDelay: number
  passengerImpact: number
  energyUsage: number
  systemEfficiency: number
  conflicts: number
  totalDelay: number
  throughput: number
}

export interface Event {
  id: string
  timestamp: number
  type: string
  description: string
  trainId?: string
  stationId?: string
  data: any
}

export class RailwaySimulation {
  private state: SimulationState
  private eventListeners: ((event: Event) => void)[] = []
  private intervalId: NodeJS.Timeout | null = null
  private isInitialized: boolean = false

  constructor() {
    this.state = this.initializeSimulation()
  }

  private initializeSimulation(): SimulationState {
    // 120km double line section setup
    const stations: Station[] = [
      { id: 'A', name: 'Station A', position: 0, platforms: 4, capacity: 8, currentTrains: [], waitingTrains: [], platformOccupancy: {} },
      { id: 'B', name: 'Junction B', position: 30, platforms: 6, capacity: 12, currentTrains: [], waitingTrains: [], platformOccupancy: {} },
      { id: 'C', name: 'Station C', position: 60, platforms: 3, capacity: 6, currentTrains: [], waitingTrains: [], platformOccupancy: {} },
      { id: 'D', name: 'Station D', position: 90, platforms: 4, capacity: 8, currentTrains: [], waitingTrains: [], platformOccupancy: {} },
      { id: 'E', name: 'Junction E', position: 120, platforms: 5, capacity: 10, currentTrains: [], waitingTrains: [], platformOccupancy: {} }
    ]

    // Initialize signals every 10km
    const signals: Signal[] = []
    for (let i = 0; i <= 120; i += 10) {
      signals.push({
        id: `S${i}`,
        position: i,
        state: 'green',
        failure: false,
        lastChange: 0,
        controlledBy: 'system'
      })
    }

    // Initialize junctions
    const junctions: Junction[] = [
      { id: 'J1', name: 'Junction B', position: 30, connections: ['A', 'C'], currentTrains: [], queue: [] },
      { id: 'J2', name: 'Junction E', position: 120, connections: ['D', 'F'], currentTrains: [], queue: [] }
    ]

    // Initialize trains
    const trains: Train[] = this.initializeTrains()

    return {
      currentTime: 0,
      isRunning: false,
      speed: 1,
      weather: { type: 'clear', severity: 0, speedReduction: 0, visibilityReduction: 0, startTime: 0 },
      trains,
      stations,
      signals,
      junctions,
      disruptions: [],
      kpis: this.calculateKPIs(trains, stations),
      events: []
    }
  }

  private initializeTrains(): Train[] {
    const trains: Train[] = []
    
    // 8 Express trains
    for (let i = 1; i <= 8; i++) {
      trains.push({
        id: `E${i}`,
        name: `Express ${i}`,
        type: 'express',
        priority: 1,
        currentPosition: Math.random() * 120,
        speed: 0,
        maxSpeed: 120,
        status: 'running',
        delay: 0,
        passengerCount: 800 + Math.random() * 400,
        energyConsumption: 0,
        route: ['A', 'B', 'C', 'D', 'E'],
        currentStation: 'A',
        nextStation: 'B'
      })
    }

    // 4 Freight trains
    for (let i = 1; i <= 4; i++) {
      trains.push({
        id: `F${i}`,
        name: `Freight ${i}`,
        type: 'freight',
        priority: 3,
        currentPosition: Math.random() * 120,
        speed: 0,
        maxSpeed: 80,
        status: 'running',
        delay: 0,
        passengerCount: 0,
        energyConsumption: 0,
        route: ['A', 'B', 'C', 'D', 'E'],
        currentStation: 'A',
        nextStation: 'B'
      })
    }

    // 2 Suburban locals
    for (let i = 1; i <= 2; i++) {
      trains.push({
        id: `L${i}`,
        name: `Local ${i}`,
        type: 'suburban',
        priority: 2,
        currentPosition: Math.random() * 120,
        speed: 0,
        maxSpeed: 60,
        status: 'running',
        delay: 0,
        passengerCount: 200 + Math.random() * 100,
        energyConsumption: 0,
        route: ['A', 'B', 'C', 'D', 'E'],
        currentStation: 'A',
        nextStation: 'B'
      })
    }

    return trains
  }

  // Start simulation
  start(): void {
    if (this.state.isRunning) return
    
    this.state.isRunning = true
    this.intervalId = setInterval(() => {
      this.updateSimulation()
    }, 1000 / this.state.speed)
    
    this.logEvent('simulation_started', 'Simulation started')
  }

  // Pause simulation
  pause(): void {
    this.state.isRunning = false
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.logEvent('simulation_paused', 'Simulation paused')
  }

  // Reset simulation
  reset(): void {
    this.pause()
    this.state = this.initializeSimulation()
    this.logEvent('simulation_reset', 'Simulation reset')
  }

  // Set simulation speed
  setSpeed(speed: number): void {
    this.state.speed = Math.max(0.1, Math.min(10, speed))
    if (this.state.isRunning) {
      this.pause()
      this.start()
    }
  }

  // Core simulation update
  private updateSimulation(): void {
    this.state.currentTime += 1 // 1 minute per update
    
    // Update train positions
    this.updateTrainPositions()
    
    // Update signals
    this.updateSignals()
    
    // Handle disruptions
    this.handleDisruptions()
    
    // Update KPIs
    this.state.kpis = this.calculateKPIs(this.state.trains, this.state.stations)
    
    // Log state every minute
    if (this.state.currentTime % 1 === 0) {
      this.logState()
    }
  }

  private updateTrainPositions(): void {
    this.state.trains.forEach(train => {
      if (train.status === 'running') {
        // Calculate speed based on conditions
        let targetSpeed = train.maxSpeed
        
        // Apply weather effects
        if (this.state.weather.type !== 'clear') {
          targetSpeed *= (1 - this.state.weather.speedReduction)
        }
        
        // Apply signal effects
        const signalAhead = this.getSignalAhead(train.currentPosition)
        if (signalAhead) {
          switch (signalAhead.state) {
            case 'red':
              targetSpeed = 0
              break
            case 'yellow':
              targetSpeed *= 0.5
              break
            case 'green':
              // Normal speed
              break
          }
        }
        
        // Update train speed
        train.speed = Math.min(train.speed + 5, targetSpeed)
        
        // Move train
        const distanceMoved = (train.speed / 60) * 1 // km per minute
        train.currentPosition += distanceMoved
        
        // Check if train reached next station
        const nextStation = this.getNextStation(train.currentPosition)
        if (nextStation && Math.abs(train.currentPosition - nextStation.position) < 1) {
          this.handleTrainArrival(train, nextStation)
        }
        
        // Update energy consumption
        train.energyConsumption += train.speed * 0.1
      }
    })
  }

  private updateSignals(): void {
    this.state.signals.forEach(signal => {
      if (!signal.failure) {
        // Simple signal logic - can be enhanced
        const trainsAhead = this.state.trains.filter(train => 
          train.currentPosition > signal.position && 
          train.currentPosition < signal.position + 5
        )
        
        if (trainsAhead.length > 0) {
          signal.state = 'red'
        } else {
          signal.state = 'green'
        }
      }
    })
  }

  private handleDisruptions(): void {
    this.state.disruptions.forEach(disruption => {
      if (!disruption.resolved && this.state.currentTime >= disruption.startTime) {
        this.applyDisruption(disruption)
      }
    })
  }

  private applyDisruption(disruption: Disruption): void {
    switch (disruption.type) {
      case 'signal_failure':
        this.state.signals.forEach(signal => {
          if (disruption.affectedSections.includes(signal.position)) {
            signal.failure = true
            signal.state = 'red'
          }
        })
        break
      case 'track_blockage':
        // Block affected sections
        break
      case 'weather':
        this.state.weather = {
          type: 'fog',
          severity: 0.7,
          speedReduction: 0.5,
          visibilityReduction: 0.8,
          startTime: disruption.startTime,
          endTime: disruption.startTime + disruption.duration
        }
        break
    }
  }

  private getSignalAhead(position: number): Signal | null {
    return this.state.signals.find(signal => 
      signal.position > position && signal.position < position + 10
    ) || null
  }

  private getNextStation(position: number): Station | null {
    return this.state.stations.find(station => 
      station.position > position
    ) || null
  }

  private handleTrainArrival(train: Train, station: Station): void {
    // Check if station has capacity
    if (station.currentTrains.length >= station.capacity) {
      train.delay += 5
      train.status = 'delayed'
      this.logEvent('train_delayed', `Train ${train.id} delayed at ${station.name}`)
    } else {
      train.status = 'stopped'
      station.currentTrains.push(train.id)
      train.currentStation = station.id
      
      // Calculate delay
      const expectedArrival = this.calculateExpectedArrival(train, station)
      const actualArrival = this.state.currentTime
      train.delay = Math.max(0, actualArrival - expectedArrival)
      
      this.logEvent('train_arrived', `Train ${train.id} arrived at ${station.name}`)
    }
  }

  private calculateExpectedArrival(train: Train, station: Station): number {
    // Simplified calculation
    return this.state.currentTime + Math.random() * 10
  }

  private calculateKPIs(trains: Train[], stations: Station[]): KPIs {
    // Safety check for empty arrays
    if (!trains || trains.length === 0) {
      return {
        trainsClearedPerHour: 0,
        averageDelay: 0,
        passengerImpact: 0,
        energyUsage: 0,
        systemEfficiency: 0,
        conflicts: 0,
        totalDelay: 0,
        throughput: 0
      }
    }

    const totalDelay = trains.reduce((sum, train) => sum + train.delay, 0)
    const averageDelay = trains.length > 0 ? totalDelay / trains.length : 0
    const trainsCleared = trains.filter(train => train.status === 'running').length
    const passengerImpact = trains.reduce((sum, train) => sum + train.passengerCount * train.delay, 0)
    const energyUsage = trains.reduce((sum, train) => sum + train.energyConsumption, 0)
    const conflicts = this.countConflicts()
    const throughput = trainsCleared / (this.state.currentTime / 60) // trains per hour
    const systemEfficiency = Math.max(0, 100 - (averageDelay / 10) * 100)

    return {
      trainsClearedPerHour: throughput,
      averageDelay: Math.round(averageDelay * 100) / 100,
      passengerImpact: Math.round(passengerImpact),
      energyUsage: Math.round(energyUsage * 100) / 100,
      systemEfficiency: Math.round(systemEfficiency * 100) / 100,
      conflicts,
      totalDelay: Math.round(totalDelay),
      throughput: Math.round(throughput * 100) / 100
    }
  }

  private countConflicts(): number {
    let conflicts = 0
    
    // Safety check for state initialization
    if (!this.state || !this.state.stations || !this.state.signals) {
      return 0
    }
    
    // Count track conflicts
    this.state.stations.forEach(station => {
      if (station.currentTrains.length > station.capacity) {
        conflicts += station.currentTrains.length - station.capacity
      }
    })
    
    // Count signal conflicts
    this.state.signals.forEach(signal => {
      if (signal.state === 'red' && signal.failure) {
        conflicts++
      }
    })
    
    return conflicts
  }

  private logEvent(type: string, description: string, data: any = {}): void {
    const event: Event = {
      id: `event_${Date.now()}_${Math.random()}`,
      timestamp: this.state.currentTime,
      type,
      description,
      data
    }
    
    this.state.events.push(event)
    this.eventListeners.forEach(listener => listener(event))
  }

  private logState(): void {
    const state = {
      timestamp: this.state.currentTime,
      trains: this.state.trains.map(train => ({
        id: train.id,
        position: train.currentPosition,
        delay: train.delay,
        status: train.status
      })),
      signals: this.state.signals.map(signal => ({
        id: signal.id,
        state: signal.state,
        failure: signal.failure
      })),
      kpis: this.state.kpis
    }
    
    console.log(`[${this.state.currentTime}min]`, state)
  }

  // Public API methods
  getState(): SimulationState {
    return { ...this.state }
  }

  getTrains(): Train[] {
    return [...this.state.trains]
  }

  getStations(): Station[] {
    return [...this.state.stations]
  }

  getSignals(): Signal[] {
    return [...this.state.signals]
  }

  getKPIs(): KPIs {
    return { ...this.state.kpis }
  }

  getEvents(): Event[] {
    return [...this.state.events]
  }

  // Disruption injection
  injectDisruption(disruption: Omit<Disruption, 'id'>): void {
    const newDisruption: Disruption = {
      id: `disruption_${Date.now()}`,
      ...disruption
    }
    
    this.state.disruptions.push(newDisruption)
    this.logEvent('disruption_injected', `Disruption injected: ${disruption.type}`)
  }

  // AI-based resolution
  generateAIResolution(): any {
    const conflicts = this.identifyConflicts()
    const recommendations = this.generateRecommendations(conflicts)
    
    return {
      conflicts,
      recommendations,
      estimatedImprovement: this.calculateImprovement(recommendations)
    }
  }

  private identifyConflicts(): any[] {
    const conflicts: ConflictAnalysis[] = []
    
    // Identify track conflicts
    this.state.stations.forEach(station => {
      if (station.currentTrains.length > station.capacity) {
        conflicts.push({
          conflictId: `station_congestion_${station.id}`,
          type: 'station_congestion',
          severity: station.currentTrains.length > station.capacity * 1.5 ? 'critical' : 'high',
          affectedTrains: station.currentTrains,
          affectedSections: [station.id],
          currentImpact: (station.currentTrains.length - station.capacity) * 5,
          resolutionOptions: []
        })
      }
    })
    
    // Identify signal conflicts
    this.state.signals.forEach(signal => {
      if (signal.failure) {
        conflicts.push({
          conflictId: `signal_failure_${signal.id}`,
          type: 'signal_failure',
          severity: 'critical',
          affectedTrains: this.getTrainsNearSignal(signal.position),
          affectedSections: [signal.id],
          currentImpact: this.getTrainsNearSignal(signal.position).length * 10,
          resolutionOptions: []
        })
      }
    })
    
    return conflicts
  }

  private generateRecommendations(conflicts: any[]): any[] {
    const recommendations: AIRecommendation[] = []
    
    conflicts.forEach(conflict => {
      switch (conflict.type) {
        case 'station_congestion':
          recommendations.push({
            id: `congestion_${conflict.conflictId}`,
            type: 'platform_reallocation',
            priority: 'high',
            title: 'Station Congestion Resolution',
            description: `Reallocate platforms at ${conflict.affectedSections[0]} to reduce congestion`,
            impact: `Reduce delay by ${conflict.currentImpact} minutes`,
            confidence: 90,
            action: 'Reassign platforms and adjust arrival times',
            estimatedSavings: conflict.currentImpact * 60,
            affectedTrains: conflict.affectedTrains,
            affectedSections: conflict.affectedSections
          })
          break
        case 'signal_failure':
          recommendations.push({
            id: `signal_${conflict.conflictId}`,
            type: 'platform_reallocation',
            priority: 'high',
            title: 'Signal Failure Response',
            description: `Prioritize signal repair at ${conflict.affectedSections[0]}`,
            impact: 'Restore signal functionality',
            confidence: 95,
            action: 'Dispatch maintenance team and implement temporary measures',
            estimatedSavings: 1200,
            affectedTrains: conflict.affectedTrains,
            affectedSections: conflict.affectedSections
          })
          break
      }
    })
    
    return recommendations
  }

  private calculateImprovement(recommendations: any[]): any {
    const totalDelayReduction = recommendations.reduce((sum, rec) => sum + rec.estimatedDelayReduction, 0)
    const currentTotalDelay = this.state.kpis.totalDelay
    
    return {
      delayReduction: totalDelayReduction,
      percentageImprovement: (totalDelayReduction / currentTotalDelay) * 100,
      newTotalDelay: Math.max(0, currentTotalDelay - totalDelayReduction)
    }
  }

  private getTrainsNearSignal(position: number): string[] {
    return this.state.trains
      .filter(train => Math.abs(train.currentPosition - position) < 5)
      .map(train => train.id)
  }

  // Event listeners
  addEventListener(listener: (event: Event) => void): void {
    this.eventListeners.push(listener)
  }

  removeEventListener(listener: (event: Event) => void): void {
    const index = this.eventListeners.indexOf(listener)
    if (index > -1) {
      this.eventListeners.splice(index, 1)
    }
  }

  // Cleanup
  destroy(): void {
    this.pause()
    this.eventListeners = []
  }
}
