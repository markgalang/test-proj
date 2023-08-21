import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import ScreenTypes from "../constants/ScreenTypes";

export interface UserContextValue {
  selectedScreen: string;
  setSelectedScreen: (newValue: string) => void | null;
  showTabBar: boolean;
  setShowTabBar: (newValue: boolean) => void | null;
}

export const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: PropsWithChildren) {
  const [selectedScreen, setSelectedScreen] = useState(
    ScreenTypes.GARBAGE_BINS
  );
  const [showTabBar, setShowTabBar] = useState(true);

  const value = useMemo(
    () => ({ selectedScreen, setSelectedScreen, showTabBar, setShowTabBar }),
    [selectedScreen, showTabBar]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
