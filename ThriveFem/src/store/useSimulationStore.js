import { create } from 'zustand';
import simulationData from '../data/telemetry_simulation.json';

export const useSimulationStore = create((set) => ({
  currentIndex: 0,
  activeData: simulationData.simulation_lifecycle[0],
  
  advanceSimulation: () => set((state) => {
    const nextIndex = (state.currentIndex + 1) % simulationData.simulation_lifecycle.length;
    return {
      currentIndex: nextIndex,
      activeData: simulationData.simulation_lifecycle[nextIndex],
    };
  }),
}));