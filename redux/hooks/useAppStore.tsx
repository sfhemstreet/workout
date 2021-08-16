import { useMemo } from "react";
import { AppState, initializeStore } from "..";

/**
 * useAppStore wraps react-redux `useStore` hook. Used to initialize store on server or on client. 
 */
export function useAppStore(initialState?: AppState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}