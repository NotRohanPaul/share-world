import type { PreloadedStateType } from "./setupStore";

export const loadStateFromLS = (): PreloadedStateType | undefined => {
    try {
        const serializedState = localStorage.getItem("app-state");
        if (serializedState === null)
            return undefined;

        return JSON.parse(serializedState) as PreloadedStateType;
    } catch (err) {
        console.error("Failed to load state from localStorage", err);
        return undefined;
    }
};

export const saveStateToLS = (
    state: PreloadedStateType
): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("app-state", serializedState);
    } catch (err) {
        console.error("Failed to save state to localStorage", err);
    }
};
