import { create } from 'zustand'; // Standard for v4+
import simulationData from '../data/telemetry_simulation.json';

export const useSimulationStore = create((set) => ({
  currentIndex: 0,
  language: 'en', // 'en' or 'am'
  activeData: simulationData.simulation_lifecycle[0],
  
  // Professional Toggle Logic
  toggleLanguage: () => set((state) => ({ 
    language: state.language === 'en' ? 'am' : 'en' 
  })),

  advanceSimulation: () => set((state) => {
    const nextIndex = (state.currentIndex + 1) % simulationData.simulation_lifecycle.length;
    return {
      currentIndex: nextIndex,
      activeData: simulationData.simulation_lifecycle[nextIndex],
    };
  }),
}));