import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

export interface ModalContextValue {
  isMarkerModalOpen: boolean;
  setIsMarkerModalOpen: (newValue: boolean) => void | null;
  isNavigationModalOpen: boolean;
  setIsNavigationModalOpen: (newValue: boolean) => void | null;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (newValue: boolean) => void | null;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
  const [isMarkerModalOpen, setIsMarkerModalOpen] = useState(false);
  const [isNavigationModalOpen, setIsNavigationModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const value = useMemo(
    () => ({
      isMarkerModalOpen,
      setIsMarkerModalOpen,
      isNavigationModalOpen,
      setIsNavigationModalOpen,
      isFilterModalOpen,
      setIsFilterModalOpen,
    }),
    [isMarkerModalOpen, isNavigationModalOpen, isFilterModalOpen]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
