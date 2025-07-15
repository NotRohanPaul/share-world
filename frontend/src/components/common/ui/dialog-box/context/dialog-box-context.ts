import { createContext } from "react";
import type { DialogBoxContextType } from "../types";


export const DialogBoxContext = createContext<DialogBoxContextType | undefined>(undefined);
