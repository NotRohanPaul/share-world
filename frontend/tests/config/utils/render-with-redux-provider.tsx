import {
    setupStore,
    type AppStoreStateType,
    type PreloadedStateType
} from "@src/redux/utils/setupStore";
import { render, type RenderOptions } from '@testing-library/react';
import type { PropsWithChildren } from "react";
import { Provider } from 'react-redux';

type ExtendedRenderOptionsType = {
    preloadedState?: PreloadedStateType;
    store?: AppStoreStateType;

} & RenderOptions;

export function renderWithReduxProviders(
    ui: React.ReactElement,
    {
        preloadedState,
        store = setupStore(preloadedState),
        ...options
    }: ExtendedRenderOptionsType = {}
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
