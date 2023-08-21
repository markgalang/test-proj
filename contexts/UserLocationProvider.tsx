import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import * as Location from 'expo-location';

export interface LocationContextValue {
  userLocation: {
    latitude: number;
    longitude: number;
  };
}

const LocationContext = createContext<LocationContextValue | null>(null);

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === null) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

export function LocationProvider({ children }: PropsWithChildren) {
  const [userLocation, setUserLocation] = useState({
    latitude: 14.5546333,
    longitude: 121.0125902,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const value = useMemo(() => ({ userLocation }), [userLocation]);

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
