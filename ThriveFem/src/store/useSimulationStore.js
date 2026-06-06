import { create } from 'zustand';
import simulationData from '../data/telemetry_simulation.json';

export const useSimulationStore = create((set) => ({
  currentIndex: 0,
  // Current state data from JSON
  activeData: simulationData.simulation_lifecycle[0],
  
  // The "Presenter Trigger" from your PDF
  advanceSimulation: () => set((state) => {
    const nextIndex = (state.currentIndex + 1) % simulationData.simulation_lifecycle.length;
    return {
      currentIndex: nextIndex,
      activeData: simulationData.simulation_lifecycle[nextIndex],
    };
  }),
}));