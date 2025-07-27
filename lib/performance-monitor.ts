// Performance monitoring system for BD Agent API
export interface PerformanceMetrics {
  timestamp: number
  requestId: string
  responseTime: number
  cacheHit: boolean
  modelUsed: string
  complexity: string
  verificationPassed: boolean
  confidenceScore: number
  hasSpecificData: boolean
  errorOccurred: boolean
  errorType?: string
}

export interface AggregatedMetrics {
  totalRequests: number
  averageResponseTime: number
  cacheHitRate: number
  verificationPassRate: number
  averageConfidenceScore: number
  dataQualityRate: number
  errorRate: number
  modelUsage: Record<string, number>
  complexityDistribution: Record<string, number>
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = []
  private maxMetrics = 1000 // Keep last 1000 requests

  recordMetric(metric: PerformanceMetrics): void {
    this.metrics.push(metric)
    
    // Maintain size limit
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }
  }

  getAggregatedMetrics(timeWindow?: number): AggregatedMetrics {
    const now = Date.now()
    const window = timeWindow || 24 * 60 * 60 * 1000 // Default 24 hours
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < window)

    if (recentMetrics.length === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        cacheHitRate: 0,
        verificationPassRate: 0,
        averageConfidenceScore: 0,
        dataQualityRate: 0,
        errorRate: 0,
        modelUsage: {},
        complexityDistribution: {}
      }
    }

    const totalRequests = recentMetrics.length
    const averageResponseTime = recentMetrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests
    const cacheHitRate = recentMetrics.filter(m => m.cacheHit).length / totalRequests
    const verificationPassRate = recentMetrics.filter(m => m.verificationPassed).length / totalRequests
    const averageConfidenceScore = recentMetrics.reduce((sum, m) => sum + m.confidenceScore, 0) / totalRequests
    const dataQualityRate = recentMetrics.filter(m => m.hasSpecificData).length / totalRequests
    const errorRate = recentMetrics.filter(m => m.errorOccurred).length / totalRequests

    // Model usage distribution
    const modelUsage: Record<string, number> = {}
    recentMetrics.forEach(m => {
      modelUsage[m.modelUsed] = (modelUsage[m.modelUsed] || 0) + 1
    })

    // Complexity distribution
    const complexityDistribution: Record<string, number> = {}
    recentMetrics.forEach(m => {
      complexityDistribution[m.complexity] = (complexityDistribution[m.complexity] || 0) + 1
    })

    return {
      totalRequests,
      averageResponseTime,
      cacheHitRate,
      verificationPassRate,
      averageConfidenceScore,
      dataQualityRate,
      errorRate,
      modelUsage,
      complexityDistribution
    }
  }

  getRecentErrors(limit: number = 10): PerformanceMetrics[] {
    return this.metrics
      .filter(m => m.errorOccurred)
      .slice(-limit)
      .reverse()
  }

  getPerformanceTrends(): {
    responseTimeTrend: number[]
    confidenceTrend: number[]
    timestamps: number[]
  } {
    const recentMetrics = this.metrics.slice(-100) // Last 100 requests
    
    return {
      responseTimeTrend: recentMetrics.map(m => m.responseTime),
      confidenceTrend: recentMetrics.map(m => m.confidenceScore),
      timestamps: recentMetrics.map(m => m.timestamp)
    }
  }

  exportMetrics(): PerformanceMetrics[] {
    return [...this.metrics]
  }

  clearMetrics(): void {
    this.metrics = []
  }
}

// Global instance
export const performanceMonitor = new PerformanceMonitor()

// Helper functions for easy metric recording
export function recordAPIMetric(params: {
  requestId: string
  responseTime: number
  cacheHit: boolean
  modelUsed: string
  complexity: string
  verificationPassed: boolean
  confidenceScore: number
  hasSpecificData: boolean
  errorOccurred?: boolean
  errorType?: string
}): void {
  performanceMonitor.recordMetric({
    timestamp: Date.now(),
    ...params,
    errorOccurred: params.errorOccurred || false
  })
}

// API endpoint for metrics
export async function getMetricsEndpoint(): Promise<AggregatedMetrics> {
  return performanceMonitor.getAggregatedMetrics()
} 