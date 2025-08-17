import { setupStore } from "./utils/setupStore";
import { loadStateFromLS, saveStateToLS } from "./utils/state-local-storage";

export const store = setupStore(loadStateFromLS());

store.subscribe(() => {
    const state = store.getState();
    saveStateToLS({
        auth: {
            user: state.auth.user
        }
    });
});
