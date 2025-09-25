/**
 * AI Optimization Engine for Railway Traffic Management
 * Provides intelligent conflict resolution and delay minimization
 */

import { Train, Station, Signal, Junction, Disruption, KPIs } from './RailwaySimulation'

export interface AIRecommendation {
  id: string
  type: 'reroute' | 'priority_change' | 'speed_adjustment' | 'platform_reallocation' | 'signal_repair'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  confidence: number
  action: string
  estimatedSavings: number
  affectedTrains: string[]
  affectedSections: string[]
  implementationTime: number
}

export interface ConflictAnalysis {
  conflictId: string
  type: 'track_conflict' | 'station_congestion' | 'signal_failure' | 'priority_conflict'
  severity: 'low' | 'medium' | 'high' | 'critical'
  affectedTrains: string[]
  affectedSections: string[]
  currentImpact: number
  resolutionOptions: ResolutionOption[]
}

export interface ResolutionOption {
  id: string
  type: string
  description: string
  estimatedDelayReduction: number
  implementationCost: number
  feasibility: number
  sideEffects: string[]
}

export interface OptimizationResult {
  success: boolean
  recommendations: AIRecommendation[]
  conflicts: ConflictAnalysis[]
  metrics: {
    delayReduction: number
    energySaved: number
    throughputImprovement: number
    passengerImpact: number
    systemEfficiency: number
  }
  confidence: number
  implementationPlan: ImplementationStep[]
}

export interface ImplementationStep {
  step: number
  action: string
  target: string
  duration: number
  dependencies: string[]
  expectedOutcome: string
}

export class AIOptimizer {
  private simulation: any
  private optimizationHistory: OptimizationResult[] = []
  private mlModels: Map<string, any> = new Map()
  private performanceMetrics: Map<string, number> = new Map()

  constructor(simulation: any) {
    this.simulation = simulation
    this.initializeMLModels()
  }

  private initializeMLModels(): void {
    // Initialize ML models for different prediction tasks
    this.mlModels.set('delay_prediction', this.createDelayPredictionModel())
    this.mlModels.set('conflict_detection', this.createConflictDetectionModel())
    this.mlModels.set('energy_optimization', this.createEnergyOptimizationModel())
    this.mlModels.set('passenger_impact', this.createPassengerImpactModel())
  }

  private createDelayPredictionModel(): any {
    return {
      predict: (train: Train, currentConditions: any) => {
        // Factors: current delay, track conditions, weather, station capacity
        const baseDelay = train.delay
        const weatherFactor = currentConditions.weather?.severity || 0
        const congestionFactor = currentConditions.congestion || 0
        const priorityFactor = train.priority === 1 ? 0.8 : train.priority === 2 ? 0.9 : 1.0
        
        return baseDelay * (1 + weatherFactor * 0.3 + congestionFactor * 0.2) * priorityFactor
      }
    }
  }

  private createConflictDetectionModel(): any {
    return {
      detectConflicts: (trains: Train[], stations: Station[], signals: Signal[]) => {
        const conflicts: ConflictAnalysis[] = []
        
        // Check for station congestion
        stations.forEach(station => {
          if (station.currentTrains.length > station.capacity) {
            conflicts.push({
              conflictId: `station_congestion_${station.id}`,
              type: 'station_congestion',
              severity: station.currentTrains.length > station.capacity * 1.5 ? 'critical' : 'high',
              affectedTrains: station.currentTrains,
              affectedSections: [station.id],
              currentImpact: (station.currentTrains.length - station.capacity) * 5,
              resolutionOptions: this.generateStationResolutionOptions(station)
            })
          }
        })

        // Check for signal failures
        signals.forEach(signal => {
          if (signal.failure) {
            const affectedTrains = trains.filter(train => 
              Math.abs(train.currentPosition - signal.position) < 10
            ).map(train => train.id)
            
            conflicts.push({
              conflictId: `signal_failure_${signal.id}`,
              type: 'signal_failure',
              severity: 'critical',
              affectedTrains,
              affectedSections: [signal.id],
              currentImpact: affectedTrains.length * 10,
              resolutionOptions: this.generateSignalResolutionOptions(signal)
            })
          }
        })

        // Check for track conflicts
        const trackConflicts = this.detectTrackConflicts(trains)
        conflicts.push(...trackConflicts)

        return conflicts
      }
    }
  }

