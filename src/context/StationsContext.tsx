import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Station {
  id: string;
  name: string;
}

interface StationsContextType {
  stations: Station[];
  addStation: (station: Station) => void;
  removeStation: (id: string) => void;
}

const StationsContext = createContext<StationsContextType | undefined>(undefined);

export const StationsProvider = ({ children }: { children: ReactNode }) => {
  const [stations, setStations] = useState<Station[]>([]);

  const addStation = (station: Station) => {
    setStations((prevStations) => [...prevStations, station]);
  };

  const removeStation = (id: string) => {
    setStations((prevStations) => prevStations.filter((station) => station.id !== id));
  };

  return (
    <StationsContext.Provider value={{ stations, addStation, removeStation }}>
      {children}
    </StationsContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationsContext);
  if (context === undefined) {
    throw new Error('useStations must be used within a StationsProvider');
  }
  return context;
};
