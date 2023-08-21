import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import ScreenTypes from "../constants/ScreenTypes";

export interface MapsContextValue {
  garbageBins: any[] | null;
  setGarbageBins: (newValue: any) => void | null;
  smokingRooms: any[];
  setSmokingRooms: (newValue: any) => void | null;
  restrooms: any[];
  setRestrooms: (newValue: any) => void | null;
  destinationDetails: any;
  setDestinationDetails: (newValue: any) => void | null;
  activeRoute: any;
  setActiveRoute: (newValue: any) => void | null;
  getGarbageBins: any;
}

export const MapsContext = createContext<MapsContextValue | null>(null);

export function MapsProvider({ children }: PropsWithChildren) {
  const [garbageBins, setGarbageBins] = useState([]);
  const [smokingRooms, setSmokingRooms] = useState([]);
  const [restrooms, setRestrooms] = useState([]);
  const [destinationDetails, setDestinationDetails] = useState({});
  const [activeRoute, setActiveRoute] = useState([]);
  // const [newLocation, setNewLocation] = useState({})

  useEffect(() => {
    getGarbageBins();
    getSmokingRooms();
    getRestrooms();
  }, []);

  const getGarbageBins = async () => {
    try {
      const response = await axios.get(
        "https://doko-api.onrender.com/api/garbage-bins"
      );

      setGarbageBins(response?.data?.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getSmokingRooms = async () => {
    try {
      const response = await axios.get(
        "https://doko-api.onrender.com/api/smoking-areas"
      );

      setSmokingRooms(response?.data?.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getRestrooms = async () => {
    try {
      const response = await axios.get(
        "https://doko-api.onrender.com/api/restrooms"
      );

      setRestrooms(response?.data?.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const value = useMemo(
    () => ({
      garbageBins,
      setGarbageBins,
      smokingRooms,
      setSmokingRooms,
      restrooms,
      setRestrooms,
      destinationDetails,
      setDestinationDetails,
      activeRoute,
      setActiveRoute,
      getGarbageBins,
      getRestrooms,
      getSmokingRooms,
    }),
    [
      garbageBins,
      smokingRooms,
      restrooms,
      destinationDetails,
      activeRoute,
      getGarbageBins,
      getRestrooms,
      getSmokingRooms,
    ]
  );

  return <MapsContext.Provider value={value}>{children}</MapsContext.Provider>;
}