  private createEnergyOptimizationModel(): any {
    return {
      optimizeEnergy: (trains: Train[]) => {
        const recommendations: AIRecommendation[] = []
        
        trains.forEach(train => {
          if (train.energyConsumption > train.maxSpeed * 0.8) {
            recommendations.push({
              id: `energy_opt_${train.id}`,
              type: 'speed_adjustment',
              priority: 'medium',
              title: 'Energy Optimization',
              description: `Optimize speed profile for ${train.name} to reduce energy consumption`,
              impact: 'Reduce energy consumption by 15-20%',
              confidence: 85,
              action: `Adjust speed to ${train.maxSpeed * 0.8} km/h`,
              estimatedSavings: 150,
              affectedTrains: [train.id],
              affectedSections: [train.currentStation || ''],
              implementationTime: 2
            })
          }
        })

        return recommendations
      }
    }
  }

  private createPassengerImpactModel(): any {
    return {
      calculateImpact: (trains: Train[]) => {
        return trains.reduce((total, train) => {
          if (train.type === 'express' || train.type === 'suburban') {
            return total + (train.passengerCount * train.delay)
          }
          return total
        }, 0)
      }
    }
  }

  // Main optimization method
  async optimize(): Promise<OptimizationResult> {
    const state = this.simulation.getState()
    const trains = state.trains
    const stations = state.stations
    const signals = state.signals
    const disruptions = state.disruptions

    // Step 1: Detect conflicts
    const conflicts = this.mlModels.get('conflict_detection')?.detectConflicts(trains, stations, signals) || []
    
    // Step 2: Generate recommendations
    const recommendations = await this.generateRecommendations(conflicts, trains, stations, signals)
    
    // Step 3: Apply constraint optimization
    const optimizedRecommendations = this.applyConstraintOptimization(recommendations, trains)
    
    // Step 4: Calculate metrics
    const metrics = this.calculateOptimizationMetrics(optimizedRecommendations, trains)
    
    // Step 5: Generate implementation plan
    const implementationPlan = this.generateImplementationPlan(optimizedRecommendations)
    
    // Step 6: Calculate confidence
    const confidence = this.calculateConfidence(optimizedRecommendations, conflicts)

    const result: OptimizationResult = {
      success: optimizedRecommendations.length > 0,
      recommendations: optimizedRecommendations,
      conflicts,
      metrics,
      confidence,
      implementationPlan
    }

    this.optimizationHistory.push(result)
    return result
  }

  private async generateRecommendations(
    conflicts: ConflictAnalysis[],
    trains: Train[],
    stations: Station[],
    signals: Signal[]
  ): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = []

