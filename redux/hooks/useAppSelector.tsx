import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "..";

/**
 * useAppSelector wraps the react-redux `useSelector` hook to give type definitions.
 */
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
