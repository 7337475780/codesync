export interface TrafficDataPoint {
  timestamp: string;
  visitors: number;
  requests: number;
  bandwidth: number; // in bytes
}

export interface PerformanceDataPoint {
  timestamp: string;
  latency: number; // in ms
  errorRate: number; // percentage (0-100)
}

export interface AnalyticsSummary {
  dailyUsers: number;
  monthlyUsers: number;
  totalDeployments: number;
  averageBuildTime: number; // in seconds
  totalBandwidth: number; // in bytes
}

export interface TopRoute {
  path: string;
  visits: number;
}

export interface TrafficSource {
  referrer: string;
  visits: number;
}

export interface LocationData {
  country: string;
  code: string;
  visits: number;
}
