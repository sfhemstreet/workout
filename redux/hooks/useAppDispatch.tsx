import { useDispatch } from "react-redux";
import { AppDispatch } from "..";

/**
 * useAppDispatch wraps the react-redux `useDispatch` hook to give type information.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();