    // Conflict resolution recommendations
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
            affectedSections: conflict.affectedSections,
            implementationTime: 5
          })
          break

        case 'signal_failure':
          recommendations.push({
            id: `signal_${conflict.conflictId}`,
            type: 'signal_repair',
            priority: 'high',
            title: 'Signal Failure Response',
            description: `Prioritize signal repair at ${conflict.affectedSections[0]}`,
            impact: 'Restore normal operations',
            confidence: 95,
            action: 'Dispatch maintenance team and implement temporary measures',
            estimatedSavings: conflict.currentImpact * 60,
            affectedTrains: conflict.affectedTrains,
            affectedSections: conflict.affectedSections,
            implementationTime: 15
          })
          break

        case 'track_conflict':
          recommendations.push({
            id: `track_${conflict.conflictId}`,
            type: 'reroute',
            priority: 'medium',
            title: 'Track Conflict Resolution',
            description: `Reroute trains to avoid track conflict`,
            impact: 'Prevent cascading delays',
            confidence: 80,
            action: 'Implement alternative routing',
            estimatedSavings: 300,
            affectedTrains: conflict.affectedTrains,
            affectedSections: conflict.affectedSections,
            implementationTime: 10
          })
          break
      }
    })

    // Delay minimization recommendations
    trains.forEach(train => {
      if (train.delay > 10) {
        const predictedDelay = this.mlModels.get('delay_prediction')?.predict(train, {
          weather: this.simulation.getState().weather,
          congestion: this.calculateCongestion(train.currentPosition)
        }) || train.delay

        if (predictedDelay > train.delay * 1.5) {
          recommendations.push({
            id: `delay_min_${train.id}`,
            type: 'speed_adjustment',
            priority: 'medium',
            title: 'Delay Minimization',
            description: `Increase speed for ${train.name} to reduce delay`,
            impact: `Reduce delay by ${Math.round(predictedDelay - train.delay)} minutes`,
            confidence: 80,
            action: `Increase speed to ${Math.min(train.maxSpeed, train.speed + 20)} km/h`,
            estimatedSavings: (predictedDelay - train.delay) * 60,
            affectedTrains: [train.id],
            affectedSections: [train.currentStation || ''],
            implementationTime: 3
          })
        }
      }
    })

    // Energy optimization recommendations
    const energyRecommendations = this.mlModels.get('energy_optimization')?.optimizeEnergy(trains) || []
    recommendations.push(...energyRecommendations)

    // Priority optimization for passenger trains
    const passengerTrains = trains.filter(train => train.type === 'express' || train.type === 'suburban')
    if (passengerTrains.length > 0) {
      recommendations.push({
        id: `priority_optimization`,
        type: 'priority_change',
        priority: 'high',
        title: 'Passenger Priority Optimization',
        description: 'Prioritize passenger trains to minimize passenger impact',
        impact: 'Reduce passenger delay by 20-30%',
        confidence: 85,
        action: 'Adjust train precedence to favor passenger trains',
        estimatedSavings: 600,
        affectedTrains: passengerTrains.map(train => train.id),
        affectedSections: [],
        implementationTime: 5
      })
    }

    return recommendations
  }

  private applyConstraintOptimization(
    recommendations: AIRecommendation[],
    trains: Train[]
  ): AIRecommendation[] {
    // Simple constraint optimization - prioritize by impact and feasibility
    return recommendations
      .filter(rec => rec.confidence > 70) // Filter low confidence recommendations
      .sort((a, b) => {
        // Priority scoring: high priority + high confidence + high savings
        const scoreA = this.calculateRecommendationScore(a)
        const scoreB = this.calculateRecommendationScore(b)
        return scoreB - scoreA
      })
      .slice(0, 5) // Limit to top 5 recommendations
  }

  private calculateRecommendationScore(recommendation: AIRecommendation): number {
    const priorityScore = recommendation.priority === 'high' ? 3 : recommendation.priority === 'medium' ? 2 : 1
    const confidenceScore = recommendation.confidence / 100
    const savingsScore = Math.min(recommendation.estimatedSavings / 1000, 1)
    const feasibilityScore = 1 - (recommendation.implementationTime / 30) // Shorter implementation time is better
    
    return priorityScore * 0.3 + confidenceScore * 0.3 + savingsScore * 0.2 + feasibilityScore * 0.2
  }

  private calculateOptimizationMetrics(
    recommendations: AIRecommendation[],
    trains: Train[]
  ): any {
    const totalDelay = trains.reduce((sum, train) => sum + train.delay, 0)
    const totalEnergy = trains.reduce((sum, train) => sum + train.energyConsumption, 0)
    
    const delayReduction = recommendations
      .filter(rec => rec.type === 'speed_adjustment' || rec.type === 'reroute')
      .reduce((sum, rec) => sum + rec.estimatedSavings, 0) / 60 // Convert to minutes
    
    const energySaved = recommendations
      .filter(rec => rec.type === 'speed_adjustment')
      .reduce((sum, rec) => sum + rec.estimatedSavings, 0)
    
    const throughputImprovement = recommendations
      .filter(rec => rec.type === 'platform_reallocation')
      .length * 0.1 // 10% improvement per platform optimization
    
    const passengerImpact = trains
      .filter(train => train.type === 'express' || train.type === 'suburban')
      .reduce((sum, train) => sum + train.passengerCount, 0) * 0.05 // 5% impact per passenger

    const systemEfficiency = Math.max(0, 100 - (totalDelay / trains.length) * 10)

    return {
      delayReduction,
      energySaved,
      throughputImprovement,
      passengerImpact,
      systemEfficiency
    }
  }

  private generateImplementationPlan(recommendations: AIRecommendation[]): ImplementationStep[] {
    const steps: ImplementationStep[] = []
    
    recommendations.forEach((rec, index) => {
      steps.push({
        step: index + 1,
        action: rec.action,
        target: rec.affectedSections.join(', '),
        duration: rec.implementationTime,
        dependencies: index > 0 ? [`step_${index}`] : [],
        expectedOutcome: rec.impact
      })
    })
    
    return steps
  }

  private calculateConfidence(recommendations: AIRecommendation[], conflicts: ConflictAnalysis[]): number {
    if (recommendations.length === 0) return 0
    
    const avgConfidence = recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length
    
    // Adjust confidence based on historical performance
    const historicalPerformance = this.getHistoricalPerformance()
    const conflictSeverity = conflicts.reduce((sum, conflict) => {
      const severityScore = conflict.severity === 'critical' ? 4 : conflict.severity === 'high' ? 3 : 
                          conflict.severity === 'medium' ? 2 : 1
      return sum + severityScore
    }, 0)
    
    const conflictFactor = Math.min(conflictSeverity / (conflicts.length * 4), 1)
    
    return Math.min(avgConfidence * historicalPerformance * (1 + conflictFactor * 0.1), 95)
  }

  private getHistoricalPerformance(): number {
    if (this.optimizationHistory.length === 0) return 1.0
    
    const recentResults = this.optimizationHistory.slice(-10) // Last 10 optimizations
    const successRate = recentResults.filter(result => result.success).length / recentResults.length
    const avgMetrics = recentResults.reduce((sum, result) => {
      return sum + result.metrics.delayReduction + result.metrics.energySaved
    }, 0) / recentResults.length
    
    // Performance factor based on success rate and metrics
    return Math.min(successRate * 1.2 + (avgMetrics / 1000) * 0.1, 1.0)
  }

  private calculateCongestion(position: number): number {
    const trains = this.simulation.getState().trains
    const nearbyTrains = trains.filter((train: any) => Math.abs(train.currentPosition - position) < 10)
    return nearbyTrains.length / 5 // Simplified congestion calculation
  }

  private generateStationResolutionOptions(station: Station): ResolutionOption[] {
    return [
      {
        id: `platform_reallocation_${station.id}`,
        type: 'platform_reallocation',
        description: 'Reallocate platforms to reduce congestion',
        estimatedDelayReduction: 10,
        implementationCost: 2,
        feasibility: 0.9,
        sideEffects: ['May affect other trains']
      },
      {
        id: `hold_trains_${station.id}`,
        type: 'hold_trains',
        description: 'Hold incoming trains until congestion clears',
        estimatedDelayReduction: 5,
        implementationCost: 1,
        feasibility: 0.8,
        sideEffects: ['Delays for held trains']
      }
    ]
  }

  private generateSignalResolutionOptions(signal: Signal): ResolutionOption[] {
    return [
      {
        id: `emergency_repair_${signal.id}`,
        type: 'emergency_repair',
        description: 'Dispatch emergency repair team',
        estimatedDelayReduction: 20,
        implementationCost: 5,
        feasibility: 0.7,
        sideEffects: ['High cost', 'Temporary service disruption']
      },
      {
        id: `temporary_measures_${signal.id}`,
        type: 'temporary_measures',
        description: 'Implement temporary manual control',
        estimatedDelayReduction: 10,
        implementationCost: 2,
        feasibility: 0.9,
        sideEffects: ['Reduced efficiency']
      }
    ]
  }

  private detectTrackConflicts(trains: Train[]): ConflictAnalysis[] {
    const conflicts: ConflictAnalysis[] = []
    
    // Check for trains too close to each other
    for (let i = 0; i < trains.length; i++) {
      for (let j = i + 1; j < trains.length; j++) {
        const distance = Math.abs(trains[i].currentPosition - trains[j].currentPosition)
        if (distance < 2 && trains[i].currentPosition > 0 && trains[j].currentPosition > 0) {
          conflicts.push({
            conflictId: `track_conflict_${trains[i].id}_${trains[j].id}`,
            type: 'track_conflict',
            severity: 'high',
            affectedTrains: [trains[i].id, trains[j].id],
            affectedSections: [`${Math.floor(trains[i].currentPosition / 10) * 10}`],
            currentImpact: 15,
            resolutionOptions: []
          })
        }
      }
    }
    
    return conflicts
  }

  // Public API methods
  getOptimizationHistory(): OptimizationResult[] {
    return this.optimizationHistory
  }

  getMLModelPerformance(): { [key: string]: number } {
    const performance: { [key: string]: number } = {}
    
    this.mlModels.forEach((model, name) => {
      // Simplified performance calculation
      performance[name] = Math.random() * 0.3 + 0.7 // 70-100% performance
    })
    
    return performance
  }

  // Disruption handling
  async handleDisruption(disruption: Disruption): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = []
    
    switch (disruption.type) {
      case 'signal_failure':
        recommendations.push({
          id: `signal_failure_${disruption.id}`,
          type: 'signal_repair',
          priority: 'high',
          title: 'Signal Failure Response',
          description: `Emergency response to signal failure at ${disruption.affectedSections[0]}`,
          impact: 'Restore signal functionality',
          confidence: 90,
          action: 'Dispatch maintenance team and implement temporary control',
          estimatedSavings: 1200,
          affectedTrains: [],
          affectedSections: disruption.affectedSections.map(String),
          implementationTime: 15
        })
        break
        
      case 'weather':
        recommendations.push({
          id: `weather_${disruption.id}`,
          type: 'speed_adjustment',
          priority: 'medium',
          title: 'Weather Adaptation',
          description: 'Adjust operations for weather conditions',
          impact: 'Maintain safety while minimizing delays',
          confidence: 85,
          action: 'Reduce speeds and increase headways',
          estimatedSavings: 600,
          affectedTrains: [],
          affectedSections: disruption.affectedSections.map(String),
          implementationTime: 5
        })
        break
        
      case 'emergency_train':
        recommendations.push({
          id: `emergency_${disruption.id}`,
          type: 'priority_change',
          priority: 'high',
          title: 'Emergency Train Priority',
          description: 'Clear path for emergency train',
          impact: 'Ensure emergency response',
          confidence: 95,
          action: 'Hold all other trains and clear emergency route',
          estimatedSavings: 0, // No savings, but critical for safety
          affectedTrains: [],
          affectedSections: disruption.affectedSections.map(String),
          implementationTime: 3
        })
        break
    }
    
    return recommendations
  }

  // Performance comparison between AI and Manual modes
  comparePerformance(aiData: any[], manualData: any[]): any {
    const aiKPIs = this.calculateKPIsFromData(aiData)
    const manualKPIs = this.calculateKPIsFromData(manualData)
    
    return {
      scenario: 'AI vs Manual Comparison',
      aiMode: aiKPIs,
      manualMode: manualKPIs,
      improvement: {
        delayReduction: manualKPIs.averageDelay - aiKPIs.averageDelay,
        efficiencyGain: aiKPIs.systemEfficiency - manualKPIs.systemEfficiency,
        energySaved: aiKPIs.energyUsage - manualKPIs.energyUsage,
        conflictReduction: manualKPIs.conflicts - aiKPIs.conflicts
      }
    }
  }

  private calculateKPIsFromData(data: any[]): any {
    if (data.length === 0) return {}
    
    const totalDelay = data.reduce((sum, d) => sum + d.totalDelay, 0)
    const averageDelay = totalDelay / data.length
    const systemEfficiency = data.reduce((sum, d) => sum + d.systemEfficiency, 0) / data.length
    const energyUsage = data.reduce((sum, d) => sum + d.energyUsage, 0) / data.length
    const conflicts = data.reduce((sum, d) => sum + d.conflicts, 0) / data.length
    
    return {
      averageDelay,
      systemEfficiency,
      energyUsage,
      conflicts
    }
  }
}
