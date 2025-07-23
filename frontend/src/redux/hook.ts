import { useDispatch, useSelector } from 'react-redux';
import type { AppRootReducersType, AppStoreDispatchType } from './store';

export const useAppDispatch = useDispatch.withTypes<AppStoreDispatchType>();
export const useAppSelector = useSelector.withTypes<AppRootReducersType>();