import { setupStore, type AppRootReducersType, type AppStoreStateType } from "@src/redux/store";
import { render } from '@testing-library/react';
import type { PropsWithChildren } from "react";
import { Provider } from 'react-redux';

interface ExtendedRenderOptions {
    preloadedState?: Partial<AppRootReducersType>;
    store?: AppStoreStateType;
}

export function renderWithReduxProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...options
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren) {
        return (
            <Provider store={store} >
                {children}
            </Provider>
        );
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}
