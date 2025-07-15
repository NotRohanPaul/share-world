import { createContext } from "react";
import type { ToastContextType } from "../types";


export const ToastsContext = createContext<ToastContextType | undefined>(undefined);