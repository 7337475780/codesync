import { create } from 'zustand';
import { AnalyticsSummary, TrafficDataPoint, PerformanceDataPoint } from '../types/analytics';

interface AnalyticsState {
  summary: AnalyticsSummary | null;
  traffic: TrafficDataPoint[];
  performance: PerformanceDataPoint[];
  isLoading: boolean;
  
  setSummary: (summary: AnalyticsSummary) => void;
  addTrafficData: (point: TrafficDataPoint) => void;
  addPerformanceData: (point: PerformanceDataPoint) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  summary: null,
  traffic: [],
  performance: [],
  isLoading: false,
  
  setSummary: (summary) => set({ summary }),
  addTrafficData: (point) => set((state) => {
    const newTraffic = [...state.traffic, point];
    if (newTraffic.length > 50) newTraffic.shift(); // Keep last 50 points
    return { traffic: newTraffic };
  }),
  addPerformanceData: (point) => set((state) => {
    const newPerformance = [...state.performance, point];
    if (newPerformance.length > 50) newPerformance.shift(); // Keep last 50 points
    return { performance: newPerformance };
  }),
}));
