import { useDispatch, useSelector } from 'react-redux';
import type { AppRootReducersType } from "../slices/root-reducer";
import type { AppStoreDispatchType } from "./setupStore";

export const useAppDispatch = useDispatch.withTypes<AppStoreDispatchType>();
export const useAppSelector = useSelector.withTypes<AppRootReducersType>();