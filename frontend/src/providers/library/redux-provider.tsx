import { store } from "@src/redux/store";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";


export const ReduxStoreProvider = ({ children }: PropsWithChildren) => <Provider store={store} children={children} />;